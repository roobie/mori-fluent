
const tap = require('tap');
const test = tap.test;

// also registers "extra" module
const mori = require('./mori-fluent')(require('mori'), require('./extra'));

const {
  vector,
  hashMap,
  list,
  set
} = mori;

test('vector prototype should have assoc and equals', t => {
  t.plan(1);

  t.ok(vector(1, 2).assoc(0, 10).equals(vector(10, 2)));
});

test('hashMap prototype should have updateIn', t => {
  t.plan(1);

  const map1 = hashMap('foo', vector(8, 9));

  const map2 = map1.updateIn(['foo', 1], mori.inc);

  t.deepEqual(map2.toJs(), hashMap('foo', vector(8, 10)).toJs());
});

test('predicates', t => {
  const l = list();
  t.ok(l.isList());
  t.ok(l.isSequential());
  t.ok(!l.isAssociative());

  t.done();
});

// Extras =========================================================
test('assocMany', t => {
  t.plan(1);

  const vec = mori.vector;
  const v1 = vec(0).assocMany([
    [0, 9],
    [1, 9]
  ]);

  t.ok(v1.equals(vec(9, 9)));
});
