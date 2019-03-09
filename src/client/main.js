// Define a class to represent the player object.
class Player {
  constructor() {
    this.name = 'player';
    this.inventory = {
      'goops': []
    };
  }

  pray_for_goops() {
    // Player has a 50% chance to receive a generic goop.
    if (random_chance(0.5)) {
      this.receive_goop(new Goop());
    }
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

function random_chance(probability) {
  if (probability > Math.random()) {
    return true;
  } else {
    return false;
  }
}

// GAME LOGIC
var player = new Player()