class Input {
  constructor(tokens){
    this.tokens = tokens
    this.idx = 0
    this.previousIdx = 0
  }
  isDone(){
    return this.idx === this.tokens.length
  }
  value(){
    return this.tokens[this.idx].value
  }
  type(){
    return this.tokens[this.idx].type
  }
  advance(){
    const result = this.tokens[this.idx]
    this.idx++
    return result
  }
  backtrack(num){
    this.idx -= num
  }
  rememberIdx(){
    return this.idx
  }
  recoverIdx(idx){
    this.idx = idx
  }
}

module.exports = Input
