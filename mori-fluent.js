/**
 Mixes in mori-ext into the prototypes of all of the collections
 that mori exposes.

 This is kind of bad, since it goes against one of the fundamental
 dogmas in mori, but it makes for a different coding style, which
 may appeal to some.
 */
const ext = require('mori-ext');

// compatibility with method type invocations,
// e.g. `map` which in mori-ext expects `this`
// to be a `function`, whereas in mori-fluent
// `this` in `map` should be a collection
// `map`, `cons`
const compat = function (mori) {
  return {
    /**
     @example
     `mori.vector(1, 2, 3).map(mori.inc); // => (2 3 4)`
     */
    map: function moriFluent_map(fn) {
      return mori.map(fn, this);
    },
    /**
     @example
     `mori.vector(1, 2).mapKV(mori.vector); // => ([0 1] [1 2])`
     */
    mapKV: function moriFluent_mapKV(fn) {
      return this
        .reduceKV((acc, k, v) => acc.conj(fn(k, v)),
                  mori.vector())
        .take(this.count());
    },
    reduce: function moriFluent_reduce(fn, initial) {
      return initial ?
        mori.reduce(fn, initial, this) :
        mori.reduce(fn, this);
    },
    reduceKV: function moriFluent_reduceKV(fn, initial) {
      return initial ?
        mori.reduceKV(fn, initial, this) :
        mori.reduceKV(fn, this);
    },
    /**
     @example
     `mori.vector(2, 3).cons(1); // => [1 2 3]`
     */
    cons: function moriFluent_cons(value) {
      mori.cons(value, this);
    }
  };
};

module.exports = function (mori, ...extraMixins) {
  const protos = [
    // basic collections
    mori.list(),
    mori.vector(),
    mori.hashMap(),
    mori.set(),
    mori.sortedSet(),
    mori.range(),
    mori.queue(),

    // special cases
    mori.seq([0]),
    mori.primSeq([0]),
    mori.map(mori.identity, [0]),
  ].map(coll => coll.constructor.prototype);

  protos.forEach(proto => {
    Object.keys(ext).forEach(k => {
      proto[k] = ext[k];
    });

    // update the prototypes with the compat layer.
    const compatLayer = compat(mori);
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

  return mori;
};
