
/**
 @example:
 mori.hashMap(':a', 1).assocMany([
   [ ':a', 3 ],
   [ ':b', 9 ]
 ]);
 */
module.exports = function assocMany(pairs) {
  return pairs.reduce((acc, pair) => acc.assoc(...pair), this);
};
