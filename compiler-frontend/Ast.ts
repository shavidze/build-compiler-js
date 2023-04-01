export type NodeType =
  //STATEMENTS
  | "Program"
  | "VarDeclaration"
  //EXPRESSIONS
  | "AssignmentExpr"

  //LITERALS
  | "NumericLiteral"
  | "ObjectLiteral"
  | "Property"
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

export interface ObjectLiteral extends Expr {
  kind: "ObjectLiteral";
  properties: Property[];
}

export interface Property extends Expr {
  kind: "Property";
  key: string;
  value?: Expr;
}
