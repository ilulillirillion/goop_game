// Define a class to represent the player object.
class Player {
  constructor() {
    this.name = 'player';
    this.inventory = {
      'goops': []
    };
  }

  pray_for_goops() {
    this.receive_goop(new Goop());
  }

  receive_goop(goop) {
    this.inventory['goops'].push(goop);
    document.getElementById('player_inventory_goop_count').innerHTML = this.goop_count;
  }

  get goop_count() {
    return this.inventory['goops'].length;
  }
}


// Define a class to represent any goops, which are friendly objects owned by
// the player.
class Goop {
  constructor() {
    this.name = 'goop';
  }
}

// GAME LOGIC
var player = new Player()