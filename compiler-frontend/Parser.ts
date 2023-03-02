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
    return this.parse_primary_expr();
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

      default:
        console.error("Unexpected token was found ", this.firstToken());
        process.exit();
    }
  }
}
