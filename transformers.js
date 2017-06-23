class Tree {
  constructor(type){
    this.type = type
    this.children = []
  }
  insert(child){
    this.children.push(child)
  }
}

const makeTree = (type) => {
  return (children) => {
    const result = new Tree(type)
    children.forEach(child => result.insert(child))
    return result
  }
}

/* [ '(', '*', [ 3, 4 ], ')' ] */
const makeFunc = (tokens) => {
  const result = new Tree('function')
  tokens.shift()
  tokens.pop()
  result.operator = tokens[0].value
  result.children = tokens[1]
  return result
}

const makeLet = (children) => {
  return {
    type: 'let',
    name: children[1].value,
    value: children[3].value
  }
}

module.exports = {
  makeFunc,
  makeTree,
  makeLet
}
