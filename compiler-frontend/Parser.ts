import {
  Stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
  VarDeclaration,
  AssignmentExpr,
  Property,
  ObjectLiteral,
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
    const left = this.parse_object_expr();

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
  private parse_object_expr(): Expr {
    // {prop[]}
    if (this.firstToken().type !== TokenType.OpenBrace) {
      return this.parse_additive_expr();
    }
    this.eat(); // advance past open brace
    const properties = new Array<Property>();
    while (this.not_eof() && this.firstToken().type != TokenType.CloseBrace) {
      //{key: val, key2: val}
      const key = this.expect(
        TokenType.Identifier,
        "Object literal key expected"
      ).value;
      // { x, }
      if (this.firstToken().type == TokenType.Comma) {
        this.eat();
        properties.push({
          key,
          kind: "Property",
          value: undefined,
        } as Property);
        continue;
      } else if (this.firstToken().type == TokenType.CloseBrace) {
        properties.push({
          key,
          kind: "Property",
          value: undefined,
        } as Property);
        continue;
      }
      // { key: val}
      this.expect(
        TokenType.Colon,
        "Missing colon following identifier in Object Expr"
      );
      // parse value expression of key
      const value = this.parse_expr();
      properties.push({ kind: "Property", value, key });
      if (this.firstToken().type != TokenType.CloseBrace) {
        this.expect(
          TokenType.Comma,
          "Expected comma or closing following property "
        );
      }
    }
    this.expect(TokenType.CloseBrace, "Object literal missing closing brace.");
    return { kind: "ObjectLiteral", properties } as ObjectLiteral;
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
      case (TokenType.OpenParen, TokenType.OpenBrace): {
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
