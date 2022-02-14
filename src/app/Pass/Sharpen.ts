import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import { Pass } from './Pass';

import fragmentShader from '../../shaders/post-processing/sharpen/fragment.glsl';
import vertexShader from '../../shaders/post-processing/sharpen/vertex.glsl';

export class Sharpen extends Pass {
    private sharpenPass: ShaderPass;

    constructor (composer: EffectComposer, pane: FolderApi) {
        super();

        const sharpenPass = {
            uniforms: {
                tDiffuse: { type: 't', value: null },
                width: { type: 'f', value: innerWidth },
                height: { type: 'f', value: innerHeight },
                kernel: { type: 'fv1', value: [-1, -1, -1, -1, 9, -1, -1, -1, -1] }
            },
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
        };

        this.sharpenPass = new ShaderPass(sharpenPass);
        this.sharpenPass.enabled = false;
        this.sharpenPass.material.uniforms.width.value = window.innerWidth;
        this.sharpenPass.material.uniforms.height.value = window.innerHeight;
        composer.addPass(this.sharpenPass);

        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Sharpen'
        });

        folder.addInput(this.sharpenPass, 'enabled', { });
    }

    public tick (_dt: number): void {}

    public resize (): void {
        this.sharpenPass.material.uniforms.width.value = window.innerWidth;
        this.sharpenPass.material.uniforms.height.value = window.innerHeight;
    }
}
