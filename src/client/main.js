const MINOS = [
  'mana',
  'hydrogen',
  'oxygen'
]

// Define a class to represent the player object.
class Player {
  constructor() {
    this.name = 'player';
    this.inventory = {
      'goops': []
    };
    this.skills = {
      'goopology' : 0
    }
  }

  research(subject) {
    console.log(`Player researching <${subject}>`);
    this.skills[subject] += 1;
    console.log(`Player <${subject}> skill: <${player.skills[subject]}>`);
    this.check_skills();
  }

  check_skills() {
    // If goopology is above 0, switch visible goop info tiers
    if (player.skills['goopology'] <= 0) {
      $('.goopology_understanding_tier_0').show();
      $('.goopology_understanding_tier_1').hide();
    } else if (player.skills['goopology'] >= 1) {
      $('.goopology_understanding_tier_0').hide();
      $('.goopology_understanding_tier_1').show();
    }
  }

  pray_for_goops() {
    // Player has a 50% chance to receive a generic goop.
    if (random_chance(0.5)) {
      this.receive_goop(new Goop());
    }
  }

  receive_goop(goop) {
    this.inventory['goops'].push(goop);
    //document.getElementById('player_inventory_goop_count').innerHTML = this.goop_count;
    this.update_goop_counts();
  }

  update_goop_counts() {
    var count = {
      'total' : this.inventory['goops'].length,
      'white' : 0,
      'blue'  : 0,
      'red'   : 0,
      'green' : 0,
      'mana'  : 0,
      'gray'  : 0,
      'hydrogen'  : 0,
      'oxygen'    : 0
    };
    for (var i = 0; i < this.inventory['goops'].length; i++) {

      var goop = this.inventory['goops'][i]

      // Tally each different color goop
      count[goop.color] += 1;

      // Count by composition if player is skilled enough
      //if (player.skills['goopology'] >= 1) {
        // Handle composition
        //if (goop.composition['mana'] == 1) {
        //  count['mana'] += 1;
        //}
        //if (goop.composition['hydrogen'] == 1) {
        //  count['hydrogen'] += 1;
        //}
        //if (goop.composition['oxygen'] == 1) {
        //  count['oxygen'] += 1;
        //}

      count[goop.chemical_type] += 1;

      //}
      //} else {
      //  console.log(`ERROR: Goop with non-1 mana count found! Count: <${goop.composition['mana']}`);
      //}

    }
    document.getElementById('player_inventory_gray_goop_count').innerHTML = count['gray'];
    document.getElementById('player_inventory_white_goop_count').innerHTML = count['white'];
    document.getElementById('player_inventory_blue_goop_count').innerHTML = count['blue'];
    document.getElementById('player_inventory_red_goop_count').innerHTML = count['red'];
    document.getElementById('player_inventory_green_goop_count').innerHTML = count['green'];
    document.getElementById('player_inventory_mana_goop_count').innerHTML = count['mana'];
    document.getElementById('player_inventory_hydrogen_goop_count').innerHTML = count['hydrogen']; 
    document.getElementById('player_inventory_oxygen_goop_count').innerHTML = count['oxygen'];  
  }

  get goop_count() {
    //var colors = [ 'blue', 'red', 'green' ];
    var count = {
      'blue': 0,
      'red': 0,
      'green': 0,
      'mana': 0,
      'gray': 0
    };
    //for (var i = 0; i < Object.keys(count).length; i++) {}
    //for (var i = 0; i < colors.length; i++) {
    //  counts.push({
    //    key: colors[i],
    //    value: this.inventory['goops'].filter(function(goop) { return goop.color == colors[i]}).length
    //  })
    for (var i = 0; i < this.inventory['goops'].length; i++) {
      count[this.inventory['goops'][i].color] += 1;
      console.log(`Goop composition mana count: <${this.inventory['goops'][i].composition['mana']}>`)
      if (this.inventory['goops'][i].composition['mana'] >= 1) {
        console.log('Goop with mana in composition was found.')
        count['mana'] += 1;
      }
    }
    return count
  }

}


// Define a class to represent any goops, which are friendly objects owned by
// the player.
class Goop {

  constructor() {
    console.log('Instantiating new goop')
    this.name = 'goop';

    let random_makeup = Goop.randomize_makeup();

    //this.color = Goop.randomize_color();
    //this.color = 'green';
    //var composition = {};
    //for (var i = 0; i < MINOS.length; i++) {
      //composition.Add({
      //  key: MINOS[i],
      //  value: 0
      //});
    //  composition[MINOS[i]] = 0;
    //}
    //this.mass = random_makup['mass'];
    this.composition = random_makeup['composition'];
    //this.composition = Goop.randomize_composition();
    //this.composition = {
    //  'mana'  : 0
    //};
    console.log(`Goop composition: <${this.composition}>`)
    console.log(`Goop composition mana count: <${this.composition['mana']}>`)

    // Pure mana slimes appear blue
    if (this.composition['mana'] > 0 && Object.values(this.composition).reduce((a, b) => a + b) == this.composition['mana']) {
      this.color = 'white';
    } else {
      // Any other slimes look gray
      this.color = 'gray';
    }
  }

  static randomize_makeup() {
    var mass = 1;
    var composition = Goop.randomize_composition(mass);
    return {
      //'mass'        : mass,
      'composition' : composition
    };
  }

  get chemical_type() {
    var highest_value = 0;
    var highest_minos = [];
    //for (var i = 0; i < Object.keys(this.composition).length; i++) {
    for (const [index, [key, value]] of Object.entries(Object.entries(this.composition))) {
      console.log(`Iterating chemical type. Index, key, value: <${index}>, <${key}>, <${value}>`);
      if (value > highest_value) {
        console.log(`<${key}> value of <${value}> detected as higher than <${highest_value}>`);
        highest_minos = [key]
        highest_value = value;
      } else if (value == highest_value) {
        console.log(`<${key}> value of <${value}> detected as equal to <${highest_value}>`);
        highest_minos.push(key)
      }
    }
    //if (highest_minos.length > 1) {  
    //}
    console.log(`Highest minos: <${highest_minos}>`);
    console.log(`Highest mino: <${highest_mino}>`);
    var highest_mino = highest_minos[Math.floor(Math.random() * highest_minos.length)];
    return highest_mino
  }

  static randomize_composition(mass=1) {
    console.log('Generating random composition')

    var mino, composition = {
      'mana'      : 0,
      'hydrogen'  : 0,
      'oxygen'    : 0
    };

    for (var i=0; i < mass; i++) {

      var mino = weighted_choice({
        'mana'      : 1.0,
        'hydrogen'  : 1.0,
        'oxygen'    : 1.0
      })

      console.log(`Composition random mino: <${mino}>`)
      composition[mino] += 1;

    }
  
    console.log('Logging final composition:   =====   =====');
    //for (var i=0; i < Object.keys(composition).length; i++) {
      for (const [index, [key, value]] of Object.entries(Object.entries(composition))) {
      console.log(`<${key}>: <${value}>`);
    }
    //console.log(`Final composition: <${composition}>`)
    return composition;
  }

  static randomize_color() {
    var valid_colors = [
      'red',
      'blue',
      'green'
    ]
    return valid_colors[Math.floor(Math.random() * valid_colors.length)];
    //return 'blue';
  }
}

function random_chance(probability) {
  if (probability > Math.random()) {
    return true;
  } else {
    return false;
  }
}

function weighted_choice(probabilities) {
  var i, j, chance_table = [];
  for (i in probabilities) {
    for (j=0; j < probabilities[i] * 10; j++) {
      chance_table.push(i);
    }
  }
  return chance_table[Math.floor(Math.random() * chance_table.length)];
}

function largest_integer_from_array(input_array) {
  return input_array.map(function (sub_array) {
    return sub_array.reduce(function (previous_largest_number, current_largest_number) {
      return (current_largest_number > previous_largest_number) ? current_largest_number : previous_largest_number;
    }, 0);  
  });
}

// GAME LOGIC
var player = new Player();
//$(document).ready(function() {
//  console.log('TEST TEST TEST');
  //$('.goopology_understanding_tier_0').show();
  //$('.goopology_understanding_tier_1').hide();
//  player.check_skills();
//});
//$('.goopology_understanding_tier_1').hide();