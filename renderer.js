const backtrack = require('./build/Release/backtrack');
// console.log(backtrack.WhoAmI());
const query = document.querySelector('.overlay');

function pixeltoBlock(player){
    let block = {};
    block.x = parseInt((player.body.left)/64)-1;
    block.y = parseInt((player.body.top)/64)-1;
    return block;
}


const div = document.querySelector('.game');
let game = new Phaser.Game(32*30, 32*30, Phaser.AUTO, div, { preload: preload, create: create, update: update, render: render });
function preload() {
    game.load.spritesheet('sokoban', "assets/images/sokoban_tilesheet.png", 64, 64);
    game.load.tilemap('lvl', 'assets/tilemap/lvl.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', "assets/images/sokoban_tilesheet.png");
}
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Ground
    map = game.add.tilemap('lvl');
    map.addTilesetImage('sokoban_tilesheet','tiles');
    let ground = map.createLayer('Ground');
    ground.resizeWorld();

    // Crumbs
    crumbs = Array(13).fill(0).map(x=>Array(13));
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            crumbs[i][j] = game.add.sprite((i+1)*64,(j+1)*64,'sokoban',64);
            crumbs[i][j].visible = false;
        }
    }
    //  Walls
    walls = map.createLayer('Walls');
    map.setCollisionBetween(1, 999, true, 'Walls');

    //LvlEnd
    lvlend = game.add.sprite(13*64,13*64, 'sokoban', 63);

    // Player
    player = game.add.sprite(64,64, 'sokoban', 52);
    // player.scale.setTo(62/64, 62/64);
    game.physics.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [83,81,82,81], 8, true);
    player.animations.add('right', [80,78,79,78], 8, true);
    player.animations.add('down', [54,52,53,52], 8, true);
    player.animations.add('up', [56,55,57,55], 8, true);
    player.body.stopVelocityOnCollide = true;

    cursors = game.input.keyboard.createCursorKeys();

    path = {
        x:0,
        y:0,
    };
    block = {};
    debugText = "";
}
function update() {
    const v = 250;
    game.physics.arcade.collide(player, walls);

    // Debug Info
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    debugText = "<pre>Blocked\n";
    for(i in player.body.blocked){
        debugText+=i+":"+player.body.blocked[i]+" ";
    }
    debugText += "</pre>"
    query.innerHTML=debugText;

    block = pixeltoBlock(player)
    // WIP
    try{        
        if(block.y==path.y){
            player.body.velocity.y = v;
            if(player.body.touching.down)
                throw "down"
        }
    } catch(e){
        
    }

    if(cursors.left.isDown) {
        player.animations.play('left');
        if(block.x<path.x){
            if(!crumbs[path.x-1][path.y].visible)
                crumbs[path.x][path.y].visible = true;
            crumbs[path.x-1][path.y].visible = false;
            path.x--;
            // console.log(path.temp,path.y,path.x-1,crumbs[path.x-1]);
        }
        player.body.velocity.x = -v;
    } else if(cursors.right.isDown) {
        player.animations.play('right');
        if(block.x>path.x){
            if(!crumbs[path.x+1][path.y].visible)
                crumbs[path.x][path.y].visible = true;
            crumbs[path.x+1][path.y].visible = false;
            // console.log(path.temp,path.y,path.x);
            path.x++;
        }
        player.body.velocity.x = v;
    } else if(cursors.up.isDown) {
        player.animations.play('up');
        if(block.y<path.y){
            if(!crumbs[path.x][path.y-1].visible){
                crumbs[path.x][path.y].visible = true;
            }
            crumbs[path.x][path.y-1].visible = false;
            // console.log(path.temp,path.y,path.x);
            path.y--;
        }
        player.body.velocity.y = -v;
    } else if(cursors.down.isDown) {
        player.animations.play('down');
        if(block.y>path.y){
            if(!crumbs[path.x][path.y+1].visible){
                crumbs[path.x][path.y].visible = true;
            }
            crumbs[path.x][path.y+1].visible = false;
            path.y++;
        }
        player.body.velocity.y = v;
    } else {
        
        player.animations.stop();
        player.frame = 52;
    }
}
function render(){
    game.debug.body(player);
}