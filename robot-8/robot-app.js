'use strict';

// eslint-disable-next-line no-var
var RobotApp = RobotApp || {};

{

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

  const model = new RobotApp.Model(log);
  const controller = new RobotApp.Controller(model, log);
  new RobotApp.View(model, controller, log);
  model.initialize(level);

}
