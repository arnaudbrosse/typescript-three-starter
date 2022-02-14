import * as THREE from 'three';
import { FolderApi } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import { Pass } from './Pass';

import fragmentShader from '../../shaders/post-processing/chromatic-aberration/fragment.glsl';
import vertexShader from '../../shaders/post-processing/chromatic-aberration/vertex.glsl';

export class ChromaticAberration extends Pass {
    private caPass: ShaderPass;

    constructor (composer: EffectComposer, pane: FolderApi) {
        super();

        const caPass = {
            uniforms: {
                tDiffuse: { type: 't', value: null },
                redOffset: { type: 'f', value: 0.009 },
                greenOffset: { type: 'f', value: 0.006 },
                blueOffset: { type: 'f', value: -0.006 },
                direction: { type: 'f2', value: new THREE.Vector2(0.5, 0.5) }
            },
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
        };

        this.caPass = new ShaderPass(caPass);
        this.caPass.enabled = false;
        composer.addPass(this.caPass);

        this.initPane(pane);
    }

    private initPane (pane: FolderApi): void {
        const folder = pane.addFolder({
            title: 'Chromatic Aberration'
        });

        folder.addInput(this.caPass, 'enabled', { });
        folder.addInput(this.caPass.material.uniforms.redOffset, 'value', { label: 'redOffset', min: -1, max: 1 });
        folder.addInput(this.caPass.material.uniforms.greenOffset, 'value', { label: 'greenOffset', min: -1, max: 1 });
        folder.addInput(this.caPass.material.uniforms.blueOffset, 'value', { label: 'blueOffset', min: -1, max: 1 });
        folder.addInput(this.caPass.material.uniforms.direction, 'value', { label: 'direction' });
    }

    public tick (_dt: number): void {}

    public resize (): void {}
}
