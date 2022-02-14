import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Pane } from 'tweakpane';

import { Actor } from './Actors/Actor';

class FpsStats {
    private beginTime: number;
    private prevTime: number;
    private frames: number;
    public fps: number;

    constructor () {
        this.beginTime = (performance || Date).now();
        this.prevTime = this.beginTime;
        this.frames = 0;
        this.fps = 0;
    }

    public tick (): void {
        this.frames++;
        const time = (performance || Date).now();
        if (time >= this.prevTime + 1000) {
            this.prevTime = time;
            this.fps = this.frames;
            this.frames = 0;
        }
        this.beginTime = time;
    }
}

interface DebuggerParameters {
    axes: boolean,
    grid: boolean,
    physics: boolean,
    actorBoxes: boolean,
    lightBoxes: boolean,
}

interface DebuggerValues {
    world?: CANNON.World,
    lights?: Array<THREE.Light>,
    actors?: Array<Actor>
}

export class Debugger {
    private scene: THREE.Scene;
    private parameters: DebuggerParameters;
    private values: DebuggerValues;
    private fpsStats: FpsStats;
    private axesHelper: THREE.AxesHelper;
    private gridHelper: THREE.GridHelper;
    private lightHelpers: (THREE.DirectionalLightHelper | THREE.SpotLightHelper | THREE.HemisphereLightHelper | THREE.PointLightHelper)[];
    private actorHelpers: THREE.BoxHelper[];

    constructor (scene: THREE.Scene, pane: Pane, values: DebuggerValues) {
        this.scene = scene;

        this.parameters = {
            axes: true,
            grid: true,
            physics: false,
            actorBoxes: true,
            lightBoxes: true
        };
        this.values = values;

        // Fps
        this.fpsStats = new FpsStats();

        // Axes
        this.axesHelper = new THREE.AxesHelper();
        this.axesHelper.visible = this.parameters.axes;
        this.scene.add(this.axesHelper);

        // Grid
        this.gridHelper = new THREE.GridHelper(50, 100);
        this.gridHelper.visible = this.parameters.grid;
        this.scene.add(this.gridHelper);

        // Actors
        this.actorHelpers = [];
        this.values.actors?.forEach(actor => {
            const boxHelper = new THREE.BoxHelper(actor);
            boxHelper.visible = this.parameters.actorBoxes;
            this.actorHelpers.push(boxHelper);
            this.scene.add(boxHelper);
        });

        // Lights
        this.lightHelpers = [];
        this.values.lights?.forEach(light => {
            let lightHelper;
            if (light instanceof THREE.DirectionalLight) {
                lightHelper = new THREE.DirectionalLightHelper(light, 1);
            } else if (light instanceof THREE.SpotLight) {
                lightHelper = new THREE.SpotLightHelper(light, 1);
            } else if (light instanceof THREE.HemisphereLight) {
                lightHelper = new THREE.HemisphereLightHelper(light, 1);
            } else if (light instanceof THREE.PointLight) {
                lightHelper = new THREE.PointLightHelper(light, 1);
            }
            if (lightHelper !== undefined) {
                lightHelper.visible = this.parameters.actorBoxes;
                this.lightHelpers.push(lightHelper);
                this.scene.add(lightHelper);
            }
        });

        this.initPane(pane);
    }

    private initPane (pane: Pane): void {
        const statsFolder = pane.addFolder({
            title: 'Stats'
        });

        statsFolder.addMonitor(this.fpsStats, 'fps', { });
        statsFolder.addMonitor(this.fpsStats, 'fps', { view: 'graph', label: 'graph', min: 0, max: 145 });

        const folder = pane.addFolder({
            title: 'Debugger'
        });
        folder.addInput(this.parameters, 'axes', { }).on('change', () => { this.axesHelper.visible = this.parameters.axes; });
        folder.addInput(this.parameters, 'grid', { }).on('change', () => { this.gridHelper.visible = this.parameters.grid; });
        if (this.values.actors) {
            folder.addInput(this.parameters, 'actorBoxes', { }).on('change', () => { this.actorHelpers.forEach(helper => { helper.visible = this.parameters.actorBoxes; }); });
        }
        if (this.values.lights) {
            folder.addInput(this.parameters, 'lightBoxes', { }).on('change', () => { this.lightHelpers.forEach(helper => { helper.visible = this.parameters.lightBoxes; }); });
        }
    }

    public tick (): void {
        this.fpsStats.tick();
        this.actorHelpers.forEach(actorHelper => actorHelper.update());
        this.lightHelpers.forEach(lightHelper => lightHelper.update());
    }
}
