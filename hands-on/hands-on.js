/* spell-checker: disable */
'use strict';
/* eslint-disable no-unused-vars */

// 1. Create two empty .js files, named 'loops.js' and
//    'array-manipulations.js'
// 2. Copy and paste the contents shown here into both files.
{
  const expected = [
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

  const frenchCommands = [
    'marche',
    'à droit',
    'marche',
    'marche',
    'marche',
    'à gauche',
    'marche',
    'marche'
  ];

  const chattyFrenchCommands = [
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
  ];

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

  /**
   * Test the actual output of a converter against the expected output
   * @param {string[]} actual - The actual produced command array
   * @param {string[]} expected - The expected command array
   */
  function isEqual(actual, expected) {
    console.log('\n--- testing ---');
    // Assume succes (i.e., arrays are equak)
    let success = true;
    // Ensure that 'actual' and 'expected' arguments are both arrays
    // and of equal length
    if (!Array.isArray(actual)) {
      console.log('ERROR: \'actual\' is not an array');
      success = false;
    } else if (!Array.isArray(expected)) {
      console.log('ERROR: \'expected\' is not an array');
      success = false;
    } else if (actual.length !== expected.length) {
      console.log(`ERROR: expected length: ${expected.length}, actual length: ${actual.length}`);
      success = false;
    } else {
      // Compare each element of the arrays
      for (let i = 0; i < expected.length; i++) {
        if (actual[i] !== expected[i]) {
          console.log(`ERROR: expected: ${expected[i]}, actual: ${actual[i]}`);
          success = false;
        }
      }
    }
    if (success) {
      console.log('>>> test was successful');
    } else {
      console.log('>>> test failed');
    }
    return success;
  }

  /**
   * Simulates the robot 'turn' function
   * @param {string} turnDirection - The direction to turn to: 'left' or 'right'
   */
  function turn(turnDirection) {
    console.log('TURN ' + turnDirection);
  }

  /**
   * Simulates the robot 'move' function
   */
  function move() {
    console.log('MOVE');
  }

  /**
   *
   * @param {string} command - A command: 'TURN-LEFT', 'TURN-RIGHT' or 'MOVE'
   */
  function execute(command) {
    // Add your code here to : use a switch statement
    // Call the 'turn()' or 'move()' function depending on the command
  }

  /**
   * Execute a sequence of robot commands
   * @param {string[]} commands - The robot commands to execute
   */
  function executeSequence(commands) {
    console.log('\n--- starting execution ---');
    // Add your code here to: use a for loop or a forEach method
    // Call the 'execute()' function for each command
  }

  /**
   * Convert English commands
   * @param {*} commands - Command data to convert: use enlishCommanfs
   */
  function convertEnglish(commands) {
    // Add your code here
  }

  /**
   * Convert frenchCommands array
   * @param {*} commands - Command data to convert: use frenchCommands
   */
  function convertFrench() {
    console.log('convertFrench');
    // French -> English
    // marche -> move
    // à droit -> turn-right
    // à gauche -> turn-left
    // Add your code here
    // Use a switch statement to do the translations
  }

  /**
   * Convert chattyFrenchCommands array
   * @param {*} commands - Command data to convert: use chattyFrenchCommands
   */
  function convertChattyFrench(commands) {
    // French -> English
    // marche -> move
    // à droit -> turn-right
    // à gauche -> turn-left
    // s'il vous plaît -> please
    // puis -> then
    // Add your code here
    // Define an object with the translation mappings
    // Use a loop or '.map()' and '.filter()' methods to do
    // the conversions
  }

  /**
   * Convert actionCommands array
   * @param {*} commands - Command data to convert: use actionCommands
   */
  function convertActions(commands) {
    // Add your code here
  }

  /**
   * Convert shorthandCommands string
   * @param {*} commands - Command data to convert: use shorthandCommands
   */
  function convertShorthand(commands) {
    // Add your code here
  }

  /**
   * Convert verbalCommands array
   * @param {*} commands - Command data to convert: use verbalCommands
   */
  function convertVerbal(commands) {
    // Add your code here
  }

  const sampleCommands = [
    'MOVE',
    'TURN-RIGHT',
    'MOVE',
    'MOVE',
    'MOVE',
    'TURN-LEFT',
    'MOVE',
    'MOVE'
  ];

  /**
   * Test your converters here
   */
  const actual = sampleCommands;
  if (isEqual(actual, expected)) {
    executeSequence(actual);
  }

}
