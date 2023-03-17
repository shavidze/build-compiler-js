import { BinaryExpr, Identifier } from "../../compiler-frontend/Ast";
import Context from "../context";
import { evaluate } from "../interpreter";
import { RuntimeVal, NumberVal, MK_NULL } from "../values";

export function eval_identifier(
  ident: Identifier,
  context: Context
): RuntimeVal {
  console.log("look up variable");
  const val = context.lookUpVar(ident.symbol);
  return val;
}

export function eval_binary_expr(
  binop: BinaryExpr,
  context: Context
): RuntimeVal {
  const lhs = evaluate(binop.left, context);
  const rhs = evaluate(binop.right, context);
  if (lhs.type === "number" && rhs.type === "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator
    );
  }
  return MK_NULL();
}

export function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string
): NumberVal {
  let result: number = 0;
  switch (operator) {
    case "+":
      return { type: "number", value: (result = lhs.value + rhs.value) };
    case "-":
      return { type: "number", value: (result = lhs.value - rhs.value) };
    case "/":
      // TODO: check on zero
      return { type: "number", value: (result = lhs.value / rhs.value) };
    case "*":
      return { type: "number", value: (result = lhs.value * rhs.value) };
    case "%":
      return { type: "number", value: (result = lhs.value % rhs.value) };
    default:
      return { value: result, type: "number" };
  }
}
