const { FAIL, EQUALS, NUMBER, STRING, WORD, SPECIAL } = require('./constants')

const fail = (reason) => ({ type: FAIL, reason })

/*
This function is used to generate a parser that matches a particular type of token
*/
const type = (type) => {
  return ([output, input]) => {
    if(input.type() === type){
      let nextOutput = input.advance()
      return [nextOutput, input]
    } else {
      return [fail(`Not a ${type}: ${input.value()}`), input]
    }
  }
}

const word = type(WORD)
const equals = type(EQUALS)
const number = type(NUMBER)
const string = type(STRING)
const special = type(SPECIAL)

/*
This function is used to generate a parser that matches a particular keyword
First it passes the input into the WORD parser, and then checks the value of the output
*/
const keyword = (value) => {
  return ([output, input]) => {
    const [result] = word([output, input])
    if(result.value === value){
      return [ result, input ]
    } else {
      return [fail(`Not "${value}": ${input.value}`), input]
    }
  }
}

/*
This function is used to generate a parser that matches a particular special character
or set of special characters
*/
const specialChar = (char) => {
  return ([output, input]) => {
    const [result] = special([output, input])
    if ((typeof char === 'string' && result.value === char) ||
        (Array.isArray(char) && char.indexOf(result.value) !== -1)){
      return [result, input]
    } else {
      return [fail(`Not "${char}": ${input.value}`), input]
    }
  }
}

module.exports = {
  type,
  special,
  specialChar,
  keyword,
  word,
  equals,
  number,
  string
}
