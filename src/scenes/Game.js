import Phaser from "phaser";

// Games are separated into "scenes." Scenes are what it sounds like — a setting
// for where the game takes place in its world, along with the characters and
// scenery and other game-related objects and programming logic that would appear
// in the scene. For smaller games, there may only be one scene. But you can also
// create a separate scene for, say, an intro and main menu screen as well as a
// "game over" scene.

// Phaser.Scene is actually a JavaScript class, which is similar to object-oriented
// classes you may know from other languages. It's not exactly the same (and it's
// more flexible, IMO), but for the most part, it's a good way to think about it.
// Because your scenes extend the base logic and attributes of the Phaser.Scene
// class, you would be inheriting and extending this class to create your scenes.
// Phaser includes all the cool engine support for basic game stuff in the class,
// and you'll just be tacking on your custom stuff to that.
export default class Game extends Phaser.Scene {
  // Here we are defining a couple of class-level properties, or variables. We
  // would reference these within the functions of the class by preceding it with
  // "this." -- ex: this.movement. "this" refers to the class, itself.
  alienGroup;
  movement;

  // Each scene should have a "name" you give it to identify the different scenes
  // to the engine, and to yourself when you write code for a scene. You do this
  // in Phaser by first creating a "constructor" method for your scene class. A
  // constructor method is a method that the JavaScript engine automatically runs
  // as it's creating an instance of your class, and is mainly used for
  // initializing attributes of the class. Because the "base" class (the class you
  // are inheriting/extending from) also usually has initialization code in its
  // constructor, you'll have to also call that "parent's" class's constructor at
  // the end of your own constructor. The way to do that is to call the "super"
  // method. Constructors can also take parameters to help initialize properties.
  // This is how we'll be naming our scene. We'll call the constructor, passing in
  // the name of our scene. In this case, the name of our scene is "game."
  constructor() {
    super("game");
  }

  // A Phaser scene calls several "hooks" as it's running. Hooks are actually class
  // instance methods that you would write the code for. Some key hooks in the
  // Scene class are init(), preload(), create(), and update().
  
  // init() is called first, and is a good place to initialize variables, as we're
  // doing here for the movement class variable.
  init() {
    this.movement = 1;
  }
  
  // preload() is called before create() and is where you would write code that 
  // loads (and "caches") the assets (images, sounds, etc.) into memory before the
  // scene objects are created. Here, we're loading the images and "spritesheet"
  // we'll be using in this scene.
  preload() {
    // These images will be used as stand-alone sprites (in games, images are
    // referred to as sprites).
    this.load.image("background", "images/deep-space.jpg");
    this.load.image("base", "images/base.png");
    this.load.image("barrier", "images/barrier.png");

    // This image is actually composed of multiple images, each with a width and
    // height of 96 pixels. The load.spritesheet() function lets Phaser know how
    // to split up those images and the path the spritesheet is relative to the
    // root of the website. The first parameter is the name ("aliens") we'll be 
    // referring to when using this spritesheet.
    this.load.spritesheet("aliens", "images/aliens.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
  }

  
  // create() is used for creating objects based on the preloaded assets, and then
  // the scene is displayed and the game" loop" (handled by upload()) begins.

  // By the way, prefixing an object with "this." means we're referencing an object
  // defined by this class (or the class it "inherits" or aka "extends" from).
  create() {
    // What we're doing here is "adding" the "background" image to the scene (this)
    // and we're tiling as many of the images as needed to fill the rectangular
    // coordinates we're specifying here (0, 0, 800, 600). In games, the top-left
    // corner is coordinate 0, 0 (x = 0, y = 0). The width of the background here
    // is 800 pixels, and the height is 600 pixels. Since our game has been defined
    // as 800x600, this background will be tiled to fill the full game screen.
    this.add
      .tileSprite(0, 0, 800, 600, "background")
      .setScale(2)
      .setScrollFactor(1, 0);

    // The next three statements will set up animations for our alien ships. Each
    // animation is assigned a key value we will reference when we display the
    // animated ship. We are also specifying the "frames" within the aliens
    // spritesheet (that we loaded in the preload() function, above) that make up
    // the animation sequence. Basically, we are going to use this to tell Phaser
    // how to play our little animation movie for each ship. Each frame refers to
    // the specific image in the spritesheet (every 96 pixels as we defined it in
    // the preload() function). For this first ship, we are telling Phaser that 
    // frames 0 and 1 make up the animation. Like just about everything else in
    // programming, the first item is at 0. The frameRate specifies the speed
    // each frame will play. 1 here means that each sprite will play 1 frame per
    // second. The repeat value of -1 means repeat this animation forever.
    this.anims.create({
      key: "alien-red",
      frames: this.anims.generateFrameNumbers("aliens", { frames: [0, 1] }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "alien-yellow",
      frames: this.anims.generateFrameNumbers("aliens", { frames: [2, 3] }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "alien-blue",
      frames: this.anims.generateFrameNumbers("aliens", { frames: [4, 5] }),
      frameRate: 1,
      repeat: -1,
    });

    // We're now going to set up a "group" for our alien ships. We do this because it 
    // makes it easy for us to operate on the entire group at once for common operations.
    this.alienGroup = this.add.group();

    // Here we're setting up and displaying five rows of alien ships.Each row will end up
    // resulting in 11 ships. See how we're calculating the starting position on each row
    // so that the rows are centered on the game screen. It may be a little confusing, but
    // it will make sense as I explain it. Each alien ship sprite is 96 pixels wide. That's
    // too large to fit 11 in a row (we are using larger images so that we can display them
    // at a higher resolution in a different context), so we are scaling them down to half
    // their size (48 pixels). That's what the setScale(0.5) is doing. We'll get into more
    // detail with those lines of code shortly. We're going to separate each by 12 pixels.
    // So in order to calculate how wide the entire row of ships will be, we're taking the
    // size of the ship and gap and multiply it by the number of ships we want on a row
    // minus 1. We'll do the calculation of the last ship next, because it won't be followed
    // by a gap. More about this in a bit. Then we're subtracting it from the screen width
    // and then dividing by two to figure out how much gap to leave at the ends to center
    // the row. But wait -- why aren't we considering the 11th ship? In game engines, each
    // sprite has what is referred to as an "origin." That's the point, usually defaulted at
    // the center of the image, that is used for placement or a pivot point when rotating
    // the sprite during gameplay. Because we are keeping that default, the origin of the
    // ships split it in half -- 24 pixels (at half scale of the original image) for each
    // half. So when calculating the left-most position of the row of ships, we are 
    // treating the first ship as 24 pixels wide, effectively making the 11th ship also 24
    // pixels wide for the sake of centering the row. This may take a little mental juggling
    // before it clicks, but play around with it for other similar layouts and you'll grok
    // it soon enough. I consolidate the formula, below:

    // StartingX = (ScreenWidth - ((ImageWidth + SpaceInBetween) * (Occurrences - 1))) / 2
    // (800 - ((48 + 12) * 10)) / 2

    // So our calculation results in starting the row at the 101st pixel (remember -- 
    // zero-based, so x starts at 100). Since we're separating the starting point of each 
    // ship by 60 pixels (48 for the ship, 12 for the gap), our last ship will start at the
    // 760th pixel, and since the base is zero, we stop after the ship displayed at pixel 759.
    // 11 * 60 = 660 plus the 100 pixels in from the left.

    // We'll be using this row counter to name each sprint, in case we need to reference any
    // individually during gameplay. We're sticking with a base of zero. We are "declaring"
    // this local (function-scoped) variable by preceding it with the keyword "let." This tells
    // JavaScript that this variable can only be used inside this function, and would not be
    // accessible outside the function.
    let row = 0;

    // If you are familiar with other computer languages, especially other "curly brace"
    // languages, you'll recognize the for statement we're using. Basically, this is a loop
    // that starts with x at 100, and will continue looping while x remains less than 760
    // and x will increment by 60 each pass through the loop.
    for (let x = 100; x < 760; x += 60) {
      // As we display each sprite we're also adding it to the group we created so we can
      // control the entire group at once during gameplay. In the add.sprite() function
      // call, we're passing in the coordinate and the unique sprite name we're building.

      // We are then chaining the setScale() function call to the sprite. We can do this
      // chaining because Phaser returns the created sprite from the add.sprite() call.
      // As mentioned earlier, this scales down our sprites 50% (to 48 pixels wide and high).

      // The last thing we're chaining is the play() function call. This is what starts our
      // little animation movie that we defined earlier for the sprite.
      this.alienGroup.add(this.add.sprite(x,  50, "alien-0-" + row).setScale(0.5).play("alien-red"));
      this.alienGroup.add(this.add.sprite(x, 122, "alien-1-" + row).setScale(0.5).play("alien-yellow"));
      this.alienGroup.add(this.add.sprite(x, 194, "alien-2-" + row).setScale(0.5).play("alien-yellow"));
      this.alienGroup.add(this.add.sprite(x, 266, "alien-3-" + row).setScale(0.5).play("alien-blue"));
      this.alienGroup.add(this.add.sprite(x, 338, "alien-4-" + row).setScale(0.5).play("alien-blue"));

      row++;
    }

    // Similar to what we did for the alien ships, we're calculating the placement of the
    // four barriers near the bottom of the screen. We're also scaling this image to 50%.
    // Again, I show the formula used:

    // StartingX = (ScreenWidth - ((ImageWidth + SpaceInBetween) * Occurrences)) / 2
    // (800 - ((88 + 88) * 3)) / 2
    for (let x = 136; x <= 686; x += 176) {
      this.add.image(x, 450, "barrier").setScale(0.5);
    }

    // Finally, we are centering the "base" below the barriers:
    this.add.image(400, 550, "base").setScale(0.5);
  }

  // The update() hook is the guts of gameplay. It's the core code executed in the "game loop." Since
  // our game will be running at 30 frames per second, the update() function is executed 30 times per
  // second -- once for each frame. We need to keep this as lightweight as feasible. The grouping of
  // the alien ship sprites that we did will help with the performance by taking advantage of some of
  // the Phaser engine's group handling routines.
  update() {
    // In Space Invade... uh... Space Intruders, each row of alien ships move all the way to the right
    // one pixel at a time, and when the right-most alien reaches the right-most edge, the row changes 
    // direction to the left and down one row closer to our base. It repeats this process until all the
    // alien ships are destroyed, or our base is destroyed. We'll write that code in a future lesson.

    // The group incX function simply specifies an increment of all items in the group with a single
    // function call. In our init() function, above, we initialized movement to 1, so we'll start by 
    // increasing all the sprites' x position 1 pixel to the right. When we change direction, movement
    // will become -1 to move all the ships to the left. In game coordinates, positive x moves towards
    // the right, and negative x moves to the left.
    this.alienGroup.incX(this.movement);

    // Here's we're we check to see if we hit the right of the screen. Since the origin of the sprites
    // is the midpoint, we are checking to see if x of the last ship is hitting the right of the screen,
    // which is 24 pixels from the right-most pixel. The getLast() function gets the last sprite in a 
    // group. The true parameter means only look at "active" sprites in the group. We'll learn about that
    // in a future lesson. If you're familiar with similar games, you may have noticed that this logic 
    // isn't entirely correct, and we'll have to fix it eventually. Can you see the problem? So if we hit
    // the right edge, we switch the movement to -1 to make the ships start moving to the left. We also
    // increase the group's y coordinate by 24 to move the whole row down about half the height of the 
    // ships. In game coordinates, positive y moves down, and negative y moves up. If you've worked in
    // any programming language, you're definitely familiar with an "if" statement. It simply asks if the
    // follow expression is true, and if it is, execute the code within its block. Otherwise, jump past it
    // to the next line of code after the block.
    if (this.alienGroup.getLast(true).x === 775) { 
      this.movement = -1;
      this.alienGroup.incY(24);
    }

    // Here, we're doing the same if we reach the left edge, only here we change our movement back to 
    // the right.
    if (this.alienGroup.getFirst(true).x === 23) { 
      this.movement = 1; 
      this.alienGroup.incY(24);
    }
  }
}

// At this point we have the basic main scene display working, along with basic animation and movement
// logic. Next time we'll be creating logic for gameplay.
