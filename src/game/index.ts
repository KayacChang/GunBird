import { Application, AnimatedSprite, Spritesheet } from 'pixi.js';
import RES from './resource';

export default async function main(app: Application) {
  await RES.load();

  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const marion = new AnimatedSprite(texture.animations['marion']);
  marion.x = app.screen.width / 2;
  marion.y = app.screen.height / 2;
  marion.scale.set(2);
  marion.updateAnchor = true;
  marion.play();
  marion.animationSpeed = 0.2;
  app.stage.addChild(marion);
}
