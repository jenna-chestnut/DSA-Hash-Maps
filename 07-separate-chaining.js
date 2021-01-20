// Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.

// Test your hash map with the same values from the lotr hash map.

class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class HashMapSC {
  constructor(initialCapacity=8) { 
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }
  static _hashString(string) {
    // turns our string into it's index
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    let found = this._hashTable[index];
    if (found.value) return found.value;
    else {

      while (found.next) {
        if (key === found.data.key) {
          return found.data.value;
        }
        found = found.next;
      }

      if (found.data.key !== key) {
        throw new Error('Key error');
      } 
      else return found.data.value;
    }
  }

  set(key, value) {
   
    // check the amount of available space in our hashmapSC
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    
    // if it's running low, resize our hashmapSC to be larger
    if (loadRatio > HashMapSC.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapSC.SIZE_RATIO);
    }

    // find our index in the hash table
    const index = this._findSlot(key);
    // if filling a new slot, add to our length
    if (!this._hashTable[index]) {
      this.length++;
    }

    // if we are chaining, grab item(s) in index and add to a chain (this should also cover if the chain is already started)
    if (index[0] === 'chain') {
      
      let idx = index[1];
      let newHead = {
        key,
        value,
        DELETED: false
      };
      
      this._hashTable[idx] = new _Node(newHead, this._hashTable[idx]);
      
    }

    // otherwise, simply insert object
    else 
      this._hashTable[index] = {
        key,
        value,
        DELETED: false
      };
  }

  _findSlot(key) {
    // create our hash using hashString function & key
    const hash = HashMapSC._hashString(key);

    // use hash to find a slot for our key within current capacity
    const i = hash % this._capacity;

    // create slot variable 
    const index = i % this._capacity;
    // grab that corresponding slot in our hashTable
    const slot = this._hashTable[index];
    // if there's nothing in the slot, or if the key matched 
    // (& slot is NOT marked as deleted? idgi.... OH to replace a value I guess?)
    if (slot === undefined || (slot.key === key && !slot.DELETED)) {
      return index;
    }
    else {
      return ['chain', index];
    }
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }

  _resize(size) {
    // grab all our current slots
    const oldSlots = this._hashTable;
    
    // reset capacity to our new size
    this._capacity = size;
    // reset the length to rebuild as we add items
    this.length = 0;
    // blank canvas hashtable
    this._hashTable = [];

    for (let slot of oldSlots) {
      if ( slot !== undefined && !slot.DELETED ) {
        if (slot.key && slot.value) {
          this.set(slot.key, slot.value);
        }
        else {
          while (slot.next) {
            this.set(slot.data.key, slot.data.value);
            slot = slot.next;
          }
          
          this.set(slot.key, slot.value);
        }
      }
    }
  }
}

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

  console.log(lotr._hashTable);

  lotr.get('Hobbit');
  lotr.get('Maiar');
};

main();

module.exports = HashMapSC;
