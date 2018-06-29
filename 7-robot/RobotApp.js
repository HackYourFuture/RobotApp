'use strict';

{
  const level = {
    board: [
      'TT.F',
      'T...',
      '....',
      'R..W'
    ],
    robot: {
      x: 0,
      y: 0,
      dir: 'up'
    }
  };

  function main() {
    const model = new window.RobotModel();
    const controller = new window.RobotController(model);
    new window.RobotView(model, controller);
    model.initialize(level);
  }

  window.onload = main;
}
