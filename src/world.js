var { tiles } = require('./tiles.js');

var HEIGHT = 50,
    WIDTH = 50;

var genWorld = function () {
  var world = [];
  var beach = 10;
  var forest = 35;
  var type;

  for (var y = 0; y < HEIGHT; y++) {
    world[y] = [];

    for (var x = 0; x < WIDTH; x++) {
      if (x < beach) {
        type = 'ocean';
      } else if (x < forest) {
        type = 'plain';
      } else {
        type = 'forest';
      }

      world[y][x] = [{ y, x, type }];
    }
  }

  return world;
};

var world = genWorld();

var resources = {
  gold: 250,
  fish: 0
};

var buildings = [
  { y: 13, x: 10, type: 'fishery' },
  { y: 14, x: 10, type: 'fishery' },
  { y: 15, x: 10, type: 'fishery' },
];

buildings.map(function (bldg) {
  world[bldg.y][bldg.x].push(bldg);
});


var view = {
  selected: null,
  highlighted: null,
};

module.exports = {
  world: world,
  buildings: buildings,
  resources: resources,
  view: view,
};
