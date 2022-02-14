import * as THREE from 'three';
import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import { Pass } from './Pass';

export class Fxaa extends Pass {
    private renderer: THREE.WebGLRenderer;
    private fxaaPass: ShaderPass;

    constructor (composer: EffectComposer, renderer: THREE.WebGLRenderer, pane: FolderApi) {
        super();

        this.renderer = renderer;

        this.fxaaPass = new ShaderPass(FXAAShader);
        this.fxaaPass.material.uniforms.resolution.value.x = 1 / (window.innerWidth * this.renderer.getPixelRatio());
        this.fxaaPass.material.uniforms.resolution.value.y = 1 / (window.innerHeight * this.renderer.getPixelRatio());
        this.fxaaPass.enabled = false;

        composer.addPass(this.fxaaPass);
        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Fxaa'
        });

        folder.addInput(this.fxaaPass, 'enabled', { });
    }

    public tick (_dt: number): void {}

    public resize (): void {
        this.fxaaPass.material.uniforms.resolution.value.x = 1 / (window.innerWidth * this.renderer.getPixelRatio());
        this.fxaaPass.material.uniforms.resolution.value.y = 1 / (window.innerHeight * this.renderer.getPixelRatio());
    }
}
