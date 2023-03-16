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
    expect(type, err) {
        const prev = this.tokens.shift();
        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
            process.exit();
        }
        return prev;
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
        return this.parse_additive_expr();
    }
    //მოქმედებების თანმიმდევრობა
    // Assignment Express
    // Member Express
    // Function Call
    // Logical Express
    // Comparision Express
    // Additive Expression
    // Multiplicitave Expression
    // Unary Express ++ -- !
    // Primary Expres
    // (7 + 4) -3
    parse_additive_expr() {
        let left = this.parse_multiplicative_expr();
        while (this.firstToken().value === "+" || this.firstToken().value === "-") {
            let operator = this.eat().value;
            let right = this.parse_multiplicative_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            };
        }
        return left;
    }
    parse_multiplicative_expr() {
        let left = this.parse_primary_expr();
        while (this.firstToken().value === "/" ||
            this.firstToken().value === "*" ||
            this.firstToken().value === "%") {
            let operator = this.eat().value;
            let right = this.parse_primary_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            };
        }
        return left;
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
            case Lexer_1.TokenType.OpenParen: {
                this.eat();
                const value = this.parse_expr();
                this.expect(Lexer_1.TokenType.CloseParen, "Unexpected token was found inside the parenthesised expression. Expected closing par");
                return value;
            }
            default:
                console.error("Unexpected token was found ", this.firstToken());
                process.exit();
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map