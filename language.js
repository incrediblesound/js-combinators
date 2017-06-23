const { keyword, specialChar, type, word, equals, number, string } = require('./primitives')
const { or, and, apply, any, sequence } = require('./logic')
const { FAIL } = require('./constants')
const { makeFunc, makeTree, makeLet } = require('./transformers')

const letKeyword = keyword('let')
const openParens = specialChar('(')
const closeParens = specialChar(')')
const operator = specialChar(['+','-','*','/'])

const valueExp = or(number, string)

/*
Read: "A function expression is an open parens, then an operator, then any number of value expressions
or function expressions, then a close parens."
*/
const functionExp = ([output, input]) => {
  let [result] = apply(makeFunc, sequence(
    openParens,
    operator,
    any(or(valueExp, functionExp)),
    closeParens
  ))([output, input])
  return [result, input]
}

/*
"A let statement is the keyword let followed by a word, an equals sign, and then either a function
expression or a value."
*/
const letStatement = apply(makeLet, sequence(
  letKeyword, word, equals, or(functionExp, valueExp)
))

/*
The parser matches any number of let statements or function expressions"
*/
const parser = any(or(
  letStatement,
  functionExp
))

module.exports = parser
