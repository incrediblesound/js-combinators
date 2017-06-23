# JS Combinators
Parser combinator example in JavaScript

Because of this thread on Hacker News: https://news.ycombinator.com/item?id=14600079   
I discovered this article: http://theorangeduck.com/page/you-could-have-invented-parser-combinators   

...and that made me really interested in parser combinators. I have implemented parsers in the past and the parser combinator seemed like a great way to do it. But, of course, the devil is in the details so I decided to make a simple implementation of parser combinators to learn about how they work.

The advantage of parser combinators is clear when you look at the actual parser definition located in language.js in this repo. It is trivial to define the language by simply combining the "primitive" parsers with "logical" parsers, and the resulting code is extremely clear and understandable. The drawback was immediately clear, however, which is that everything is generic and thus debugging can be a challenge.

To run the program use a recent version of Node.js:

```shell
node test.js
```

That will tokenize a simple program, feed it into the parser and log the results to the console.  

NOTE: The language defined by the parser/tokenizer is purely for testing purposes. The tokenizer is just to help you conveniently mock an array of tokens for testing the parser. The parser itself is a composition of the logical combinators contained in logic.js and the primitive combinators in primitives.js.
