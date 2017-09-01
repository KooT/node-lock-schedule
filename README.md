# schedlock
Schedule job on multiple instance with redis lock

## Instalataion

```bash
npm install --save schedlock
```

## Example
```node
const SchedLock = require("schedlock");
const redis = require("redis");

const client = redis.createClient();
const s = new SchedLock(client, "key");

const funToRun = () => {
   console.log("The Answer is 42");
};

s.schedule("*/1 * * * *", funToRun);
```
