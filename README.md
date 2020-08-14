# HiQ Ace Creative Hash

```javascript
import * as Hash from 'hac-hash'

const generateAndValidateHash = () => {
  const hash = await Hash.generateHash('foobar')
  // 45b7457897c3bfb859e133c933934dce$626752e7a758e12bd9bde4e65af7e2a69f2c64196bec3b21ffde930055525d9f

  await Hash.validateHash('foobar', hash)
  // true

  await Hash.validateHash('incorrect', hash)
  // false
}
```
