var React = require('react/addons'),
    cx = React.addons.classSet,
    { PropTypes } = React,
    Immutable = require('immutable'),
    Cursor = require('immutable/contrib/cursor');

var Cell = React.createClass({
  highlightTile() {
    this.props.view.highlighted = this.getLastTile();
    this.props.reRender();
  },

  selectTile() {
    this.props.view.selected = this.getLastTile();
    this.props.reRender();
  },

  getLastTile() {
    return this.props.cell[this.props.cell.size - 1];
  },

  render() {
    var tiles = this.props.cell.map((tile, i) => {
      var classes = cx({
        'tile': true,
        [tile.type]: true,
        'highlighted': this.props.view.highlighted === this.getLastTile(),
        'selected': this.props.view.selected === this.getLastTile(),
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
  render() {
    var cells = this.props.row.map((cell, i) => {
      return (
        <Cell
          cell={cell}
          view={this.props.view}
          reRender={this.props.reRender}
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
    return this.props;
  },

  reRender: function () {
    this.forceUpdate();
  },

  render() {
    var rows = this.state.world.map((row, i) => {
      return (
        <Row
          row={row}
          view={this.state.view}
          reRender={this.reRender}
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
