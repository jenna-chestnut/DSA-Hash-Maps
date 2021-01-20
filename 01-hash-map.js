class HashMap {
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
    return this._hashTable[index].value;
  }

  set(key, value) {
    // check the amount of available space in our hashmap
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    
    // if it's running low, resize our hashmap to be larger
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    // find our index in the hash table
    const index = this._findSlot(key);
    // if filling a new slot, add to our length
    if (!this._hashTable[index]) {
      this.length++;
    }
    // insert object
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  _findSlot(key) {
    // create our hash using hashString function & key
    const hash = HashMap._hashString(key);

    // use hash to find a slot for our key within current capacity
    const start = hash % this._capacity;

    // loop, stop only when you find slot w matching key, or an empty slot
    for (let i=start; i < start + this._capacity; i++) {
      // create slot variable 
      const index = i % this._capacity;
      // grab that corresponding slot in our hashTable
      const slot = this._hashTable[index];
      // if there's nothing in the slot, or if the key matched 
      // (& slot is NOT marked as deleted? idgi.... OH to replace a value I guess?)
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
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

    for (const slot of oldSlots) {
      if ( slot !== undefined && !slot.DELETED ) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

module.exports = HashMap;
