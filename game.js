// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player
let qblock
let enemy
let hurt
let oof
let platformGroup
function preload () {
  // Load & Define our game assets
  game.load.image('sky', 'bg.gif')
  game.load.image('ground', 'platform.png')
  game.load.image('dirt', 'ground.png')
  game.load.image('diamond', 'diamond.png')
  game.load.image('topLava', 'topLava.png')
  game.load.image('rock', 'rock.png')
  game.load.image('lava', 'lava.png')
  game.load.image('question', 'question.png')
  game.load.spritesheet('woof', 'woof.png', 32, 32)
  game.load.spritesheet('woof', 'woof.png', 32, 32)
  game.load.bitmapFont('pixyfont', 'font.png', 'font.fnt');
}

function create () {

  game.physics.startSystem(Phaser.Physics.ARCADE)

  game.add.tileSprite(0, 0, 5000, 800, 'sky');


  game.world.setBounds(0, 0, 5000, 300);

  platforms = game.add.group();
  hurt = game.add.group();
  oof = game.add.group();


  platforms.enableBody = true;
  hurt.enableBody = true;
  oof.enableBody = true


    for (var i = 0; i < 80; i++) {
        //img dim is 44*44
        let ground = platforms.create((i*64), game.world.height - 64 , 'dirt')
        ground.body.immovable = true;
      }
 //ground = platforms.create(0, game.world.height - 30, 'ground')


    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)

    //  enemy stops it from falling away when you jump on it


    //  Now let's create two ledges
  let ledge = platforms.create(430, 430, 'ground')
  ledge.body.immovable = true

  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((550 + (i*64)), 350, 'ground')
    Loopledge.body.immovable = true

  }

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
  for (var i = 0; i < 2 ; i++) {
    let Loopledge = oof.create(892, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 2; i++) {
    let Loopledge = oof.create(956, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 2; i++) {
    let Loopledge = oof.create(1020, 314 + (i*64), 'lava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = oof.create(892  + (i*64),  300, 'topLava')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = oof.create(892  + (i*64),  442, 'rock')
    Loopledge.body.immovable = true

  }
  for (var i = 0; i < 3; i++) {
    let Loopledge = platforms.create((700 + (i*64)), 250, 'rock')
    Loopledge.body.immovable = true

  }




    // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'woof')

    //  We need to enable physics on the player
  game.physics.arcade.enable(player)

    //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2
  player.body.gravity.y = 700

  player.body.collideWorldBounds = true

    //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)

  game.camera.follow(player);



  enemy = game.add.sprite(60, game.world.height - 150, 'woof')

    //  We need to enable physics on the player
  game.physics.arcade.enable(enemy)

    //  Player physics properties. Give the little guy a slight bounce.
    enemy.body.bounce.y = 0.2
    enemy.body.gravity.y = 700
    enemy.body.collideWorldBounds = true

    //  Our two animations, walking left and right.
  enemy.animations.add('left', [0, 1], 10, true)
  enemy.animations.add('right', [2, 3], 10, true)

    //  Finally some diamonds to collect
  diamonds = game.add.group();
  qblock = game.add.group();


    //  Enable physics for any object that is created in enemy group
  diamonds.enableBody = true
  qblock.enableBody = true



    //  Create 12 diamonds evenly spaced apart

  for (var i = 1; i < 20; i++) {
    let loopQ = diamonds.create( i * 140, 0, 'diamond')

      //  Drop em from the sky and bounce a bit
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
  }

  for (var i = 1; i < 5; i++) {
    let loopQ = qblock.create(i * 300, 0, 'question')

      //  Drop em from the sky and bounce a bit
      loopQ.body.gravity.y = 1000
    loopQ.body.bounce.y = 0.2 + Math.random() * 0.1
  }

    //  Create the score text
  scoreText = game.add.bitmapText(16, 16, 'pixyfont', { fontSize: '32px' });
  scoreText.fixedToCamera = true;


    //  And bootstrap our controls
  cursors = game.input.keyboard.createCursorKeys()
}

function update () {

    //  We want the player to stop when not moving
  player.body.velocity.x = 0
  enemy.body.velocity.x = 0


    //  Setup collisions for the player, diamonds, and our platforms
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(player, oof)
  game.physics.arcade.collide(oof, player)
  game.physics.arcade.collide(enemy, platforms)
  game.physics.arcade.collide(diamonds, platforms)
  game.physics.arcade.collide(qblock, platforms)




    //  Call callectionDiamond() if player overlaps with a diamond
  game.physics.arcade.overlap(player, diamonds, collectDiamond, null)

  game.physics.arcade.overlap(player, oof, die, null)

  game.physics.arcade.overlap(player, qblock, question, null)



    // Configure the controls!
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    player.animations.play('right')
  } else {
    // If no movement keys are pressed, stop the player
    player.animations.stop()
  }

    //  enemy allows the player to jump!
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
    // Show an alert modal when score reaches 120
  if (score === 120) {
    alert('You win!')
    score = 0
  }
}


function collectDiamond (player, diamond) {
    // Removes the diamond from the screen
  diamond.kill()

    //  And update the score
  score += 10
  scoreText.text = 'Score: ' + score
}

function question(player, qblock){
    qblock.kill()

    alert('ask question')
}
function pauser() {
    console.log('paused');
}
function die() {
    alert('you died');
}