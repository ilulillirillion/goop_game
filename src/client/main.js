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
  //reacts_with(other_atom) {
  //  if (this.element.reacts_with(other_atom.element)) {
  //    return true;
  //  }
  //  else {
  //    return false;
  //  }
  //}
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
    //let unhandled_atoms = this.atoms.splice(0);
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

    /*
    for (var i in unhandled_elements) {
      let iterations_complete = false;
      let this_element = unhandled_elements[i];
      let other_elements = unhandled_elements.splice(i);
      let found_earlier_element = false;  
      while (!found_earlier_element) {
        for (var j in other_elements) {
           let other_element = other_elements[j];
           if (this_element.symbol == other_element.symbol) {
             continue;
           }
           else {
             if (other_element.symbol < this_element.symbol) {
               found_earlier_element = true;
               
             }
           }
        }
      }
      */

      //if (other_elements.every()

      //for (var j in unhandled_elements) {
      //  let that_element = unhandled_elements[j];
      //}

      /*
      if (symbol.length <= 0) {
        //add_to_molecular_symbol(symbol, element);
        symbol += element.symbol;
      }
      // Otherwise, look at the existing symbols, and figure out where this one goes
      else {
        for (var j in symbol) {
          let existing_character = symbol[j];
                    
      }
      */
      
    //}
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
    //return Math.floor(this.atomic_weight - this.protons)
    return Math.round(this.atomic_weight - this.protons)

  }

  

  


  
  //constructor() {
    //this.name = name;
    //this.color = Element.color;
    //this.symbol = Element.symbol;
    //this.dominance = Element.dominance;
    //this.protons = protons;
    //this.electron = electrons;
    //this.atomic_weight = atomic_weight;
  //}
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
      //console.log(`TEST reactivity: <${goop.reactivity}>.`);
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
    //this.composition = [ new Atom(element) ];
    //this.composition = [ new Atom('hydrogen'), new Atom('hydrogen') ];
    //this.composition = [ new Atom('hydrogen'), new Atom('oxygen') ];
    // Try hydrogen again
    this.composition = [ 
      new Molecule( [ new Atom('hydrogen')  ] ), 
      new Molecule( [ new Atom('oxygen')   ] )
      //new Molecule( [ new Atom('hydrogen')  ] )
    ];
    //this.composition = random_makeup['composition'];

    console.log(`Goop composition: <${this.composition}>`)
    //console.log(`Goop composition mana count: <${this.composition['mana']}>`)

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
      //var color = MINO_CLASS_TABLE[this.chemical_type].color;
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

  /*
  static randomize_makeup() {
    var mass = 5;
    var composition = Goop.randomize_composition(mass);
    return {
      'composition' : composition
    };
  }
  */

  get chemical_type() {
    //var highest_value = 0;
    //var highest_element;
    //for (const [index, [key, value]] of Object.entries(Object.entries(this.composition))) {
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
        //highest_minos.push(key)
        /*
        if (LOOKUPS['molecules'][key].dominance > LOOKUPS['molecules'][highest_molecule].dominance) {
          console.log(`<${key}> is stronger than <${highest_value}> in goop and overpowers it.`);
          highest_molecules = key;
        }
        // On the off-chance dominance values are the same, just go
        // by commonality for now.
        else if (LOOKUPS['molecules'][key].dominance == LOOKUPS['molecules'][highest_molecule].dominance) {
          console.log('dominance collision encountered');
          if (LOOKUPS['molecules'][key].commonality > LOOKUPS['molecules'][highest_molecule].commonality) {
            console.log(`<${key}> beat <${highest_molecule}> based on commonality.`);
            highest_molecule = key;
          } 
          else {
            console.log(`<${highest_molecule}> beat <${key}> based on commonality.`);
          }
        }
        */
       // Just go alphabetically
       if (String(key) < String(highest_molecule)) {
         highest_molecule = key;
       }
      }
    }
    //if (highest_minos.length > 1) {
    //  console.log(`Highest minos: <${highest_minos}>`);
    //  return 'hybrid';
    //} else {
    //  let highest_mino = highest_minos[0];
    console.log(`Highest molecule: <${highest_molecule}>`);
    return highest_molecule;
    //}
  }

}

  /*
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
    for (const [index, [key, value]] of Object.entries(Object.entries(LOOKUPS['elements']))) {
      composition[key] = 0;
      console.log(`test test element: <${LOOKUPS['elements'][key]}>.`);
      console.log(`test test name: <${LOOKUPS['elements'][key].name}>.`);
      console.log(`test test commonality: <${LOOKUPS['elements'][key].commonality}>.`);
      probability[key] = LOOKUPS['elements'][key].commonality;
    }
    console.log('Pre-generation composition:');
    for (const [index, [key, value]] of Object.entries(Object.entries(composition))) {
      console.log(`<${key}>: <${value}>`);
    }
    console.log('Pre-generation probability:');
    for (const [index, [key, value]] of Object.entries(Object.entries(probability))) {
      console.log(`<${key}>: <${value}>`);
    }
    console.log(`test oxygen commonality: <${LOOKUPS['elements']['oxygen'].commonality}>.`);
    

    for (var i=0; i < mass; i++) {
      console.log(`Randomizing mass: <${i}>`);

      //var mino = weighted_choice({
      //  'mana'      : 0.1,
      //  'hydrogen'  : 2.0,
      //  'oxygen'    : 1.0
      //})
      var element = weighted_choice(probability);
      
        
      console.log(`Composition random element: <${element}>`)
      console.log(LOOKUPS['elements'][element]);
      composition[element] += 1;

    }
  
    console.log('Logging final composition:   =====   =====');
      for (const [index, [key, value]] of Object.entries(Object.entries(composition))) {
      console.log(`<${key}>: <${value}>`);
    }
    return composition;
  }
  */

  /*
  static randomize_color() {
    var valid_colors = [
      'red',
      'blue',
      'green'
    ]
    return valid_colors[Math.floor(Math.random() * valid_colors.length)];
  }
  */

/*
function hill_sort(symbols) {
  let sorted_symbols = [];
  for (var i in symbols) {
    let symbol = symbols[i];
    if (symbol != 'C' && symbol != 'H') {
      sorted_symbols.push(symbol);

    }
  }
}
*/

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
  //let max = arr.length;
  var random_index = Math.round(Math.random() * (max - min)) + min;
  console.log(`Calculated random index <${random_index}> using min, max: <${min}>, <${max}>`);
  random_select = arr[random_index];
  console.log(`Randomly selected <${random_select}> from array using random index <${random_index}>`);
  //return arr[random_index];
  return random_select;

}

function append_to_molecular_symbol(symbol, character) {
  console.log(`Appending <${character}> to molecular symbol <${symbol}>...`);
  return symbol + character;
}

//function find_first_alphabetically() {
//}

//function comes_alphabetically_after() {}

function test_random_element() {

  element = random_choice_from_array(Object.keys(LOOKUPS['elements']));
  console.log(`Got random element <${element}>`);
  console.log(LOOKUPS['elements'][element]);
  console.log(`Neutron count: <${LOOKUPS['elements'][element].neutrons}>`);
  
}

// GAME LOGIC
var player = new Player();