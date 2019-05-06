// tslint:disable:max-classes-per-file

import { Memoize } from "../src";

class CustomError extends Error {}

class Test {
	public called = 0;

	@Memoize()
	public fn(arg: number) {
		this.called += 1;
		return arg;
	}

	@Memoize()
	public error() {
		throw new CustomError();
	}
}

describe("function", () => {
	it("works", () => {
		const test = new Test();
		expect(test.fn(1)).toEqual(1);
		expect(test.called).toEqual(1);
		expect(test.fn(1)).toEqual(1);
		expect(test.called).toEqual(1);
	});

	it("different arguments", () => {
		const test = new Test();
		expect(test.fn(1)).toEqual(1);
		expect(test.called).toEqual(1);
		expect(test.fn(100)).toEqual(100);
		expect(test.called).toEqual(2);
	});

	it("multiple instances", () => {
		const test1 = new Test();
		const test2 = new Test();
		expect(test1.fn(1)).toEqual(1);
		expect(test1.called).toEqual(1);
		expect(test2.called).toEqual(0);
		expect(test2.fn(2)).toEqual(2);
		expect(test1.called).toEqual(1);
		expect(test2.called).toEqual(1);
	});

	it("throws errors", () => {
		const test1 = new Test();
		const test2 = new Test();
		expect(() => test1.error()).toThrow(CustomError);
		expect(() => test2.error()).toThrow(CustomError);
	});
});
