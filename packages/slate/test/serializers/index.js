import assert from 'assert'
import fs from 'fs'
import { Value } from '../..'
import { basename, extname, resolve } from 'path'

/**
 * Tests.
 */

describe('serializers', () => {
  describe('raw', () => {
    describe('deserialize()', () => {
      const dir = resolve(__dirname, './raw/deserialize')
      const tests = fs
        .readdirSync(dir)
        .filter(t => t[0] != '.')
        .map(t => basename(t, extname(t)))

      for (const test of tests) {
        it(test, async () => {
          const module = require(resolve(dir, test))
          const { input, output, options } = module
          const actual = Value.fromJSON(input, options).toJSON()
          const expected = output.toJSON()
          assert.deepEqual(actual, expected)
        })
      }
    })

    describe('serialize()', () => {
      const dir = resolve(__dirname, './raw/serialize')
      const tests = fs
        .readdirSync(dir)
        .filter(t => t[0] != '.')
        .map(t => basename(t, extname(t)))

      for (const test of tests) {
        it(test, async () => {
          const module = require(resolve(dir, test))
          const { input, output, options } = module
          console.log(options)
          const actual = input.toJSON(options)
          const expected = output
          assert.deepEqual(actual, expected)
        })
      }
    })
  })

  describe('cache', () => {
    const { input } = require('./raw/serialize/block')

    it('caches toJSON', () => {
      const output = input.toJSON()
      const output2 = input.toJSON()
      assert.equal(output2, output)
    })

    it('uses given cache', () => {
      const cache = new Map()
      const options = { cache }
      const output = input.toJSON(options)
      assert(cache.size > 0)
      const output2 = input.toJSON(options)
      assert.equal(output2, output)
    })

    it('supports cache: true', () => {
      const options = { cache: true }
      const output = input.toJSON(options)
      const output2 = input.toJSON(options)
      assert.equal(output2, output)
    })

    it('supports cache: false', () => {
      const options = { cache: false }
      const output = input.toJSON(options)
      const output2 = input.toJSON(options)
      assert.notEqual(output2, output)
    })
  })
})
