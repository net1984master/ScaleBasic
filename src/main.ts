import Phaser from 'phaser';

import ScaleScene from './scenes/ScaleScene';
import ScaleModes = Phaser.Scale.ScaleModes;

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	// width: 800,
	// height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scale: {
		mode: ScaleModes.RESIZE,
	},
	scene: [ScaleScene],
}

export default new Phaser.Game(config)
