import { Loader } from 'pixi.js';
import ASSETS from './assets.json';

const loader = new Loader();

function load() {
  loader.add(ASSETS);

  return new Promise((res) => loader.load(res));
}

type ResType = 'texture' | 'textures' | 'spritesheet';

function get(type: ResType, name: string) {
  const res = loader.resources[name];

  if (!res) {
    throw new Error(`Resource: ${name} not found...`);
  }

  if (type === 'spritesheet') {
    return res.spritesheet;
  }

  if (type === 'texture') {
    return res.texture;
  }

  if (type === 'textures') {
    return res.textures;
  }
}

export default {
  load,
  get,
};
