import * as Hash from '../src'
import { strictEqual } from 'assert'

;(async() => {
  const password = 'foobar'
  const hash = await Hash.generate(password)

  strictEqual(
    await Hash.verify(password, hash),
    true
  )
  strictEqual(
    await Hash.verify('fooBar', hash),
    false
  )

  console.log('\u001b[32m✓ Test "hcu-hash" passed.\u001b[39m')
})()
