# mori-fluent

mixins for mori's collection prototypes.

What it does is really monkey patching the prototypes of each collection,
so that they can be used as "methods".

## basic usage

To register the functionality, call the function returned by the `mori-fluent` module:
```js
const mori = require('mori-fluent').mori;
```

After that, you can do as shown in the examples below.

Until these docs are completed, you can see some examples in the [mori-ext](https://github.com/roobie/mori-ext)
repository, because it works in the same way, except does not require the function bind syntax.

#### examples
given that we import as follows:
```js
const mori = require('mori-fluent').mori;
const {
  vector,
  hashMap
} = mori;
```

```js
const v1 = vector(1, 2);
const v2 = v1.assoc(0, 10);

console.log(v2.equals(vector(10, 2)));
```

```js
const map1 = hashMap('foo', vector(8, 9))
               .updateIn(['foo', 1], mori.inc);
console.log(map1.equals(hashMap('foo', vector(8, 10))));
```

## Custom methods

If you want, you can monkey patch the prototypes with your own methods, by using `require('mori-fluent').extend` which is a function accepting an object hash whose property names are mapped to method names and the corresponding function is mapped as the method. Example:

```
const moriExtender = require('mori-fluent').extend;
const mori = moriExtender({
    prettyJSON: function myPretty() {
        return JSON.stringify(this.toJs(), null, 2);
    }
})
```
