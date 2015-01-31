'use strict';

var React = require('react/addons'),
    Game = require('./game'),
    state = require('./world');

React.render(
  <Game {...state} />,
  document.getElementById('game')
);
