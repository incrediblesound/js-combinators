const { FAIL } = require('./constants')

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
