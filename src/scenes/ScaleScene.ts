import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
// @ts-ignore
import {app} from '../lib/appScale.js';

export default class ScaleScene extends Phaser.Scene{

    imageList:any[]=[];

    constructor() {
        super(SceneKeys.ScaleScene);
    }

    preload() {
        this.load.image(TextureKeys.bg,`assets/${TextureKeys.bg}`);
        this.load.image(TextureKeys.logo,`assets/${TextureKeys.logo}`);
        this.load.image(TextureKeys.logoPhaser,`assets/${TextureKeys.logoPhaser}`);
    }

    create() {
        let scaleLogo = 1;

        // Background
        // Stretch
        // let bg = this.add.image(window.innerWidth / 2, window.innerHeight / 2, TextureKeys.bg);
        // bg.update = function () {
        //     this.displayWidth = app.width;
        //     this.displayHeight = app.height;
        // }

        //Proportion
        let bg = this.add.image(window.innerWidth / 2, window.innerHeight / 2, TextureKeys.bg)
        // @ts-ignore
        bg.orgWidth = bg.displayWidth
        // @ts-ignore
        bg.orgHeight = bg.displayHeight
        bg.update = function () {
            // @ts-ignore
            if (app.width * this.orgHeight/this.orgWidth < app.height){
                // @ts-ignore
                this.displayWidth = app.height * this.orgWidth/this.orgHeight
                this.displayHeight = app.height
            }else{
                this.displayWidth = app.width
                // @ts-ignore
                this.displayHeight = app.width * this.orgHeight/this.orgWidth
            }
        }

        let logoCenter = this.add.image(window.innerWidth / 2, window.innerHeight / 2,TextureKeys.logo).setScale(scaleLogo);
        let logoPhaser = this.add.image(window.innerWidth / 2, window.innerHeight / 2 + window.innerHeight / 4, TextureKeys.logoPhaser)
            .setScale(scaleLogo)
            .setInteractive()
        logoPhaser.on('pointerup', () => {
            console.log(this);
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
            this.cameraUpdate();
        });
        logoPhaser.update = function () {
            this.setPosition(app.centerX,app.centerY + app.height / 4);
        }

        // LogoLeftTop -----------------------------------------------------------------------------------------------
        let logoLeftTop = this.add.image(0,0,TextureKeys.logo).setOrigin(0,0);
        logoLeftTop.update = function () {
            this.setPosition(app.left, app.top);
        }

        // LogoRightTop -----------------------------------------------------------------------------------------------
        let logoRightTop = this.add.image(0,0,TextureKeys.logo).setOrigin(1,0);
        logoRightTop.update = function () {
            this.setPosition(app.right, app.top);
        }


        // LogoLeftBottom -----------------------------------------------------------------------------------------------
        let logoLeftBottom = this.add.image(0,0,TextureKeys.logo).setOrigin(0,1);
        logoLeftBottom.update = function () {
            this.setPosition(app.left, app.bottom);
        }

        // LogoRightBottom -----------------------------------------------------------------------------------------------
        let logoRightBottom = this.add.image(0,0,TextureKeys.logo).setOrigin(1,1);
        logoRightBottom.update = function () {
            this.setPosition(app.right, app.bottom);
        }

        // text ----------------------------------------------------------------------------------------------------------
        var style = {font: ' 150px Dimbo', fill: "#ffeeff"}
        let text = this.add.text(app.centerX, app.centerY - 200, 'Hello', style).setOrigin(0.5);
        text.update = function () {
            this.text = window.innerWidth + ' ' + window.innerHeight;
        }

        //-------------------------------------------
        this.imageList.push(bg, logoCenter, logoPhaser, logoLeftTop, logoRightTop, logoLeftBottom, logoRightBottom, text);
        this.imageList.forEach(img =>{
            img.update();
        });
        this.scale.on('resize',this.resize, this);

        this.cameraUpdate();
        this.resize();
    }

    cameraUpdate() {
        console.log('CUPDATE');
        app.update();
        const camera = this.cameras.main;
        camera.setZoom(app.zoom);
        camera.centerOn(app.centerX, app.centerY);
    }
    resize() {
        this.cameraUpdate();
        this.imageList.forEach(img => img.update());
    }
}
