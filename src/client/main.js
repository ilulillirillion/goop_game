//const MINOS = [
//  'mana',
//  'hydrogen',
//  'oxygen'
//]

class Mino {
  static name = 'mino';
  static color = 'gray';
  static commonality = 1;
  static dominance = 1;
}

class Mana extends Mino {
  static name = 'mana';
  static color = 'white';
  static commonality = 1;
  static dominance = 3;
}

class Hydrogen extends Mino {
  static name = 'hydrogen';
  static color = 'blue';
  static commonality = 2;
  static dominance = 2;
}

class Oxygen extends Mino {
  static name = 'oxygen';
  static color = 'green';
  static commonality = 3;
  static dominance = 1;
}

// Don't know of a way to gather all class definitions other than to use a 
// lookup table (other than to resort to eval)
const LOOKUPS = {
  'minos' : {
    'mana'      : Mana,
    'hydrogen'  : Hydrogen,
    'oxygen'    : Oxygen
  }
}

//const MINO_CLASS_TABLE = {
//  'mana'  : Mana,
//  'hydrogen'  : Hydrogen,
//  'oxygen'    : Oxygen
//}

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

    if (player.skills['goopology'] <= 0) {
      $('#goopology_understanding_tier_0_stats_div').toggle(true);
      $('#goopology_understanding_tier_1_stats_div').toggle(false);
    } else if (player.skills['goopology'] >= 1) {
      $('#goopology_understanding_tier_0_stats_div').toggle(false);
      $('#goopology_understanding_tier_1_stats_div').toggle(true);
    }
  }

  pray_for_goops() {
    // Player has a 50% chance to receive a generic goop.
    if (random_chance(0.5)) {
      this.receive_goop(new Goop());
    }
  }

  pray_for_all_goops_death() {
    // Has a 10% chance of killing (harvesting) all goops.
    if (random_chance(0.1)) {
      console.log('not implemented: harvesting all goops');
    }
  }

  receive_goop(goop) {
    this.inventory['goops'].push(goop);
    this.update_goop_counts();
  }

  update_goop_counts() {
    var count = {
      'white' : 0,
      'blue'  : 0,
      'red'   : 0,
      'green' : 0,
      'hybrid'    : 0,
      'mana'      : 0,
      'gray'      : 0,
      'hydrogen'  : 0,
      'oxygen'    : 0
    };
    for (var i = 0; i < this.inventory['goops'].length; i++) {
      var goop = this.inventory['goops'][i]
      // Tally each different color goop
      count[goop.color] += 1;
      // Tally each goop by chemical type
      count[goop.chemical_type] += 1;
    }

    for (const [index, [key, value]] of Object.entries(Object.entries(count))) {
      console.log(`Got <${key}>:<${value}> when populating document.`);
      // Create matching document elements if they don't exist
      var element_id = String(`player_inventory_${key}_goop_count`);
      if ($(`#${element_id}`).length === 0) { 
        console.log(`Creating element: <${element_id}>`)
        let element = document.createElement(element_id);
        element.innerHTML = `You have <span id='player_inventory_${key}_goop_count'></span> ${key} goops`;
        element.setAttribute('id', `player_inventory_${key}_goop_count_p`);
        let colors = [
          'white',
          'blue',
          'red',
          'green',
          'gray'
        ];
        let chemical_types = [
          'hybrid',
          'mana',        
          'hydrogen',
          'oxygen'
        ];
        if (colors.includes(key)) {
          element.setAttribute('class', 'goopology_understanding_tier_0');
          var div = document.getElementById('goopology_understanding_tier_0_stats_div');
        }
        if (chemical_types.includes(key)) {
          element.setAttribute('class', 'goopology_understanding_tier_1');
          var div = document.getElementById('goopology_understanding_tier_1_stats_div');
        } else {
          var div = document.getElementById('goopology_understanding_tier_0_stats_div');
        }

        div.appendChild(element);
        let br = document.createElement("br");
        div.appendChild(br);

      }

      if (key == 'total') {
        console.log('Skipping \'total\' key');
      } else {
        console.log(`Updating element <${element_id}> with key, value: <${key}>, <${value}>`);
        document.getElementById(element_id).innerHTML = value;
      }
    }  

  }

  //get goop_count() {
  //  var count = {
  //    'blue': 0,
  //    'red': 0,
  //    'green': 0,
  //    'mana': 0,
  //    'gray': 0
  //  };
  //  for (var i = 0; i < this.inventory['goops'].length; i++) {
  //    count[this.inventory['goops'][i].color] += 1;
  //    console.log(`Goop composition mana count: <${this.inventory['goops'][i].composition['mana']}>`)
  //    if (this.inventory['goops'][i].composition['mana'] >= 1) {
  //      console.log('Goop with mana in composition was found.')
  //      count['mana'] += 1;
  //    }
  //  }
  //  return count
  //}

}




// Define a class to represent any goops, which are friendly objects owned by
// the player.
class Goop {

  constructor() {
    console.log('Instantiating new goop')
    this.name = 'goop';

    let random_makeup = Goop.randomize_makeup();

    this.composition = random_makeup['composition'];

    console.log(`Goop composition: <${this.composition}>`)
    console.log(`Goop composition mana count: <${this.composition['mana']}>`)

  }

  get color() {

    try {
      //var color = MINO_CLASS_TABLE[this.chemical_type].color;
      var color = LOOKUPS['minos'][this.chemical_type].color;
    } catch (error) {
      var color = Mino.color;
    }
    return color;
  }

  static randomize_makeup() {
    var mass = 5;
    var composition = Goop.randomize_composition(mass);
    return {
      'composition' : composition
    };
  }

  get chemical_type() {
    var highest_value = 0;
    var highest_mino;
    for (const [index, [key, value]] of Object.entries(Object.entries(this.composition))) {
      console.log(`Iterating chemical type. Index, key, value: <${index}>, <${key}>, <${value}>`);
      // No need to worry about 0 values
      if (value <= 0) {
        continue;
      }
      // If it's the first non-zero value, it wins
      else if (highest_mino === null) {
        console.log(`<${key}> wins as it is the first/only mino.`);
        highest_mino = key;
        highest_value = value;
      }
      // If it's value is higher than the previous highest value, it wins
      else if (value > highest_value) {
        console.log(`<${key}> value of <${value}> detected as higher than <${highest_value}>`);
        highest_mino = key;
        highest_value = value;
      } 
      // If the values are equal, most important thing is that it returns the
      // same answer every time.
      else if (value == highest_value) {
        console.log(`<${key}> value of <${value}> detected as equal to <${highest_value}>`);
        //highest_minos.push(key)
        if (LOOKUPS['minos'][key].dominance > LOOKUPS['minos'][highest_mino].dominance) {
          console.log(`<${key}> is stronger than <${highest_value}> in goop and overpowers it.`);
          highest_mino = key;
        }
        // On the off-chance dominance values are the same, just go
        // by commonality for now.
        else if (LOOKUPS['minos'][key].dominance == LOOKUPS['minos'][highest_mino].dominance) {
          console.log('dominance collision encountered');
          if (LOOKUPS['minos'][key].commonality > LOOKUPS['minos'][highest_mino].commonality) {
            console.log(`<${key}> beat <${highest_mino}> based on commonality.`);
            highest_mino = key;
          } 
          else {
            console.log(`<${highest_mino}> beat <${key}> based on commonality.`);
          }
        }
      }
    }
    //if (highest_minos.length > 1) {
    //  console.log(`Highest minos: <${highest_minos}>`);
    //  return 'hybrid';
    //} else {
    //  let highest_mino = highest_minos[0];
    console.log(`Highest mino: <${highest_mino}>`);
    return highest_mino;
    //}
  }

  static randomize_composition(mass=1) {
    console.log('Generating random composition')

    //var mino, composition = {
    //  'mana'      : 0,
    //  'hydrogen'  : 0,
    //  'oxygen'    : 0
    //};
    var composition = {};
    var probability = {};
    //for (var i=0; i < Object.keys(LOOKUPS['minos']).length; i++) {
    //  composition[Object.keys(LOOKUPS['minos'])[i]] = 0;
    //  console.log(`test test mino: <${Object.keys(LOOKUPS['minos'])[i]}>.`);
    //  console.log(`test test name: <${Object.keys(LOOKUPS['minos'])[i].name}>.`);
    //  console.log(`test test commonality: <${Object.keys(LOOKUPS['minos'])[i].commonality}>.`);
    //  probability[Object.keys(LOOKUPS['minos'])[i]] = Object.keys(LOOKUPS['minos'])[i].commonality;
    for (const [index, [key, value]] of Object.entries(Object.entries(LOOKUPS['minos']))) {
      composition[key] = 0;
      console.log(`test test mino: <${LOOKUPS['minos'][key]}>.`);
      console.log(`test test name: <${LOOKUPS['minos'][key].name}>.`);
      console.log(`test test commonality: <${LOOKUPS['minos'][key].commonality}>.`);
      probability[key] = LOOKUPS['minos'][key].commonality;
    }
    console.log('Pre-generation composition:');
    for (const [index, [key, value]] of Object.entries(Object.entries(composition))) {
      console.log(`<${key}>: <${value}>`);
    }
    console.log('Pre-generation probability:');
    for (const [index, [key, value]] of Object.entries(Object.entries(probability))) {
      console.log(`<${key}>: <${value}>`);
    }
    console.log(`test oxygen commonality: <${LOOKUPS['minos']['oxygen'].commonality}>.`);
    

    for (var i=0; i < mass; i++) {
      console.log(`Randomizing mass: <${i}>`);

      //var mino = weighted_choice({
      //  'mana'      : 0.1,
      //  'hydrogen'  : 2.0,
      //  'oxygen'    : 1.0
      //})
      var mino = weighted_choice(probability);
      
        

      console.log(`Composition random mino: <${mino}>`)
      composition[mino] += 1;

    }
  
    console.log('Logging final composition:   =====   =====');
      for (const [index, [key, value]] of Object.entries(Object.entries(composition))) {
      console.log(`<${key}>: <${value}>`);
    }
    return composition;
  }

  static randomize_color() {
    var valid_colors = [
      'red',
      'blue',
      'green'
    ]
    return valid_colors[Math.floor(Math.random() * valid_colors.length)];
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