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
let enemy
let qblock
let ghost
let hurt
let enemyBound
let flager
let change = false;
let depends = 75;
let coinCollect
let platformGroup
let time = 0
let swDevice
let qTracker = 0;
let level = 2;
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
  game.load.image('blueBlock', '/assets/blueBlock.png')
  game.load.image('cold', '/assets/cold.png')
  game.load.image('flag', '/assets/flag.png')
  game.load.image('unstable', '/assets/unstable.png')
  game.load.spritesheet('woof', '/assets/woof.png', 32, 32)
  game.load.spritesheet('enemyCat', '/assets/enemy.png', 32, 32)
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
  enemyBound = game.add.group();

  platforms.enableBody = true;
  hurt.enableBody = true;
  ghost.enableBody = true;
  flager.enableBody = true;
  enemyBound.enableBody = true;


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
  for (var i = 0; i < 5; i++) {
    let Loopledge = platforms.create((550 + (i*64)), 350, 'ground')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((550 + (64*7) +(i*64)), 250, 'ground')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    if(i === 0 || i=== 2){
      let Loopledge = enemyBound.create((550 + (64*7) + (64*3) +(i*64)), 150, 'ground')
      Loopledge.body.immovable = true
    }else{
      let Loopledge = platforms.create((550 + (64*7) + (64*3) +(i*64)), 150, 'ground')
      Loopledge.body.immovable = true
    }

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((900 + (64*7) +(i*64)), 250, 'ground')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 12; i++) {
    let Loopledge = hurt.create((900 + (i*64)), game.world.height - 128, 'blade')
    Loopledge.body.immovable = true

  }

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

  //creates the red and green boxes which alternate
  let skippy = true;
  for (var i = 0; i < 6; i++) {
    if(skippy){
      let Loopledge = platforms.create((2100 + (i*64)), 430, 'cold')
      Loopledge.body.immovable = true
      skippy = false;
    }else{
      let Loopledge = hurt.create((2100 + (i*64)), 430, 'hot')
      Loopledge.body.immovable = true
      skippy = true;
    }

  }

  for (var i = 0; i < 9; i++) {
    let Loopledge = platforms.create((2600 + (i*64)), 430, 'blueBlock')
    Loopledge.body.immovable = trueOrFalse();

  }

  function trueOrFalse() {
    let ranNumm = Math.round(Math.random() *  2);
    if (ranNumm == 2) {
      return false;
    } else if(ranNumm == 1){
     return true;
    }else{
      return false;
    }
  }
  let skippy2 = true;
  for (var i = 0; i < 9; i++) {
    if(skippy2){
      let Loopledge = hurt.create((2600 + (i*64)), game.world.height - 128, 'blade')
      Loopledge.body.immovable = true;
      skippy2 = false;
    }else{
      skippy2 = true;
    }


  }
  let ended = flager.create((3200 + (3*64)), game.world.height - 128, 'flag')
  ended.body.immovable = true

  player = game.add.sprite(32, game.world.height - 700, 'woof')
  enemy = game.add.sprite(700,-80  , 'enemyCat')


  game.physics.arcade.enable(player)
  game.physics.arcade.enable(enemy)


  player.body.bounce.y = 0.2
  player.body.gravity.y = 700
  enemy.body.bounce.y = 0.2
  enemy.body.gravity.y = 700

  //makes sure the player dosent go outside of the map
  player.body.collideWorldBounds = true
  enemy.body.collideWorldBounds = true


  //sets player animations as it moves right or left
  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)
  enemy.animations.add('left', [0, 1], 10, true)
  enemy.animations.add('right', [2, 3], 10, true)

  //makes the target canvas area follow the player as it moves
  game.camera.follow(player);





  diamonds = game.add.group();
  qblock = game.add.group();

  diamonds.enableBody = true
  qblock.enableBody = true

  for (var i = 1; i < 25; i++) {
    if(i>= 12 && i <= 19){
    }else if(i >= 11){
    }else{
      let loopQ = diamonds.create( i * 140, 0, 'diamond')
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
    }
  }

  for (var i = 1; i < 5; i++) {
    if( i === 3){
      let loopQ = qblock.create((i * 300) - 20, 0, 'question')
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
    }else{
      let loopQ = qblock.create(i * 300, 0, 'question')
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
    }
  }


  scoreText = game.add.bitmapText(16, 16, 'pixyfont', { fontSize: '32px' });
  scoreText.fixedToCamera = true;


  cursors = game.input.keyboard.createCursorKeys()
}


//updates elements and event listeners that need to be updated on state change
function update () {

  player.body.velocity.x = 0
if(change){
  enemy.body.velocity.x = (depends * -1);
  enemy.animations.play('left');
}else{
  enemy.body.velocity.x = depends;
  enemy.animations.play('right');
}



  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(enemy, platforms)
  game.physics.arcade.collide(player, ghost)
  game.physics.arcade.collide(ghost, player)
  game.physics.arcade.collide(diamonds, platforms)
  game.physics.arcade.collide(enemyBound, qblock)
  game.physics.arcade.collide(enemy, enemyBound)
  game.physics.arcade.collide(player, enemyBound)
  game.physics.arcade.collide(qblock, platforms)



  game.physics.arcade.overlap(player, diamonds, collectDiamond, null)

  game.physics.arcade.overlap(player, hurt, die, null)

  game.physics.arcade.overlap(player, enemy, die, null)

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
  clearInterval(swDevice); //stops timer
  player.kill();
    lose();

  unfull();

    document.getElementById('lost').style.display = 'block';
}
function changeDir(enemy, qblock) {
  depends = depends * (-1);
}
//runes when player finishes games
function endGame(player, flager) {
  if(qTracker !== 5){
    lose();
    unfull();
      document.getElementById('lost').style.display = 'block';
    alert('You died because you didnt do all the questions');
   reload();
  }else{

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
}
function stopWatch() {
  if (!stopWatchStart) {
    swDevice = window.setInterval(function(){
      time += 1;
    }, 1000);
    stopWatchStart = true;
  }
}
window.setInterval(function(){
  if(change){
    change = false;
  }else{
    change = true;
  }
}, 3000);