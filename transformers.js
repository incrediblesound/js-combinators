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
  result.operator = tokens[1].value
  result.children = tokens[2]
  return result
}

/* [ 'let', 'n', '=', '6'] */
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
