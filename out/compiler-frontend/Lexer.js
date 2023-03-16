"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    //Literal types
    TokenType[TokenType["Null"] = 0] = "Null";
    TokenType[TokenType["Number"] = 1] = "Number";
    TokenType[TokenType["Identifier"] = 2] = "Identifier";
    //Keywords
    TokenType[TokenType["Let"] = 3] = "Let";
    //Grouping * Operators
    TokenType[TokenType["Equals"] = 4] = "Equals";
    TokenType[TokenType["OpenParen"] = 5] = "OpenParen";
    TokenType[TokenType["CloseParen"] = 6] = "CloseParen";
    TokenType[TokenType["BinaryOperator"] = 7] = "BinaryOperator";
    TokenType[TokenType["EndOfLine"] = 8] = "EndOfLine";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
const KEYWORDS = {
    let: TokenType.Let,
    null: TokenType.Null,
};
function token(value = "", type) {
    return { value, type };
}
function isAlpha(src) {
    return src.toUpperCase() != src.toLowerCase();
}
function isInt(src) {
    const char = src.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return char >= bounds[0] && char <= bounds[1];
}
function isSkippAble(str) {
    return str === " " || str == "\n" || str == "\t";
}
function tokenizer(src) {
    const tokens = new Array();
    const tokensArray = src.split("");
    while (tokensArray.length > 0) {
        if (tokensArray[0] === "(") {
            tokens.push(token(tokensArray.shift(), TokenType.OpenParen));
        }
        else if (tokensArray[0] === ")") {
            tokens.push(token(tokensArray.shift(), TokenType.CloseParen));
        } // hanlde binary operators
        else if (tokensArray[0] === "+" ||
            tokensArray[0] === "-" ||
            tokensArray[0] === "/" ||
            tokensArray[0] === "*" ||
            tokensArray[0] === "%") {
            tokens.push(token(tokensArray.shift(), TokenType.BinaryOperator));
        } // handle conditional & assignment tokens
        else if (tokensArray[0] === "=") {
            tokens.push(token(tokensArray.shift(), TokenType.Equals));
        } //handle multicharacter tokens like 123 or let or <=, we should check if it's correct one
        else {
            // handle numeric literalls -> integers
            if (isInt(tokensArray[0])) {
                let num = "";
                while (tokensArray.length > 0 && isInt(tokensArray[0])) {
                    num += tokensArray.shift();
                }
                //append new numeric token
                tokens.push(token(num, TokenType.Number));
            } // hanlde identifier & keyword tokens
            else if (isAlpha(tokensArray[0])) {
                let ident = "";
                while (tokensArray.length > 0 && isAlpha(tokensArray[0])) {
                    ident += tokensArray.shift();
                }
                const reserved = KEYWORDS[ident]; // check if the ident is reserved word or just a identifier
                if (typeof reserved === "number") {
                    tokens.push(token(ident, reserved));
                }
                else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
            }
            else if (isSkippAble(tokensArray[0])) {
                tokensArray.shift();
            }
            else {
                console.log("Unrecognized character found in source", tokensArray[0]);
                process.exit();
            }
        }
    }
    tokens.push({ type: TokenType.EndOfLine, value: "EndOfFile" });
    return tokens;
}
exports.tokenizer = tokenizer;
const fs = require("fs");
fs.readFile("./test.txt", "utf-8", function (err, data) {
    const tokens = tokenizer(data);
    for (const token of tokens) {
        console.log("hm", { token });
    }
});
//# sourceMappingURL=Lexer.js.map