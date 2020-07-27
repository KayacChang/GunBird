import React, { memo } from 'react';
import { render } from 'react-dom';
import { Application } from 'pixi.js';
import './index.scss';

import { resolution } from './constants/settings';
import Game from './game';

function init(view: HTMLCanvasElement) {
  return Game(new Application({ view, ...resolution('SVGA', 'Portrait') }));
}

const App = memo(() => <canvas ref={init} />);

function main() {
  render(<App />, document.getElementById('root'));
}

main();
