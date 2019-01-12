//LEVEL 1

//creates a game in the Phaser game library as well as a canvas with functions definitions
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

//init values before game
let scoreText
let platforms
let diamonds
let cursors
let player
let qblock
let ghost
let hurt
let flager
let coinCollect
let platformGroup
let time = 0
let swDevice
let qTracker = 0;
let level = 1;
let stopWatchStart = false;

  //Preload game assets with ID's
function preload () {
  game.load.image('sky', 'assets/bg.gif')
  game.load.image('ground', '/assets/platform.png')
  game.load.image('dirt', '/assets/ground.png')
  game.load.image('diamond', '/assets/diamond.png')
  game.load.image('topLava', '/assets/topLava.png')
  game.load.image('rock', '/assets/rock.png')
  game.load.image('lava', '/assets/lava.png')
  game.load.image('question', '/assets/question.png')
  game.load.image('blade', '/assets/blade.png')
  game.load.image('close', '/assets/close.png')
  game.load.image('hot', '/assets/hot.png')
  game.load.image('cold', '/assets/cold.png')
  game.load.image('flag', '/assets/flag.png')
  game.load.image('unstable', '/assets/unstable.png')
  game.load.spritesheet('woof', '/assets/woof.png', 32, 32)
  game.load.spritesheet('woof', '/assets/woof.png', 32, 32)
  game.load.bitmapFont('pixyfont', '/assets/font.png', '/assets/font.fnt');
  game.load.audio('coin', 'assets/coin.mp3');
  game.load.audio('bgMusic', 'assets/godsPlan.mp3');
  game.load.audio('qSound', 'assets/question.mp3');


}

//allows the game to go full screen and exit out
function gofull() {

  if (game.scale.isFullScreen)
  {
      game.scale.stopFullScreen();
  }
  else
  {
      game.scale.startFullScreen(false);
  }

}

//creates all the elements in game
function create () {


  game.physics.startSystem(Phaser.Physics.ARCADE)

  game.add.tileSprite(0, 0, 5000, 800, 'sky');


  game.world.setBounds(0, 0, 5000, 300);

  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  // Keep original size
  // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

  // Maintain aspect ratio
  // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

  game.input.onDown.add(gofull, this);
  platforms = game.add.group();
  hurt = game.add.group();
  ghost = game.add.group();
  flager = game.add.group();

  platforms.enableBody = true;
  hurt.enableBody = true;
  ghost.enableBody = true;
  flager.enableBody = true;

  qPulse = game.add.audio('qSound');
  coinCollect = game.add.audio('coin');
  music = game.add.audio('bgMusic');
  music.volume = 0.12;
  music.play();


    for (var i = 0; i < 80; i++) {
        //img dim is 44*44
        let ground = platforms.create((i*64), game.world.height - 64 , 'dirt')
        ground.body.immovable = true;
      }
 //ground = platforms.create(0, game.world.height - 30, 'ground')

//first block on screen
  let ledge = platforms.create(430, 430, 'ground')
  ledge.body.immovable = true

  // creates  3 row ground
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((550 + (i*64)), 350, 'ground')
    Loopledge.body.immovable = true

  }
 // START: Lava box
     //creates left ledges
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((1080 + (i*64)), 250, 'rock')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 4; i++) {
    let Loopledge = platforms.create(828, 250 + (i*64), 'rock')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 4; i++) {
    let Loopledge = platforms.create(1080, 250 + (i*64), 'rock')
    Loopledge.body.immovable = true

  }
    //puts lava inside
  for (var i = 0; i < 2 ; i++) {
    let Loopledge = hurt.create(892, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 2; i++) {
    let Loopledge = hurt.create(956, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }

  for (var i = 0; i < 2; i++) {
    let Loopledge = hurt.create(1020, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
    //creates top row of lava
  for (var i = 0; i < 3; i++) {
    let Loopledge = hurt.create(892  + (i*64),  300, 'topLava')
    Loopledge.body.immovable = false

  }

   //creates right ledges for holder
  for (var i = 0; i < 3; i++) {
    let Loopledge = ghost.create(892  + (i*64),  442, 'rock')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((700 + (i*64)), 250, 'rock')
    Loopledge.body.immovable = true

  }

  //END: Lava box

  //creates some floating ledges
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((1600 + (i*64)), 430, 'ground')
    Loopledge.body.immovable = true

  }

  //creates unstable grounds where player falls easily
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((1900 + (i*64)), (430-64), 'unstable')
    Loopledge.body.immovable = false

  }

  //creates blades in ground
  for (var i = 0; i < 3; i++) {
    let Loopledge = hurt.create((1900 + (i*64)), game.world.height - 128, 'blade')
    Loopledge.body.immovable = true

  }


  //START: Lava box
  for (var i = 0; i < 4; i++) {
    let Loopledge = platforms.create(1080, 250 + (i*64), 'rock')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 2 ; i++) {
    let Loopledge = hurt.create(2300, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 2; i++) {
    let Loopledge = hurt.create(2300 +64, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 2; i++) {
    let Loopledge = hurt.create(2300 +64, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = hurt.create(2300  + (i*64),  300, 'topLava')
    Loopledge.body.immovable = false

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = ghost.create(2300  + (i*64),  442, 'rock')
    Loopledge.body.immovable = true

  }
  //END: Lava box

  //Creates unstable elements where player easily falls
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((2300 + (i*64)), 250, 'unstable')
    Loopledge.body.immovable = false

  }
  for (var i = 0; i < 4; i++) {
    let Loopledge = platforms.create(2235, 250 + (i*64), 'rock')
    Loopledge.body.immovable = true

  }
  let Loopledge = platforms.create(2100, 200 + (2*64), 'rock')
  Loopledge.body.immovable = true

  for (var i = 0; i < 4; i++) {
    let Loopledge = platforms.create(2235 + (4*64), 250  + (i*64), 'rock')
    Loopledge.body.immovable = true

  }

  //creates the red and green boxes which alternate
  let skippy = true;
  for (var i = 0; i < 8; i++) {
    if(skippy){
      let Loopledge = platforms.create((2570 + (i*64)), 430, 'cold')
      Loopledge.body.immovable = true
      skippy = false;
    }else{
      let Loopledge = hurt.create((2570 + (i*64)), 430, 'hot')
      Loopledge.body.immovable = true
      skippy = true;
    }

  }
  //the flag that marks the end of level
  let ended = flager.create((3200 + (3*64)), game.world.height - 128, 'ground')
  ended.body.immovable = true

  player = game.add.sprite(32, game.world.height - 150, 'woof')

  game.physics.arcade.enable(player)

  player.body.bounce.y = 0.2
  player.body.gravity.y = 700

  //makes sure the player dosent go outside of the map
  player.body.collideWorldBounds = true

  //sets player animations as it moves right or left
  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)

  //makes the target canvas area follow the player as it moves
  game.camera.follow(player);





  diamonds = game.add.group();
  qblock = game.add.group();

  diamonds.enableBody = true
  qblock.enableBody = true

  for (var i = 1; i < 9; i++) {
    let loopQ = diamonds.create( i * 140, 0, 'diamond')
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
  }

  for (var i = 1; i < 5; i++) {
    let loopQ = qblock.create(i * 300, 0, 'question')
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
  }


  scoreText = game.add.bitmapText(16, 16, 'pixyfont', { fontSize: '32px' });
  scoreText.fixedToCamera = true;


  cursors = game.input.keyboard.createCursorKeys()
}


//updates elements and event listeners that need to be updated on state change
function update () {

  player.body.velocity.x = 0




  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(player, ghost)
  game.physics.arcade.collide(ghost, player)
  game.physics.arcade.collide(diamonds, platforms)
  game.physics.arcade.collide(qblock, platforms)



  game.physics.arcade.overlap(player, diamonds, collectDiamond, null)

  game.physics.arcade.overlap(player, hurt, die, null)

  game.physics.arcade.overlap(player, flager, endGame, null)

  game.physics.arcade.overlap(player, qblock, question, null)



  if (cursors.left.isDown) {
    stopWatch();
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    stopWatch();
    player.body.velocity.x = 150

    player.animations.play('right')
  } else {
    stopWatch();
    player.animations.stop()
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
}


function collectDiamond (player, diamond) {
  coinCollect.play();
  diamond.kill()

    //  And update the score
  score += 10
  scoreText.text = 'Score: ' + score
}

function question(player, qblock){
    questionSound();
    qblock.kill()
    ask(qTracker,level);
    qTracker++;
}
function pauser() {
    console.log('paused');
}
function die(player, ghost) {
  clearInterval(swDevice);
  player.kill();
  unfull();

    document.getElementById('lost').style.display = 'block';
}

//runes when player finishes games
function endGame(player, flager) {
  clearInterval(swDevice);
  player.kill(); //removes player from game
  levelSound();
  level1Comp();
  setTimeout(function () {
    show('section-score');
    counterSound();
    var numAnim = new CountUp("scoreShow", 0, score, 0, 2, options);
  if (!numAnim.error) {
      numAnim.start();
  } else {
      console.error(numAnim.error);
  }

  setTimeout(function () {
    show('section-time');
    counterSound();
    var numAnim = new CountUp("showTime", 0, time, 0, 2, options);
  if (!numAnim.error) {
      numAnim.start();
  } else {
      console.error(numAnim.error);
  }

  let energyPoints = (score/time) * 10;
  setTimeout(function () {
    show('section-energy');
    counterSound();
    var numAnim = new CountUp("showEnergy", 0, energyPoints , 2, 2, options);
  if (!numAnim.error) {
      numAnim.start();
  } else {
      console.error(numAnim.error);
  }
  setTimeout(function () {
    show('btn-leaderboard');
  }, 1000);
  setTimeout(function () {
    show('btn-nextLevel');
  }, 1000);

  }, 2000);

  }, 2000);

  }, 1000);
}
function stopWatch() {
  if (!stopWatchStart) {
    swDevice = window.setInterval(function(){
      time += 1;
    }, 1000);
    stopWatchStart = true;
  }
}