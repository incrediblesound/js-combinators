const { NUMBER, SPECIAL, WORD, EQUALS, STRING } = require('./constants')

const isSpecialChar = (char) => {
  return ['*','-','+','(', ')'].indexOf(char) !== -1
}

const isNumber = (char) => {
  return /[0-9]+/.test(char)
}

const isString = (char) => {
  return char[0] === '"' && char[char.length-1] === '"'
}

const isWord = (char) => {
  return !isString(char) && /[a-z|A-Z]+/.test(char)
}

const tokenizer = (string) => {
  let chars = string.split(' ')
  return chars.map(char => {
    if(isSpecialChar(char)){
      return { type: SPECIAL, value: char }
    } else if(isNumber(char)){
      return { type: NUMBER, value: char }
    } else if(char === '='){
      return { type: EQUALS, value: char }
    } else if(isWord(char)){
      return { type: WORD, value: char }
    } else if(isString(char)){
      return { type: STRING, value: char }
    }
  })
}

module.exports = tokenizer
