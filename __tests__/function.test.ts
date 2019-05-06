// tslint:disable:max-classes-per-file

import { DisgustingFlavorError, Test } from "./classes";

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
		const test = new Test();

		expect(() => {
			test.drinkFlavor("octopus");
		}).toThrowError(/yuck/);

		expect(() => {
			test.drinkFlavor("octopus");
		}).toThrowError("yuck");

		expect(() => {
			test.drinkFlavor("octopus");
		}).toThrowError(/^yuck, octopus flavor$/);

		expect(() => {
			test.drinkFlavor("octopus");
		}).toThrowError(new Error("yuck, octopus flavor"));

		expect(() => {
			test.drinkFlavor("octopus");
		}).toThrowError(DisgustingFlavorError);
	});
});
