'use strict';
/* global RobotModel, RobotView, RobotController */

(() => {

  const LOGGING_ENABLED = true;
  const LEVELS_URL = 'http://localhost:3000/api/v1/levels';

  function log(...args) {
    if (LOGGING_ENABLED) {
      console.log(new Date().toLocaleTimeString(), ...args);
    }
  }

  // eslint-disable-next-line no-unused-vars
  class RobotApp {

    constructor() {
      const model = new RobotModel(log);
      const controller = new RobotController(model, log);
      new RobotView(model, controller, log);
      this.loadLevels(model);
    }

    loadLevels(model) {
      this.fetchJSON(LEVELS_URL)
      .then(levels => model.storeLevels(levels));
    }

    fetchJSON(url) {
      return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = () => {
          if (http.readyState === 4)
            if (http.status === 200) {
              resolve(JSON.parse(http.response));
            } else {
              reject();
            }
        };
        http.open('GET', url);
        http.send();
      });
    }
  }

  new RobotApp();

})();
