// Modern JavaScript dictates that we should keep functionality separated into distinct "modules."
// A module is simply a JavaScript file intended to be used by other JavaScript code. When we want
// to make use of other modules -- either ones we write ourselves, or third-party libraries we
// want to use -- we use the "import" command at the top of our file.

// Here, we are importing two modules we'll be using here. The first one is the third-party Phaser3
// library. This was installed on our system when we ran the "npm install" command when setting up
// our project. As mentioned then, all libraries installed like this are stored in a folder called
// node_modules. When we say "import Phaser from "phaser"" we're telling the JavaScript engine to
// first look for it in the node_modules folder. That is why we're not specifying a full path. The
// import statement looks there by default if a path is not specified. You may wonder how it knows
// not to look for it in the current folder. Well, if we wanted to do that, we'd explicitly precede
// the folder name with "./" which represents the current folder. When importing Phaser3, we are
// assigning it to the variable Phaser. Whenever we want to use functionality from Phaser3, we
// precede the function name with "Phaser."
import Phaser from "phaser";

// The second import statement is one of our own modules we'll be creating for this game. It 
// contains code that has functionality to our main "scene" of the game. That's why we're naming it
// "Game." We are organizing our scenes under a folder of that name to keep things organized.
import Game from "./scenes/Game";

// Here, we're setting up the basic configuration for a simple game. "Phaser" is also referred to as
// the "namespace" of the Phaser3 library. The type refers to the graphic engine we'll be using for
// this game. There are currently two possible graphic renderers we can use, depending on the
// browser or platform (such as mobile devices) the game is running on -- HTML Canvas or WebGL. AUTO
// means that Phaser will figure it out. We're making our game screen 800 by 600, and we're letting
// the engine know what "scenes" we're using in our game. Games are separated into "scenes." Scenes 
// are what it sounds like — a "setting" for where the game takes place in its world, along with the
// characters, scenery, and other game-related objects that appear in the scene along with 
// programming logic that make our scene work. For smaller games, there may only be one scene. But
// you can also create a separate scene for, say, an intro and main menu screen as well as a "game
// over" scene. Right now, we'll only have one scene in our game, which is why we're simply calling
// it "Game". This is defined in an array that we're passing to the scene configuration item.
// Technically, if we only have one scene, we don't need to put it into an array. But we'll add
// more in future lessons, so we'll use an array here. If there are multiple scenes specified,
// the first item listed would be the default scene; the scene that would be displayed first when we
// run the game. This will become useful later on when we want to quickly test other scenes we
// create; we could switch the order to bypass other scenes to get to the one we want to test.
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Game],
};

// Finally, the export statement is the counterpart to the import statement described at the top of
// the file. Here, we're "exposing" the Phaser.Game class to other modules we create. We'll be 
// referencing the Game class elsewhere, so this is how we make it available. We'll explore the
// other keywords in the export statement in a later lesson.
export default new Phaser.Game(config);
