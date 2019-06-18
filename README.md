# Initiation to modern web & ESNext ![Web 01: 10 credits]

[![milestone-status]](https://master3-assistant.takima.io?milestoneId=40&redirectUri=https%3A%2F%2Fmaster3.takima.io%2Fmaster3%2Fes6-01)

> Estimated reading time: **90 minutes**.

![javascript advanced]

##### Show me the slides
 - [Web 00 - The origins](https://docs.google.com/presentation/d/1P3ZGCCFOjCrn3035aQfsTejd65QA2m8VBGtKWnl5oGg/edit?usp=sharing)
 - [Web 01 - bundlers & modules](https://docs.google.com/presentation/d/19xq68gSw8oVmMhH03kzQo9-gQSSVbsxjgXKwwBseSf8/edit?usp=sharing)
 - [Web 02 - ESNext](https://docs.google.com/presentation/d/1uNeFVkYbIlvv0FV6tVs5SIgBs9vl5bM67QuqjTsS8c8/edit?usp=sharing)
 - [Tools & Frameworks](https://docs.google.com/presentation/d/1ADPASia_Cj3B5UoUnvGEHuMV5e8l9Mr1lxpM0gHK2NE/edit?usp=sharing)
 - [Fill in the talk survey (thank you ![heart])](https://docs.google.com/forms/d/1Lzkzv_7Mzt047OgtbkeWdDAvmESQ4UqbUnqYGc0LSD4/edit)

#### You are here because

 - you roughly know how to code with javascript
 - you want to start on Angular, React or other recent framework

## Abstract

In this module, we will learn how to do modern web development, 
using only javascript and a modern webpack stack, without any JS framework.
The tools, patterns, and features used in this module will be a common ground for any Javascript project, 
and give you all the basics you need to master more complex frameworks.

In this module, we will cover the following topics:
* **Ecmascript**: standardized and versioned version of what is commonly called "Javascript".
* **Browsers compatibility**: I know it's sad but some company and people are still using old browsers, and you will have to deal with compatibility issues.
* **ES next**: ES7 + ES8 + ES9 and more.

#### Some useful references you should consider :

- the [cheatsheet.md](./CHEATSHEET.md)

#### Involved technologies
![es6]

![npm]
![yarn]

![webpack]
![babel]

![bootstrap]
![sass]

#### Prerequisites

 - Have **nodejs** and **npm** installed (NodeJS 6+)
    ```sh
   $ node -v
   v9.11.0 ### at least
   
   $ npm -v
   6.3.0 ### at least
   ```
   > ![tip] __Pro tip__: NVM is a very useful tool if you want to manage different versions of node at the same time.
Check it out at [github.com/creationix/nvm](https://github.com/creationix/nvm)
 - Have a web browser that offers good tools for web developers
 
   > ![tip] __Pro tip__: Both Google Chrome and [Chromium](https://download-chromium.appspot.com/) surpasses Firefox & other web browsers in term of debugging capabilities (HTML, JS, CSS, ...).
   I recommend to install one of those right now, and prefer using it whenever you have to develop web applications.  
 - Have [`npx`](https://www.npmjs.com/package/npx) installed globally
 ```sh
 npm install -g npx
 ```
 > ![info] the `-g` parameter is to install a dependency **globally**. This way, the dependency will be available system-wide.
 
 > ![danger] By default on linux system, installing a dependency globally **requires root privileges**. 
 > However, I recommend to **NEVER EVER use `sudo npm install ...`**.  
 > What you can do instead, is to [configure NPM prefix](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to an accessible path, so that you never need to have root access.

## Setup

- Copy up all files from [`resources/setup`](resources/setup) to your working directory.
This folder contains sources for the back-end and the front-end that compose our web application.

> ![warning] All this tutorial long, we assume you work within a git repository. Do not work on a clone or a fork of this repository! Init your own empty repository instead.

Our web application will work together with a server. Set it up right now:
 - install the dependencies 
   ```bash
   cd setup/back-end
   npm install
   npm start
   ```
   > ![info] Have a look on [`resources/setup/server/server.js`](resources/setup/back-end), to see how far NodeJS shares similarities with JavScript.
 - Ensure the server is up and running: Connect to [http://localhost:8081/api-docs/](http://localhost:8081/api-docs/) and check the documentation is alive.

## Get started

Nowadays, nobody uses bare javascript. Every modern application on the web make use of framework, 
built on top of javascript, that makes the code cleaner, more performant and much more easier to maintain.

However, there are countless number of popular javascript frameworks, 
and picking up the "good one" is for the most part a matter of hype and fashion.
The competition is rude, and the "killer JS framework" is never the same from one year to another.  
![frameworks_battle]

> ![info] Takima master3 training has modules to discover both Angular and React: [![react module 01]](https://master3.takima.io/master3/react-01) & [![angular module 01]](https://master3.takima.io/master3/angular-01)

Anyway, all those frameworks are built on top of some common basics. For now on, 
just let them fight forever and let's discover what is on the roots of what makes a modern web application. 

> ![tip] __pro tip__: At any point of your web developer carrier, consider as outated any articles or StackOverflow post you may find on the internet. Do not use it, unless you have to mantain some legacy code.

### Functional spec

This tutorial will guide you through the implementation of a simple memory game, that is mainly made of 3 views:
* **the welcome view** (WelcomeComponent), containing a simple form allowing the user to enter his name, the game size and one start button to launch the game.
* **the game view allowing** (GameComponent) the user to play, flipping cards 2 by 2 until all the cards are turned upwards.
* **the score view** (ScoreComponent), congratulating the user, allowing him to start a new game and showing him is performance time.

![game mockup]

Easy right? Well, the application will have to contain quite some ES6 features and use appropriate tools,
that's why we will guide you trough the configuration and some parts of the implementation. Ready? Set... GO!!!.

## Step 0 - Hello JS

Now that your game server is ready, it's time to crank up the front-end "as it is", to check that everything works as intended.
On your local disk, open up the `client` folder you just copied, and double click on `meme-ory/src/index.html`. 
It should get you to the welcome view (`WelcomeComponent`).

![welcome screenshot]

##### Your first mission: 
Ensure everything works as intended: 
 - Start a new game, with **size=2** (`WelcomeComponent`), 
 - play (`GameComponent`), win.
 - get redirected to see your score (`ScoreComponent`).

> ![info] As you can see, we do not need anything other than a web browser to run a simple JS application... No tool, no compiler, etc.

Ok, let's get a little more serious. In real life, web pages are not accessed locally, 
they are instead served by an HTTP server (eg: [`nginx`](https://www.nginx.com/) or [`apache2`](`https://httpd.apache.org/`) over the network.

For this exercise, keep it simple and just crank-up the standalone nodeJS [`http-server`](https://www.npmjs.com/package/http-server):
```bash
>$ cd meme-ory/front-end
>$ npx http-server -c-1
``` 
Now, navigate to [localhost:8080/src](http://localhost:8080/src): this should serve your application like for real!

> ![tip] **Did you know**? Your web browser can tell you a lot on what happens behind the scene (javascript execution, stack-traces, network, errors, ...). Press F12 (firefox, chrome, chromium) to access the developper tools. You will need it all this tutorial long.

> ![question] While going through the 3 views of the application, how many files did your browser download in total? What was the total size of transfered data?

> ![tip] Always use your browser dev tool. It provides a lot of information. For example, you can find a **network** tab:
> ![network-dev-tool] 

#### Files produced:
```
meme-ory/front-end/src/app/scripts/...
meme-ory/front-end/src/app/styles/...
meme-ory/front-end/src/app/views/...
```

### Checklist
- [ ] I can play meme-ory; The application looks 'OK' and works.
- [ ] My application is served at `localhost` with `http-server`

**![commit] commit step**

## Step 1 - The component architecture

topics: **components**, **closures**
Great, everything works. It is now time to dive into the code.
 
At the moment, your project structure look like the following: 

![mvc-architecture]

The previous file structure is a very common practise.... if you are stuck in the 2000's.
If you want your application to be maintainable, you want it to be **component oriented**, 
and promote **separation of concern** rather than **separation of technologies**.

> ![question] Component-oriented programming for the web is considered **more maintainable**. Why?

![component-architecture]

In this step, your job is to refactor your current architecture to match the **component-oriented** architecture above.

At the end, our application have a total of 4 components: 
 - `welcome.component`
 - `game.component`
 - `card.component`
 - `score.component`

For the beginning, let's start together with `WelcomeComponent`:
 - create a folder named `components/welcome`
 - move **[`scripts/welcome.js`](resources/setup/front-end/src/app/scripts/welcome.js) => `components/welcome/welcome.component.js`**
 - move **[`views/welcome.html`](resources/setup/front-end/src/app/views/welcome.html) => `components/welcome/welcome.component.html`**
 - from **[`styles/style.css`](resources/setup/front-end/src/app/styles/style.css)**, move all needed classes for `WelcomeComponent` to **`components/welcome.component.css`**
 - open `components/welcome.component.html`, and update links toward CSS & JS:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>MÈME ory</title>
       <link rel="stylesheet" href="./welcome.component.css"> <!-- <=== HERE -->
       <link rel="stylesheet" href="../../styles/style.css"> <!-- <=== HERE -->
       <link rel="stylesheet" href="../../styles/bootstrap.css"> <!-- <=== HERE -->
   </head>
   
   <body class="...">
   <nav class="...">
       <a class="..." href="#">
           <img class="..." src="../../../assets/logo_take_my_money.png" alt="logo"> <!-- <=== HERE -->
           <span class="...">MÈME ory</span>
       </a>
       <span class="..."></span>
   </nav>
       <!-- ... -->
   
   <!-- link to welcome controller -->
   <script src="./welcome.component.js"></script> <!-- <=== HERE -->
   <script>
       // execute the controller
       var wc = new WelcomeComponent().init();
   </script>
   </html>
   ```

 - open `components/welcome/welcome.component.js`, and replace link toward `GameComponent`:
   ```javascript
   window.location = './game.html?name=' + name + '&size=' + size;
   ```
   by its new future location:
   ```javascript
   window.location = '../game/game.component.html?name=' + name + '&size=' + size;
   ```
   > ![info] In javascript we can use quotes (`'`) and double quotes (`""`) independently. However, using simple quotes is a lot more common practise. 

 - navigate to [http://localhost:8080/src/app/components/welcome/welcome.component.html](http://localhost:8080/src/app/components/welcome/welcome.component.html): The welcome page should look and behave as usual.

> ![info] Component oriented architecture is not only about file structure. 
The most important part is: a component should be **contained** (all required code at the same place), **standalone** (few or no external dependencies) and **reusable**. 

Easy enough, isn't it? Now, go ahead and do the same by yourself for the other `GameComponent`, `CardComponent` and `ScoreComponent`. 
You can search for text `TODO Step 1` to find out all the lines of code you need to change.  

> ![info] Do not search for `card.html`. At the moment, its content is a `<template></template` inside [`views/game.html.js`](resources/setup/front-end/src/app/views/game.html#L35). 
In other words, `CardComponent` does not have a `card.component.html`. 

> ![warning] Do not forget to also move assets to the best appropriate components

#### Files produced:

```
src/app/components/game/card/assets/*.png
src/app/components/game/card/card.component.js
src/app/components/game/card/card.component.css
src/app/components/game/game.component.html
src/app/components/game/game.component.js
src/app/components/score/happy_homer.jpg
src/app/components/score/score.component.css
src/app/components/score/score.component.html
src/app/components/score/score.component.js
src/app/components/welcome/welcome.component.css
src/app/components/welcome/welcome.component.html
src/app/components/welcome/welcome.component.js
```

> ![question] If you look at the source code, all JS file wraps its code into a **closure**: 
> ```javascript
> // card.component.js
> (function() {   // TODO remove closure
>     // source code here
>     // ...
> })();
> ```
> Try to remove the 2 closures from both `card.component.js` & `game.component.js`. What happens? Why?  
> Once figured out, you can just remove that useless malicious code.

> ![tip] Do not forget to use your web browser's development tools!

### Checklist
 - [ ] the 3 views of my application behaves as usual
 - [ ] `scripts/` folder is empty and can be deleted
 - [ ] `views/` folder is empty and can be deleted
 - [ ] `styles/` folder contains a single `styles.css` file
 - [ ] `styles.css` defines no more that global styles (eg: style applied to `<body>`)
 - [ ] I understand why **component-oriented architecture** might be of some help
 - [ ] I understand why closure are needed 
 - [ ] There is no `TODO Step 1` in my code anymore 

**![commit] commit step**

Great, this is a little step toward proper component-oriented architecture, 
but there is still a lot of work to make the code more modern.

## Step 2 - NPM

At the moment, our application uses [Bootstrap 4](https://getbootstrap.com/) as its CSS framework.
You can find bootstrap file in your project at `meme-ory/front-end/src/app/styles/bootstrap.css`.
That means, we copy pasted all the bootstrap code within out application to use it.

In this step, we turn our application into an **npm module**, so that we have a better way to deal with dependencies.

> ![info] With a package manager, it comes easier to add new libraries, and update existing ones. 

### Step 2.1 - Install bootstrap

Let's start: 
 - Create a new NPM module: 
   ```bash
   >$ cd meme-ory/front-end/
   >$ npm init
   ```
   Answer all the questions as you like.
   > ![info] Leave `entry point` blank for the moment. More on that later.
   
 - Locate the `package.json` file that just got generated for you:
    ``` json
    {
      "name": "Meme-ory",
      "version": "1.0.0",
      "description": "",
      "dependencies": {},
      "devDependencies": {},
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "Takima",
      "license": "MIT"
    }
    ```
    > ![info] You just created a NPM module, that is not different from any module in the central registry at
    [www.npmjs.com](https://www.npmjs.com/). Your NPM module relies on this json file, you can find the documentation
    for this file here: [docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json).
 - set your package as private
    ```javascript
    //package.json
    {
      ...
      "private": true,
      ...
    }
    ```
    > ![info] Making it private so we do not accidentally push it to the central repository.

 - Now that we have a package manager, we can use it to install **bootstrap 4**
    ```bash
    >$ npm install bootstrap
    ```
    See, your `package.json` have been updated with the following:

    ```json
    {
       "dependencies": {
           "bootstrap": "^4.3.1"
       }
    }
    ```
    > ![question] By convention, all NPM dependencies use the same 3-digit style version numbers? How is it called? 

    > ![question] What means the `^` symbol next to bootstrap version?

    > ![tip] Never edit `package.json` by yourself. Everytime need to update it, use the `npm` command instead.
    
 - In the other hand, NPM created a **`node_modules`** folder, where it put all the downloaded dependencies
   See by yourself, the `node_modules/bootstrap/` folder, that contains the following content:
   * `dist`: the compiled (optimized) bootstrap files
   * `js`:
       * `dist`: generated bootstrap components. (We won't use it in the tutorial)
       * `src`: original source files. (We won't use it in the tutorial)
   * `scss`: [Sass](https://sass-lang.com/) counterpart of the CSS files. We will see this later.
   
   > ![warning] Do not forget to put the `node_modules/` directory within your `.gitignore`.

   Update your all of your HTML files, so that it uses the `bootstrap.css` found in the `node_modules` folder.
   You can then get rid of the old `styles/bootstrap.css`
    > ![info] you can search for all the `<!-- TODO Step 2.1 -->` left in the code

> ![info] There are alternatives to npm. I recommend using [yarn](https://yarnpkg.com/en/), which is quite notorious and has very good performance:

> ![question] As you can see, `npm install` command also generated a `package-lock.json` file along with `package.json`. What is the purpose of this file? 

### Produced files
```
package.json
package-lock.json
node_modules/
```

### Checklist: 
 - [ ] I deleted the copied `styles/bootstrap.css`
 - [ ] I know how to init a new NPM module
 - [ ] I can install an NPM dependency
 - [ ] My application use bootstrap from `node_modules/`, and still looks as usual
 - [ ] There is no `TODO Step 2.1` in my code anymore 

**![commit] commit step**

### Step 2.2 - NPM scripts

Let's focus a little more on the `package.json` generated previously by `npm init` command.

**See that `scripts` part?**  
From here, you can add various scripts available for developers, to build/test/run your applications. 
At the moment, the only available script is:
```bash
>$ npm run test
``` 
Of course, this script fails because we did not configure any test suite.
> ![tip] Scripts are useful to remember what are the commands to manage your application's development cycle. 
They also serve as a documentation when new developers join your project. Use them wisely.  

##### Your job:
 - Add a new `start` script, that crank-up the http server: 
    ```json
    // package.json
    {
        "scripts": {
           "start": "http-server -c-1"
        }
    }
    ``` 
    This will require you to install the `http-server` dependency as well.
    ```bash
    >$ npm install -D http-server
    ```

    > ![info] the `npm install -D` parameter in `npm install -D` is to install as a **devDependency** rather **dependency**.
    Look at the "devDepencencies" that have been put in your `package.json`.

    > ![question] What is a `devDependency` exactly? What are the differences with a `depencency`?

    Now, you can just `npm run start` to start your front-end.

    > ![info] It's a very common practise to have a `npm run (start|test)` command, it's helpful because developpers don't have to carry what it's under the hood when they join a projet.

### Checklist: 
 - [ ] I know what *npm scripts* are
 - [ ] I can run my application with `npm start` command
 - [ ] I understand the differences between *dependencies* and *devDependencies*

**![commit] commit step**

## Step 3 - ESNext

Right now, our javascript code follows [ES5 specifications](https://www.w3schools.com/js/js_es5.asp). 
As you can see, ES5 was released in 2009, and appears a bit outdated now. 
Time has come to refactor all that mess with new [ESNext bells and whistles](https://github.com/tc39/proposals/blob/master/finished-proposals.md), starting with [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 

> ![tip] Step 3.xxx are only about javascript. There is nothing to change is HTML or CSS files.

### Step 3.1 - ES6 classes

topics: **classes**

At the moment, your legacy code already use classes. 
If you look carefully at the `init()` method of [`game.component.js`](resources/setup/front-end/src/app/scripts/game.js#L45), you can see the following: 
```javascript
for (var i in this._config.ids) {
    this._cards[i] = new CardComponent(this._config.ids[i]);
} //               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

That's true, `GameComponent`, `WelcomeComponent`, `CardComponent` & `ScoreComponent`, they are all classes already, using **`prototye`**.

> ![tip] Think of **`XXX.protoype`** as a place to put anything (typically, any field and function), that will be a member of the `XXX` class. 
A `new XXX()` then inherits from everything placed in the prototype.  

In this step, we get ride of all those vintage ES5-style `prototype`, and replace them by the `class` keyword.
 
Let's take `CardComponent` first as an example, and follow those steps carefully:
 - open `card.component.js`
 - Rewrite function `CardComponent() {...}` to a class `CardComponent`: Replace `function` by `class`, and put function body inside a `constructor() {...}`.
    ```javascript
    // card.component.js // before
    function CardComponent(id) {
        this._flipped = false;
         // [1]
         // ...
    }
    // [2]
    // ...
    ```
    
    ```javascript
    // card.component.js // after
    (function() {
        class CardComponent {   
            constructor(id) {
                 this._flipped = false;
                // [1]
                // ...
            }
        }
        // [2]
        // ...
    })();
    ```
    > ![info] Unlike classes in other languages, javascript offers no encapsulation (`private` / `protected` members). 
    If you want encapsulation, you should consider using [**Typescript**](https://www.typescriptlang.org/) instead of *Javascript* 
    
    > ![tip] Notice that some attributes are prefixed with a underscore. (`this._****`). 
    This is a widespread convention to tell that this property should be considered private. 

 - create the methods: Whenever you see `CardComponent.prototype.XXX = ...`, move the function body inside the class, in a method called `XXX() {}`:
   ```javascript
   class CardComponent {
       constructor(id) {
            // [1]
            // ...
       }

       getElement() {
           return this._elt;
       }

       flip() {
           this._imageElt.classList.toggle('flip');
           this._flipped = !this._flipped;
       }

       equals(card) {
           return card._id === this._id;
       }
   }
   ``` 
 - create the `get` and `set` properties: 
   Whenever you see `Object.defineProperties(CardComponent.prototype, { XXX: { get: ..., set: ... } })`, move the function body inside the class, in a get / set property
   ```java
   get flipped() {
       return this._flipped;
   }
   ```
 
    > ![info] `get area()` and `set area()` are like casual getters / setters that are called through a property access.  
    In other words, it's better to use `get area()` format: 
    > 
    > ```javascript
    > class Shape {
    >     // getters / setters
    >     getArea() { return this._area; }
    >     setArea(area) { this._area = area; }
    >     
    >     // get/set properties
    >     get area() { return this._area; }
    >     set area(area) { this._area = area; }
    > }
    > const s = new Shape();
    > 
    > // the two are equivalent.
    > s.setArea(s.getArea() * 2);  
    > s.area = s.area * 2;
    > ```

- Leave as is all the stuff that does not belong to `CardComponent.prototype`.

Test your application. Does the game still run? Great. Now, refactor all other components to ES6 classes as well.

> ![warning] As a java developer, it might look like Java classes and Javascript classes behave the same. 
This is not true. Do not forget: ES6 `class` is just syntactic sugar over `prototype`, and might produce some edge-cases.

> ![question] Can you think of at least 2 things that are possible with Java classes, but cannot be done with ES6 classes? 

### Checklist
 - [ ] I know how to define ES6 classes
 - [ ] I know they are still `prototypes` under the hood 
 - [ ] I know what get/set properties are
 - [ ] I left no unresolved `// TODO Step 3.1` on my code
 - [ ] I tested the application, and it runs runs as usual 

The code seems much more clean and concise with classes, isn't it? Let's continue our refactor in the next step.  

**![commit] commit step**

### Step 3.2 - ES6 refactor

topics: **`Function.bind()`**, **arrow functions**, **template literals**
Open `game.component.js`, and look at the `gotoScore()` method:
```javascript
function gotoScore() {
    var now = Date.now();
    var timeElapsedInSeconds = Math.floor((now - this._startTime ) / 1000);
    clearInterval(this._timer);

    setTimeout(function() {
            window.location = '../score/score.component.html?name=' + this._name + '&size=' + this._size + '&time=' + timeElapsedInSeconds;
        }.bind(this), 750);
    }
```
This methods waits 750ms before redirecting to the `ScoreComponent`.
Here is a bit of work to do: 
 - Since ES6 introduced `let` and `const`, usage of `var` is deprecated. Here, you need to replace `var` by both `let` and `const`.
   > ![question] What are the differences between `var` and `let`;

 - Concatenate strings is not something we should enjoy in any language. Fortunately, ES6 offers an alternative for that, named **template litterals**.  
   **Instead of this:** 
   ```javascript
    window.location = '../score/score.component.html?name=' + this._name + '&size=' + this._size + '&time=' + timeElapsedInSeconds;
   ```
   you'd better write this:
   ```javascript
    window.location = `../score/score.component.html?name=${this._name }&size=${this._size}&time=${timeElapsedInSeconds}`;
   ```
 - Did you see that callback passed to `setTimeout()`?  
   With ES6's new **Arrow functions**, it becomes much more easier to write anonymous functions or callback functions. 
   Rewrite this with the `() => { ... }` syntax.
   > ![question] What is the `.bind(this)` stuff? What does happen if you remove it? Use your web browser's debugger to guess what happens.
 
   > ![question] The shorten syntax aside, what is the difference between?
   > ```javascript
   > setTimeout(function() { console.log(this._name); }, 750);
   > ```
   > and 
   > ```javascript
   > setTimeout(() => console.log(this._name), 750);
   > ```

Now, go ahead over all the code, and modernize every `var`, every `function() {}` and every string concatenation you can found.

> ![info] You can search for `// TODO Step 3.2` to find out all the places you need to rewrite functions.

### Checklist
 - [ ] I know the differences between `var` and `let`/`const` 
 - [ ] I know about template literals
 - [ ] I can write arrow functions
 - [ ] I know the value of `this` is not always as expected 
 - [ ] I refactored all `// TODO Step 3.2` that I found
 - [ ] The application still runs as usual 

**![commit] commit step**

topics: **map**, **forEach**, **filter**, ...

Last but not least, ES6 offers a bunch of capabilities to make your code more *functional*.
Did you already see that kind of `for -> if`-style loop in your code?
```javascript
const dates = ['2010-06-08', '2009-01-04', '2012-08-07', '2004-09-05', /* ... */];
const oldDates = [];
const longTimeAgo = new Date('2005-01-01');

for (let d of dates) {
    d = new Date(d);
    if (d < longTimeAgo) {
        oldDates.push(d);
    }
}

return oldDates;
``` 

With ES6, we now have a bunch of operators that apply on arrays, to achieve the same operations in a much more cleaner way:
```javascript
const dates = ['2010-06-08', '2009-01-04', '2012-08-07', '2004-09-05', /* ... */];
const longTimeAgo = new Date('2005-01-01');

return dates
    .map(d => new Date(d))
    .filter(d => d < longTimeAgo);
```

##### Your next mission: 
- track dow all those ugly `for` loops, and rewrite them with
[`Array.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ForEach),
 [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map), [`Array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Filter) and [`Array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### Checklist
 - [ ] I can do **functional programming** with javascript 
 - [ ] I refactored all `// TODO Step 3.3` that I found

**![commit] commit step**

## Step 4 - Promises - Async/await

Let's enjoy an other feature of ES6, `Promises` to fight against the callback hell !
Dive into the game component and into the `fetchConfig` method.
The method contains the old way to do an Ajax method, we gonna keep only the method argument `cb` of the method
and the endpoint used to get the config: `${environment.api.host}/board?size=${this._size}`

Yes the other part of this function is tough to read and we want something more readable.

Below it's how to replace all code of the `fetchConfig` method.
```js
return fetch(`${environment.api.host}/board?size=${this._size}`, {method: 'GET'})
        .then(response => response.json())
        .catch(error => console.log('Fetch config error', error));
```

> ![question] What are the advantages of `Promises`?

Lighter right?
But the `cb` argument is missing, instead of calling it we are returning a Promise, so how to handle it in our
`init` method ?
We gonna use an other (better in some cases) way to handle async call.
The async, await way, first you have to declare your method in async way:
```js
async fetchConfig() {
    return fetch(`${environment.api.host}/board?size=${this._size}`, {
      method: "GET"
    })
      .then(response => response.json())
      .catch(error => console.log("Fetch config error", error));
  }
```
And recover the config in the `init` method:
```js
const config = await this.fetchConfig();
```
> ![danger] We cannot call an `async` method from a non `async` method, if you want to call `fetchConfig` from `init` method you also have to convert the `init`
to a async one. 

> ![question] For wich version of ECMAScript async/await has been released?

### Checklist
  - [ ] I converted the old Ajax request with Fetch Api.
  - [ ] I know how to use a promise.
  - [ ] I know how to use async/await.
  - [ ] My game is still running as expected.

**![commit] commit step**

## Step 5 - Babel, transpilation

All all things all good, our code start to look as something clean and modern... 

However, there is still a major drawback: While virtually [all browsers can run ES5 code](http://kangax.github.io/compat-table/es5/),
 [not all web browser are compatible with ES6](http://kangax.github.io/compat-table/es6/) / ESNext (looking at you, Internet explorer ![trollface]).

We have the choice: 
 - write modern ESNext code, that may won't run if your client has an outdated browser
 - write ugly but compatible ES5 code, that is harder to write and maintain.

Fortunately, we have another third choice: Write modern JS code, and let some third-party tool convert it to compatible ES5.
Those kind of tools are called **transpilers**. In this step, let's bring in [**Babel**](https://babeljs.io/)

> ![info] Transpilers are like compilers, that converts some code into some lower-level code rather instead of producing binaries.

##### Your job: 
 - install Babel with NPM
   ```bash
   >$ npm install -D @babel/cli @babel/core @babel/preset-env @babel/polyfill
   >$ npm install core-js
   ```
   > ![question] What does the `@` symbol mean in `@babel/***`?
 - setup the npm `build` script to run babel
    ```json
    // package.json
    {
       "scripts": {
           "build": "babel src -d dist"
       }
    }
    ```
 - create babel `.babelrc` config file just near to `package.json`:
    ```json
    // .babelrc
     {
       "presets": [
         ["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]
       ],
       "plugins": []
     }
    ``` 
 - run babel:
    ```bash
    >$ npm run build
    ```

    > ![question] Look a files produuced within `dist/` folder. How did babel transpiled your class `WelcomeComponent`?

    > ![question] What is the weight of the transpiled sources compared to your original sources?

> ![warning] Do not forget to add to `.gitignore` your `dist` folder.

At this point we would have to run babel each time we do some modification on the code, so that we can test it on the web browser.
As you imagine, this would get really annoying. 
Let's get one step ahead with another powerful tool: **Webpack** 

### Produced files
```
.babelrc
```

### Checklist
 - [ ] I know what a transpiler is 
 - [ ] I can configure babel on my project

**![commit] commit step**

## Step 6 - Webpack & imports

Do you remember the function at the bottom of `game.component.js`?
```javascript
function parseUrl() {
    // ...
}
```
Its purpose is to take all the parameters found in the URL (`window.location`), so the component can load them.
If you remember, this function is also copy-pasted at the bottom of `score.component.js`. 
It would be a great idea to define it once for all, and import it to `game.component.js` & `score.component.js`.

**That's where [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) comes in!**  

### Step 6.1 - import, export

In this step, we will create a new `main.js` file, to ensure `parseUrl` function works properly once imported. 
 - Create a new `meme-ory/src/app/utils/utils.js` file, and paste the `parseUrl` function as follows:
   ```javascript
   export function parseUrl() {
      return result;
   }
   ``` 
   > ![info] The `export` keyword means the symbol `parseUrl` will be public, and can be imported by other files.
 - Remove `function parseUrl()` from `game.component.js`, and instead, write the following at the beginning of the file:
   ```javascript
   import { parseUrl } from '../../utils/utils';
   ```
   > ![info] When a file contains at least one `import` or one `export`, it is automatically considered as an ES6 module. 
   All the symbols defined within that file won't be part of the global scope, and will be encapsulated in that module.
 - Create a new `meme-ory/src/main.js` file, that make use of `parseUrl`: 
    ```javascript
    // meme-ory/src/main.js
    import { parseUrl } from './app/utils/utils';
    
    const parameters = parseUrl();
    
    document.querySelector('body')
        .appendChild(document.createTextNode(JSON.stringify(parameters)));
    ```
    > ![question] What is the difference between `import * from './utils'` and `import { parseUrl } from './utils'`?

 - change your `index.html` to the following:
```html
<!-- src/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>MÈME ory</title>
  </head>

  <body class="d-flex flex-column">
    <script src="./main.js"></script>
  </body>
</html>
```
 - Test the result: go to [http://localhost:8080/src/index.html?value1=someValue1&value2=someValue2](http://localhost:8080/src/index.html?value1=someValue1&value2=someValue2), and open your dev console
    > ![boom] Uncaught SyntaxError: **Unexpected token export** from Chrome or **SyntaxError: import declarations may only appear at top level of a module** from Firefox
 
That's right: even ES6 defines `import` and `export`, and even your browser is up to date, it is not able to execute this statement; 
And, guess what? Transpilers like Babel will be **of no help**.

In fact, by no, it means a browser could be able to import synchronously a file, that is located on a distant server.
For this purpose, it is mandatory to use other tools called **Bundlers**.

### Produced files
```
meme-ory/front-end/src/app/utils/utils.js
meme-ory/front-end/src/main.js
```

### Checklist
 - [ ] I know how to write `imports` and `exports`

**![commit] commit step**

### Step 6.2 - The bundler
topics: **webpack**

Bundlers have several use cases:
 - concat all sources in a single source file
 - optimize source code
 - **resolve imports**
 - ... 

In this step, **[Webpack](https://webpack.js.org/)** will be a bundler of choice:
 - it is configurable with plugins
 - it offers a development server with **live-reload**
 - can be configured with **loaders** to transform your source code. 
 - ... and much more

##### Your job: 
 - add webpack to your project: 
   ```bash
   >$ cd meme-ory/front-end
   >$ npm install -D webpack webpack-cli webpack-dev-server babel-loader html-webpack-plugin file-loader
   ```
   > ![info] `babel-loader` will be used to *babelify* all the source code that goes into webpack
 - edit your `package.json`; change your `build` & `start` script to: 
    ```json
    // package.json
    {
      "scripts": {
         "build": "webpack --config webpack.config.js",
         "start": "webpack-dev-server"
      }
    }
    ```


- create `webpack.config.js` file: 
    ```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
        watch: false,
        mode: 'development',
        entry: './src/main.js',
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        }
    };
    ```
- as you can see our webpack configuration defines `./src/main.js` as the single entrypoint.
  That means, only `main.js`, `utils.js` and `index.html` will be transpiled and will be part of our application.

> ![question] why the `utils.js` will be also transpiled?

  Run the application: 
  ```bash
  >$ npm start
  ```
  ... and see the result at [http://localhost:8080/index.html?value1=someValue1&value2=someValue2](http://localhost:8080/index.html?value1=someValue1&value2=someValue2)
  
  > ![info] Did you see? The new URL is `localhost:8080/index.html` rather than `localhost:8080/src/index.html`. Webpack produces an in-memory file called `/index.html`, 
    that automatically links to the newly created bundle.   
  
  Look at the source of `index.html` in your web browser: 
  file `main.js` is not found (you can remove it from `index.html`), but instead a file `bundle.js` is served and contains all your source code ![tadaa]. 

> ![question] What does the `webpack --config webpack.config.js` do ?

> ![question] What does the `webpack-dev-server` do ?

> [info] Only the files that are imported by `main.js` are part of the bundle.

> ![tip] Did you notice your browser automatically live-reload each time you change `main.js` or `utils.js`?

> ![info] Where did the `dist/` folder go? In fact, webpack is able to keep everything in memory, to transpile and serve your files as fast as possible.

### Produced files
```
meme-ory/front-end/webpack.config.js
```

### Checklist
 - [ ] I understand why bundlers are mandatory
 - [ ] I know how to configure webpack
 - [ ] I have some clues on all the magic webpack can do

**![commit] commit step**

### Step 6.3 - The source maps

Did you get into your transpiled code? Did you managed to locate where your sources are?

> ![tip] At the moment, your bundle is located in webpack's memory only. You cannot open it via your file manager. If you want to observe it, use your browser's development console. 
>
> - put a `debugger` statement at the first line of `parseUrl`:
>     ```javascript
>     export function parseUrl() {
>         debugger; // <---
>         const url = window.location.href;
>         
>         // ...
>     }
>     ```
> - press F5 on your web browser, and see your debugger stop at a bunch of transpiled code mess that you don't even want to read.

On my setup, the `parseUrl` function looks like this:
```javascript
function parseUrl() {
  debugger;
  var url = window.location.href;
  var query = url.split('?')[1] || '';
  var delimiter = '&';
  return query.split(delimiter).map(function (p) {
    return p.split('=');
  }).reduce(function (acc, kv) {
    acc[kv[0]] = kv[1];
    return acc;
  }, {});
}
```
 
Of course, bundlers would have no point if we are not able to debug properly the produced code. 
In this step, before leaving, lets enable another webpack feature to produce **sourcemap**

> ![info] A sourcemap is some data read by the web browser so that it can recover the original source code from transpiled source code while debugging. 

 - Open your `webpack.config.js`, and put the following
    ```javascript
    // webpack.config.js
    
    module.exports = {
        devtool: 'cheap-module-eval-source-map',
        
        // ...
    }
    ```
 - press F5 on your web browser: See the debugger is now stopped on some
> ![info] Sourcemap can be separate files `main.js.map`, or inlined directly inside the transpiled source code. 

> ![warning] Never produce sourcemaps when you are going in production. Otherwise, not only you produce an unnecessary bug bundle, you give your clients the key to reverse engineering your application.   

> ![info] You can produce sourcemaps for any language of the web (javascript, typescript, css, coffescript, ...).

### Checklist
 - [ ] I understand why bundlers are mandatory
 - [ ] I know how to configure webpack
 - [ ] I have some clues on all the magic webpack can do

**![commit] commit step**

## Step 7 - SPA

At the moment, webpack does not care of our components. As a result, `game.component.js`, `welcome.component.js`, `card.component.js` and `score.component.js` are all ignored.
Now, we need to wire-them up through a bunch of `import` so they are part of the bundle.

Let's summarize what we have at the moment:
 - 3 components: basically 3 different full-blown HTMLs pages
 - tied to 3 different URLs,
 - each HTML choose its own *JS* and *CSS*. 
    - `<link rel="stylesheet" href="***.css">`
    - `<script src="***.js"></script>`
 - we have to `import` javascript so that it is integrated to the bundle
 - we cannot `import` from HTML files
  
![multi_page]

> ![info] From the schema above, notice that it's up to the HTML to choose its CSS/JS

One big question still remains unanswered: 
**How to write imports between components, JS, HTML & CSS so that everything is part of the bundle?**
 
The challenge of this step is to transform our current components so that our application becomes a **Single Page Application** (*SPA*). 

Here are the core principles of an *SPA*:
 - Our application have a shell (ie: the common navigation controls).
 - There is a unique **Single HTML page** (`index.html`), loaded once, that displays the shell.
 - `index.html` loads some javascript. 
 - The application has a **router**
 - The router listens to URL changes and patches the page to show the component that matches the current URL.
 - The application is then **driven by JS not HTML**.
 
In other words, it's up to the JS in place to display its associated HTML template, not the HTML to load its javascript.
![single_page]

Let's get started!
- To begin with, copy the file [`resources/router/router.js`](resources/router/router.js) into your `utils` folder.
    This file declares the router that will display components according to the current URL.
    > ![info] As you can see with router's `_renderComponent` method, the router will call any `Component.init()` method if it exists.

- let's give `CardComponent` its own html file.  
    In `game.component.html`, you will find the `<template></template>` that defines the view for `CardComponent`:
    ```html
    <main class="card-cmp">
        <div class="card-wrapper">
            <img class="card front-face" alt="card">
            <img class="card back-face" alt="card" src="./card/assets/back.png">
        </div>
    </main>
    ``` 
    Move the content of this template within its own `card.component.html` file.
    > ![warning] Do not forget to update `<img src="...">` from `"./card/assets/back.png"` to "`./assets/back.png`"

- Create the shell in `index.html`.  
    > ![tip] We call **Shell** all the navigation and controls that remains unchanged from one page to another. In our application, this means the **top nav** (`<nav class="navbar ...">`, and the **footer** (`<footer>`))
    
    At the moment, all of our `welcome.component.html`, `game.component.html` & `score.componet.html` display their own shell. 
    Move all the common elements (`<body>`, `<head>`, `<nav>`, `<footer>`, ...) in `index.html`, **and drop all the `<script>` and `<link>` tags**.
    ![shell-html]

    > ![info] As you can see, there is now no more link between HTML and its JS/CSS

- Add the "*outer outlet*" to `index.html`.  
    ```html
    <!-- index.html -->
    
    <!-- ... -->
    <div class="container-fluid flex-grow-1 overflow-auto">
        <div id="content-outlet"></div>     
    <!-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  HERE -->
    
        <footer class="navbar position-absolute fixed-bottom bg-dark">
            <span>&copy The MÈME ory corporation | 2019</span>
        </footer>
    </div>
    <!-- ... -->
    ```
    This is where our router will put components into.

- Rewrite all our `**.component.js` to be ES6 modules.
    Every time you see `window.XXXComponent = XXXXXXComponent`, `export` that component so it can be `imported` elsewhere:
    ```javascript
    // xxx.component.js
    
    export class XXXComponent {
        
    }
    ```
    > ![info] Closures are not necessary anymore when we have ES6 modules. It's time to drop them all. 

- We should give our components a way to display their respective HTML and CSS:  
    - copy file [`resources/component/component.js`](resources/component/component.js) into your `utils/` folder.
        It defines a `class Component {}` with the following methods:
          - `getTemplate()`: returns the template associated with this component.
    - let your `XXXComponent` classes extend the `Component` class defined above.
        > ![warning] Do not forget to `import {Component} from '../../utils/component'`
        
    - call `super()` constructor with a name. This name will be used by `Component` to create a tag `<name>`
    - make all `xxx.component.js` import its own html.
        ```javascript
        import template from 'xxx.component.html';
        ```
     It can then returns this template in the `getTemplate()` method.
    - make all `xxx.component.js` import its own css.
        ```javascript
        import 'xxx.component.css';
        ```
    > ![tip] See [`welcome.component.js`](resources/component/welcome.component.js),
    [`game.component.js`](resources/component/game.component.js),
    [`card.component.js`](resources/component/card.component.js) 
    and [`score.component.js`](resources/component/score.component.js) as an example.
    
    > ![tip] In no way it is legit to import HTML in javascript. 
    It can only be done because webpack have some loaders to process our imports and rewrite it to something legit.  
- Configure webpack with the `html-loader` and `css-loader`. 
    They make the `import template from './xxx.component.html';` above possible:
    - install `html-loader` & `css-loader`
    ```bash
    >$ npm install -D html-loader style-loader css-loader sass-loader node-sass
    ```
    - add the following in `webpack.config.js`
    ```javascript
    // webpack.config.js
    
    module.exports = {
        // ...
        module: {
            rules: [  
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'link:href']
                        }
                    }
                }
                // ....
            ]
        }
    };
    ```
- Lastly, open the `main.js` file. Because it is the entrypoint of our `webpack.config.js`, 
    it is of its responsibility to load all the components of our application. Replace its content by the following:
    ```javascript
    import 'bootstrap/dist/css/bootstrap.css';

    import { Router } from './app/utils/router';
    import { WelcomeComponent } from './app/components/welcome/welcome.component';
    import { GameComponent } from './app/components/game/game.component';
    import { ScoreComponent } from './app/components/score/score.component';
    
    const outlet = document.querySelector('#content-outlet');
    
    const router = new Router(outlet)
        .register('', WelcomeComponent)
        .register('game', GameComponent)
        .register('score', ScoreComponent);
    ``` 
    The code above tells the router to load `GameComponent` and `ScoreComponent` when respectively paths `game` and `score` are fetched.
    > ![info] We do not give `WelcomeComponent` a path, because we want it to be loaded at the root of our application.
    
     - Go to `welcome.component.js`, and change the function `_startGame` with following path:
        ```javascript
        // welcome.component.js
        function _startGame(name, size) {
            window.location.hash = `game?name=${name}=name&size=${size}`;
        }
        ``` 
     - Go to `game.component.js`, and change the method `gotoScore()` with the following:
        ```javascript
        // game.component.js
        gotoScore() {
            const timeElapsedInSeconds = Math.floor((Date.now() - this._startTime) / 1000);
    
            setTimeout(() => window.location.hash = `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`, 750);
        }

Phew, that was tough! 
At the end of this step, you should be able to play the game as usual, and the 3 components should render without any errors.
 
> ![question] Play the whole game with `size=2`. While going through the 3 views of the application, how many files did your browser download in total? What was the total size of transfered data? 

### Produced files
```
meme-ory/front-end/src/main.js
meme-ory/front-end/src/index.html.js
meme-ory/front-end/src/app/utils.router.js
meme-ory/front-end/src/app/components/game/card/card.component.html
```

### Checklist
 - [ ] My application is now an SPA.
 - [ ] I left no unresolved `// TODO Step 7` in my code
 - [ ] My application runs as usual
 - [ ] All my HTML, JS and CSS code is now **bundled** within a single js file

**![commit] commit step**

## Step 8 - Style the application

Last step was a bit rude. Do not worry, this step is a lot more fun, as we gonna play with style and colors!

Did you remember from previous step the following lines in `webpack.config.js`?
```javascript
module: {
  rules: [
      {
          test: /\.(scss|css)$/,
          use: [
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
      },
      ...
  ]
  ...
}
```

With those lines, we are giving the ability to webpack to write `import some-style.css` right from our javascript files.
This way, our components have the power to pull their respective css, so it's not the HTML's job anymore.

> ![question] Can you guess how `style-loader` works exactly?

In this step, we go a little bit further, and leverage the power of [Sass](https://sass-lang.com/) to enhance our stylesheets.

> ![tip] Another language we have to learn ![weary]? Do not worry. A valid `.CSS` file is also a valid `.scss` file.

First, the boring and fastidious step: convert all your `*.css` files to `*.scss` file.
 - rename all `***.css` to `***.scss`
 - replace all `import "***.css"` to `import "***.scss"`
 - ...and that's all!

Of course, at the moment, we take no advantage of SASS. See you at next step.

### Produced files
```
front-end/src/app/styles/style.scss
front-end/src/app/components/score/score.component.scss
front-end/src/app/components/welcome/welcome.component.scss
front-end/src/app/components/game/card/card.component.scss
```

### Checklist
 - [ ] I have converted all my css files to sass files.
 - [ ] I can import `.scss` files from JS files
 - [ ] I understand the magic behind **webpack loaders**
 - [ ] My application still has some style! 

**![commit] commit step**


### Checklist

**![commit] commit step**

> ![tip] **A not about web design**: As a rule of thumb, we try to keep a uniform style across all displayed elements: Have only few colors, 
and a restraint common set of styles (shadow, borders, animations, ...). 
If you use too many various style, your application won't be coherent and will suffer of bad UX (User eXperience)

> ![tip] If you are interested in application **UI** (User Interfaces) and **UX** (User eXperience), you **must** have a look to google's [Material Design](https://material.io/design/) 

## Step 7.1 Sass variables.

What is your current main color? You know, that blue-ish color on the top nav bar... its `#007bff`
![style-debugger]

Would you remember? I guess not...

One of the immediate benefit of sass is that we can set this once for all in a **sass variable**:
- create a file `styles/_colors.scss`
 > ![question] What does the `_` prefix means on a sass file?

- define all the color variables you will use across all your application.
    > ![tip] __My good advise__: Start by defining a `primary` color and a `secondary` color. Those colors are usually [**complementary**](https://www.w3schools.com/colors/colors_complementary.asp)

    `./src/app/style/_colors.scss`  
    ``` sass
    /* https://flatuicolors.com/palette/defo */
    $primary: #8e44ad;
    $primary-light: #9b59b6;
    $primary-txt: #ecf0f1;
    $primary-txt-shadow: #95a5a6;
    $primary-background: #34495e;
    ```
    > ![info] Feel free to customize the styles above  
    
    > ![tip] __Pro tip__ Never write a CSS class `.background-red` or a variable `$blue`. 
    Tomorrow, you may want to turn those color `green`, and you dno't want to rename everything.
    
    > ![tip] If you lack of inspiration or good tastes, you can pick colors from a predefined palette: [https://flatuicolors.com/palette/defo](https://flatuicolors.com/palette/defo)

- go ahead in `score.component.scss`, import your palette: 
    ```scss
    // score.component.scss
    @import "../styles/_colors.scss";
    
    // ...
    ```
    Now, you can use variables from `_colors.scss` within `core.component.scss`.

- and customize the view on your own. The final result may look like the following:

![score-component-styled]

- make sure all other `scss` files that uses colors import them from `_colors.scss` as well.  


### Produced files
```
front-end/src/app/styles/style.scss
front-end/src/app/styles/_colors.scss
```

### Checklist
 - [ ] I cam `@import` **sass** files from other **sass** files

**![commit] commit step**

### Checklist

## Step 7.2 Nested blocks

Let's use a bit more of sass feature! 

Go to `card.component.scss`, and see: we have many times `.card-cmp .card-wrapper`, this is kinda boring to write and read:
``` sass
// card.component.scss
.card-cmp {
  position: relative;
  display: inline-block !important;
  width: 14%;
}

.card-cmp .card-wrapper {
  position: relative;
  transform-style: preserve-3d;
  transition: all .5s;
}
// ...
```

With Sass, you can now nest your blocks within other blocks. As an example, `card.component.scss` can be rewritten as follows:

``` sass
// card.component.scss
.card-cmp {
  position: relative;
  display: inline-block !important;

  width: 14%;

  .card-wrapper {
    position: relative;
    transform-style: preserve-3d;
    transition: all .5s;
  }
}
// ...
```

On your own, refactor all your `.scss` files to use nested blocks.

> ![tip] A mistakes happens quickly. I recommend to check the result each time a component is refactored.

> ![info] You can find much more sass feature from the docs: [https://sass-lang.com/guide](https://sass-lang.com/guide)

### Checklist
 - [ ] I used the nesting sass feature on my components
 - [ ] All my css files are deleted
 - [ ] My application still looks great

## Step 7.2 Add bootstrap with Webpack

We told you earlier, our application uses [bootstrap 4](https://getbootstrap.com/).

At the moment, we use a transpiled `css` version of bootstrap, as you can see from your `index.html`: 
```html
<!-- meme-ory/src/index.html -->
<link rel="stylesheet" href="../node_modules/bootstrap/dist/css">
```
> ![info] By now, this should be the only place that imports bootstrap

You can remove that line right now, as in this step we will rather make use of the `scss` version of bootstrap.
Bootstrap sass defines a set of variable by default ([default colors](https://github.com/twbs/bootstrap/blob/v4.3.1/scss/_variables.scss#L69), [default dimensions](https://github.com/twbs/bootstrap/blob/v4.3.1/scss/_variables.scss#L278), ...)
By using CSS, we can customize bootstrap right before transpiling it to css, so that we don't have to override bootstrap's generated styles.

> ![tip] The `!default` in [bootstrap sources](https://github.com/twbs/bootstrap/blob/v4.3.1/scss/_variables.scss#L69) means: 'Hey, sass: use that value for variable `$primary` unless someone already sat it.'

- Remove the bootstrap import from `index.html`
- Navigate to [http://localhost:8080/#](http://localhost:8080) and see your application is missing some styles.
- Go to `meme-ory/front-end/src/styles/styles.scss`, and import bootstrap at the very first line of the file
    ```scss
    @import "~bootstrap/scss/bootstrap";
    ```  
    Check that bootstrap styles are back!
- Now, before the `@import` line, define the `$primary` color to what you prefer.
    > ![tip] you can `@import` it from `_colors.scss`.

![tadaa] Tadaa, you can tell bootstrap what color scheme it should use!

### Checklist
 - [ ] I know what means `~` symbol.
 - [ ] I have only one import of bootstrap and my style is not broken.

**![commit] commit step**

## Step 8 Additional features

> ![info] The next steps are all optional. Feel free to skip them if time is running out. 
If you have time however, I bet you will enjoy them, as you will have to use on your own everything we learned so far to develop some really cool features!

It's time to let you dive yourself into the code, be free to make your own style and create new component if you think you need new one.
Keep in mind all the good practices we explain you previously or in the course, and use them to create beautiful code !

### Step 8.1 LocalStorage

In this step, our goal is to preserve our game's state even if we exit the browser or the user reload the page.
You can achieve that by using the native [`window.localStorage` api](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),
but we will rather use mozilla's [localForage](https://github.com/localForage/localForage) library, that works like an asynchrounous localStorage.

> ![info] Localstorage allows to store any data directly to the user's browser.

> ![info] Web storage is per origin (per domain and protocol). No other website can access what you store in the `localStorage`.  

> ![tip] You will need to install the [localForage](https://www.npmjs.com/package/localforage) npm package

Your job: 
 - Each time the player flips a card, you need to store the current state (ie: the cards array, the elapsed time, ...) into the storage.
 - When the game is over, you can clean the storage
 - When `GameComponent` loads up, you need to check first if a previous game was saved, or use the `fetchConfig()` otherwise.

Use the Promise style with the LocalForage library:
``` js
localforage.setItem('key', 'value').then(() => {
  return localforage.getItem('key');
}).then((value) => {
  // we got our value
}).catch((err) => {
  // we got an error
});
```

### Checklist
 - [ ] When I reload the `GameComponent`, my game state is not lost
 - [ ] I know how to use web storage.

**![commit] commit step**

### Step 8.2 Multiplayer scores

If you checked the [Back-end's api docs](http://localhost:8081/api-docs/) maybe you have seen two endpoints that are not used in the tutorial:
``` js
[POST]  /scores   Save score on the server.
[GET]   /scores   Return a json of all scores saved
```

Your goal is to post the player score at the end of the game and to fetch 
all scores saved to le `ScoreComponent` print a beautifull **hi-scores** top.

Example to fetch all scores:
```javascript
//Fetch API
const scores = await fetch(`${environment.api.host}/scores`, {method: 'GET'})
                      .then(response => response.json());
```

Example to post a score:
```javascript
//Fetch API
  await fetch('http://localhost:8081/scores', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: 'Toast', time: 2, size: 3})
  });
```

You can learn more about the difference methods available on the web:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

## The end

Congrats, you now have a working ![heart] Meme-ory app ![heart] !

Check your achievements with the [following test](https://docs.google.com/forms/d/e/1FAIpQLScjhXdaYV48uRRaVG_5ZYOFlWhLjGzIty3SCZJRe0ApnUpe9A/viewform?usp=sf_link)

Ready to follow up? Get started for next [![angular 01]](https://master3.takima.io/master3/angular-01) module.  

## Troubleshoot

Any specific troubles? Keep us updated and we will add those here.

# Contributors
 - Logan LEPAGE <[llepage@takima.fr](mailto://llepage@takima.fr)>
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>
 - Pierre-Quentin WARLOT <[pqwarlot@takima.fr](mailto://pqwarlot@takima.fr)>
 - Alexis PURET <[apuret@takima.fr](mailto://apuret@takima.fr)>
 - Nicolas THIERION <[nthierion@takima.fr](mailto://nthierion@takima.fr)>

### Mentors
 - Alexandre NUNESSE <[anunesse@takima.fr](mailto://anunesse@takima.fr)>

| <sub>contact us: <[formation@takima.io](mailto://formation@takima.io)></sub> | <sub>© Takima 2019</sub> |
| --- | ---:|

[milestone-status]: https://master3.takima.io/.assistant/badges/milestone-status?milestoneId=40
[Web 01: 10 credits]: https://img.shields.io/badge/web_01-10_credits-red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA0AB8AKD7i/b6AAAACXBIWXMAACE4AAAhOAFFljFgAAAAB3RJTUUH4gsbFCYzALEYOAAAAzNJREFUSMedlltoz2EYx7+/zchspuXY/iShnAljYiaUQ4gLSty4kFwosXKhkEtalMMds5mSRORGcmou0HJMccHmEDk1bMM2Pm6enx5vv//+/3nq7Xd4Dt/3eZ/D+0gZqCG16e87UACMB/YB94EWW4+AKmAykK//oQBoGLALuEtmugpMC21kCzQcOA900j36DZR1CRozgGJgLXCjC4MfgHt2rO+7kJuRCawMeJph95uAEqCfrRSwHHieINsAFCV6CcxOUPBH2QosSBcKoAdwzo7T06Ik4TKgIxB8CTS67yonnwcsAEoTbG0N7NT/E0sgH7geCLUCGwMPc02+v8Wt09YTYLAPD1AZeDrS72hKwlFWAkuc0jMn/zhNbGcFntY43lnP2B8o3rD/yxxgvZPvANqAE1ZzMTUCA10C5gJ3jPcFGBozHgSApfZ/iDvSJgdYC8xz39VOd3eQ9XOAdtv45vjnV6fQBAx0xk46XrGr01wnM89trCOIZQ5wy3jXgFyZuzHdBQrN0Epgh+NVp6nduUFyVQSxXO14w2QdwwOWA58SkuInsDow1hc4HcjtTCiVduMdlHX+mJptpaM24DKwBziaJmPPJPTkY8Z7JWBCFwC/gO/AjwztrtnJ3HZAQ+25JBbMkfRCUkNCt2qXVClpoqTpkqokdRrvjaS3kp5LqpM0X1Iv4/VwNqYCPb39nCiKWiRdSgA8HEVRlaQJklZEUbRNUo3xHkoaJ2lyFEXrJPmif+3ex0jqa5tvlvQhxxjHJBEAvrHnO0l7gUmSLkr6LWmmpKIoir6ZzHand9O9l0rqLemXpFZJF3x6nwri8tGKOq6jFLDG4kp8qwOrgr5Z7GL4GRhho0kTMDasqSOW/p1mJE6aVcav870TKAzGjrMObKm1wVEmdwDISyrklO16C7A+7jx28cbetVt21wY3zDgHeNN52BMYntUwBfQBLjkwrDGEN7y/L8fYSTUCJZkAUqZQDhwMgNJRfdBDD9n/K0BBJsCKbk5oV4E+Tn+0DWAbgEFZjYjA4izBHsfN3gEWJY2c2YAuBG6nAXoP7A11/DMrsITjLbRL9LgNVS8tewd0ywtHfwA7LOPX/9An6gAAAABJRU5ErkJggg== "Web 01"
[react module 01]: https://img.shields.io/badge/react_01--react.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=react "react module 01"
[angular module 01]: https://img.shields.io/badge/angular_01--angular.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=angular "angular module 01"

[javascript advanced]: https://img.shields.io/badge/JS-%E2%98%85%E2%98%85%20%20-yellow.svg?longCache=true&style=for-the-badge&logoColor=ffffff&logo=javascript
[angular 01]: https://img.shields.io/badge/angular_01--red.svg?longCache=true&style=for-the-badge&logoColor=ffffff&colorA=0e6dc5&colorB=59a5ec&logo=angular

[es6]: .README/icons/es6.png
[babel]: .README/icons/babel.png
[webpack]: .README/icons/webpack.png
[sass]: .README/icons/sass.png
[bootstrap]: .README/icons/bootstrap-64x64.png
[npm]: .README/icons/npm-64x64.png
[yarn]: .README/icons/yarn-64x64.png

[game mockup]: .README/mockup.png
[welcome screenshot]: .README/meme-ory-1.png
[mvc-architecture]: .README/mvc-architecture.png
[component-architecture]: .README/component-architecture.png
[frameworks_battle]: .README/frameworks_battle.jpg
[single_page]: .README/single_page_application.png
[multi_page]: .README/multiple_page_application.png
[style-debugger]: .README/style-debugger.png
[shell-html]: .README/shell-html.png
[score-component-styled]: .README/score-component.png
[network-dev-tool]: .README/chrome-dev-tools-network.png

[info]: .README/info.png
[warning]: .README/warning.png
[tip]: .README/success.png
[danger]: .README/danger.png
[error]: .README/error.png
[TODO]: .README/error.png
[question]: .README/question.png
[troubleshoot]: .README/error.png
[boom]: .README/smileys/boom_14x14.png
[commit]: .README/commit.png
[tadaa]: .README/smileys/tadaa_14x14.png
[heart]: .README/smileys/heart_14x14.png "heart"
[weary]: .README/smileys/weary_14x14.png
[trollface]: .README/smileys/trollface_14x14.png