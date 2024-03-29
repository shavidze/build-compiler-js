export type ValueType = "null" | "number" | "boolean" | "object";
export interface RuntimeVal {
  type: ValueType;
}

export interface NullVal extends RuntimeVal {
  type: "null";
  value: string;
}

export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export interface BooleanVal extends RuntimeVal {
  type: "boolean";
  value: boolean;
}
export interface ObjectVal extends RuntimeVal {
  type: "object";
  properties: Map<string, RuntimeVal>;
}

/**
 *
 * Some micro styles functions like in C
 */
export function MK_NULL() {
  return { type: "null", value: null } as NullVal;
}

export function MK_NUMBER(n = 0) {
  return { type: "number", value: n } as NumberVal;
}

export function MK_BOOL(b = true) {
  return { type: "boolean", value: b } as BooleanVal;
}
