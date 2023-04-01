import { env } from "process";
import {
  AssignmentExpr,
  BinaryExpr,
  Identifier,
  ObjectLiteral,
} from "../../compiler-frontend/Ast";
import Context from "../context";
import { evaluate } from "../interpreter";
import { RuntimeVal, NumberVal, MK_NULL, ObjectVal } from "../values";

export function eval_identifier(
  ident: Identifier,
  context: Context
): RuntimeVal {
  const val = context.lookUpVar(ident.symbol);
  return val;
}

export function eval_assignment(
  node: AssignmentExpr,
  context: Context
): RuntimeVal {
  if (node.assigne.kind !== "Identifier") {
    throw `Invalid LHS inside assignment expr ${JSON.stringify(node.assigne)}`;
  }
  const varname = (node.assigne as Identifier).symbol;
  return context.assignVar(varname, evaluate(node.value, context));
}

export function eval_binary_expr(
  binop: BinaryExpr,
  context: Context
): RuntimeVal {
  const lhs = evaluate(binop.left, context); // {value:10, kind: 'NumericLiteral'}, {value: 5, kind:'numeric'} 10
  const rhs = evaluate(binop.right, context); // {value: 8, kind:'numeric'} // 5 * 8
  if (lhs.type === "number" && rhs.type === "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator
    );
  } // 10 + 5 * 8
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

export function eval_object_expr(
  obj: ObjectLiteral,
  context: Context
): RuntimeVal {
  const object = {
    type: "object",
    properties: new Map<string, RuntimeVal>(),
  } as ObjectVal;
  for (const [key, value] of object.properties) {
    //handle valid key:pair
    const runtimeVal =
      value === undefined ? context.lookUpVar(key) : evaluate(value, context);
    object.properties.set(key, runtimeVal);
  }
  return object;
}
