// Export your HashMap module
// Create a .js file called HashMaps_drills. In the file import the HashMap module. Create a function called main()
// Inside your main() function, create a hash map called lotr.
// For your hash map that you have created, set the MAX_LOAD_RATIO = 0.5 and SIZE_RATIO = 3.
// Add the following items to your hash map: {"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
// {"Wizard": "Gandalf"}, {"Human": "Aragorn"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
// {"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
// {"Ent": "Treebeard"}


// Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?
// * no, because some of the items had the same keys! so we simply replaced the value

// Retrieve the value that is hashed in the key "Maiar" and Hobbit.
// 

// What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.
// * Maiar : Sauron
// * Hobbit : Frodo
// * This makes perfect sense as the HashMap replaces the value if the key is exactly the same

// What is the capacity of your hash table after you have hashed all the above items? Explain your answer.
// * the capacity is 24 - this is because each time we hit 50% capacity, we resize * 3

const HashMap = require('./01-hash-map');

const main = () => {
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let lotr = new HashMap();

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');

  console.log(lotr);

  lotr.get('Hobbit');
  lotr.get('Maiar');
};

main();