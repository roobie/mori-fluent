
const tap = require('tap');
const test = tap.test;

// also registers "extra" module
const mori = require('./mori-fluent').mori;

const vector = mori.vector
, hashMap = mori.hashMap
, list = mori.list
, set = mori.set
;

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
  t.plan(2);

  const r = vector(1, 2, 3).map(mori.inc);
  t.equals(r.toString(), '(2 3 4)');

  const nil = vector().map(mori.identity);
  t.equals(nil.toString(), '()');
});

test('mapKV', t => {
  t.plan(3);

  const r = vector(1, 2, 3).mapKV((k, v) => vector(k, v));
  t.equals(r.toString(), '([0 1] [1 2] [2 3])');

  const nil = vector().mapKV(mori.identity);
  t.equals(nil.toString(), '()');
  t.ok(mori.isSeq(nil));
});

test('reduce', t => {
  t.plan(1);

  const v = vector(0, 1, 2);
  const r = v.reduce((acc, x) => acc.assoc(x, x), hashMap());

  t.equals(r.toString(), '{0 0, 1 1, 2 2}');
});

test('reduceKV', t => {
  t.plan(1);

  const m = hashMap(':a', 1, ':b', 2);
  const r = m.reduceKV((acc, k, v) => acc.assoc(v, k), hashMap());

  t.deepEquals(r.toJs(), {'1': ':a', '2': ':b'});
});

test('extending', t => {
  t.plan(2);

  const m = require('./mori-fluent').extend({
    aMethod: function () {
      return 1;
    }
  });

  t.equals(m.vector().aMethod(), 1);
  t.equals(mori, m);
});
