import * as THREE from 'three';

import fragmentShader from '../../shaders/basic/fragment.glsl';
import vertexShader from '../../shaders/basic/vertex.glsl';

export class SphereMaterial extends THREE.ShaderMaterial {
    constructor () {
        super({
            vertexShader,
            fragmentShader,
            uniforms: {}
        });
    }
}
