import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import { Pass } from './Pass';

import fragmentShader from '../../shaders/post-processing/grain/fragment.glsl';
import vertexShader from '../../shaders/post-processing/grain/vertex.glsl';

export class Grain extends Pass {
    private grainPass: ShaderPass;

    constructor (composer: EffectComposer, pane: FolderApi) {
        super();

        const grainPass = {
            uniforms: {
                tDiffuse: { type: 't', value: null },
                animated: { type: 'b', value: true },
                opacity: { type: 'f', value: 0.15 },
                time: { type: 'f', value: 0.0 }
            },
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
        };

        this.grainPass = new ShaderPass(grainPass);
        this.grainPass.enabled = false;
        composer.addPass(this.grainPass);

        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Grain'
        });

        folder.addInput(this.grainPass, 'enabled', { });
        folder.addInput(this.grainPass.material.uniforms.animated, 'value', { label: 'animated' });
        folder.addInput(this.grainPass.material.uniforms.opacity, 'value', { label: 'opacity', min: 0, max: 1 });
    }

    public tick (dt: number): void {
        this.grainPass.material.uniforms.time.value += dt;
    }

    public resize (): void {}
}
