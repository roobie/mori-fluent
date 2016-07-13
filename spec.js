
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
  t.plan(2);

  const r = vector(1, 2).assoc(0, 10);
  t.equals(r.toString(), '[10 2]');
  t.ok(r.equals(vector(10, 2)));
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

test('filter', t => {
  t.plan(1);

  const r = vector(0, 1, 0, 1, 0).filter(a => !a);
  t.equals(r.toString(), '(0 0 0)');
});

test('groupBy', t => {
  t.plan(1);

  const v = vector(1, 2, 3, 4);
  const r = v.groupBy(x => mori.isEven(x) ? 'even' : 'odd');
  t.deepEquals(r.toJs(), {even: [2, 4], odd: [1, 3]});
});

// Compat =========================================================
test('map', t => {
  t.plan(1);

  const r = vector(1, 2, 3).map(mori.inc);
  t.equals(r.toString(), '(2 3 4)');
});

test('reduce', t => {
  t.plan(1);

  const v = vector(0, 1, 2);
  const r = v.reduce((acc, x) => acc.assoc(x, x), hashMap());

  t.equals(r.toString(), '{0 0, 1 1, 2 2}');
});

