import { ValueType, RuntimeVal, NumberVal, NullVal } from "./values";
import {
  BinaryExpr,
  NodeType,
  NumericLiteral,
  Program,
  Stmt,
} from "../compiler-frontend/Ast";

function eval_program(program: Program): RuntimeVal {
  let lastEval: RuntimeVal = { type: "null", value: "null" } as NullVal;
  for (const stmt of program.body) {
    lastEval = evaluate(stmt);
  }
  return lastEval;
}

function eval_binary_expr(binop: BinaryExpr): RuntimeVal {
  const lhs = evaluate(binop.left);
  const rhs = evaluate(binop.right);
  if (lhs.type === "number" && rhs.type === "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator
    );
  }
  return { type: "null", value: "null" } as NullVal;
}

function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string
): NumberVal {
  let result: number;
  switch (operator) {
    case "+":
      result = lhs.value + rhs.value;
    case "-":
      result = lhs.value - rhs.value;
    case "/":
      // TODO: check on zero
      result = lhs.value / rhs.value;
    case "*":
      result = lhs.value * rhs.value;
    case "%":
      result = lhs.value % rhs.value;
  }
  return { value: result, type: "number" };
}

export function evaluate(astNode: Stmt): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: (astNode as NumericLiteral).value,
        type: "number",
      } as NumberVal;
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr);
    case "Program":
      return eval_program(astNode as Program);
    case "NullLiteral":
      return { value: "null", type: "null" } as NullVal;

    default:
      console.error(
        "This AST Node has not yet been setup for interpretation",
        astNode
      );
      process.exit();
  }
}
