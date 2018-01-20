# Timed Sequence

```js
/**
 * Executes an list of robot commands with delays in between
 * @param {string[]} commands
 */
executeTimedSequence(commands) {
  if (commands.length === 0) {
    return;
  }

  const [first, ...rest] = commands;
  this.execute({ type: first });

  if (rest.length > 0) {
    const intervalID = setInterval(() => {
      const command = rest.shift();
      this.execute({ type: command });
      if (rest.length === 0) {
        clearInterval(intervalID);
      }
    }, 750);
  }
}
```