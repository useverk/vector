import { describe, expect, it } from "vitest";
import { Vector } from "../index";

const testVector = new Vector([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe.concurrent("Average", () => {
    it("should return the average vector space as a vector", () => {
        expect(Vector.average([testVector, testArray])).toEqual(
            new Vector([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        );
        expect(Vector.average([testVector, testArray])).toBeInstanceOf(Vector);
    });
    it("should error if the vectors are not of the same dimension", () => {
        expect(() =>
            Vector.average([testVector, new Vector([1, 2, 3])])
        ).toThrow("All vectors must be of the same dimension");
    });
    it("should error if there are no vectors", () => {
        expect(() => Vector.average([])).toThrow(
            "At least one vector is required to compute the average"
        );
    });
});
