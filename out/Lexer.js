"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Number"] = 0] = "Number";
    TokenType[TokenType["Identifier"] = 1] = "Identifier";
    TokenType[TokenType["Equals"] = 2] = "Equals";
    TokenType[TokenType["OpenParen"] = 3] = "OpenParen";
    TokenType[TokenType["CloseParen"] = 4] = "CloseParen";
    TokenType[TokenType["BinaryOperator"] = 5] = "BinaryOperator";
    TokenType[TokenType["Let"] = 6] = "Let";
    TokenType[TokenType["EndOfLine"] = 7] = "EndOfLine";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
const KEYWORDS = {
    let: TokenType.Let,
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
        }
        else if (tokensArray[0] === "+" ||
            tokensArray[0] === "-" ||
            tokensArray[0] === "/" ||
            tokensArray[0] === "*") {
            tokens.push(token(tokensArray.shift(), TokenType.BinaryOperator));
        }
        else if (tokensArray[0] === "=") {
            tokens.push(token(tokensArray.shift(), TokenType.Equals));
        }
        else {
            //handle multicharacter tokens like 123 or let or <=, we should check if it's correct one
            if (isInt(tokensArray[0])) {
                let num = "";
                while (tokensArray.length > 0 && isInt(tokensArray[0])) {
                    num += tokensArray.shift();
                }
                tokens.push(token(num, TokenType.Number));
            }
            else if (isAlpha(tokensArray[0])) {
                let ident = "";
                while (tokensArray.length > 0 && isAlpha(tokensArray[0])) {
                    ident += tokensArray.shift();
                }
                const reserved = KEYWORDS[ident]; // check if the ident is reserved word or just a identifier
                if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier));
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
    return tokens;
}
exports.tokenizer = tokenizer;
const fs = require("fs");
fs.readFile("./test.txt", "utf-8", function (err, data) {
    const tokens = tokenizer(data);
    for (const token of tokens) {
        console.log({ token });
        debugger;
    }
});
//# sourceMappingURL=Lexer.js.map