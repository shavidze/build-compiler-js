"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    parent;
    variables;
    constants;
    constructor(parentContext) {
        this.parent = parentContext;
        this.variables = new Map();
        this.constants = new Set();
    }
    declareVariable(varname, value, constant) {
        if (this.variables.has(varname)) {
            throw new Error(`Can't declare variable ${varname} since it's already been declared`);
        }
        this.variables.set(varname, value);
        if (constant) {
            this.constants.add(varname);
        }
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
        //can't assign to contant
        if (context.constants.has(varname)) {
            throw `Cann't reasign to variable ${varname} since it's a constant`;
        }
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