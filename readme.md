# Space Intruders
> A simple game to help you learn JavaScript (and the exciting world of game development), based on an early classic.

![License](https://img.shields.io/badge/license-MIT-green)

## Introduction

JavaScript is the most important computer programming language on the Web. It's not the only one, but all browsers include the "engine" to run JavaScript code for websites. You may have heard about other Web languages such as TypeScript. But in modern browsers, even if you use another language, it would need to be "transpiled" (basically, converted) to JavaScript using other tools before it can be run in a browser.

Most sites also have part of the code on the server, where there is a much larger variety of supported languages. Node.js is one very popular language that can run on the server. Actually, both JavaScript and Node.js are the same language -- each with their own extensions to run properly in each of their environments. So JavaScript isn't really the language. It's often called that because it was initally only used in browsers, so the common name stuck. The actual language is called [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript), and is standardized by a dedicated panel of industry professionals.

The [Phaser3](https://phaser.io/phaser3) game engine is a library for the JavaScript side of things -- the browser. Sure, it can make use of server software, but games are very visual and UI-centric, so most of the code is written for the browser. I've found that the best way to learn a new language or any software technology is by diving in and using it. But I've always found the typical sample applications used for teaching pretty boring -- to-do lists, blogs, Twitter simulations, etc. But making a game not only makes it a lot more fun and motivating, you get to learn two things at once!

That's why I've decided to teach JavaScript by building a game using the very popular and feature-rich JavaScript game engine, Phaser3. Go ahead and check out the site. I'm sure it will get you as excited about making games as it made me. But it can also get overwhelming. There are so many features, so many examples, and a huge API (library full of functions to do all kinds of things in your games). But my goal is to walk you through it slowly, teaching you both JavaScript and game development by taking it one step at a time. As we progress, more and more of the game will come alive, and by the end (there's never really an end), you'll be itching to add your own features and enhancements!

The project in this folder is the completed portion of the game for the first lesson. Of course, the game is not complete. Just the initial stages are set up in this lesson. But I hope it will make you hungry for the next stages.

## Prerequisites / Initial Installation

You'll need [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

>**Node.js** is essentially JavaScript for the server. We need to install it because a lot of the "build" processes for the game is run using Node code under the hood.

You can install the latest stable version from [this link](https://nodejs.org/). Install the version marked "Recommended For Most Users."

>**npm** stands for **Node Package Manager**. It's a utility built with Node. There's no need to install it separately. It gets installed alongside Node. It's used for installing other, usually 3rd-party, JavaScript libraries we're going to need for creating our game.

>**Parcel** is a Web Bundler software package. You don't need to know much about it for now, but click the link, above, if you're interested. Basically, it's a key component for "building" and "compressing" our game before we can run it. You may have heard of **webpack**, which is in the same category. **Parcel** is newer.

After installing Node, you can install Parcel by entering the following command in a *command line interface* (aka *CLI*) for your operating system. On Mac and Linux, that would be called `terminal` or something similar. For Windows, that would be the command prompt (`cmd`) or **PowerShell**. The -g switch tells the system to install it "globally" so that any project you work on from your computer can use it:

```bash
npm install -g parcel-bundler
```

## Getting Started

In order to get all the source code for this lesson, you can either download the ZIP file from [this link](https://github.com/markfreedman/space-intruders/), or if you're familiar with [git](https://git-scm.com/) and [GitHub](https://github.com) you can "clone" this repository to your machine by running this command from the parent folder on your computer where you want to store all the software you're developing as subfolders:

```bash
git clone https://github.com/markfreedman/space-intruders.git
```


This will create a folder named `space-intruders` inside the parent folder you chose. You can specify a different folder name like this:

```bash
git clone https://github.com/markfreedman/space-intruders.git my-folder-name
```

>Although it's beyond the scope of this tutorial, GitHub is what is known as a "centralized" code repository -- where software code and a version history of the software can be stored -- that's publicly available on the Web. It's used with the **git** tool (either from the CLI or from a GUI software app).You would work on a project on your machine, and you'd save your code into your "local" repository. You would also "synchronize" your local repository with GitHub, which is great for sharing code when working on a team. It's also a great backup. It's a fascinating (IMO) and extremely valuable tool, and you may want to click the above links to explore it.

Then, go into your new project folder and install its "dependencies" -- the tools you'll need to build and run the game:

```bash
cd space-intruders # or 'my-folder-name'
npm install
```

Then, by running the next command, you'll be building a "development" version of the game, and a local "development" server will start to run on your machine. The output of this installation will show you the local URL where you can run the game from:

```
npm run start
```

>Don't cancel it after the output shows it's completed. If you need to use the CLI for anything else, you should open a new instance of the CLI.

While this is running, whenever you modify the code, it will automatically see that it changed, and will refresh the page for you.

If you ever decide to build a version that you want to host publicly (in "production"), you can use this command to create a production build:

```
npm run build
```

It won't continue running after it builds. "Production" files will be placed in the `dist` folder. Then you can upload those files to a web server and run it from the public URL.

## Project Structure

JavaScript files are placed in the `src` folder. `main.js` is the "entry point" referenced by `index.html`. `index.html` is the main Web file sent to the browser when you navigate to the root URL of your game. `package.json` is the file where we specify all of our code dependencies (libraries), as well as where we define some shortcut commands we'll often use, like we did earlier (the commands that start with `npm run`). Other configuration settings are placed in this file as well, but are beyond the scope of this first tutorial.

```
    .
    ├── dist
    ├── node_modules
    ├── public
    │   ├── images
    │   │   ├── aliens.png
    │   │   ├── barrier.png
    │   │   ├── base.png
    │   │   ├── deep-space.jpg
    ├── src
    │   ├── scenes
    │   │   ├── Game.js
    │   ├── index.html
    │   ├── main.js
    ├── package.json
    ├── (other development support files)
```

## Static Assets

Any static assets like images or audio files would be placed in the `public` folder. Our initial game images are now there. If you use the default development server configuration, image assets, for example, will then be served from http://localhost:8000/images/. They can then be loaded by Phaser with code like this: `this.image.load('my-image', 'images/my-image.png');`

Example `public` structure:

```
    public
    ├── images
    │   ├── my-image.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

>The rest of this document contains more advanced technical details you don't have to worry about for now.

## Class Properties Support

The .babelrc configuration file includes modern JavaScript class property support by using `@babel/plugin-proposal-class-properties`.

## ESLint
The .eslintrc.js configuration file sets `babel-eslint` as the parser for ESLint. The configuration uses a basic `eslint` set up for code linting to help you find and fix common problems in your JavaScript code.

[See here for how to turn linting rules on or off](https://eslint.org/docs/rules/).

## Dev Server Port

You can change the development server's port number by modifying the `start` script in `package.json`. We use Parcel's `-p` option to specify the port number. The script looks like this:

```
parcel src/index.html -p 8000
```

Change 8000 to whatever you want.

## Other Notes

[parcel-plugin-clean-easy](https://github.com/lifuzhao100/parcel-plugin-clean-easy) is used to ensure only the latest files are in the `dist` folder. You can modify this behavior by changing `parcelCleanPaths` in `package.json`.

[parcel-plugin-static-files](https://github.com/elwin013/parcel-plugin-static-files-copy#readme) is used to copy static files from `public` into the output directory and serve it. You can add additional paths by modifying `staticFiles` in `package.json`.

## License

[MIT License](https://github.com/markfreedman/space-intruders/blob/master/LICENSE)