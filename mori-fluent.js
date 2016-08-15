/**
 Mixes in mori-ext into the prototypes of all of the collections
 that mori exposes.

 This is kind of bad, since it goes against one of the fundamental
 dogmas in mori, but it makes for a different coding style, which
 may appeal to some.
 */
const ext = require('mori-ext');
const mori = require('mori');

const compatLayer = require('./compat.js');

module.exports = {
  mori: definition(),
  extend: definition
};

// actual impl.
function definition() {
  const extraMixins = [].slice.call(arguments, 0);

  const protoList = [
    // basic collections
    mori.list(),
    mori.vector(),
    mori.hashMap(),
    mori.set(),
    mori.sortedSet(),
    mori.range(),
    mori.queue(),

    // special cases
    // IndexedSeq
    mori.seq([0]), // same as mori.primSeq([0]),
    // LazySeq
    mori.repeat(1),
    // Cons
    mori.cons(1, mori.vector(1)),
    // RSeq
    mori.reverse(mori.vector(1,2)),
    // List
    mori.reverse(mori.rest(mori.reverse(mori.vector(1,2))))
  ].map(coll => coll.constructor.prototype);

  updateProtos(extraMixins, protoList);

  // hashMap creates a PersistentArrayMap at first,
  // but will switch underlying type after some updates
  // to a PersistentHashMap
  const persistentHashMapInstance =
          getInstanceOfSwitchedUnderlyingType(mori.hashMap());

  // we are probably missing some references here. Time will, perhaps, tell.
  updateProtos(extraMixins, [
    persistentHashMapInstance,
  ].map(coll => coll.constructor.prototype));

  return mori;
};

function updateProtos(extraMixins, protos) {
  protos.forEach(proto => {
    Object.keys(ext).forEach(k => {
      proto[k] = ext[k];
    });

    // update the prototypes with the compat layer.
    Object.keys(compatLayer).forEach(k => {
      proto[k] = compatLayer[k];
    });

    // update the prototypes with extras
    extraMixins.forEach(mixin => {
      Object.keys(mixin).forEach(k => {
        proto[k] = mixin[k];
      });
    });
  });
}

function getInstanceOfSwitchedUnderlyingType(coll) {
  return (function rec(coll, count) {
    try {
      // if coll.assoc(..) throws, we found what we were
      // looking for
      const result = coll.assoc(count, count * count);
      return rec(result, count + 1);
    } catch (e) {
      return coll;
    }
  })(coll, 0);
}
