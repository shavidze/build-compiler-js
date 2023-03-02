"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lexer_1 = require("./Lexer");
class Parser {
    tokens = [];
    firstToken() {
        return this.tokens[0];
    }
    eat() {
        const token = this.tokens.shift();
        return token;
    }
    not_eof() {
        return this.tokens[0].type !== Lexer_1.TokenType.EndOfLine;
    }
    produceAstTree(srcCode) {
        this.tokens = (0, Lexer_1.tokenizer)(srcCode);
        const program = {
            kind: "Program",
            body: [],
        };
        while (this.not_eof()) {
            program.body.push(this.parse_stmt());
        }
        return program;
    }
    parse_stmt() {
        return this.parse_expr();
    }
    parse_expr() {
        return this.parse_primary_expr();
    }
    parse_primary_expr() {
        const tokenType = this.firstToken().type;
        switch (tokenType) {
            case Lexer_1.TokenType.Identifier:
                return {
                    kind: "Identifier",
                    symbol: this.eat().value,
                };
            case Lexer_1.TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                };
            default:
                console.error("Unexpected token was found ", this.firstToken());
                process.exit();
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map