<template>
    <div class="background">
        <div id="renderer"></div>
    </div>
</template>

<script>
import * as THREE from 'three';

export default {
    name: 'background',
    components: {
        
    },
    data() {
        return {
            container: null,
            camera: null,
            scene: null,
            renderer: null,
            logo: null,
            startTime: null,
            logoOrigPos: null,
            cameraOrigPos: null,
        };
    },
    methods: {
        onSizeChange() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth/ window.innerHeight;
            this.camera.updateProjectionMatrix();
        },
        goCloseToZero(time, index) {
            const t = time + (index * 0.1);
            return (-1/t);
        },
        animate() {
            requestAnimationFrame(this.animate);
            const delta = Date.now() - this.startTime;
            const elapsedSeconds = delta/1000;
            for(let i = 0; i < this.logo.children.length; i++) {
                this.logo.children[i].position.y = this.goCloseToZero(elapsedSeconds, i);
            }
            this.render();
        },
        mouseMove(event) {
            const {x,y} = {
                x: (1-event.clientX/window.innerWidth) -.5,
                y: (event.clientY/window.innerHeight) -.5,
            };
            const scale = 0.1;
            const offsetScale = 0.01;
            this.camera.position.x = this.cameraOrigPos.x + x * scale;
            this.camera.position.y = this.cameraOrigPos.y + y * scale;
            this.logo.position.x = this.logoOrigPos.x + x * scale - x*offsetScale;
            this.logo.position.y = this.cameraOrigPos.y + y * scale - y * offsetScale;
        },
        render() {
            this.renderer.render(this.scene, this.camera);
        },
        createKalimbaStripe(length) {
            const group = new THREE.Group();
            const material = new THREE.MeshStandardMaterial();
            const circleGeom = new THREE.CircleGeometry(1,25);
            const planeGeom = new THREE.PlaneGeometry();
            const circleTop = new THREE.Mesh(circleGeom, material);
            circleTop.scale.x = 0.1;
            circleTop.scale.y = 0.1;
            circleTop.scale.z = 0.1;
            circleTop.position.y = 2.101;
            const plane = new THREE.Mesh(planeGeom, material);
            plane.position.y = 1.053 - (0.133 * length * 1.14);
            plane.scale.x = 0.2;
            plane.scale.y = 2.12 + (0.3 * length);
            const circleBottom = new THREE.Mesh(circleGeom, material);
            circleBottom.scale.x = 0.1;
            circleBottom.scale.y = 0.1;
            circleBottom.scale.z = 0.1;
            circleBottom.position.y = 0.013 - (0.31 * length);
            group.add(circleTop);
            group.add(plane);
            group.add(circleBottom);
            return group;
        },
        createKalimbaLogo() {
            const group = new THREE.Group();
            const stripe1 = this.createKalimbaStripe(0);
            stripe1.position.x = 0;
            group.add( stripe1 );
            
            const stripe2 = this.createKalimbaStripe(1);
            stripe2.position.x = 0.36;
            group.add( stripe2 );

            const stripe3 = this.createKalimbaStripe(2);
            stripe3.position.x = 0.72;
            group.add( stripe3 );

            const stripe4 = this.createKalimbaStripe(3);
            stripe4.position.x = 1.08;
            group.add( stripe4 );

            const stripe5 = this.createKalimbaStripe(2);
            stripe5.position.x = 1.44;
            group.add( stripe5 );

            const stripe6 = this.createKalimbaStripe(1);
            stripe6.position.x = 1.8;
            group.add( stripe6 );

            const stripe7 = this.createKalimbaStripe(0);
            stripe7.position.x = 2.16;
            group.add( stripe7 );
            return group;
        },
    },
    mounted() {
        this.container = document.querySelector('#renderer');
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });

        this.container.appendChild( this.renderer.domElement );

        this.logo = this.createKalimbaLogo();
        const scale = 0.3;
        this.logo.position.x = -scale-0.024;
        this.logo.scale.set(scale,scale,scale);
        this.scene.add(this.logo);

        const spotLight = new THREE.SpotLight(0xffffff, 1.0, 12.0, 0.334, 1.0, 2.0);

        //move everything down so light shines on it
        this.logo.position.y -= 0.1;
        this.camera.position.y -= 0.1;
        this.logoOrigPos = {
            x: this.logo.position.x,
            y: this.logo.position.y,
        };
        this.cameraOrigPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
        };

        spotLight.position.set(-0.132, 0.458, 2.127);
        this.scene.add(spotLight);

        this.camera.position.z = 1;
        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

        this.startTime = Date.now();

        this.onSizeChange();
        window.addEventListener('resize', this.onSizeChange);
        document.addEventListener('mousemove', this.mouseMove);
        this.animate();
    },
    destroyed() {
        window.removeEventListener('resize', this.onSizeChange);
        document.removeEventListener('mousemove', this.mouseMove);
    }
}
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
  overflow: hidden;
}
</style>