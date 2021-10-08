# await-sleep

Blocking delay with async/await

## Installation

```bash
npm i --save await-sleep
```

## Usage

```js
import sleep from 'await-sleep'

async function myAsyncFunction() {
  console.time('Sleeping');

  await sleep(1500);

  console.timeEnd('Sleeping'); // Sleeping: 1507.180ms
}

```
