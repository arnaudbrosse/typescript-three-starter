uniform sampler2D tDiffuse;
uniform float width;
uniform float height;
uniform float kernel[9];

varying vec2 vUv;

void main () {
    float step_w = 1.0 / width;
    float step_h = 1.0 / height;

    vec2 offset[9];
    offset[0] = vec2(-step_w, -step_h);
    offset[1] = vec2(0.0, -step_h);
    offset[2] = vec2(step_w, -step_h);
    offset[3] = vec2(-step_w, 0.0);
    offset[4] = vec2(0.0, 0.0);
    offset[5] = vec2(step_w, 0.0);
    offset[6] = vec2(-step_w, step_h);
    offset[7] = vec2(0.0, step_h);
    offset[8] = vec2(step_w, step_h);
    vec3 sum = vec3(0.0);

    for (int i = 0; i < 9; i++) {
        sum += texture2D(tDiffuse, vUv + offset[i]).rgb * kernel[i];
    }

    gl_FragColor = vec4(sum, 1.0);
}