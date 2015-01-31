var React = require('react/addons'),
    cx = React.addons.classSet,
    { PropTypes } = React,
    { Cursor, ImmutableOptimizations } = require('react-cursor');

var Cell = React.createClass({
  mixins: [ImmutableOptimizations(['cell', 'view'])],

  propTypes: {
    cell: PropTypes.instanceOf(Cursor).isRequired,
    view: PropTypes.instanceOf(Cursor).isRequired,
  },

  highlightTile() {
    this.props.view.refine('highlighted').set(this.getLastTile());
  },

  selectTile() {
    this.props.view.refine('selected').set(this.getLastTile());
  },

  getLastTile() {
    return this.props.cell.refine(this.props.cell.value.length - 1).value;
  },

  render() {
    var tiles = this.props.cell.value.map((tile, i) => {
      var classes = cx({
        'tile': true,
        [tile.type]: true,
        'highlighted': this.props.view.refine('highlighted').value === this.getLastTile(),
        'selected': this.props.view.refine('selected').value === this.getLastTile(),
      });

      return (
        <div
          key={i}
          className={classes}
          onMouseEnter={this.highlightTile}
          onClick={this.selectTile} />
      );
    });

    return (
      <div
        className="cell"
        children={tiles} />
    );
  },
})

var Row = React.createClass({
  mixins: [ImmutableOptimizations(['row', 'view'])],

  propTypes: {
    row: PropTypes.instanceOf(Cursor).isRequired,
    view: PropTypes.instanceOf(Cursor).isRequired,
  },

  render() {
    var cells = this.props.row.value.map((_, i) => {
      return (
        <Cell
          cell={this.props.row.refine(i)}
          view={this.props.view}
          key={i} />
      );
    });

    return (
      <div children={cells} />
    );
  },
});

var Game = React.createClass({
  propTypes: {
    world: PropTypes.array.isRequired,
    view: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    buildings: PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return this.props; // top level - might be ok?
  },

  render() {
    var cursor = Cursor.build(this),
        world = cursor.refine('world'),
        view = cursor.refine('view'),
        rows = world.value.map((_, i) => {
      return (
        <Row
          row={world.refine(i)}
          view={view}
          key={i} />
      );
    });

    return (
      <div
        id="map"
        children={rows} />
    );
  },
});

module.exports = Game;
