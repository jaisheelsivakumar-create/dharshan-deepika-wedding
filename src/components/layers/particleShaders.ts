import * as THREE from "three";

const COMMON_SCREEN_UTILS = /* glsl */ `
  varying vec2 vScreenUv;

  float computeLampProximity(vec2 screenUv) {
    vec2 lampLeft = vec2(0.08, 0.16);
    vec2 lampRight = vec2(0.92, 0.16);
    vec2 bellTopLeft = vec2(0.08, 0.88);
    vec2 bellTopRight = vec2(0.92, 0.88);

    float dL = length((screenUv - lampLeft) * vec2(1.4, 1.0));
    float dR = length((screenUv - lampRight) * vec2(1.4, 1.0));
    float dTL = length((screenUv - bellTopLeft) * vec2(1.2, 1.2));
    float dTR = length((screenUv - bellTopRight) * vec2(1.2, 1.2));

    float nearBottomLamps = exp(-dL * 3.8) + exp(-dR * 3.8);
    float nearTopLamps = 0.45 * (exp(-dTL * 4.2) + exp(-dTR * 4.2));
    return clamp(nearBottomLamps + nearTopLamps, 0.0, 1.35);
  }
`;

export function createAtlasParticleMaterial(
  atlasTexture: THREE.Texture,
  cols: number,
  rows: number
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uAtlas: { value: atlasTexture },
      uGrid: { value: new THREE.Vector2(cols, rows) },
      uTime: { value: 0 },
      uWarmColor: { value: new THREE.Color("#FFD27D") },
      uRimStrength: { value: 0.9 },
      uWarmth: { value: 1.0 },
      uSafeHalfWidth: { value: 0.25 },
      uCenterFadeMin: { value: 0.26 },
      uDofCenterFadeMin: { value: 0.12 },
    },
    vertexShader: /* glsl */ `
      attribute float aTileIndex;
      attribute vec3 aTint;
      // x: baseOpacity, y: dofBlur [0..1], z: flutterAmp, w: flutterPhase
      attribute vec4 aMeta;

      uniform float uTime;

      varying vec2 vUv;
      varying float vTileIndex;
      varying vec3 vTint;
      varying float vOpacity;
      varying float vDofBlur;
      varying vec3 vWorldNormal;
      varying vec3 vViewDir;
      varying vec2 vScreenUv;

      void main() {
        vec3 pos = position;

        // Real-time soft edge flutter on petals
        float amp = aMeta.z;
        if (amp > 0.0005) {
          float wave = sin(uTime * 3.8 + aMeta.w + pos.y * 5.2 + pos.x * 2.4);
          float edgeWeight = smoothstep(0.05, 0.5, length(pos.xy));
          pos.z += wave * amp * edgeWeight;
        }

        vec4 worldPos = modelMatrix * instanceMatrix * vec4(pos, 1.0);
        vec4 mvPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPos;

        vUv = uv;
        vTileIndex = aTileIndex;
        vTint = aTint;
        vOpacity = aMeta.x;
        vDofBlur = aMeta.y;

        // Approximate bent normal in world space
        mat3 instMat3 = mat3(instanceMatrix);
        vec3 bendNormal = normalize(normal + vec3(-pos.x * 0.28, -pos.y * 0.22, 0.0));
        vWorldNormal = normalize(mat3(modelMatrix) * instMat3 * bendNormal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);

        vec2 ndc = gl_Position.xy / max(gl_Position.w, 0.0001);
        vScreenUv = ndc * 0.5 + 0.5;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform sampler2D uAtlas;
      uniform vec2 uGrid;
      uniform vec3 uWarmColor;
      uniform float uRimStrength;
      uniform float uWarmth;
      uniform float uSafeHalfWidth;
      uniform float uCenterFadeMin;
      uniform float uDofCenterFadeMin;

      varying vec2 vUv;
      varying float vTileIndex;
      varying vec3 vTint;
      varying float vOpacity;
      varying float vDofBlur;
      varying vec3 vWorldNormal;
      varying vec3 vViewDir;

      ${COMMON_SCREEN_UTILS}

      vec4 sampleTile(float tileIdx, vec2 localUv, float blurRadius) {
        float col = mod(floor(tileIdx + 0.5), uGrid.x);
        float row = floor((floor(tileIdx + 0.5)) / uGrid.x);

        // With Texture.flipY = true, row 0 sits at top (v in [1-1/rows, 1])
        float tileW = 1.0 / uGrid.x;
        float tileH = 1.0 / uGrid.y;
        float pad = 0.012;
        vec2 insetUv = mix(vec2(pad), vec2(1.0 - pad), clamp(localUv, 0.0, 1.0));

        vec2 tileOrigin = vec2(col * tileW, 1.0 - (row + 1.0) * tileH);
        vec2 uv = tileOrigin + insetUv * vec2(tileW, tileH);

        if (blurRadius <= 0.05) {
          return texture2D(uAtlas, uv);
        }

        // Fast 5-tap depth-of-field bokeh softening inside tile bounds
        vec2 ofs = vec2(tileW, tileH) * (0.022 * blurRadius);
        vec2 uvMin = tileOrigin + vec2(tileW, tileH) * 0.005;
        vec2 uvMax = tileOrigin + vec2(tileW, tileH) * 0.995;

        vec4 c0 = texture2D(uAtlas, uv);
        vec4 c1 = texture2D(uAtlas, clamp(uv + vec2(ofs.x, 0.0), uvMin, uvMax));
        vec4 c2 = texture2D(uAtlas, clamp(uv - vec2(ofs.x, 0.0), uvMin, uvMax));
        vec4 c3 = texture2D(uAtlas, clamp(uv + vec2(0.0, ofs.y), uvMin, uvMax));
        vec4 c4 = texture2D(uAtlas, clamp(uv - vec2(0.0, ofs.y), uvMin, uvMax));

        // Premultiplied blend preserves clean botanical hue around defocused edges
        vec3 rgbSum = c0.rgb * c0.a * 0.36
                    + (c1.rgb * c1.a + c2.rgb * c2.a + c3.rgb * c3.a + c4.rgb * c4.a) * 0.16;
        float aSum = c0.a * 0.36 + (c1.a + c2.a + c3.a + c4.a) * 0.16;
        vec3 avgRgb = aSum > 0.002 ? rgbSum / aSum : c0.rgb;
        return vec4(avgRgb, aSum);
      }

      void main() {
        if (vOpacity <= 0.004) discard;

        vec4 tex = sampleTile(vTileIndex, vUv, vDofBlur);
        if (tex.a <= 0.015) discard;

        vec3 baseColor = tex.rgb * vTint;

        // Soft warm rim light when petals face toward foreground lamps or edges
        vec3 N = normalize(vWorldNormal);
        vec3 V = normalize(vViewDir);
        float ndotv = abs(dot(N, V));
        float fresnel = pow(1.0 - clamp(ndotv, 0.0, 1.0), 2.1);

        // Directional highlight skewed toward lower/corner lamp lights
        vec3 lampDir = normalize(vec3(vScreenUv.x > 0.5 ? 0.55 : -0.55, -0.75, 0.45));
        float lampFace = smoothstep(-0.2, 0.95, abs(dot(N, lampDir)));
        float lampProx = computeLampProximity(vScreenUv);

        vec3 rimGlow = uWarmColor * (fresnel * 0.48 * uRimStrength * (0.55 + 0.75 * lampFace) * uWarmth);
        vec3 proximityWarmth = uWarmColor * (lampProx * 0.14 * uWarmth);

        vec3 litColor = clamp(baseColor + rimGlow + proximityWarmth, 0.0, 1.0);

        // Strong center-column readability protection so text stays unobstructed
        float dx = abs(vScreenUv.x - 0.5);
        float band = smoothstep(uSafeHalfWidth * 0.42, uSafeHalfWidth * 1.12, dx);
        // Very near lens-DoF & far background petals attenuate strongly over copy; sharp mid petals soften gracefully
        float minAlpha = mix(uCenterFadeMin, uDofCenterFadeMin, smoothstep(0.28, 0.85, vDofBlur));
        float readabilityFade = mix(minAlpha, 1.0, band);

        float alpha = tex.a * vOpacity * readabilityFade;
        if (alpha <= 0.008) discard;

        gl_FragColor = vec4(litColor, alpha);
      }
    `,
  });
}

export function createSparkleShaderMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.SrcAlphaFactor,
    blendDst: THREE.OneFactor,
    blendEquationAlpha: THREE.AddEquation,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    uniforms: {
      uTime: { value: 0 },
      uWarmth: { value: 1.0 },
      uSafeHalfWidth: { value: 0.25 },
    },
    vertexShader: /* glsl */ `
      attribute float aScale;
      attribute vec3 aColor;
      // x: baseOpacity, y: twinkleFreq, z: twinklePhase, w: unused
      attribute vec4 aMeta;

      uniform float uTime;

      varying vec2 vUv;
      varying vec3 vColor;
      varying float vAlpha;
      varying vec2 vScreenUv;

      void main() {
        if (aMeta.x <= 0.004 || aScale <= 0.0001) {
          gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
          vUv = uv;
          vColor = aColor;
          vAlpha = 0.0;
          vScreenUv = vec2(0.5);
          return;
        }

        vec4 centerWorld = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec4 mvCenter = viewMatrix * centerWorld;
        mvCenter.xy += position.xy * aScale;
        gl_Position = projectionMatrix * mvCenter;

        vUv = uv;
        vColor = aColor;

        float twinkle = 0.34 + 0.66 * pow(0.5 + 0.5 * sin(uTime * aMeta.y + aMeta.z), 2.4);
        vAlpha = aMeta.x * twinkle;

        vec2 ndc = gl_Position.xy / max(gl_Position.w, 0.0001);
        vScreenUv = ndc * 0.5 + 0.5;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uWarmth;
      uniform float uSafeHalfWidth;

      varying vec2 vUv;
      varying vec3 vColor;
      varying float vAlpha;

      ${COMMON_SCREEN_UTILS}

      void main() {
        if (vAlpha <= 0.005) discard;

        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r >= 1.0) discard;

        float coreGlow = exp(-r * r * 6.8);
        // Subtle 4-point star diffraction rays
        float rayX = exp(-abs(p.y) * 14.0) * exp(-abs(p.x) * 2.8);
        float rayY = exp(-abs(p.x) * 14.0) * exp(-abs(p.y) * 2.8);
        float sparkleShape = clamp(coreGlow + (rayX + rayY) * 0.48, 0.0, 1.0) * smoothstep(1.0, 0.45, r);

        float lampProx = computeLampProximity(vScreenUv);
        float dx = abs(vScreenUv.x - 0.5);
        float centerAtten = mix(0.45, 1.0, smoothstep(uSafeHalfWidth * 0.4, uSafeHalfWidth * 1.15, dx));

        float outAlpha = clamp(sparkleShape * vAlpha * centerAtten * (0.85 + 0.3 * lampProx) * clamp(uWarmth, 0.7, 1.25), 0.0, 0.95);
        if (outAlpha <= 0.004) discard;

        vec3 col = mix(vColor, vec3(1.0, 0.96, 0.8), coreGlow * 0.62);

        // Output un-premultiplied RGB because blendSrc is SrcAlphaFactor (prevents double-multiply darkening on cream)
        gl_FragColor = vec4(col, outAlpha);
      }
    `,
  });
}

export function createBokehShaderMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    uniforms: {
      uTime: { value: 0 },
      uWarmth: { value: 1.0 },
      uSafeHalfWidth: { value: 0.25 },
    },
    vertexShader: /* glsl */ `
      attribute float aScale;
      attribute vec3 aColor;
      attribute vec4 aMeta; // x: baseOpacity, y: pulseSpeed, z: pulsePhase, w: softness

      uniform float uTime;

      varying vec2 vUv;
      varying vec3 vColor;
      varying float vAlpha;
      varying vec2 vScreenUv;

      void main() {
        if (aMeta.x <= 0.004 || aScale <= 0.0001) {
          gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
          vUv = uv;
          vColor = aColor;
          vAlpha = 0.0;
          vScreenUv = vec2(0.5);
          return;
        }

        vec4 centerWorld = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec4 mvCenter = viewMatrix * centerWorld;
        float breathe = 1.0 + 0.08 * sin(uTime * aMeta.y + aMeta.z);
        mvCenter.xy += position.xy * (aScale * breathe);
        gl_Position = projectionMatrix * mvCenter;

        vUv = uv;
        vColor = aColor;
        vAlpha = aMeta.x * (0.82 + 0.18 * cos(uTime * aMeta.y * 0.7 + aMeta.z));

        vec2 ndc = gl_Position.xy / max(gl_Position.w, 0.0001);
        vScreenUv = ndc * 0.5 + 0.5;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uWarmth;
      uniform float uSafeHalfWidth;

      varying vec2 vUv;
      varying vec3 vColor;
      varying float vAlpha;
      varying vec2 vScreenUv;

      void main() {
        if (vAlpha <= 0.004) discard;

        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r >= 1.0) discard;

        // Soft cinematic out-of-focus bokeh aperture profile
        float disc = smoothstep(0.96, 0.32, r);
        float ring = smoothstep(0.45, 0.76, r) * smoothstep(0.96, 0.76, r);
        float intensity = disc * 0.76 + ring * 0.32;

        // Strongly soften across central reading corridor so far bokeh never dims text
        float dx = abs(vScreenUv.x - 0.5);
        float centerMask = mix(0.08, 1.0, smoothstep(uSafeHalfWidth * 0.52, uSafeHalfWidth * 1.22, dx));

        float alpha = clamp(intensity * vAlpha * centerMask * clamp(uWarmth, 0.7, 1.25), 0.0, 0.45);
        if (alpha <= 0.004) discard;

        vec3 col = mix(vColor, vec3(1.0, 0.94, 0.76), smoothstep(0.75, 0.0, r) * 0.4);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

export function createEmberShaderMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.SrcAlphaFactor,
    blendDst: THREE.OneFactor,
    blendEquationAlpha: THREE.AddEquation,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    uniforms: {
      uWarmth: { value: 1.0 },
    },
    vertexShader: /* glsl */ `
      attribute float aScale;
      attribute vec3 aColor;
      attribute float aOpacity;

      varying vec2 vUv;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        if (aOpacity <= 0.004 || aScale <= 0.0001) {
          gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
          vUv = uv;
          vColor = aColor;
          vAlpha = 0.0;
          return;
        }

        vec4 centerWorld = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vec4 mvCenter = viewMatrix * centerWorld;
        mvCenter.xy += position.xy * aScale;
        gl_Position = projectionMatrix * mvCenter;

        vUv = uv;
        vColor = aColor;
        vAlpha = aOpacity;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uWarmth;

      varying vec2 vUv;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        if (vAlpha <= 0.004) discard;
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r >= 1.0) discard;

        float glow = exp(-r * r * 5.2) * smoothstep(1.0, 0.3, r);
        float a = clamp(glow * vAlpha * clamp(uWarmth, 0.75, 1.3), 0.0, 0.95);
        if (a <= 0.004) discard;

        vec3 col = mix(vColor, vec3(1.0, 0.95, 0.74), glow * 0.65);

        // Un-premultiplied RGB for clean warm firelight additive blend over cream parchment
        gl_FragColor = vec4(col, a);
      }
    `,
  });
}

/**
 * Generates a gently cupped / spoon-curved 3D plane geometry (not a flat quad)
 * so petals and flowers catch organic highlights as they tumble.
 */
export function createCurvedPetalGeometry(
  segX = 6,
  segY = 6,
  archZ = 0.095,
  cupZ = 0.075
): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(1, 1, segX, segY);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i); // [-0.5, 0.5]
    const y = pos.getY(i); // [-0.5, 0.5]
    // Spoon/cup curvature across width + gentle longitudinal camber
    const zCurve = -(x * x * 4.0) * cupZ + (0.25 - y * y) * archZ * 2.0;
    pos.setZ(i, zCurve);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}
