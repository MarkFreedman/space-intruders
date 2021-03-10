# Space Intruders
> A simple game to help you learn JavaScript (and the exciting world of game development), based on an early classic.

![License](https://img.shields.io/badge/license-MIT-green)

## Prerequisites / Initial Installation

You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed. **Node.js** is essentially JavaScript for the server. We need to install it because a lot of the "build" processes for the game is run using Node code under the hood.
>**npm** stands for **Node Package Manager**. It's a utility built (and installed along) with Node. It's used for installing other, usually 3rd-party, JavaScript libraries we're going to need to write our game. 

>**Parcel** is a Web Bundler software. You don't need to know much about it for now, but click the link, above, if you're interested. Basically, it's a key component for "building" and "compressing" (to save space and load time) our game to run.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (**nvm**) to install **Node.js** and **npm**. **nvm** is what we use on Mac OS and Linux. For Windows, use [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

>Although it's not necessary to completely understand **nvm** now, you may be interested in learning about it by clicking the link, above. Basically, it's used to help install, control, and switch versions of **npm**.

Then install **Node.js** and `npm` with `nvm` by entering these commands in a *command line interface* (aka *CLI*) for your operating system. On the Mac and Linux, that would be called `terminal` or something similar. For Windows, that would be the command prompt (`cmd`) or **PowerShell**.

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

Then install Parcel. The -g switch tells the system to install it "globally" so that any project you work on from your computer can use it:

```bash
npm install -g parcel-bundler
```

## Getting Started

If you're familiar with [git](https://git-scm.com/) and [GitHub](https://github.com) you can "clone" this repository to your machine, or you can download the ZIP file. Although it's beyond the scope of this tutorial, GitHub is what is known as a "centralized" code repository (where software code and versions of software can be stored), publicly available on the Web. It's used with the **git** tool, which is what you would often use on your machine to save your code and versions of your code into your "local" repository on your machine. **GitHub** is where you would "synchronize" your local repositories with, and is great for sharing code when working on a team. It's also a great backup. It's a fascinating (IMO) and extremely valuable tool, and you may want to click the above links to explore it. So, if you want to clone the game, run this command from the parent folder on your computer where you want to store all the software you're developing:

```bash
git clone https://github.com/markfreedman/space-intruders.git
```

This will create a folder named `space-intruders` inside the parent folder you chose. You can specify a different folder name like this:

```bash
git clone https://github.com/markfreedman/space-intruders.git my-folder-name
```

Go into your new project folder and install dependencies (the tools you'll need to build and run the game):

```bash
cd space-intruders # or 'my-folder-name'
npm install
```

Then by running the next command, you'll be building a "development" version of the game, and then a local "development" server will run on your machine. The output of this command will show you the local URL where you can run the game. Whenever you modify the code, the page you opened will automatically recognize it was changed, and will refresh the page for you:

```
npm run start
```

If you ever decide to build a version that you want to host publicly (in "production"), you can use this command to create a production build:

```
npm run build
```

"Production" files will be placed in the `dist` folder. Then upload those files to a web server.

## Project Structure

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

JavaScript files are placed in the `src` folder. `main.js` is the "entry point" referenced by `index.html`. `index.html` is the main Web file sent to the browser when you navigate to the root URL of your game. `package.json` is the file where we specify all of our code dependencies (libraries), as well as where we define some shortcut commands we'll often use, like we did earlier (the commands that start with `npm run`). Other configuration settings are placed in this file as well, but are beyond the scope of this first tutorial.

## Static Assets

Any static assets like images or audio files would be placed in the `public` folder. Our initial game images are now there. It'll then be served at http://localhost:8000/images/my-image.png

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

They can then be loaded by Phaser with `this.image.load('my-image', 'images/my-image.png')`.

>The rest of this document contains some more technical details you don't have to worry about for now.

## Class Properties Support

This template includes modern JavaScript class property support out of the box using `@babel/plugin-proposal-class-properties`.

## ESLint
A `.babelrc` is included as well as the use of `babel-eslint` as the parser for ESLint. This template uses a basic `eslint` set up for code linting to help you find and fix common problems in your JavaScript code.

[See here for how to turn rules on or off](https://eslint.org/docs/rules/).

## Dev Server Port

You can change the dev server's port number by modifying the `start` script in `package.json`. We use Parcel's `-p` option to specify the port number.

The script looks like this:

```
parcel src/index.html -p 8000
```

Change 8000 to whatever you want.

## Other Notes

[parcel-plugin-clean-easy](https://github.com/lifuzhao100/parcel-plugin-clean-easy) is used to ensure only the latest files are in the `dist` folder. You can modify this behavior by changing `parcelCleanPaths` in `package.json`.

[parcel-plugin-static-files](https://github.com/elwin013/parcel-plugin-static-files-copy#readme) is used to copy static files from `public` into the output directory and serve it. You can add additional paths by modifying `staticFiles` in `package.json`.

## License

[MIT License](https://github.com/markfreedman/space-intruders/blob/master/LICENSE)