import React, { memo } from 'react';
import { render } from 'react-dom';
import { Application } from 'pixi.js';
import './index.scss';

import { SCREEN_RESOLUTION } from './constants/settings';
import Game from './game';

function init(view: HTMLCanvasElement) {
  return Game(new Application({ view, ...SCREEN_RESOLUTION.SVGA }));
}

const App = memo(() => <canvas ref={init} />);

function main() {
  render(<App />, document.getElementById('root'));
}

main();
