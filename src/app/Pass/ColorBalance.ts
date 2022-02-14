import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import { Pass } from './Pass';

import fragmentShader from '../../shaders/post-processing/color-balance/fragment.glsl';
import vertexShader from '../../shaders/post-processing/color-balance/vertex.glsl';

export class ColorBalance extends Pass {
    private colorBalancePass: ShaderPass;

    constructor (composer: EffectComposer, pane: FolderApi) {
        super();

        const colorBalancePass = {
            uniforms: {
                tDiffuse: { value: null },
                brightness: { value: 0.0 },
                contrast: { value: 0.0 },
                exposure: { value: 0.0 },
                saturation: { value: 0.0 }
            },
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
        };

        this.colorBalancePass = new ShaderPass(colorBalancePass);
        this.colorBalancePass.enabled = false;
        composer.addPass(this.colorBalancePass);

        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Color Balance'
        });

        folder.addInput(this.colorBalancePass, 'enabled', { });
        folder.addInput(this.colorBalancePass.material.uniforms.brightness, 'value', { label: 'brightness', min: -1, max: 1 });
        folder.addInput(this.colorBalancePass.material.uniforms.contrast, 'value', { label: 'contrast', min: -1, max: 1 });
        folder.addInput(this.colorBalancePass.material.uniforms.exposure, 'value', { label: 'exposure', min: -1, max: 1 });
        folder.addInput(this.colorBalancePass.material.uniforms.saturation, 'value', { label: 'saturation', min: -1, max: 1 });
    }

    public tick (_dt: number): void {}

    public resize (): void {}
}
