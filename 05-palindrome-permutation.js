// Write an algorithm to check whether any anagram of some string is a palindrome. Given some string, "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no anagram for "north" that would be a palindrome.

const HashMap = require('./01-hash-map');

// would expect two of all letters but one (our middle letter)
// how do we use the hashmap for this?? maybe add each as a value into our hashmap and use a key instead, like 1, 2, etc
// * there's an easier way... we shouold be able ton divide by two (and add 1 if # of letters is odd) to determine if this is a palindrome!

const isItAPalindrome = (str) => {
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let toCheck = new HashMap();


  for (let i = 0; i < str.length; i++) {
    toCheck.set(str[i], i);
  }

  let tableChars = toCheck.length;
  let ifPalindrome = str.length % 2 === 0 
    ? str.length / 2 : (str.length / 2) + .5;
  return tableChars === ifPalindrome;
};

console.log(isItAPalindrome('acecarr'));
console.log(isItAPalindrome('north'));
console.log(isItAPalindrome('anna'));
console.log(isItAPalindrome('repaper'));
console.log(isItAPalindrome('amamamm'));
console.log(isItAPalindrome('mama'));
console.log(isItAPalindrome('repapper')); // * edge case issue
