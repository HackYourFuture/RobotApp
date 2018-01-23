/* eslint-disable no-unused-vars, no-var */
'use strict';

var RobotApp = RobotApp || {};

{
  function render() {
    const root = document.getElementById('root');
    renderTitle(root);
    const form = renderForm(root);
    renderTextArea(form);
    renderSubmitButton(form);
  }

  function renderTitle(root) {
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Paste your JSON here:';
    h2.classList.add('json-title');
    root.appendChild(h2);
  }

  function renderForm(root) {
    const form = document.createElement('form');
    root.appendChild(form);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const jsonData = form['json-data'].value.trim();
      if (jsonData) {
        executeJSON(form['json-data'].value);
      }
    });
    return form;
  }

  function renderTextArea(form) {
    const textArea = document.createElement('textarea');
    textArea.classList.add('json-input');
    textArea.setAttribute('type', 'submit');
    textArea.setAttribute('name', 'json-data');
    form.appendChild(textArea);
  }

  function renderSubmitButton(form) {
    const submitButton = document.createElement('button');
    form.appendChild(submitButton);
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('submit-btn');
    submitButton.innerHTML = 'SUBMIT';
  }

  // Modify this function for the various types of JSON data
  function executeJSON(jsonData) {
    const parsedJSON = JSON.parse(jsonData);
    const sequence = parsedJSON.commands.map((command) => {
      return command.toUpperCase();
    });
    RobotApp.executeSequence(sequence);
  }

  render();
}
