import {
  Stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
  VarDeclaration,
  AssignmentExpr,
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
    const prev = this.eat();
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
    switch (this.firstToken().type) {
      case TokenType.Let:
      case TokenType.Const:
        return this.parse_var_declaration();
      default:
        return this.parse_expr();
    }
  }

  // const | let -> identifier -> ; | = -> Expr;
  public parse_var_declaration(): Stmt {
    const isConst = this.eat().type === TokenType.Const;
    const identifier = this.expect(
      TokenType.Identifier,
      "Exptected identifier name following let | const keywords."
    ).value;
    if (this.firstToken().type === TokenType.Semicolon) {
      this.eat();
      if (isConst) {
        throw new Error(
          `Must assigne value to constant expression. No value is provided`
        );
      }
      return {
        kind: "VarDeclaration",
        constant: false,
        identifier,
      } as VarDeclaration;
    }
    this.expect(
      TokenType.Equals,
      "Expected equals token following by identifier in variable declataion."
    );
    const declaration = {
      kind: "VarDeclaration",
      value: this.parse_expr(),
      identifier,
      constant: isConst,
    } as VarDeclaration;
    this.expect(
      TokenType.Semicolon,
      "Variable declaration statement must end with semicolon."
    );
    return declaration;
  }

  private parse_expr(): Expr {
    return this.parse_assignment_expr();
  }

  private parse_assignment_expr(): Expr {
    const left = this.parse_additive_expr();
    if (this.firstToken().type === TokenType.Equals) {
      this.eat();
      const value = this.parse_assignment_expr();
      return {
        value,
        assigne: left,
        kind: "AssignmentExpr",
      } as AssignmentExpr;
    }
    return left;
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
