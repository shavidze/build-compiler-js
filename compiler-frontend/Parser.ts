import {
  Stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
} from "./Ast";
import { tokenizer, Token, TokenType } from "./Lexer";

export default class Parser {
  private tokens: Token[] = [];
  private firstToken() {
    return this.tokens[0] as Token;
  }
  private eat() {
    const token = this.tokens.shift();
    return token as Token;
  }
  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
      process.exit();
    }
    return prev;
  }
  private not_eof() {
    return this.tokens[0].type !== TokenType.EndOfLine;
  }
  public produceAstTree(srcCode: string) {
    this.tokens = tokenizer(srcCode);
    const program: Program = {
      kind: "Program",
      body: [],
    };
    while (this.not_eof()) {
      program.body.push(this.parse_stmt());
    }
    return program;
  }
  private parse_stmt(): Stmt {
    return this.parse_expr();
  }
  private parse_expr(): Expr {
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
  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicative_expr();
    while (this.firstToken().value === "+" || this.firstToken().value === "-") {
      let operator = this.eat().value;
      let right = this.parse_multiplicative_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }
    return left;
  }

  private parse_multiplicative_expr(): Expr {
    let left = this.parse_primary_expr();
    while (
      this.firstToken().value === "/" ||
      this.firstToken().value === "*" ||
      this.firstToken().value === "%"
    ) {
      let operator = this.eat().value;
      let right = this.parse_primary_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }
    return left;
  }
  private parse_primary_expr(): Expr {
    const tokenType = this.firstToken().type;
    switch (tokenType) {
      case TokenType.Identifier:
        return {
          kind: "Identifier",
          symbol: this.eat().value,
        } as Identifier;
      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value),
        } as NumericLiteral;
      case TokenType.OpenParen: {
        this.eat();
        const value = this.parse_expr();
        this.expect(
          TokenType.CloseParen,
          "Unexpected token was found inside the parenthesised expression. Expected closing par"
        );
        return value;
      }
      default:
        console.error("Unexpected token was found ", this.firstToken());
        process.exit();
    }
  }
}
