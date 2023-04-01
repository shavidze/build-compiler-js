export type NodeType =
  //STATEMENT
  | "Program"
  | "VarDeclaration"
  | "AssignmentExpr"
  | "NumericLiteral"
  | "Identifier"
  | "BinaryExpr";

//statement; let x = 45;
export interface Stmt {
  kind: NodeType;
}

export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

export interface VarDeclaration extends Stmt {
  kind: "VarDeclaration";
  constant: boolean;
  identifier: string;
  value?: Expr;
}

/**
 * Expressions will get a value at runtime  unlike statements
 */
export interface Expr extends Stmt {}

// let x = {foo: "Bar"}
// x.foo = "foo bar"
export interface AssignmentExpr extends Expr {
  kind: "AssignmentExpr";
  assigne: Expr;
  value: Expr;
}

export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string;
}

export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}
