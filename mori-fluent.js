/**
 Mixes in mori-ext into the prototypes of all of the collections
 that mori exposes.

 This is kind of bad, since it goes against one of the fundamental
 dogmas in mori, but it makes for a different coding style, which
 may appeal to some.
 */
const ext = require('mori-ext');

module.exports = function (mori, ...extraMixins) {
  const protos = [
    mori.list(),
    mori.vector(),
    mori.hashMap(),
    mori.set(),
    mori.sortedSet(),
    mori.range(),
    mori.queue()
  ].map(coll => coll.constructor.prototype);

  protos.forEach(proto => {
    Object.keys(ext).forEach(k => {
      proto[k] = ext[k];
    });

    extraMixins.forEach(mixin => {
      Object.keys(mixin).forEach(k => {
        proto[k] = mixin[k];
      });
    });
  });

  return mori;
};
