import * as THREE from 'three';
import { Pane } from 'tweakpane';

import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { PostProcessing } from './PostProcessing';
import { Physic } from './Physic';
import { Resources } from './Resources';
import { Actor } from './Actors/Actor';
import { Sphere } from './Actors/Sphere';
import { Debugger } from './Debugger';

export default class App {
    private scene: THREE.Scene;
    private renderer: Renderer;
    private camera: Camera;
    private postProcessing: PostProcessing;
    private physic: Physic;
    private resources: Resources;
    private lights: Array<THREE.Light>;
    private actors: Array<Actor>;
    private clock: THREE.Clock;
    private pane: Pane;
    private debugger: Debugger;

    constructor () {
        this.pane = new Pane();
        this.scene = new THREE.Scene();
        this.renderer = new Renderer();
        this.camera = new Camera(this.renderer.get());
        this.postProcessing = new PostProcessing(this.renderer.get(), this.scene, this.camera.get(), this.pane);
        this.physic = new Physic();
        this.resources = new Resources(this.renderer.get());
        this.lights = new Array<THREE.Light>();
        this.actors = new Array<Actor>();
        this.clock = new THREE.Clock();

        this.tick();

        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);

        this.resources.on('progress', (progress) => {
            console.log(progress * 100 + '%');
        });
        this.resources.on('ready', () => {
            this.setLights();
            this.setActors();

            this.debugger = new Debugger(this.scene, this.pane, {
                world: this.physic.get(),
                lights: this.lights,
                actors: this.actors
            });
        });
    }

    private setLights (): void {
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(-3, 3, 3);
        directionalLight.castShadow = true;
        this.lights.push(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x222222);
        this.lights.push(ambientLight);

        this.lights.forEach(light => this.scene.add(light));
    }

    private setActors (): void {
        this.actors.push(new Sphere());

        this.actors.forEach(actor => this.scene.add(actor));
    }

    private tick (): void {
        let dt = this.clock.getDelta();
        dt = Math.min(dt, 1 / 20);

        this.camera.tick();
        this.postProcessing.tick(dt);
        this.physic.tick(dt);
        this.debugger?.tick();

        this.actors.forEach(actor => actor.tick(dt));

        requestAnimationFrame(() => {
            this.tick();
        });
    }

    private resize (): void {
        this.renderer.resize();
        this.camera.resize();
        this.postProcessing.resize();
    }
}
