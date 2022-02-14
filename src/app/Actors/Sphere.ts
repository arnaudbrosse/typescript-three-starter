import * as THREE from 'three';

import { Actor } from './Actor';
import { SphereMaterial } from '../Materials/SphereMaterial';

export class Sphere extends Actor {
    private mesh: THREE.Mesh;

    constructor () {
        super();

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new SphereMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.add(this.mesh);
    }

    public tick (_dt: number): void {}
}
