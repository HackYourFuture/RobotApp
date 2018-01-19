/* spell-checker: disable */
/* eslint-disable no-unused-vars */

'use strict';
{
  const expectedCommands = [
    'MOVE',
    'TURN-RIGHT',
    'MOVE',
    'MOVE',
    'MOVE',
    'TURN-LEFT',
    'MOVE',
    'MOVE'
  ];

  const englishCommands = [
    'move',
    'turn-right',
    'move',
    'move',
    'move',
    'turn-left',
    'move',
    'move'
  ];

  const frenchCommands = {
    data: [
      'marche',
      'à droit',
      'marche',
      'marche',
      'marche',
      'à gauche',
      'marche',
      'marche'
    ],
    translations: {
      'marche': 'move',
      'à droit': 'turn-right',
      'à gauche': 'turn-left'
    }
  };

  const chattyFrenchCommands = {
    data: [
      's\'il vous plaît',
      'marche',
      'puis',
      'à droit',
      'marche',
      'marche',
      'encore',
      'marche',
      'à gauche',
      'marche',
      'encore',
      'marche'
    ],
    translations: {
      'marche': 'move',
      'à droit': 'turn-right',
      'à gauche': 'turn-left',
      's\'il vous plaît': 'please',
      'puis': 'then'
    }
  };

  const actionCommands = [
    { type: 'MOVE' },
    { type: 'TURN-RIGHT' },
    { type: 'MOVE', times: 3 },
    { type: 'TURN-LEFT' },
    { type: 'MOVE', times: 2 }
  ];

  const shorthandCommands = 'MR3ML2M';

  const verbalCommands = [
    'Move and turn-right, then move, move and move again.',
    'Next turn-left.',
    'Finally move and move for a second time.',
    'You have reached your destination.'
  ];

  function conversionTest(converter) {
    const actualCommands = converter();
    let success = true;
    if (actualCommands.length !== expectedCommands.length) {
      console.log(`expected length: ${expectedCommands.length}, actual length: ${actualCommands.length}`);
      success = false;
    } else {
      for (let i = 0; i < expectedCommands.length; i++) {
        if (actualCommands[i] !== expectedCommands[i]) {
          console.log(`expected: ${expectedCommands[i]}, actual: ${actualCommands[i]}`);
          success = false;
        }
      }
    }
    if (success) {
      console.log('test was successful');
    } else {
      console.log('test failed');
    }
  }

  function convertEnglish() {
    return englishCommands.map((command) => {
      return command.toUpperCase();
    });
  }

  function convertFrench() {

  }

  function convertChattyFrench() {

  }

  function convertActions() {

  }

  function convertShorthand() {

  }

  function convertVerbal() {

  }

  conversionTest(convertEnglish);

}
