# mori-fluent

mixins for the prototype

#### example

```js
const mori = require('./mori-fluent')(require('mori'));

const vec = mori.vector;

const v1 = vec(1, 2);
const v2 = v1.assoc(0, 10);

console.log(v2.equals(vec(10 ,2)));
```
