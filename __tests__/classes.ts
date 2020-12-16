// tslint:disable:max-classes-per-file

import { Memoize } from "../src";

export class DisgustingFlavorError extends Error {
	public constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, DisgustingFlavorError.prototype);
	}
}

export class Test {
	public called = 0;

	@Memoize()
	public fn(arg: number) {
		this.called += 1;
		return arg;
	}

	@Memoize()
	public drinkFlavor(flavor: string): string {
		if (flavor === "octopus") {
			throw new DisgustingFlavorError("yuck, octopus flavor");
		}

		this.called += 1;

		return flavor;
	}
}
