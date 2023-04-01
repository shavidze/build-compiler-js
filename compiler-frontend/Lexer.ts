export enum TokenType {
  //Literal types
  Number,
  // x,y,nameOfVariable
  Identifier,
  //Keywords
  Let,
  Const,
  //Grouping * Operators
  Equals,
  //()
  OpenParen,
  CloseParen,
  //[]
  OpenBrace,
  CloseBrace,
  //:
  Colon,
  //,
  Comma,
  //;
  Semicolon,
  // * / + - %
  BinaryOperator,
  // /n
  EndOfLine,
}

export interface Token {
  value: string;
  type: TokenType;
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  const: TokenType.Const,
};

function token(value = "", type: TokenType) {
  return { value, type };
}

function isAlpha(src: string) {
  return src.toUpperCase() != src.toLowerCase();
}

function isInt(src: string) {
  const char = src.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return char >= bounds[0] && char <= bounds[1];
}

function isSkippAble(str: string) {
  return str === " " || str == "\n" || str == "\t" || str == "\r";
}
export function tokenizer(src: string): Token[] {
  const tokens: Array<Token> = new Array<Token>();
  const tokensArray = src.split("");
  while (tokensArray.length > 0) {
    if (tokensArray[0] === "(") {
      tokens.push(token(tokensArray.shift(), TokenType.OpenParen));
    } else if (tokensArray[0] === ")") {
      tokens.push(token(tokensArray.shift(), TokenType.CloseParen));
    } else if (tokensArray[0] === "{") {
      tokens.push(token(tokensArray.shift(), TokenType.OpenBrace));
    } else if (tokensArray[0] === "}") {
      tokens.push(token(tokensArray.shift(), TokenType.CloseBrace));
    }
    // hanlde binary operators
    else if (
      tokensArray[0] === "+" ||
      tokensArray[0] === "-" ||
      tokensArray[0] === "/" ||
      tokensArray[0] === "*" ||
      tokensArray[0] === "%"
    ) {
      tokens.push(token(tokensArray.shift(), TokenType.BinaryOperator));
    } // handle conditional & assignment tokens
    else if (tokensArray[0] === "=") {
      tokens.push(token(tokensArray.shift(), TokenType.Equals));
    } else if (tokensArray[0] === ";") {
      tokens.push(token(tokensArray.shift(), TokenType.Semicolon));
    } else if (tokensArray[0] === ":") {
      tokens.push(token(tokensArray.shift(), TokenType.Colon));
    } else if (tokensArray[0] === ",") {
      tokens.push(token(tokensArray.shift(), TokenType.Comma));
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
        } else {
          tokens.push(token(ident, TokenType.Identifier));
        }
      } else if (isSkippAble(tokensArray[0])) {
        tokensArray.shift();
      } else {
        console.log("Unrecognized character found in source", tokensArray[0]);
        process.exit();
      }
    }
  }
  tokens.push({ type: TokenType.EndOfLine, value: "EndOfFile" });
  return tokens;
}

const fs = require("fs");
fs.readFile("./test.txt", "utf-8", function (err, data) {
  const tokens = tokenizer(data);
});
