const HashMapSC = require('./07-separate-chaining');

const main = () => {
  HashMapSC.MAX_LOAD_RATIO = 0.5;
  HashMapSC.SIZE_RATIO = 3;
  let lotr = new HashMapSC();

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

  // console.log(lotr._hashTable);

  // lotr.get('Hobbit');
  // lotr.get('Maiar');
};

main();