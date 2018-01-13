'use strict';
/* global RobotModel, RobotView, RobotController */

(() => {

  const LOGGING_ENABLED = true;

  function log(...args) {
    if (LOGGING_ENABLED) {
      console.log(new Date().toLocaleTimeString(), ...args);
    }
  }

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

  const model = new RobotModel(log);
  const controller = new RobotController(model, log);
  new RobotView(model, controller, log);
  model.initialize(level);

})();
