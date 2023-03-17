"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    parent;
    variables;
    constructor(parentContext) {
        this.parent = parentContext;
        this.variables = new Map();
    }
    declareVariable(varname, value) {
        if (this.variables.has(varname)) {
            throw new Error(`Can't declare variable ${varname} since it's already been declared`);
        }
        this.variables.set(varname, value);
        return value;
    }
    resolve(varname) {
        if (this.variables.has(varname)) {
            return this;
        }
        if (this.parent === undefined) {
            throw new Error(`Can't resolve '${varname}' as it doesn't exist.`);
        }
        return this.parent.resolve(varname);
    }
    assignVar(varname, value) {
        const context = this.resolve(varname);
        context.variables.set(varname, value);
        return value;
    }
    lookUpVar(varname) {
        const context = this.resolve(varname);
        return context.variables.get(varname);
    }
}
exports.default = Context;
//# sourceMappingURL=context.js.map