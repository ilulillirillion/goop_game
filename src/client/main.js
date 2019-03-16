class Molecule {
  constructor(atoms) {
    console.log('About to create molecule...');
    console.log(atoms);
    this.atoms = atoms;
    console.log('logging created molecule...');
    console.log(this);
  }

  get color() {
    console.log('Trying to get molecule color');
    pigments = {}
    for (var i in this.atoms) {
      let atom = this.atoms[i];
      pigments.atom.color = pigments.atom.color || 0 + 1;
    }
    console.log('Logging pigments object');
    console.log(pigments);
    return pigment[0];
  }

  get symbol() {
    console.log('Trying to get symbols');
    let characters = '';
    let unhandled_symbols = [];
    console.log(unhandled_symbols);
    for (var i in this.atoms) {
      let atom = this.atoms[i];
      console.log(atom);
      unhandled_symbols.push(atom.element.symbol);
    }
    console.log(unhandled_symbols);
    console.log(this);
    console.log(characters);
    console.log(unhandled_symbols);
    for (var i=unhandled_symbols.length; i >= 0; i--) {
    //for (var i in unhandled_symbols) {
      let symbol = unhandled_symbols[i];
      if (symbol == 'C') {
        console.log('Prioritizing carbon while creating symbol');
        console.log(characters);
        console.log(symbol);
        characters = append_to_molecular_symbol(characters, symbol);
        unhandled_symbols.splice(i, 1);
      }
    }
    for (var i=unhandled_symbols.length; i >= 0; i--) {
    //for (var i in unhandled_symbols) {
      let symbol = unhandled_symbols[i];
      if (symbol == 'H') {
        console.log('Prioritizing hydrogen while creating symbol');
        console.log(unhandled_symbols);
        console.log(characters);
        console.log(symbol);
        characters = append_to_molecular_symbol(characters, symbol);
        console.log(`About to splice prioritized hydrogen atom from unhandled symbols (index: <${i}>)`);
        console.log(unhandled_symbols);
        unhandled_symbols.splice(i, 1);
        console.log('Spliced prioritized hydrogen atom from unhandled symbols');
        console.log(unhandled_symbols);
        console.log('Appended to characters and removed from unhandled symbols');
        console.log(characters);
        console.log(unhandled_symbols);
      }
    }
    console.log('About to handle regular symbols');
    console.log(unhandled_symbols);
    for (var i=unhandled_symbols.length - 1; i >= 0; i--) {
    //for (var i )
    //for (var i in unhandled_symbols.sort()) { 
    //for (var i in unhandled_symbols) {
      console.log('Logging unhandled symbols');
      console.log(unhandled_symbols);
      console.log(`Unhandled symbols length: <${unhandled_symbols.length}>`);
      console.log('Sorting unhandled symbols');
      let sorted_unhandled_symbols = unhandled_symbols.sort();
      console.log(sorted_unhandled_symbols);
      console.log('Reversing sorted unhandled symbols');
      let reverse_sorted_unhandled_symbols = sorted_unhandled_symbols.reverse();
      console.log(reverse_sorted_unhandled_symbols);
      console.log(`Getting symbol from reverse sorted unhandled symbols (index: <${i}>)`);
      let symbol = reverse_sorted_unhandled_symbols[i];
      console.log(symbol);

      //let symbol = unhandled_symbols.sort().reverse()[i];
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
  static lookup_name = 'Hydrogen'

  // DEMO: because hydrogen has higher potential energy outside of a covalent bond, make it tend towards covalent bond
  static potential_energy = 2;
}

class Oxygen extends Element {
  static name = 'oxygen';
  static symbol = 'O';
  static lookup_name = 'Oxygen';
  static color = 'green';
  static commonality = 2;
  static dominance = 1;
  static electrons = 8;
  static protons = 8;
  static atomic_weight = 15.999;
  static hill_sort_priority = 3;
}

// TODO: remove this class
class Compound {
  constructor(composition) {
    this.composition = composition;
  }
}

class PeriodicTable {
  static hydrogen = Hydrogen;
  static H = Hydrogen;
  static oxygen = Oxygen;
  static O = Oxygen;

  /*
  static reference_element(element) {
    let lookup_table = {
      'hydrogen'  : Hydrogen;
    }
  }
  */
}

//class ElementBuilder {
//  static hydrogen = new Hydrogen();
//  static oxygen = new Oxygen();
//}

class Atom {
  constructor(element) {
    console.log('About to create atom...');
    console.log(element);
    //this.element = LOOKUPS.elements[element];
    //this.element = new PeriodicTable[element];
    //this.element = ElementBuilder[element];

    //this.element = Hydrogen;
    //this.element = new Element(element);
    this.element = PeriodicTable[element];

    console.log('Logging element for newly created atom:');
    console.log(this.element);
    this.id = generate_uuid();
    console.log('Logging created atom...');
    console.log(this);
    console.log(`Created atom element: <${this.element}>`);
  }
};

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
    //this.inventory = {
    //  'goops'     : [],
    //  'mana'      : 0,
    //  'hyrdogen'  : 0,
    //  'oxygen'    : 0
    //};
    this.inventory = [],
    this.goops = [],
    this.skills = {
      'goopology' : 0
    }
  }

  tick() {
    console.log('doing tick');
    this.update_inventory();
    for (var i in this.goops) {
      let goop = this.goops[i];
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

  wait_for_rain() {
    this.tick();
    console.log('It finally rains!');
    player.inventory.push(convert_hill_notation_to_molecule('H2O'));
    console.log(player);
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
    this.goops.push(goop);
    this.update_goop_counts();
  }

  update_inventory() {
    console.log('Updatig player inventory display');
    console.log(this);
    var counts = {};
    console.log(counts);
    for (var i in this.inventory) {
      console.log(`Iterating player inventory(<${i}>).`);
      let item = this.inventory[i];
      console.log(item);
      console.log(`Updating item, count: <${item.symbol}>, <${counts[item.symbol]}>`);
      counts[item.symbol] = (counts[item.symbol] || 0) + 1;
      console.log(`Updated item, count: <${item.symbol}>, <${counts[item.symbol]}>`);
      console.log(counts);
    }
    console.log('Logging final counts');
    console.log(counts);
    for (const [item, quantity] of Object.entries(counts)) {
      let paragraph_id = String(`player_inventory_${item}_count_p`);
      let span_id = String(`player_inventory_${item}_count_span`);
      console.log(paragraph_id);
      console.log('logging document element length:');
      console.log($(`#${paragraph_id}`).length);
      if ($(`#${paragraph_id}`).length === 0) {
        let div = document.getElementById('player_inventory_div');
        let paragraph = document.createElement(paragraph_id);
        paragraph.setAttribute('id', paragraph_id);
        paragraph.innerHTML = `You have <span id=${span_id}></span> ${item} molecules`;
        div.appendChild(paragraph);
        document.getElementById(span_id).innerHTML = parseInt(1);
        let br = document.createElement("br");
        div.appendChild(br);
      }
      else {
        console.log('Attempting to update pre-existing inventory value');
        console.log(player.inventory);
        document.getElementById(span_id).innerHTML = parseInt(quantity);
      }
    }
  }


    /*
    console.log('Updating player inventory display');
    for (var i in this.inventory) {
      console.log(`Iterating player inventory(<${i}>).`);
      var item = this.inventory[i];
      console.log(item);
      let paragraph_id = String(`player_inventory_${item.symbol}_count_p`);
      let span_id = String(`player_inventory_${item.symbol}_count_span`);
      //let span_id = String(`player.inventory['${item.symbol}']`);
      console.log(`Using element id <${paragraph_id}> for updating inventory.`);
      console.log(item);
      console.log(paragraph_id);
      console.log('logging document element length:');
      console.log($(`#${paragraph_id}`).length);
      if ($(`#${paragraph_id}`).length === 0) {
        console.log(`Creating document element: <${paragraph_id}>`);
        let div = document.getElementById('player_inventory_div');
        let paragraph = document.createElement(paragraph_id);
        paragraph.setAttribute('id', paragraph_id);
        //paragraph.innerHTML = `You have <span id=player_inventory_${item.symbol}_count_span></span> ${item.symbol}s`;
        paragraph.innerHTML = `You have <span id=${span_id}></span> ${item.symbol} molecules`;
        div.appendChild(paragraph);
        document.getElementById(span_id).innerHTML = 1;
        let br = document.createElement("br");
        div.appendChild(br);
      }
      else {
        console.log('Attempting to update pre-existing inventory value');
        console.log(player.inventory);
      */
        /*
        //let existing_value = parseInt(document.getElementById(span_id).value);
        let existing_value = parseInt(document.getElementById(span_id).innerHTML);
        console.log(existing_value);
        let value = parseInt(existing_value,10);
        console.log(value);
        value += 1;
        console.log(value);
        //existing_value += 1;
        //existing_value = existing_value?existing_value:0;
        document.getElementById(span_id).innerHTML = Number(value);
        console.log(document.getElementById(span_id).innerHTML);
        //document.getElementById(span_id).innerHTML = player.inventory[`${item.symbol}`];
        //document.getElementById(span_id).innerHTML += Number(1);
        console.log(player.inventory);
        */
        //let span = document.getElementById(span_id);
        //console.log(span);
        //console.log(span.innerHTML);
        //let span_value = parseFloat(span.innerHTML);
        //let span_value = parseInt(document.getElementById(span_id).innerText);
        //let span_value = parseInt(document.getElementById(span_id).innerHTML);
        //console.log(span_value);
        //span_value++;
        //console.log(span_value);
        //document.getElementById(span_id).innerHTML = span_value + 1;
        //document.getElementById(span_id).innerText = span_value + 1;

        //document.getElementById(span_id).innerHTML = parseInt(parseInt(document.getElementById(span_id).innerHTML) + 1);
        //$(`.${span_id}`).html(parseInt($(`.${span_id}`).html(), 10) +1);

        //let incremented_value = parseInt($(`.${span_id}`).text())+1;
        //$(`.${span_id}`).text(incremented_value);

        //let new_value = String(parseInt(document.getElementById(span_id)) + 1);
        //console.log(new_value);
        //document.getElementById(span_id).innerHTML = new_value;
        //document.getElementById(span_id).value = span_value + 1;
        //document.getElementById(span_id).innerHTML = 2;
        //console.log(span_value);
        //console.log(span.innerHTML);

        //console.log(document.getElementById(span_id));
        //console.log(document.getElementById(span_id).innerHTML);
        //console.log(parseInt(document.getElementById(span_id).innerHTML));


      //}
    //}
  //}

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
    for (var i = 0; i < this.goops.length; i++) {
      var goop = this.goops[i]
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


class Chemistry {
  constructor() {}
  get color() {
    return 'blue';
  }
}


class Thing {
  constructor() {
    console.log('instantiating a new thing');
    this.id = generate_uuid();
    this.name = 'thing';
    console.log('logging newly created thing')
    console.log(this);
  }
}


class Goop extends Thing {
  constructor() {
    console.log('instantiating a new goop');

    super();

    this.name = 'goop';
    this.chemistry = new Chemistry();

    console.log(this);
  }

  get color() {
    return this.chemistry.color;
  }

  tick() {
    console.log('Goop is ticking. Logging goop object');
    console.log(this);
  }
}


// Define a class to represent any goops, which are friendly objects owned by
// the player.
class OldGoop {

  static base_stability = 1;

  constructor() {
    console.log('Instantiating new goop')
    this.name = 'goop';

    //let random_makeup = Goop.randomize_makeup();

    // Randomize composition using a single element
    //let element = random_choice_from_array(Object.keys(LOOKUPS['elements']));
    let element = random_choice_from_array(PeriodicTable);
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
    for (var i in player.goops) {
      let goop = player.goops[i];
      if (goop.id == this.id) {
        player.goops.splice(i, 1);
      }
    }
  }

  get color() {

    //console.log(`Getting goop color using chemical type: <${this.chemical_type}>`);
    //var color = PeriodicTable[this.chemical_type].color;
    /*
    try {
      //var color = LOOKUPS['elements'][this.chemical_type].color;
      var color = PeriodicTable[this.chemical_type].color;
    } catch (error) {
      console.log('ENCOUNTERED ERROR GETTING COLOR!');
      var color = Element.color;
    }
    */
    return this.chemical_type.color;
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
  if (symbol.includes(character)) {
    //let new_symbol = symbol.slice(0, symbol.indexOf(character)), b, a.slice(position)].join('');
    let index_of_existing_character = symbol.indexOf(character);
    // If next character is a number
    if (!isNaN(symbol[index_of_existing_character + 1] * 1)) {
      parseInt(symbol[index_of_existing_character + 1] += 1);
    } 
    else {
      symbol = [symbol.slice(0, index_of_existing_character + 1), 2, symbol.slice(index_of_existing_character + 1)].join('');
    }

  }
  else {
    symbol = symbol + character;
  }
  return symbol;
}

function test_random_element() {

  //element = random_choice_from_array(Object.keys(LOOKUPS['elements']));
  element = random_choice_from_array(PeriodicTable);
  console.log(`Got random element <${element}>`);
  //console.log(LOOKUPS['elements'][element]);
  console.log(PeriodicTable[element])
  //console.log(`Neutron count: <${LOOKUPS['elements'][element].neutrons}>`);
  console.log(`Neutron count: <${PeriodicTable[element].neutrons}>`);
  
}

function convert_hill_notation_to_molecule(notation) {
  console.log('Converting hill notation into molecule object...');
  console.log(notation);

  var ingredients = [];
  console.log(ingredients);
  console.log(`Notation length appears to be <${notation.length}>.`);

  

  for (var i=0; i < notation.length; i++) {
    // Assume first character is not a number
    // Assume first character is uppercase
    var hill_symbol = notation[i];
    console.log('Iterating on a character in hill notation');
    console.log(hill_symbol);

    //console.log(`Comparing <${i}> against notation length(<${notation.length}>).`);
    //if (i > notation.length) {
    //  console.log(`<${i}> has exceeded notation length`);
    //  break
    //}

    //var quantity = 1;

    console.log(`Checking <${i+1}> against notation length (<${notation.length}>).`);
    if (i+1 < notation.length) {

      // Check if the next character is a lowercase character
      console.log(`Checking if <${notation}>[<${i+1}>] is a lowercase character...`);
      if (notation[i+1] == notation[i+1].toLowerCase) {
        console.log('The next character looks like a lowercase letter.');
        // Add the lowercase letter to the element and tick iterator
        hill_symbol += notation[i+1];
        i += 1;
      }
      console.log(hill_symbol);

    }

    // Assume one atom will be created before checking
    let quantity = 1;
    console.log(`Checking <${i+1}> against notation length (<${notation.length}>).`);
    if (i+1 < notation.length) {
      
      // Check if the next character is numeric
      if (!isNaN(notation[i+1] * 1)) {
        console.log('The next character looks like a number.');
        quantity = Number(notation[i+1]);
        i += 1;
      }
    }
    console.log(quantity);

    // Push the atom/s into the ingredients array
    console.log(`About to iterate <${quantity}> times.`);
    //for (var j in quantity) {
    for (var j=0; j < quantity; j++) {
      console.log('Pushing new atom into ingredients.');
      //let atom = new Atom(convert_hill_notation_to_element(hill_symbol));

      //let atom = convert_hill_notation_to_element(hill_symbol);
      let atom = new Atom(hill_symbol);

      console.log(atom);
      ingredients.push(atom);
      console.log(ingredients);
    }
  }

  // Create a molecule using the finished ingredients
  let molecule = new Molecule(ingredients);
  console.log(molecule);
  return molecule;
}

/*
function convert_hill_notation_to_element(hill_notation) {
  console.log('Attempting to convert hill notation to element');
  console.log(hill_notation);

  console.log('Creating element symbol lookup chart');
  var conversion_chart = {};
  for (var i in PeriodicTable) {
    let element = PeriodicTable[i];
    console.log(element);
    console.log(element.lookup_name);
    conversion_chart[element.symbol] = element.name;
    console.log(conversion_chart);
  }
  console.log(conversion_chart);

  console.log(`Looking up hill symbol <${hill_notation}>`);
  let element = conversion_chart[hill_notation];
  console.log(element);
  //let element = new Atom(PeriodicTable[conversion_chart[hill_notation]]);
  //let atom = new Atom(PeriodicTable[element]);
  let atom = new Atom(element);
  console.log(`Determined <${element}> matches <${hill_notation}>`);
  return atom;

}
*/


  /*
  // As long as the next character isn't an uppercase letter
  while !(isNaN(conversion_chart[i+1] * 1) && conversion_chart[i+1] == conversion_chart[i+1].toUpperCase()) {
    let next_character = conversion_chart[i+1];
  }

    // Check if next character is an number
    if (!isNaN(character * 1)){
      alert('character is numeric');

    

  }


}
*/


// GAME LOGIC
var player = new Player();