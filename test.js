const parser = require('./language')
const Input = require('./Input')
const { NUMBER, SPECIAL, WORD, EQUALS } = require('./constants')
const tokenizer = require('./tokenizer')

const tokens = tokenizer('( * 4 ( + 3 "cat" ) ) let x = 10')
const input = new Input(tokens)
const [result] = parser([null, input])

console.log(result)
