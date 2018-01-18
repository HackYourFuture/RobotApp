# RobotApp Project

## Overview

This project is intended for use during the HYF JavaScript 1, 2 and 3 modules, as a vehicle to illustrate the sequence of topics in the curriculum going forward, in the context of an actual non-trivial application. This Single Page Application was inspired by the [RoverJS](http://roverjs.com/) app developed by HYF teacher Joost Lubach.

The main principles of the application are given in this [README](robot-0/README.md).

The application becomes more elaborate as the curriculum lectures advance. It can be presented partly through demonstration and explanation of pre-written code and partly by live-coding.

A format is envisaged where curriculum topics are first discussed in class in a stand-alone fashion and subsequently applied in the application.

Students can be given assignments to enhance aspects of the application as it is being developed, to be submitted via pull requests against this repo.

There are 10 versions of the application, in folders `robot-0` to `robot-8`, and a final version in the folder `public`.

The version in `robot-0` is a console application which could be introduced in the last lecture of JavaScript 1 or the first lecture of JavaScript 2.

Versions `robot-1` to `robot-8` are HTML versions that can be run from the file system.

The final version in the `public` folder uses a back-end server application (in the `server` folder, type `npm start`) that runs on `localhost:3000` and provides a RESTful API for demonstration of XMLHttpRequest and promises. It also acts as a static content server for the front-end.

The following software design patterns and principles are touched upon:

- Separation of Concerns
- MVC pattern
- Observer pattern
- Action pattern
- (Dependency Injection)

Teaching them explicitly in class is optional.

## Application Folders

### robot-0

A console-based version of the Introduction level of RoverJS.

#### Concepts covered

- arrays
- simple objects
- functions
- `for` loops
- `if` statements
- `switch` statements
- ternary operator
- IIFE (scope)


[Description](robot-0/README.md)<br>
[Homework](robot-0/MAKEME.md)

### robot-1

Shows a hard coded rendering of the game board in HTML. This is what needs to be reproduced programmatically.

### robot-2

Renders the game board by dynamically generating DOM elements.

#### Concepts covered

- DOM manipulation:
    - `getElementById()`
    - `createElement()`
    - `setAttribute()`
    - `appendChild()`
    - `innerHTML`

### robot-3

Adds the `move()` and `turn()` functions from the console-based version.

#### Concepts covered

- _Separation of Concerns_<br>Rendering is separate from data management (view and model). Uses simultaneous console-based and HTML rendering to prove the point.

### robot-4

Adds a toolbar with buttons to execute robot commands.

#### Concepts covered

- DOM events
- callbacks (event handlers)

### robot-5

Adds images to render the robot, trees, water and flag. Use CSS classes to rotate the robot.

#### Concepts covered

- ES6 fat arrow functions for the event handlers

### robot-6

Introduces ES6 Classes for Model and View.

#### Concepts covered

- OOP
- Classes

### robot-7

Introduces separate files for Model and View.

#### Concepts covered

- Working with separate JavaScript files.
- Namespace pattern

### robot-8

- Adds a Controller to complete the MVC pattern.
- Adds an HTML `input` element and event handler.
- Adds a `log` function to replace `console.log`.

#### Concepts covered

- HTML `input` element with event handler for `keyup`
- Full MVC pattern
- Observer pattern
- Action pattern
- Simple Dependency Injection
- `setInterval()`
- object and array destructing
- array spread syntax


## public + server

- Get levels from back-end through json-server API
- Adds an HTML `select` element to select a game level

#### Concepts covered

- Async: XMLHttpRequest
- promise
- `localhost`
