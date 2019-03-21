# Initiation to ESNext ![Module: 10 credits]

[![milestone-status]](https://master3-assistant.takima.io?milestoneId=40&redirectUri=https%3A%2F%2Fmaster3.takima.io%2Fmaster3%2Fes6-01)

> read estimate : **30 minutes**.

![SKILL javascript]

#### You are here because

 - you know how to code in javascript
 - you want to start on Angular, React or other recent framework

## Abstract

In this milestone, we will focus on using Javascript modern development tools without using any frameworks.
 The tools, patterns, and features used in this module will be a common ground for any Javascript project.

>Although we asked our selves if we should have you implement your custom React library we finally
decided to go for an easy local game application exercise implementation.

Let's define a bit more what we are talking about:
* Ecmascript: standardized and versioned version of what is commonly called "Javascript"
* Browsers: I know it's sad but there are more browsers than Chrome and you will need to check for compatibility
* ES next: ES7 + ES8 + ES9 and more

![ecmascript-support]

> Source: [kangax.github.io/compat-table/es5](http://kangax.github.io/compat-table/es5/)

#### Some useful references you should consider :

- the [cheatsheet.md](./CHEATSHEET.md)

#### Involved technologies
![es6]
![babel]
![webpack]

![sass]
![lodash]

#### Prerequisites
> ![tip] __Pro tip__: NVM is a very useful tool if you want to manage different versions of node at the same time,
you might want to check: [github.com/creationix/nvm](https://github.com/creationix/nvm)
 - have **nodejs** and **npm** installed (NodeJS 6+)
 ```sh
$ node -v
v10.15.1
$ npm -v
6.4.1
```

## Setup

No specific setup is required. As stated before having nodejs and also a modern browser might be useful.

## Get started

### Specification
As it has been said, the goal of this module is to discover modern Javascript tools while developing a 
 simple memory game. We will guide you through the implementation but the features of the application will be 
 described here.

The application will be composed of 3 views:
* the welcome view, containing a simple form allowing the user to enter his name, the game size and 
a start button to launch the game
* the game view allowing the user to play the memory game, flipping cards 2 by 2 until all the cards are turned upwards
* the end view, congratulating the user, allowing to start a new game and showing him is performance time

![mock]

Concerning the theming and what's behind the cards feel free to give it your own touch 
(let's obviously keep everything safe for work).

Easy right? Well, the application will have to contain quite some ES6 features and use appropriate tools that's
why we will guide you trough the configuration and some parts of the implementation. Let's do this.

### Technical spec
* The 3 distinct views will be independently served, this will be done using the appropriate webpack configuration
* The styling will be done using preprocessed css: sass
* The game implementation will use the following: classes, Promise, acync/await, lodash, ...

This tutorial was written with the dependencies version below. Du to fast update cycles, installing new version of this dependencies could create troubles.
If you found one, please update the code to the next version or downgrade the dependency version concerned to the following.

```
"devDependencies": {
    "@babel/core": "^7.3.3",
    "@babel/preset-env": "^7.3.1",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^2.0.1",
    "css-loader": "^2.1.0",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "jasmine": "^3.3.1",
    "jasmine-core": "^3.3.0",
    "karma": "^4.0.0",
    "karma-jasmine": "^2.0.1",
    "karma-jasmine-html-reporter": "^1.4.0",
    "karma-mocha-reporter": "^2.2.5",
    "karma-phantomjs-launcher": "^1.0.4",
    "karma-webpack": "^3.0.5",
    "node-sass": "^4.11.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.29.5",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.2.0"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5",
    "lodash": "^4.17.11",
    "moment": "^2.24.0",
    "semantic-ui-css": "^2.4.1",
    "uuid": "^3.3.2"
  }
```

## Step 1 - NPM & webpack setup
> NPM, webpack

This step is about setting up a standard npm module containing a webpack application, this will be the project skeleton.

**Why ?** Have a standardized NPM module and an easily runnable webpack application.

**At the end, we should have a standard NPM/webpack project starting base.**

### Step 1.1 - init your npm project
```sh
mkdir meme-mory
cd meme-mory/
npm init -y
npm install
```
Files produced:
```sh
package.json
```

> ![info] You just created a NPM module, that is not different from any module in the central registry at
[www.npmjs.com](https://www.npmjs.com/). Your NPM module relies on this json file, you can find the documentation
for this file here: [docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json).

> ![info] There are alternatives to npm, yarn for example is quite notorious and has very good performance:
[yarnpkg.com](https://yarnpkg.com/en/).

* set your package as private
```javascript
//package.json
{
  ...
  "private": true,
  ...
}
```
> ![info] Making it private so we do not accidentally push to the central (you will need to be connected to do so)

![commit] **commit step**
### Step 1.2 - webpack: install and naive setup

Webpack is a javascript tool used to bundle a web application, basically a coffee maker used in 99% of web projects.
Webpack can be quite a complex bundler and does a lot of its work behind the scene, we will go trough a simple manual 
setup to check what is going on. You can check the documentation to get a deeper insight of this tool:
[webpack.js.org/guides/getting-started/](https://webpack.js.org/guides/getting-started/)
(you might also want to check webpack-cli, a tool to help you create your webpack config: [github.com/webpack/webpack-cli](https://github.com/webpack/webpack-cli))

Let's head to our setup, this will start by installing everything we need:
```sh
npm install --save-dev webpack webpack-dev-server webpack-cli \
babel-loader @babel/core @babel/preset-env \
clean-webpack-plugin html-webpack-plugin
```

Let's also install the polyfills as we are going to use javascript advanced features:
```sh
npm install --save @babel/polyfill
```

> ![info] __Tip__: We use polyfills to patch our browser with some code it might miss

> ![question] We just installed a bunch of libraries but with different options, check your package.json. Do you know 
what's the difference between the options --save-dev, --save and none?

Create your webpack client application containing: .babelrc, src/index.html and src/app/index.js:
```
meme-ory
│   .babelrc
│   package.json
└───src
    │   index.html
    └───app
        |   index.js
```
```javascript
// .babelrc
{
    "presets": [
      ["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]
    ],
    "plugins": []
}
```

> ![troubleshoot] ES6 object.defineProperty caused by some wrong dependencies
>```sh
>Module not found: Error: Can't resolve 'core-js/modules/es6.object.define-property' 
>```
>Check your version against the ones provided, clean your node_modules/ and reinstall.
>The preset-env may also need the corejs version to be defined: corejs: 3

> ![tip] __Pro tip__: You can check how babel actually process javascript easily there: [babeljs.io/repl](https://babeljs.io/repl)

```html
<!--src/index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```
```javascript
// src/app/index.js
console.log('Hello World');

function component() {
  let element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack', 'App'].join('\n\n');

  return element;
}

document.body.appendChild(component());
```
We will now tell webpack how to bundle the application properly and use babel
```javascript
//webpack.config.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: false,
  entry: './src/app/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }
    ]
  }
};
```
> ![tip] __Tip__: Have a look at [webpack.jakoblind.no](https://webpack.jakoblind.no/) to easily scaffold your webpack config.

> ![tip] __Tip__: If you want to simplify your _../../../relative/import/paths_, have a look at 
[webpack.js.org/configuration/resolve/](https://webpack.js.org/configuration/resolve/) and 
[www.jetbrains.com/help/idea/using-webpack.html](https://www.jetbrains.com/help/idea/using-webpack.html).

### Step 1.3 - run webpack
Now let's configure how we run our application using webpack by defining 2 npm scripts:
```javascript
// package.json
{
  ...
  "scripts": {
      "build": "webpack --config webpack.config.js",
      "dev": "webpack-dev-server"
  },
  ...
}
```
* *npm run build* will be used to generate a production bundle in dist/
* *npm run dev* will be used to start a local development server at [localhost:8080](http://localhost:8080/)

![commit] **commit step**

> ![tip] __Pro tip__: You can run npm scripts like so and add additional options:
```sh
npm run build
npm run build -- -d
npm run dev -- -p
```
> ![question] Have a look at the console output when building with production (-p) or development (-d) options, noticing any difference?
Check the dist/ folder on build and inspect how the file is built, can you find your javascript code?

### Checklist
 - [ ] I know how to setup a npm module
 - [ ] I know npm package basis
 - [ ] I know webpack basic setup and commands

[troubleshoot](#troubleshoot)

## Step 2 - Style the application
> semantic-ui, webpack loader, sass

This step is about adding some styling to the application: semantic-ui and sass support.

**Why ?** Have some initial styling and support compiled css.

**At the end, we should have a semantic-ui app embedding sass custom styling.**

* add webpack static loaders to the project
```sh
npm install --save-dev style-loader css-loader url-loader file-loader
```

* add semantic-ui-css to the project
```sh
npm install --save semantic-ui-css
```
* load semantic-ui css in the application before your styling
```javascript
//index.js
// ...
import 'semantic-ui-css/semantic.min.css';
// ...
```
* add webpack static loaders to handle css files and semantic-ui fonts / icons
```javascript
//webpack.config.js
// ...
module: {
  rules: [
    // ...
    {
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|svg|woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'url-loader',
        options: { limit: 100000 } // in bytes
      }]
    }
  ]
}
// ...
```
* add sass support and write your first sass styles, see
[sass-lang.com/guide](https://sass-lang.com/guide) and 
[github.com/webpack-contrib/sass-loader](https://github.com/webpack-contrib/sass-loader)

### Checklist
 - [ ] I know how to load css in webpack
 - [ ] I know what sass is

## Step 3 - Implement memory game
> ES Next features, lodash, Promise, async/await, debugger

In this step you will implement the memory game logic using ES Next features and more.

**Why ?** Get to write modern Javascript code and use modern front-end development tools.

At the end, the user should be able to play the memory game.

### Step 3.1 - 3 views structure

* you can use the following structure
(each view should contain a simple template like "Hello view name", a simple script logging "Hello view name" and its 
own background color)
```
es6-01
├── resources/
└── meme-ory/
    ├── .babelrc
    ├── package.json
    └── src/
        └── app/
            └── modules/
                ├── welcome/
                │   ├── welcome.js
                │   ├── welcome.html
                │   └── welcome.scss
                ├── game/
                │   ├── game.js
                │   ├── game.html
                │   └── game.scss
                └── end/
                    ├── end.js
                    ├── end.html
                    └── end.scss
```
* webpack configuration should be adjusted to output 3 views as well, using chunks
```javascript
//webpack.config.js
module.exports = {
    // ...
      entry: {
        app: './src/app/modules/welcome/welcome.js',
        game: './src/app/modules/game/game.js',
        end: './src/app/modules/end/end.js'
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          files: {
            chunks: {
              app: {
                entry: './src/app/modules/welcome/welcome.js'
              },
              game: {
                entry: './src/app/modules/game/game.js'
              },
              end: {
                entry: './src/app/modules/end/end.js'
              }
            }
          }
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/app/modules/welcome/welcome.html',
          chunks: ['app']
        }),
        new HtmlWebpackPlugin({
          filename: 'game.html',
          template: './src/app/modules/game/game.html',
          chunks: ['game']
        }),
        new HtmlWebpackPlugin({
          filename: 'end.html',
          template: './src/app/modules/end/end.html',
          chunks: ['end']
        })
      ],
      output: {
        filename: 'bundle-[name].js',
        path: path.resolve(__dirname, 'dist')
      },
    // ...
}
```
* check that each view is properly served by both the dev server and generated by the build command

### Step 3.2 - Welcome view
* create the welcome view form, containing player name and game size
* install and import lodash (documentation: [lodash.com/docs](https://lodash.com/docs))
> ![info] Lodash is a utility library covering a lot of use cases, although we will not need to use it that much 
in this project. Indeed we will emphasize on ES next features that actually include a lot of lodash functions (which is 
a good sign) we encourage you to check useful functions like: _.clone, _.assign, _.partial, _.curry...
```sh
npm install --save lodash
```
> ![question] Have a look at your package.json file, what does the "^" mean in front of the versions?
* add minimal validation, player name: alphanumerical and length between 3 and 20, size: number between 2 and 10
* link the form to the **game view** passing parameters as get params

To help you here are a couple code snippets:
```javascript
//welcome.js
import 'semantic-ui-css/semantic.min.css';
//...

import { get } from 'lodash';

class Welcome {
  constructor() {
    this._form = document.querySelector('#start-form');
    this._nameField = document.getElementsByClassName('field')[0];
    this._nameMessage = document.getElementsByClassName('message')[0];
  }

  startGame(e) {
      e.preventDefault();

      this._form.classList.add('loading');
      const name = get(e, 'srcElement[0].value');

      let nameError = false;
      if (!/[A-Za-z0-9]$/.test(name)) {
        this._nameField.classList.add('error');
        this._nameMessage.classList.add('error');
        nameError = true;
      } else {
        this._nameField.classList.remove('error');
        this._nameMessage.classList.remove('error');
        nameError = false;
      }
      //...
      this._form.classList.remove('loading');
      if (!nameError) {
        console.log(`starting game: ${name}`);
      } else {
        this._form.classList.add('error');
      }
  }
}

let welcome = new Welcome();
welcome._form.addEventListener('submit', e => welcome.startGame(e));
```
```html
<!--welcome.html-->
<form id="start-form" class="ui large form">
    <div class="ui stacked segment">
        <div class="field">
            <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="Name" pattern="[A-Za-z0-9]{3,20}">
            </div>
        </div>
        <div class="ui info message">
            <p>Player name must be alphanumerical and between 3 and 20 characters.</p>
        </div>
        <input class="ui fluid large teal submit button" type="submit" value="Play"/>
    </div>
</form>
```

### Step 3.3 - Game implementation
> Classes, Promise, lodash, transform, component template

We are going to implement the logic of the game, composed of a board who contains cards. 
we recommend to you to follow this structure :
```
es6-01
...
├── assets/
│   └─ here your static card images
└── app/
    └── modules/
        ├── welcome/
        ├── game/
        │   ├── card.js
        │   ├── board.js
        │   ├── game.js
        │   ├── game.html
        │   └── game.scss
        └── end/
```

#### 3.3.1 - Preparation

To begin, you need some static images for your cards

##### Get the static images
* put the following in your project (find them inside the resources/ folder)

![unknown-card-img] ![takima-card-img] ![jawg-card-img] ![gatling-card-img]

##### How to build a flippable card

* import your image dynamically from your code _(url-loader)_
```html
<img alt="test" id="my-card-img"/>
```
```javascript
import Back from '../../static/back-card.png';
document.getElementById('my-card-img').src = Back;
```

* code a simple flippable card
> A flippable card is very easy to write, here is an example: [jsfiddle.net/68agoj1q](https://jsfiddle.net/68agoj1q/)

> ![tip] __Pro tip__: Use your browser debugger as often as you can, this can be tricky and sometimes confusing to go
into javascript realtime machinery, but this is a very good habit.

> ![tip] __Pro tip__: Using Javascript online runners can be very useful to isolate a bug and get help from the community.
We used jsfiddle here but other like: [plnkr.co](https://plnkr.co/) or [jsbin.com](https://jsbin.com) will do. And the best interpreter will 
be directly your browser console.

##### How to handle this with the dom
* create multiple flippable cards
```html
<template id="card-template">
    <div class="ui card">
        <div class="image">
            <img class="front-face" alt="card">
            <img class="back-face" alt="card">
        </div>
    </div>
</template>
<main class="ui container">
    <div class="ui special cards" id="cards"></div>
</main>
```
```javascript
const htmlCards = document.getElementById('cards');
const clonedHtmlCard = document.getElementById('card-template').content.cloneNode(true).firstElementChild
htmlCards.appendChild(clonedHtmlCard);
```

##### Shuffle your cards
We will use the server inside your /resources folder to handle the shuffle, 
* install and run the server
```sh
cd ../resources/server
npm install
node server.js
```
* use the fetch api to call the server (localhost:8081/ with **nb** and **size** as get parameters)

For the parameters, **nb** is the number of the image you have and **size** the number of pairs you want to guess.

The server return a ID list : ?nb=5&size=2 will return {ids: [0, 4, 3, 4, 0, 3]}

> ![tip] __Pro tip__: Use Postman to try your http request on your API

* use the IDs list to shuffle you cards

#### 3.3.2 - Implementation

* initialize the game with *n* cards, using 2 classes: *Board* and *Card*
```javascript
//board.js
//note: the board contains an array of Cards
import {Card} from "./card";

export class Board {

  constructor(size) {
    this._size = size;
    this._cards = [];
    //...
  }

  init() {
      //...
      for (let i = 0; i < this._size; i++) {
        this._cards.push(new Card());
      }
  }
  
  //...

}
```
```javascript
//card.js
//the card is bound to an element and holds 2 flags: flipped and matched
export class Card {
  //...

  constructor(img) {
    this._flipped = false;
    this.matched = false;
    this._img = img;
    this._elt = {};
    //...
    this._imageElt = this._elt.querySelector('.image');
    this._imageElt.addEventListener('click', () => this.flip());
  }

  flip() {
    //...
  }

  equals(card) {
    //...
  }
}
```
* implement the game logic: flip cards 2 by 2, keep matches flipped, end the game when all cards are flipped

### Step 3.4 - End view

* display a congratulation message to the user with his last performance

> This view is very simple we will improve it in the section 

### Checklist
 - [ ] I know how to modularize a webpack app
 - [ ] I know how to handle a basic form
 - [ ] I know how to use Javascript classes
 - [ ] I know lodash basis
 - [ ] I know how to handle Javascript asynchronous behavior using Promise and async/await 
 - [ ] I know the concept of Javascript scope/closure
 - [ ] I know the basis of debugging in a browser

## Step 4 - Unit testing and browser support
> Unit test, jasmine, phantomJS

This step is about setting up a proper front-end testing environment.

**Why ?** Have a good idea on how to unit test Javascript code.

**At the end, we should have a proper unit test set and a task to run it.**

### Step 4.1 - Jasmine

[Jasmine](https://jasmine.github.io/) is a framework allowing to write and run unit tests for Javascript projects.

At the end, we should have a _./spec_ folder next to our _./src_ folder containing all our tests.

#### 4.1.1 - Installation

* Install and init Jasmine
```sh
npm install --save-dev jasmine
node node_modules/jasmine/bin/jasmine init
```
* Generate sample tests
```sh
node node_modules/jasmine/bin/jasmine examples
```

#### 4.2.2 - Run

* Add a script _test_ to run Jasmine
```javascript
//package.json
// ...
"scripts": { "test": "jasmine" },
// ...
```

* Start Jasmine and see the result
```sh
npm run test
```

### Step 4.2 - Karma

Jasmine does not run in a browser and our user probably will. That's why we will now use 
[Karma](https://karma-runner.github.io) to run our tests in a headless browser [PhantomJS](http://phantomjs.org/) 
, but also to be able to generate reports.

#### 4.2.1 - Preparation

You can drop the `./spec/support/jasmine.json` file, it's unused with Karma.

#### 4.2.2 - Installation

We will use these plugins in our project :

[karma-webpack](https://www.npmjs.com/package/karma-webpack) will generates a webpack bundle for each test _(and allow jasmine to understand the ESNext syntax)_

[karma-jasmine](https://www.npmjs.com/package/karma-jasmine) will provide in an adapter for Jasmine

[karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter) will use the [Mocha](https://mochajs.org/) style logging for the cli report

[karma-jasmine-html-reporter](https://www.npmjs.com/package/karma-jasmine-html-reporter) will dynamically shows our tests results on the debug.html page

[karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher) will run our tests on a headless browser

* Install Karma
```sh
npm install karma karma-jasmine jasmine-core ^
            karma-webpack ^
            karma-mocha-reporter ^
            karma-jasmine-html-reporter ^
            karma-phantomjs-launcher --save-dev
```

* Init Karma
```sh
$karma init
Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> PhantomJS
> 

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> spec/**/*.spec.js
```

> ![tip] in order to use Karma as a CLI, we need to globally install Karma-cli using ̀̀̀`npm install -g karma-cli`

* Add the plugins _(optional)_
> ![info] Karma adds the plugins automatically for you if the plugins array does not exist
```javascript
//karma.conf.js
// ...
plugins: [
    require('karma-webpack'),
    require('karma-jasmine'),
    require('karma-mocha-reporter'),
    require('karma-jasmine-html-reporter'),
    require('karma-phantomjs-launcher')
]
// ...
```

### 4.2.3 - Configure the reporters

Karma can do reports of your tests, but you need to configure it. In our project we use 
[karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter) and 
[karma-jasmine-html-reporter](https://www.npmjs.com/package/karma-jasmine-html-reporter) but you can use others like 
[karma-coverage-istanbul-reporter](https://www.npmjs.com/package/karma-coverage-istanbul-reporter) to do a coverage 
report for example.

* Add the reporters
```javascript
//karma.conf.js
// ...
reporters: ['mocha', 'kjhtml']
// ...
```

### 4.2.4 - Configure the browsers

We have configured Karma to use [PhantomJS](http://phantomjs.org/) as browser. Karma need you to specify what browsers where you want to launch your tests.

#### PhantomJS

We prefer use [PhantomJS](http://phantomjs.org/) because it's an headless browser but you can use browsers like Chrome, 
Firefox or others, the Karma launcher of the desired browser need to be on your project. 

* Make sure you have the following
```javascript
//karma.conf.js
// ...
browsers: ['PhantomJS']
// ...
```

#### Let's try others browsers _(extra)_
* Add the launchers to your projects
```sh
npm install karma-chrome-launcher karma-firefox-launcher --save-dev
```

* And change your browsers conf
```javascript
//karma.conf.js
// ...
browsers: ['Chrome', 'Firefox']
// ...
```

### 4.2.5 - Configure the preprocessors

You can define preprocessor to transpile your code if you use a non-standard syntax like CoffeeScript or TypeScript.
In our project, the code need is bundled with webpack, so we use the webpack preprocessor

* Add the preprocessor
```javascript
//karma.conf.js
// ...
preprocessors: {
  'spec/**/*.spec.js': ['webpack']
}
// ...
```

You will see these problems if you run like so
> ![troubleshoot] We use webpack without specifying the 'mode' option (production or development)
>```sh
>WARNING in configuration
>The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
>```

> ![troubleshoot] PhantomJS doesn't understand the ES6 syntax
>```sh
>PhantomJS 2.1.1 (Windows 8.0.0) ERROR
>  {
>    "message": "An error was thrown in afterAll\nSyntaxError: Use of reserved word 'let' in strict mode",
>    "str": "An error was thrown in afterAll\nSyntaxError: Use of reserved word 'let' in strict mode"
>  }
>```

You need to add some webpack configurations to your Karma config file

* Create a webpack-test.config.js next to the webpack.config.js 

> ![tip] __Pro tip__: It's a good practice to create a webpack config file instead of putting the configuration directly on Karma

```javascript
//webpack-test.config.js
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

As you see, we define the mode for webpack, and the 
[babel rule to transpile our code to ES5](https://babeljs.io/docs/en/babel-preset-env) for PhantomJS. 
Add other configurations here if necessary

* Put the webpack config into the Karma config
```javascript
var webpackConfig = require('./webpack-test.config.js');
module.exports = function(config) {
  config.set({
    // ...
    webpack: webpackConfig
    // ...
  }
}
```

#### 4.2.6 - Run

* Replace your script _test_ from "jasmine" to "karma start"
```javascript
//package.json
// ...
"scripts": { "test": "karma start" },
// ...
```

* Start Karma and see the result at [localhost:9876/debug.html](http://localhost:9876/debug.html)
```sh
npm run test
```

### Checklist
 - [ ] I tested my app without karma, I saw the result on the terminal
 - [ ] I tested my app with karma, I saw the result on the terminal and on the [debug.html](http://localhost:9876/debug.html) page
 - [ ] I understand what do "describe" and "it" functions
 - [ ] I understand the Jasmine syntax to write tests
 - [ ] I know what is an headless browser
 - [ ] I am able to choose other reporters and browsers for Karma

## Step 5 - Memory management
> web storage usage, cookies

In this section we will improve the end view by displaying the last performance of the user in a table.

* store the game history using the web storage [developer.mozilla.org/fr/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API)
     sessionStorage and localStorage
> ![question] What is the main difference between the two? Check what happens if you close, the current tab or the browser.
* also store the game history in indexedDB: [developer.mozilla.org/fr/docs/Web/API/API_IndexedDB/Using_IndexedDB](https://developer.mozilla.org/fr/docs/Web/API/API_IndexedDB/Using_IndexedDB),
[developers.google.com/web/ilt/pwa/working-with-indexeddb](https://developers.google.com/web/ilt/pwa/working-with-indexeddb) 
using the following *Storage* class should be very easy
```javascript
//utils.js
export class Storage {

    constructor() {
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }
        let idb = indexedDB.open('memory', 1);
        this._idb = idb;

        idb.onupgradeneeded = e => {
            if (!e.target.result.objectStoreNames.contains('game')) {
                e.target.result.createObjectStore('game',{keyPath: 'id', autoIncrement: true});
            }
        };
    }

    write(data) {
        const tx = this._idb.result.transaction('game', 'readwrite');
        const gameStore = tx.objectStore('game');
        gameStore.add(data);
        return new Promise((resolve, reject) => {
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    }

    readAll() {
        const tx = this._idb.result.transaction('game', 'readonly');
        const gameStore = tx.objectStore('game');
        const get = gameStore.getAll();
        return new Promise((resolve, reject) => {
            get.onsuccess = e => resolve(e.target.result);
            get.onerror = reject;
        });
    }
}
```
> ![question] What is the difference between localStorage and indexedDB?

> ![info] The cookie interface is quite similar to the one we used although it has a different lifecycle, have a look at:
(developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/cookies)[https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/cookies]

### Checklist
 - [ ] I stored the user game history in sessionStorage, localStorage and indexedDB
 - [ ] I mapped proper Promise from indexedDB and resolve/reject it
 - [ ] I know how to use web storage and differences between APIs

## Step 6 - Bonus: Production deployment

Deploy the built application in a nginx docker image for a production ready meme-ory client.
We will use this image: (nginx)[https://hub.docker.com/_/nginx]

```dockerfile
FROM nginx
COPY dist /usr/share/nginx/html
```

> ![info] Do not forget to build the app with webpack before building the docker container (*npm run build*)

## The end

Congrats, you now have a working ![heart] Meme-ory app ![heart] !

Check your achievements with the [following test](https://docs.google.com/forms/d/148VIT0oWVhnTkZtKMCVFfQL3o6IF_gVckTa99R5TUas)

Ready to follow up? Get started for [![Next Milestone angular]](https://master3.takima.io/master3/angular-01)  

## Troubleshoot

Any specific troubles? Keep us updated and we will add those here.

# Contributors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>
 - Pierre-Quentin Warlot <[pqwarlot@takima.fr](mailto://pqwarlot@takima.fr)>

### Mentors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>


| <sub>contact us: <[formation@takima.io](mailto://formation@takima.io)></sub> | <sub>© Takima 2019</sub> |
| --- | ---:|

[TODO Milestone : 0 credits]: https://img.shields.io/badge/TODO_milestone_name-0_credits-red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=cd1c68&colorB=db9ab5&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA0AB8AKD7i/b6AAAACXBIWXMAACE4AAAhOAFFljFgAAAAB3RJTUUH4gsbFCYzALEYOAAAAzNJREFUSMedlltoz2EYx7+/zchspuXY/iShnAljYiaUQ4gLSty4kFwosXKhkEtalMMds5mSRORGcmou0HJMccHmEDk1bMM2Pm6enx5vv//+/3nq7Xd4Dt/3eZ/D+0gZqCG16e87UACMB/YB94EWW4+AKmAykK//oQBoGLALuEtmugpMC21kCzQcOA900j36DZR1CRozgGJgLXCjC4MfgHt2rO+7kJuRCawMeJph95uAEqCfrRSwHHieINsAFCV6CcxOUPBH2QosSBcKoAdwzo7T06Ik4TKgIxB8CTS67yonnwcsAEoTbG0N7NT/E0sgH7geCLUCGwMPc02+v8Wt09YTYLAPD1AZeDrS72hKwlFWAkuc0jMn/zhNbGcFntY43lnP2B8o3rD/yxxgvZPvANqAE1ZzMTUCA10C5gJ3jPcFGBozHgSApfZ/iDvSJgdYC8xz39VOd3eQ9XOAdtv45vjnV6fQBAx0xk46XrGr01wnM89trCOIZQ5wy3jXgFyZuzHdBQrN0Epgh+NVp6nduUFyVQSxXO14w2QdwwOWA58SkuInsDow1hc4HcjtTCiVduMdlHX+mJptpaM24DKwBziaJmPPJPTkY8Z7JWBCFwC/gO/AjwztrtnJ3HZAQ+25JBbMkfRCUkNCt2qXVClpoqTpkqokdRrvjaS3kp5LqpM0X1Iv4/VwNqYCPb39nCiKWiRdSgA8HEVRlaQJklZEUbRNUo3xHkoaJ2lyFEXrJPmif+3ex0jqa5tvlvQhxxjHJBEAvrHnO0l7gUmSLkr6LWmmpKIoir6ZzHand9O9l0rqLemXpFZJF3x6nwri8tGKOq6jFLDG4kp8qwOrgr5Z7GL4GRhho0kTMDasqSOW/p1mJE6aVcav870TKAzGjrMObKm1wVEmdwDISyrklO16C7A+7jx28cbetVt21wY3zDgHeNN52BMYntUwBfQBLjkwrDGEN7y/L8fYSTUCJZkAUqZQDhwMgNJRfdBDD9n/K0BBJsCKbk5oV4E+Tn+0DWAbgEFZjYjA4izBHsfN3gEWJY2c2YAuBG6nAXoP7A11/DMrsITjLbRL9LgNVS8tewd0ywtHfwA7LOPX/9An6gAAAABJRU5ErkJggg== "TODO Milestone name"
[milestone-status]: https://master3.takima.io/.assistant/badges/milestone-status?milestoneId=40
[Module: 0 credits]: https://img.shields.io/badge/ES6-0_credits-red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA0AB8AKD7i/b6AAAACXBIWXMAACE4AAAhOAFFljFgAAAAB3RJTUUH4gsbFCYzALEYOAAAAzNJREFUSMedlltoz2EYx7+/zchspuXY/iShnAljYiaUQ4gLSty4kFwosXKhkEtalMMds5mSRORGcmou0HJMccHmEDk1bMM2Pm6enx5vv//+/3nq7Xd4Dt/3eZ/D+0gZqCG16e87UACMB/YB94EWW4+AKmAykK//oQBoGLALuEtmugpMC21kCzQcOA900j36DZR1CRozgGJgLXCjC4MfgHt2rO+7kJuRCawMeJph95uAEqCfrRSwHHieINsAFCV6CcxOUPBH2QosSBcKoAdwzo7T06Ik4TKgIxB8CTS67yonnwcsAEoTbG0N7NT/E0sgH7geCLUCGwMPc02+v8Wt09YTYLAPD1AZeDrS72hKwlFWAkuc0jMn/zhNbGcFntY43lnP2B8o3rD/yxxgvZPvANqAE1ZzMTUCA10C5gJ3jPcFGBozHgSApfZ/iDvSJgdYC8xz39VOd3eQ9XOAdtv45vjnV6fQBAx0xk46XrGr01wnM89trCOIZQ5wy3jXgFyZuzHdBQrN0Epgh+NVp6nduUFyVQSxXO14w2QdwwOWA58SkuInsDow1hc4HcjtTCiVduMdlHX+mJptpaM24DKwBziaJmPPJPTkY8Z7JWBCFwC/gO/AjwztrtnJ3HZAQ+25JBbMkfRCUkNCt2qXVClpoqTpkqokdRrvjaS3kp5LqpM0X1Iv4/VwNqYCPb39nCiKWiRdSgA8HEVRlaQJklZEUbRNUo3xHkoaJ2lyFEXrJPmif+3ex0jqa5tvlvQhxxjHJBEAvrHnO0l7gUmSLkr6LWmmpKIoir6ZzHand9O9l0rqLemXpFZJF3x6nwri8tGKOq6jFLDG4kp8qwOrgr5Z7GL4GRhho0kTMDasqSOW/p1mJE6aVcav870TKAzGjrMObKm1wVEmdwDISyrklO16C7A+7jx28cbetVt21wY3zDgHeNN52BMYntUwBfQBLjkwrDGEN7y/L8fYSTUCJZkAUqZQDhwMgNJRfdBDD9n/K0BBJsCKbk5oV4E+Tn+0DWAbgEFZjYjA4izBHsfN3gEWJY2c2YAuBG6nAXoP7A11/DMrsITjLbRL9LgNVS8tewd0ywtHfwA7LOPX/9An6gAAAABJRU5ErkJggg== "ES6"

[SKILL javascript]: https://img.shields.io/badge/JS-%E2%98%85%E2%98%85%20%20-yellow.svg?longCache=true&style=for-the-badge&logoColor=ffffff&logo=javascript
[Milestone mmm]: https://img.shields.io/badge/maven_multi_module--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec
[TODO Extra Module X]: https://img.shields.io/badge/TODO_Extra_Module_x--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=java
[TODO Extra Milestone Y]: https://img.shields.io/badge/TODO_Extra_Milestone_y--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=cd1c68&colorB=db9ab5&logo=java
[Next Milestone angular]: https://img.shields.io/badge/next_Module_angular--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=angular

[es6]: .README/icons/es6.png
[babel]: .README/icons/babel.png
[webpack]: .README/icons/webpack.png
[sass]: .README/icons/sass.png
[lodash]: .README/icons/lodash.png

[mock]: .README/meme-ory-mock.png
[ecmascript-support]: .README/ecmascript-support.png

[info]: .README/info.png
[warning]: .README/warning.png
[tip]: .README/success.png
[danger]: .README/danger.png
[error]: .README/error.png
[question]: .README/question.png
[troubleshoot]: .README/error.png
[commit]: .README/commit.png

[unknown-card-img]: .README/cards-miniatures/back-card.png
[takima-card-img]: .README/cards-miniatures/takima-card.png
[jawg-card-img]: .README/cards-miniatures/jawg-card.png
[gatling-card-img]: .README/cards-miniatures/gatling-card.png

[heart]: .README/smileys/heart_14x14.png "heart"
