# mori-fluent

mixins for mori's collection prototypes.

What it does is really monkey patching the prototypes of each collection,
so that they can be used as "methods".

## basic usage

To register the functionality, call the function returned by the `mori-fluent` module:
```js
const mori = require('mori-fluent')(require('mori'));
```

After that, you can do as shown in the examples below.

Until these docs are completed, you can see some examples in the [mori-ext](https://github.com/roobie/mori-ext)
repository, because it works in the same way, except does not require the function bind syntax.

#### examples
given that we import as follows:
```js
const mori = require('mori-fluent')(require('mori'));
const {
  vector,
  hashMap
} = mori;
```

```js
const v1 = vector(1, 2);
const v2 = v1.assoc(0, 10);

console.log(v2.equals(vector(10 ,2)));
```

```js
const map1 = hashMap('foo', vector(8, 9))
               .updateIn(['foo', 1], mori.inc);
console.log(map1.equals(hashMap('foo', vector(8, 10))));
```

## Extras

The `extra` module can be loaded by passing it to the `mori-fluent` monkey patcher:
```js
const mori = require('mori-fluent')(require('mori'), require('mori-fluent/extra'));
```

##### `assocMany`:
```js
const vector = mori.vector;
const v1 = vector().assocMany([
  [0, 9],
  [1, 9]
]);

console.log(v1.equals(vector(9, 9)));
```
