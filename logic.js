const { FAIL } = require('./constants')

/*
This logical combinator takes another parser and passes the input
into that parser until the input is exhausted or the parser returns FAIL
*/
const any = (parser) => {
  return ([output, input]) => {
    let results = []
    var result = null
    do {
      [result] = parser([output, input])
      if(result.type !== FAIL){
        results.push(result)
      } else {
        return [results, input]
      }
    } while(!input.isDone() && result.type !== FAIL)
    return [results, input]
  }
}

/*
This combinator takes any number of parsers and matches the tokens against
each one of those parsers in sequence. It returns a failure when any of the parsers
return FAIL
*/
const sequence = (...parsers) => {
  return ([output, input]) => {
    let results = []
    for(let i = 0; i < parsers.length; i++){
      let [result] = parsers[i]([output, input])
      if(result.type === FAIL) return [result, input]
      results.push(result)
    }
    return [results, input]
  }
}

/*
This combinator takes two parsers and tries one, backtracks in case of a failure,
and then tries the other. If either parser returns a value then that value will be returned,
otherwise the failure is returned.
*/
const or = (parserA, parserB) => {
  return ([output, input]) => {
    let idx = input.rememberIdx()
    const [resultA ] = parserA([output, input])
    if(resultA.type !== FAIL) return [resultA, input]
    input.recoverIdx(idx)
    const [resultB ] = parserB([output, input])
    if(resultB.type !== FAIL) return [resultB, input]
    input.recoverIdx(idx)
    return [resultB, input]
  }
}

/*
This function is used to transform the output from any parser
*/
const apply = (fn, parser) => {
  return ([output, input]) => {
    const [result] = parser([output, input])
    if(result.type !== FAIL){
      return [fn(result), input]
    } else {
      return [result, input]
    }
  }
}

module.exports = {
  any,
  sequence,
  or,
  apply
}
