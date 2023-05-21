
# build-compiler-js

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`build-compiler-js` is a JavaScript library for building compiler for javascript. It provides a set of tools and utilities to simplify the process of creating compilers and language processors.

## Features

- Lexical analysis (tokenization) using regular expressions or custom rules.
- Syntactic analysis (parsing) with support for LL(k) and LR(k) grammars.
- Abstract Syntax Tree (AST) generation and manipulation.
- Semantic analysis and type checking.
- Code generation and optimization.
- Plugin system for extending the functionality of the compiler.

## Installation

You can install `build-compiler-js` using npm or Yarn:

```bash
npm install build-compiler-js
```

or

```bash
yarn add build-compiler-js
```

## Usage

Here's a basic example that demonstrates how to use `build-compiler-js`:

```javascript
const { Lexer, Parser, Compiler } = require('build-compiler-js');

// Define the grammar rules and actions
const grammar = {
  // Define your grammar rules here
};

// Create a lexer and specify the token rules
const lexer = new Lexer(/* token rules */);

// Create a parser with the lexer and grammar rules
const parser = new Parser(lexer, grammar);

// Parse input source code
const ast = parser.parse(/* input source code */);

// Perform semantic analysis, code generation, etc.

// Compile the source code
const compiler = new Compiler(/* configuration */);
const compiledCode = compiler.compile(ast);

// Use the compiled code
/* ... */
```

For detailed documentation and examples, please refer to the [API documentation](https://github.com/shavidze/build-compiler-js/tree/main/docs).

## Contributing

Contributions are welcome! If you'd like to contribute to `build-compiler-js`, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions, suggestions, or feedback, please feel free to [open an issue](https://github.com/shavidze/build-compiler-js/issues). We'd love to hear from you!

