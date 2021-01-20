// Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].

const HashMap = require('./01-hash-map');



const anagrams = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

const anagConso = () => {
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  const toCons = new HashMap();
  let results = {}; // start w empty object

  anagrams.forEach(el => { // put each word into our hashmap
    toCons.set(el, el); 
  });

  anagrams.forEach(el => {
    let anaKey = el.split('').sort().join(); // create our comparison word
    let word = toCons.get(el); // get our untouched word out of the hashmap
    results[anaKey] = [word, ...results[anaKey] || '']; // set as a value in our key
  });

  return Object.keys(results).map(el => results[el]);
};

console.log(anagConso());