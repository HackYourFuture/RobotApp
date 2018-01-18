/* global RobotApp */

(function () {
  'use strict';

  function renderTextArea() {
    const textArea = document.createElement('textarea');
    textArea.classList.add('json-input');
    textArea.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        executeJSON(textArea);
      }
    });
    textArea.addEventListener('change', () => {
      textArea.classList.remove('json-valid', 'json-error');
    });
    const root = document.getElementById('root');
    root.appendChild(textArea);
  }

  function executeJSON(textArea) {
    try {
      const parsedJSON = JSON.parse(textArea.value);
      textArea.classList.add('json-valid');
      switch (parsedJSON.name) {
        case 'english':
          handleEnglish(parsedJSON);
          break;
        case 'french':
          executeFrench(parsedJSON);
          break;
        case 'chattyFrench':
          handleChattyFrench(parsedJSON);
          break;
        case 'actions':
          handleActions(parsedJSON);
          break;
        case 'shorthand':
          executeShorthand(parsedJSON);
          break;
        case 'verbal':
          handleVerbal(parsedJSON);
          break;
        default:
          console.log('don\'t now how to handle: ' + parsedJSON.name);
      }
    }
    catch (error) {
      textArea.classList.add('json-error');
    }
  }

  function handleEnglish(parsedJSON) {
    const sequence = parsedJSON.data.map((command) => {
      return command.toUpperCase();
    });
    RobotApp.executeSequence(sequence);
  }

  function executeFrench(parsedJSON) {

  }

  function handleChattyFrench(parsedJSON) {

  }

  function handleActions(parsedJSON) {

  }

  function executeShorthand(parsedJSON) {

  }

  function handleVerbal(parsedJSON) {

  }

  renderTextArea();

})();
