import * as THREE from 'three';
import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { Pass } from './Pass';

export class Bloom extends Pass {
    private bloomPass: UnrealBloomPass;

    constructor (composer: EffectComposer, pane: FolderApi) {
        super();

        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.5, 0.2);
        composer.addPass(this.bloomPass);

        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Bloom'
        });

        folder.addInput(this.bloomPass, 'enabled', { });
        folder.addInput(this.bloomPass, 'strength', { min: 0, max: 1 });
        folder.addInput(this.bloomPass, 'radius', { min: 0, max: 1 });
        folder.addInput(this.bloomPass, 'threshold', { min: 0, max: 1 });
    }

    public tick (_dt: number): void {}

    public resize (): void {}
}
