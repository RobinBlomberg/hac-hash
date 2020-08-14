import * as Hash from '../src'
import { strictEqual } from 'assert'

;(async() => {
  const password = 'foobar'
  const hash = await Hash.generateHash(password)
  
  strictEqual(
    await Hash.verifyHash(password, hash),
    true
  )
  strictEqual(
    await Hash.verifyHash('fooBar', hash),
    false
  )

  console.log('\u001b[32m✓ Test "hcu-hash" passed.\u001b[39m')
})()
