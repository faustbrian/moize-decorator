/* eslint-disable @typescript-eslint/unbound-method */

import moize from "moize";

export function Memoize() {
	// @ts-ignore
	return (target: {}, propertyKey: string, descriptor: PropertyDescriptor) => {
		if (descriptor.value) {
			descriptor.value = newFunction(propertyKey, descriptor.value);
		} else if (descriptor.get) {
			descriptor.get = newGetter(propertyKey, descriptor.get);
		} else {
			throw new Error("Only bind @Memoize() to functions or getters.");
		}
	};
}

function newFunction(name: string, fn: () => any) {
	return function (this: any, ...args: any[]) {
		const bound = fn.bind(this);
		// @ts-ignore
		const value = (moize as (...args: any[]) => (...args: any[]) => any)(bound);
		Object.defineProperty(this, name, { value });
		return value(...args);
	};
}

function newGetter(name: string, fn: () => any) {
	return function (this: any) {
		const value = fn.apply(this);
		Object.defineProperty(this, name, { value });
		return value;
	};
}
