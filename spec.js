
const tap = require('tap');
const test = tap.test;

const mori = require('./mori-fluent')(require('mori'));

test('vector prototype should have assoc and equals', t => {
  t.plan(1);

  const vec = mori.vector;
  t.ok(vec(1, 2).assoc(0, 10).equals(vec(10, 2)));
});
