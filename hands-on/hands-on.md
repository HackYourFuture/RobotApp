# Hands-on

In this hands-on we will develop some functions that are related to the RobotApp application. For now, we will write these functions in separate files and use Node to run our code. At a later point (not today) we will integrate the new functions into the RobotApp code.

The functionality that we are going to develop is an ability for the robot to execute a sequence of commands that we supply in a string array. We will add an `execute()` function that understands these commands: `'TURN-lEFT'`, `'TURN-RIGHT'` and `'MOVE'`.

Next we will add an `executeSequence()` function that takes an array of robot commands and will call `execute()` for each command in the array.

The actual commands that we provide however, come in different forms and shapes. For instance, some commands are given in French and it is our job to create a function that converts the French commands into the standard English commands that our robot understands.

We will write two versions of our conversion functions: one using loops and another using `map` and `filter`.

We will be using pair programming for this hands-on.

## Pair Programming

Watch this video (thanks Mauro for first pointing me to this).

[![Spooning by Bitbucket](https://img.youtube.com/vi/dYBjVTMUQY0/0.jpg)](https://youtu.be/dYBjVTMUQY0)

## Preparations

We will use the `hyf-javascript2` repo for this.

1. Team up with a classmate for pair programming. If necessary, you can start a private conversation in slack with your partner to exchange code snippets using copy & paste.
2. Open the `hyf-javascript2` folder in VSCode.
3. Add a new folder `hands-on` at the same level as `week1` and `week2`.
4. Create two empty files, `loops.js` and `map-filter.js` in the `hands-on folder`.
5. Copy the contents of the file `hands-on.js` from this Gist to both `loops.js` and `map-filter.js`.

## Teacher Presentation

- Explain structure of `hands-on.js`
- Explain the `isEqual`() function to compare arrays

## Exercises - loops

We will start with modifying the `loops.js` file. Complete the exercises below using loops where needed.

### Exercise 1 - execute function

Complete the `execute` function.

```js
/**
 *
 * @param {string} command - A command: 'TURN-LEFT', 'TURN-RIGHT' or 'MOVE'
 */
function execute(command) {
  // Add your code here to : use a switch statement
  // Call the 'turn()' or 'move()' function depending on the command
}
```

This function expects a string argument. Valid values (case-sensitive) for the string argument are:

- `'TURN-LEFT'`
- `'TURN-RIGHT'`
- `'MOVE'`

The `execute` function should call the `turn()` or `move()` function, depending on the value of the argument. Use a `switch` statement for this. Use `console.log` to print an error message if the argument is invalid.

Test your function by calling it with valid and invalid input.

### Exercise 2 - executeSequence function

Complete the `executeSequence` function.

```js
function executeSequence(commands) {
  console.log('\n--- starting execution ---');
  // Add your code here to: use a for loop or a forEach method
  // Call the 'execute()' function for each command
}
```

This function takes a string array of valid robot commands and calls `execute()` for each command.

### Exercise 3 - convertEnglish function

Complete the `convertEnglish` function. This function should be called with the `englishCommands` array as its argument and return an array with standard robot commands.

```js
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

// ...

/**
 * Convert English commands
 * @param {*} commands - Command data to convert: use enlishCommands
 */
function convertEnglish(commands) {
  // Add your code here
}
```

Test the `convertEnglish` function with this code (near the bottom of the file):

```js
const actual = convertEnglish(englishCommands);

console.log('\n--- testing ---');
if (isEqual(actual, expected)) {
  console.log('>>> test was successful');
  executeSequence(actual);
} else {
  console.error('>>> test failed');
}
```

### Remaining exercises - more conversions

Complete and test the remaining conversion functions similar to what was done in Exercise 3.

## Exercises - map, filter & fat arrow function

We will now modify the `map-filter.js` file. Copy & paste the functions `execute` and `executeSequence` that you completed earlier from the `loops.js` file to the `map-filter.js` file. These functions remain the same.

Now, repeat the exercises using `map`, `filter` and fat arrow functions where possible.

Have fun pair programming!

