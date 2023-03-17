import { RuntimeVal } from "./values";

export default class Context {
  private parent?: Context;
  private variables: Map<string, RuntimeVal>;

  constructor(parentContext?: Context) {
    this.parent = parentContext;
    this.variables = new Map();
  }

  public declareVariable(varname: string, value: RuntimeVal): RuntimeVal {
    if (this.variables.has(varname)) {
      throw new Error(
        `Can't declare variable ${varname} since it's already been declared`
      );
    }
    this.variables.set(varname, value);
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
    context.variables.set(varname, value);
    return value;
  }

  public lookUpVar(varname: string): RuntimeVal {
    const context = this.resolve(varname);
    return context.variables.get(varname);
  }
}
