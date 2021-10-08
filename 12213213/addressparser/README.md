# addressparser

Parse e-mail address fields. Input can be a single address (`"andris@kreata.ee"`), a formatted address (`"Andris Reinman <andris@kreata.ee>"`), comma separated list of addresses (`"andris@kreata.ee, andris.reinman@kreata.ee"`), an address group (`"disclosed-recipients:andris@kreata.ee;"`) or a mix of all the formats.

In addition to comma the semicolon is treated as the list delimiter as well (except when used in the group syntax), so a value `"andris@kreata.ee; andris.reinman@kreata.ee"` is identical to `"andris@kreata.ee, andris.reinman@kreata.ee"`.

## Installation

Install with npm

```
npm install addressparser
```

## Usage

Include the module

```javascript
var addressparser = require('addressparser');
```

Parse some address strings with `addressparser(field)`

```javascript
var addresses = addressparser('andris <andris@tr.ee>');
console.log(addresses); // [{name: "andris", address:"andris@tr.ee"}]
```

And when using groups

```javascript
addressparser('Composers:"Bach, Sebastian" <sebu@example.com>, mozart@example.com (Mozzie);');
```

the result would be

```
[
    {
        name: "Composers",
        group: [
            {
                address: "sebu@example.com",
                name: "Bach, Sebastian"
            },
            {
                address: "mozart@example.com",
                name: "Mozzie"
            }
        ]
    }
]
```

> Be prepared though that groups might be nested.

## Notes

This module does not decode any mime-word or punycode encoded strings, it is only a basic parser for parsing the base data, you need to decode the encoded parts later by yourself

## License

**MIT**