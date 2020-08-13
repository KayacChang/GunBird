import RES from '../../resources';
import { AnimatedSprite, Texture, Spritesheet } from 'pixi.js';

function Bullet(textures: Texture[]) {
  const bullet = new AnimatedSprite(textures);

  bullet.scale.set(2);
  bullet.updateAnchor = true;
  bullet.play();
  bullet.position.y = -40;

  return bullet;
}

type MarionBeamType = 'M1' | 'M2' | 'L1' | 'L2' | 'R1' | 'R2';

export function MarionBeam(type: MarionBeamType) {
  const L1 = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;
  const L2 = RES.get('spritesheet', 'MARION_BULLET_02') as Spritesheet;
  const L3 = RES.get('spritesheet', 'MARION_BULLET_03') as Spritesheet;
  const L4 = RES.get('spritesheet', 'MARION_BULLET_04') as Spritesheet;

  switch (type) {
    case 'M1':
      return Bullet(L1.animations['marion_bullet_L1']);
    case 'M2':
      return Bullet(L2.animations['marion_bullet_L2']);
    case 'L1':
      return Bullet(L3.animations['marion_bullet_L_L1']);
    case 'L2':
      return Bullet(L4.animations['marion_bullet_L_L2']);
    case 'R1':
      return Bullet(L3.animations['marion_bullet_R_L1']);
    case 'R2':
      return Bullet(L4.animations['marion_bullet_R_L2']);
  }
}
