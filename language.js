const { keyword, specialChar, type, word, equals, number, string } = require('./primitives')
const { or, and, apply, any, sequence } = require('./logic')
const { FAIL } = require('./constants')
const { makeFunc, makeTree, makeLet } = require('./transformers')

const letKeyword = keyword('let')
const openParens = specialChar('(')
const closeParens = specialChar(')')
const operator = specialChar(['+','-','*','/'])

const valueExp = or(number, string)

const functionExp = ([output, input]) => {
  let [result] = apply(makeFunc, sequence(
    openParens,
    operator,
    any(or(valueExp, functionExp)),
    closeParens
  ))([output, input])
  return [result, input]
}

const letStatement = apply(makeLet, sequence(
  letKeyword, word, equals, or(functionExp, valueExp)
))

const parser = any(or(
  letStatement,
  functionExp
))

module.exports = parser
