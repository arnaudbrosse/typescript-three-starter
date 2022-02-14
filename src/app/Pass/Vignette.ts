import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import { Pass } from './Pass';

import fragmentShader from '../../shaders/post-processing/vignette/fragment.glsl';
import vertexShader from '../../shaders/post-processing/vignette/vertex.glsl';

export class Vignette extends Pass {
    private vignettePass: ShaderPass;

    constructor (composer: EffectComposer, pane: FolderApi) {
        super();

        const vignettePass = {
            uniforms: {
                tDiffuse: { type: 't', value: null },
                offset: { type: 'f', value: 1.0 },
                darkness: { type: 'f', value: 1.0 }
            },
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
        };

        this.vignettePass = new ShaderPass(vignettePass);
        this.vignettePass.enabled = false;
        composer.addPass(this.vignettePass);

        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Vignette'
        });

        folder.addInput(this.vignettePass, 'enabled', { });
        folder.addInput(this.vignettePass.material.uniforms.offset, 'value', { label: 'offset', min: 0, max: 2 });
        folder.addInput(this.vignettePass.material.uniforms.darkness, 'value', { label: 'darkness', min: 0, max: 2 });
    }

    public tick (_dt: number): void {}

    public resize (): void {}
}
