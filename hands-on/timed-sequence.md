# Timed Sequence

```js
/**
 * Executes a list of robot commands with delays in between
 * @param {string[]} commands
 */
executeTimedSequence(commands) {
  if (commands.length === 0) {
    return;
  }

  const queue = commands.slice();

  const intervalID = setInterval(() => {
    const command = queue.shift();
    execute(command);
    if (queue.length === 0) {
      clearInterval(intervalID);
    }
  }, 750);
}
```