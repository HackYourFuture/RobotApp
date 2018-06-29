'use strict';

{
  const LEVELS_URL = 'assets/db.json';

  class Robot {
    constructor() {
      const model = new window.RobotModel();
      const controller = new window.RobotController(model);
      new window.RobotView(model, controller);
      this.loadLevels(model);
    }

    async loadLevels(model) {
      try {
        const res = await Robot.fetchJSON(LEVELS_URL);
        model.storeLevels(res.levels);
      } catch (error) {
        console.error(error);
      }
    }

    static fetchJSON(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
          }
        };
        xhr.onerror = () => reject(new Error('Network request failed'));
        xhr.send();
      });
    }
  }

  window.onload = () => new Robot();
}
