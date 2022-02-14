import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Camera {
    private camera: THREE.PerspectiveCamera;
    private orbitControls: OrbitControls;

    constructor (renderer: THREE.Renderer) {
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(10, 10, 10);

        this.orbitControls = new OrbitControls(this.camera, renderer.domElement);
        // this.orbitControls.enablePan = false;
        // this.orbitControls.enableZoom = false;
        this.orbitControls.target.set(0, 0, 0);
    }

    public get (): THREE.Camera {
        return this.camera;
    }

    public tick (): void {
        this.orbitControls.update();
    }

    public resize (): void {
        if (this.camera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }
}
