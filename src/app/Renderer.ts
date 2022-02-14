import * as THREE from 'three';

export class Renderer {
    private renderer: THREE.WebGLRenderer;

    constructor () {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this.renderer.setClearColor('#111111');
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // this.renderer.physicallyCorrectLights = true;
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.shadowMap.enabled = false;

        document.body.appendChild(this.renderer.domElement);
    }

    public get (): THREE.WebGLRenderer {
        return this.renderer;
    }

    public resize (): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
