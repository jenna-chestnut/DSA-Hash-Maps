// Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".

const HashMap = require('./01-hash-map');

// okay so funtionality wise, i'm thinking about the fact that our keys cannot repeat, so we must be using that??
// so we take the string, turn it into an array, and set the values in our hash map?
// * then, we retrieve our hashtable values and spell with that? how do we do this part??? hmm
// * issue: letters are out of order. how can we ensure we are adding them to the string in the right order when creating our new String?

let test1 = 'google';
let test2 = 'google all that you can think of';

const removeDupes = (str) => {
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let forString = new HashMap();

  for (let i = str.length - 1; i >= 0; i--) {
    forString.set(str[i], i);
  }

  let newStr = [];
  let table = forString._hashTable;
  table.forEach(char => {
    newStr[char.value] = char.key;
  });

  return newStr.join('');
};

console.log(removeDupes(test1));
console.log(removeDupes(test2));