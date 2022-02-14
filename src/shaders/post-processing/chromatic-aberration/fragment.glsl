uniform sampler2D tDiffuse;
uniform float redOffset;
uniform float greenOffset;
uniform float blueOffset;
uniform vec2 direction;

varying vec2 vUv;

void main () {
    vec3 color;
    color.r = texture2D(tDiffuse, vUv + ((direction - vUv) * vec2(redOffset  ))).r;
    color.g = texture2D(tDiffuse, vUv + ((direction - vUv) * vec2(greenOffset))).g;
    color.b = texture2D(tDiffuse, vUv + ((direction - vUv) * vec2(blueOffset ))).b;

    gl_FragColor = vec4(color, 1.0);
}