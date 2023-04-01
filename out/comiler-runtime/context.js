"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalEnv = void 0;
const values_1 = require("./values");
function createGlobalEnv() {
    //create default global context
    const context = new Context();
    context.declareVariable("true", (0, values_1.MK_BOOL)(true), true);
    context.declareVariable("false", (0, values_1.MK_BOOL)(false), true);
    context.declareVariable("null", (0, values_1.MK_NULL)(), true);
}
exports.createGlobalEnv = createGlobalEnv;
class Context {
    parent;
    variables;
    constants;
    constructor(parentContext) {
        const global = parentContext ? true : false;
        this.parent = parentContext;
        this.variables = new Map();
        this.constants = new Set();
        if (global) {
            createGlobalEnv();
        }
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