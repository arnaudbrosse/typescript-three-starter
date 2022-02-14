uniform sampler2D tDiffuse;
uniform float brightness;
uniform float contrast;
uniform float exposure;
uniform float saturation;

varying vec2 vUv;

vec3 adjustBrightness (vec3 c, float v) {
    return c + v;
}

vec3 adjustContrast (vec3 c, float v) {
    return 0.5 + (1.0 + v) * (c - 0.5);
}

vec3 adjustExposure (vec3 c, float v) {
    return c * (1.0 + v);
}

vec3 adjustSaturation (vec3 c, float v) {
    const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
    vec3 grayscale = vec3(dot(c, luminosityFactor));
    return mix(grayscale, c, 1.0 + v);
}

void main () {
    vec4 texel = texture2D(tDiffuse, vUv);
    vec3 color = texel.rgb;

    color = adjustBrightness(color, brightness);
    color = adjustContrast(color, contrast);
    color = adjustExposure(color, exposure);
    color = adjustSaturation(color, saturation);

    gl_FragColor = vec4(color, texel.a);
}