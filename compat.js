'use strict';

const mori = require('mori');

// compatibility with method type invocations,
// e.g. `map` which in mori-ext expects `this`
// to be a `function`, whereas in mori-fluent
// `this` in `map` should be a collection
// `map`, `cons`
module.exports = {
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
  // update, as updateIn, but like `m.update(':k', mori.inc)`
};
