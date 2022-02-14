import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { Pane } from 'tweakpane';

import { Pass } from './Pass/Pass';
import { Grain } from './Pass/Grain';
import { Sharpen } from './Pass/Sharpen';
import { ChromaticAberration } from './Pass/ChromaticAberration';
import { Vignette } from './Pass/Vignette';
import { Bloom } from './Pass/Bloom';
import { ColorBalance } from './Pass/ColorBalance';
import { Fxaa } from './Pass/Fxaa';

export class PostProcessing {
    private composer: EffectComposer;
    private passes: Array<Pass>;

    constructor (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, pane: Pane) {
        this.composer = new EffectComposer(renderer);
        this.composer.addPass(new RenderPass(scene, camera));
        this.passes = new Array<Pass>();

        const folder = pane.addFolder({
            title: 'PostProcessing'
        });
        folder.expanded = false;

        this.passes.push(new Grain(this.composer, folder));
        this.passes.push(new Sharpen(this.composer, folder));
        this.passes.push(new ChromaticAberration(this.composer, folder));
        this.passes.push(new Vignette(this.composer, folder));
        this.passes.push(new Bloom(this.composer, folder));
        this.passes.push(new Fxaa(this.composer, renderer, folder));
        this.passes.push(new ColorBalance(this.composer, folder));
    }

    public tick (dt: number): void {
        this.composer.render();
        this.passes.forEach(pass => pass.tick(dt));
    }

    public resize (): void {
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.passes.forEach(pass => pass.resize());
    }
}
