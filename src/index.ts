import * as crypto from 'crypto'
import { HashOptions } from './types'

const DIGEST_ALGORITHM = 'sha512'
const ITERATIONS = 2048
const KEY_LENGTH = 32
const SALT_LENGTH = 16

export type { HashOptions }

export const generate = (
  password: string,
  salt = crypto.randomBytes(SALT_LENGTH).toString('hex'),
  {
    digestAlgorithm = DIGEST_ALGORITHM,
    iterations = ITERATIONS,
    keyLength = KEY_LENGTH
  }: HashOptions = {}
) => {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      digestAlgorithm,
      (error, key) => {
        if (error) {
          reject(error)
        } else {
          const result = [salt, key.toString('hex')].join('$')
          resolve(result)
        }
      }
    )
  })
}

export const verify = async(
  password: string,
  hash: string,
  options?: HashOptions
) => {
  const [salt, oldHashPart] = hash.split('$')
  const newHash = await generate(password, salt, options)
  const newHashPart = newHash.split('$')[1]
  return newHashPart === oldHashPart
}
