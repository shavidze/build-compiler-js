import { RuntimeVal } from "./values";

export default class Context {
  private parent?: Context;
  private variables: Map<string, RuntimeVal>;
  private constants: Set<string>;
  constructor(parentContext?: Context) {
    this.parent = parentContext;
    this.variables = new Map();
    this.constants = new Set();
  }

  public declareVariable(
    varname: string,
    value: RuntimeVal,
    constant: boolean
  ): RuntimeVal {
    if (this.variables.has(varname)) {
      throw new Error(
        `Can't declare variable ${varname} since it's already been declared`
      );
    }
    this.variables.set(varname, value);
    if (constant) {
      this.constants.add(varname);
    }
    return value;
  }
  public resolve(varname: string): Context {
    if (this.variables.has(varname)) {
      return this;
    }

    if (this.parent === undefined) {
      throw new Error(`Can't resolve '${varname}' as it doesn't exist.`);
    }
    return this.parent.resolve(varname);
  }

  public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
    const context = this.resolve(varname);
    //can't assign to contant
    if (context.constants.has(varname)) {
      throw `Cann't reasign to variable ${varname} since it's a constant`;
    }
    context.variables.set(varname, value);
    return value;
  }

  public lookUpVar(varname: string): RuntimeVal {
    const context = this.resolve(varname);
    return context.variables.get(varname);
  }
}
