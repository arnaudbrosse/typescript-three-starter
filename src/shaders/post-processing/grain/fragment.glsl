uniform sampler2D tDiffuse;
uniform bool animated;
uniform float opacity;
uniform float time;

varying vec2 vUv;

float random(vec2 p) {
    return fract(cos(dot(p, vec2(23.14069263277926, 2.665144142690225))) * 12345.6789);
}

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    vec2 uvRandom = vUv;
    if (animated) {
        uvRandom.y *= random(vec2(uvRandom.y, time));
    }
    else {
        uvRandom.y *= random(vec2(uvRandom.y, 0.0));
    }
    color.rgb += random(uvRandom) * opacity;

    gl_FragColor = vec4(color);
}
