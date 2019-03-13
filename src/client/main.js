class Atom {
  constructor(element) {
    console.log('About to create atom...');
    console.log(element);
    this.element = LOOKUPS.elements[element];
    this.id = generate_uuid();
    console.log('Logging created atom...');
    console.log(this);
    console.log(`Created atom element: <${this.element}>`);
  }
};

class Molecule {
  constructor(atoms) {
    console.log('About to create molecule...');
    console.log(atoms);
    this.atoms = atoms;
    console.log('logging created molecule...');
    console.log(this);
  }

  get symbol() {
    console.log('Trying to get symbols');
    let characters = '';
    let unhandled_symbols = [];
    console.log(unhandled_symbols);
    for (var i in this.atoms) {
      let atom = this.atoms[i];
      unhandled_symbols.push(atom.element.symbol);
    }
    console.log(unhandled_symbols);
    console.log(this);
    console.log(characters);
    console.log(unhandled_symbols);
    for (var i in unhandled_symbols) {
      let symbol = unhandled_symbols[i];
      if (symbol == 'C') {
        console.log('Prioritizing carbon while creating symbol');
        console.log(characters);
        console.log(symbol);
        characters = append_to_molecular_symbol(characters, symbol);
        unhandled_symbols.splice(i);
      }
    }
    for (var i in unhandled_symbols) {
      let symbol = unhandled_symbols[i];
      if (symbol == 'H') {
        console.log('Prioritizing hydrogen while creating symbol');
        console.log(unhandled_symbols);
        console.log(characters);
        console.log(symbol);
        characters = append_to_molecular_symbol(characters, symbol);
        unhandled_symbols.splice(i);
        console.log('Appended to characters and removed from unhandled symbols');
        console.log(characters);
        console.log(unhandled_symbols);
      }
    }
    console.log(unhandled_symbols);
    for (var i in unhandled_symbols.sort()) { 
      let symbol = unhandled_symbols[i];
      console.log('Handling regular element while creating symbol');
      console.log(characters);
      console.log(symbol);
      characters = append_to_molecular_symbol(characters, symbol);
    }

  console.log('About to return symbol...');
  console.log(characters);
  return characters;
  }

  static reacts_with(other_molecule) {
    console.log('Checking if a reaction will occur between two molecules');
    console.log(this);
    console.log(other_molecule);
    if (this.makes_covalent_bond_with(other_molecule)) {
      return true;
    }
    else {
      return false;
    }
  }

  static makes_covalent_bond_with(element) {
    console.log('Checking if a covalent bond can be made between two elements');
    console.log(this);
    console.log(element);
    if (this.electrons == element.electrons) {
      console.log(`<${this.name}> forming covalent bond with <${element.name}> due to electron equivalency (used <${this.electrons}> == <${element.electrons}>)`);
      return true;
    }
    else {
      return false;
    }
  }
}

class Element {
  static name = 'element';
  static color = 'gray';
  static symbol = '?';
  static commonality = 1;
  static dominance = 1;
  static protons = 1;
  static electrons = 1;
  static atomic_weight = 1;

  // What priority elements go into when being hill sorted
  // 0 = special/meta
  // 1 = carbon (first)
  // 2 = hydrogen
  // 3 = anything else
  static hill_sort_priority = 3;

  static get neutrons() {
    return Math.round(this.atomic_weight - this.protons)
  }
}

class Hydrogen extends Element {
  static name = 'hydrogen';
  static symbol = 'H';
  static color = 'blue';
  static commonality = 2;
  static dominance = 2;
  static protons = 1;
  static electrons = 1;
  static atomic_weight = 1.007;
  static hill_sort_priority = 2;

  // DEMO: because hydrogen has higher potential energy outside of a covalent bond, make it tend towards covalent bond
  static potential_energy = 2;
}

class Oxygen extends Element {
  static name = 'oxygen';
  static symbol = 'O';
  static color = 'green';
  static commonality = 2;
  static dominance = 1;
  static electrons = 8;
  static protons = 8;
  static atomic_weight = 15.999;
  static hill_sort_priority = 3;
}

class Compound {
  constructor(composition) {
    this.composition = composition;
  }
}

// Don't know of a way to gather all class definitions other than to use a 
// lookup table (other than to resort to eval)
const LOOKUPS = {
  'elements' : {
    //'mana'      : Mana,
    'hydrogen'  : Hydrogen,
    'H'         : Hydrogen,
    'oxygen'    : Oxygen,
    'O'         : Oxygen
  }
}

// Define a class to represent the player object.
class Player {
  constructor() {
    this.name = 'player';
    this.inventory = {
      'goops'     : [],
      'mana'      : 0,
      'hyrdogen'  : 0,
      'oxygen'    : 0
    };
    this.skills = {
      'goopology' : 0
    }
  }

  tick() {
    console.log('doing tick');
    for (var i in this.inventory['goops']) {
      let goop = this.inventory['goops'][i];
      console.log(goop);
      console.log(goop.name);
      goop.tick();
    }
  }

  research(subject) {
    console.log(`Player researching <${subject}>`);
    this.skills[subject] += 1;
    console.log(`Player <${subject}> skill: <${player.skills[subject]}>`);
    this.check_skills();
    this.tick();
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
    console.log('Player is praying for a goop.')
    // Player has a 50% chance to receive a generic goop.
    if (random_chance(0.5)) {
      console.log('Player praying for goop successful.')
      let goop = new Goop();
      console.log(goop);
      this.receive_goop(goop);
    }
    this.tick();
  }

  pray_for_all_goops_death() {
    // Has a 10% chance of killing (harvesting) all goops.
    if (random_chance(0.1)) {
      console.log('not implemented: harvesting all goops');
    }
    this.tick();
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
      if (goop.chemical_type == 'H') {
        var chemical_type = 'hydrogen';
      }
      else if (goop.chemical_type == 'O') {
        var chemical_type = 'oxygen';
      }
      else {
        var chemical_type = goop.chemical_type;
      }
      // Tally each different color goop
      count[goop.color] += 1;
      // Tally each goop by chemical type
      count[chemical_type] += 1;
    }

    for (const [index, [key, value]] of Object.entries(Object.entries(count))) {
      console.log(`Got <${key}>:<${value}> when populating document.`);
      // Create matching document elements if they don't exist
      var element_id = String(`player_inventory_${key}_goop_count`);
      // If there are no elements matching the counter id and the value is above 0
      if ($(`#${element_id}`).length === 0 && value > 0) {
      //if ($(`#${element_id}`).length === 0 && value > 0) { 
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
          element.setAttribute('class', 'goopology_understanding_tier_0 undiscovered');
          var div = document.getElementById('goopology_understanding_tier_0_stats_div');
        }
        if (chemical_types.includes(key)) {
          element.setAttribute('class', 'goopology_understanding_tier_1 undiscovered');
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
        // Use try here to avoid error updating 0 to non-discovered (created) elements
        try {
          document.getElementById(element_id).innerHTML = value;
        } catch(error) {  
        }
      }
    }  

  }

}




// Define a class to represent any goops, which are friendly objects owned by
// the player.
class Goop {

  static base_stability = 1;

  constructor() {
    console.log('Instantiating new goop')
    this.name = 'goop';

    //let random_makeup = Goop.randomize_makeup();

    // Randomize composition using a single element
    let element = random_choice_from_array(Object.keys(LOOKUPS['elements']));
    console.log(element);
    this.composition = [ 
      new Molecule( [ new Atom('hydrogen')  ] ), 
      new Molecule( [ new Atom('oxygen')   ] )
      //new Molecule( [ new Atom('hydrogen')  ] )
    ];

    console.log(`Goop composition: <${this.composition}>`)

    this.id = generate_uuid();

    console.log(this);

  }

  // Do this every so often
  tick() {
    console.log('doing goop tick');
    this.check_for_reactions();
  }

  die() {
    console.log('goop dies!')
    for (var i in player.inventory['goops']) {
      let goop = player.inventory['goops'][i];
      if (goop.id == this.id) {
        player.inventory['goops'].splice(i, 1);
      }
    }
  }

  get color() {

    try {
      var color = LOOKUPS['elements'][this.chemical_type].color;
    } catch (error) {
      var color = Element.color;
    }
    return color;
  }

  check_for_reactions() {
    // Iterate through each molecule in composition
    for (var i in this.composition) {
      let molecule = this.composition[i];
      for (var j in this.composition) {
        let other_molecule = this.composition[j];
        // Don't try to react molecules with themselves
        if (molecule.id == other_molecule.id) {
          continue
        }
        if (molecule.reacts_with(other_molecule)) {
          console.log('Two molecules are reacting');
          console.log(molecule);
          console.log(other_molecule);
        }
      }
    }
  }

  get chemical_type() {
    console.log('Getting chemical type...');
    var count = {};
    console.log(count);
    console.log(this.composition);
    for (var i in this.composition) {

      let current_molecule = this.composition[i];
      console.log(current_molecule);
      console.log(`Test: Molecule name: <${current_molecule.symbol}>`);
      count[current_molecule.symbol] = (count[current_molecule.symbol] || 0) + 1;
    }
    console.log('About to log count');
    console.log(count);

    let highest_value = 0;
    let highest_molecule;
    for (const [index, [key, value]] of Object.entries(Object.entries(count))) {
      console.log(`Iterating chemical type. Index, key, value: <${index}>, <${key}>, <${value}>`);

      // No need to worry about 0 values
      if (value <= 0) {
        continue;
      }

      // If it's the first non-zero value, it wins
      else if (highest_molecule === null) {
        console.log(`<${key}> wins as it is the first/only molecule.`);
        highest_molecule = key;
        highest_value = value;
      }
      // If it's value is higher than the previous highest value, it wins
      else if (value > highest_value) {
        console.log(`<${key}> value of <${value}> detected as higher than <${highest_value}>`);
        highest_molecule = key;
        highest_value = value;
      } 
      // If the values are equal, most important thing is that it returns the
      // same answer every time.
      else if (value == highest_value) {
        console.log(`<${key}> value of <${value}> detected as equal to <${highest_value}>`);
        if (String(key) < String(highest_molecule)) {
          highest_molecule = key;
        }
      }
    }
    console.log(`Highest molecule: <${highest_molecule}>`);
    return highest_molecule;
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

function generate_uuid() {
  var uuid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  return uuid;
}

function random_choice_from_array(arr){
  let min = 0;
  let max = (arr.length - 1);
  var random_index = Math.round(Math.random() * (max - min)) + min;
  console.log(`Calculated random index <${random_index}> using min, max: <${min}>, <${max}>`);
  random_select = arr[random_index];
  console.log(`Randomly selected <${random_select}> from array using random index <${random_index}>`);
  return random_select;

}

function append_to_molecular_symbol(symbol, character) {
  console.log(`Appending <${character}> to molecular symbol <${symbol}>...`);
  return symbol + character;
}

function test_random_element() {

  element = random_choice_from_array(Object.keys(LOOKUPS['elements']));
  console.log(`Got random element <${element}>`);
  console.log(LOOKUPS['elements'][element]);
  console.log(`Neutron count: <${LOOKUPS['elements'][element].neutrons}>`);
  
}

// GAME LOGIC
var player = new Player();