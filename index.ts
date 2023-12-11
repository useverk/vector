/**
 * Represents a mathematical vector of arbitrary dimension.
 * @property {number[]} values - The components of the vector.
 */
class Vector extends Array<number> {
    constructor(values: number[]) {
        super(...values);
    }

    add(vector: Vector): Vector {
        if (this.values.length !== vector.values.length) {
            throw new Error("Vectors must be of the same dimension");
        }

        let result = this.map((value, index) => value + vector[index]);
        return new Vector(result);
    }

    /**
     * Finds the average of the given vectors.
     * @param {(Vector|number[])[]} vectors - The vectors to average. Must be an array of vectors or arrays of numbers, or a mixture of both.
     * @returns {Vector} The average of the vectors.
     */
    static average(vectors: (Vector | number[])[]): Vector {
        if (vectors.length === 0) {
            throw new Error(
                "At least one vector is required to compute the average"
            );
        }
        let dimension = vectors[0].length;
        vectors.forEach((vector) => {
            if (vector.length !== dimension) {
                throw new Error("All vectors must be of the same dimension");
            }
        });

        let sumValues = new Array(dimension).fill(0);
        for (let vector of vectors) {
            sumValues = sumValues.map((sum, index) => sum + vector[index]);
        }

        let averageValues = sumValues.map((sum) => sum / vectors.length);
        return new Vector(averageValues);
    }

    /**
     * Computes the weighted average of the given vectors.
     *
     * @param {Vector[]} vectors - The vectors to average.
     * @param {number[]} weights - The weights to apply to each vector.
     * @returns {Vector|undefined} The weighted average of the vectors, or undefined if the sum of the weights is 0.
     * @throws {Error} If the number of vectors does not match the number of weights.
     * @throws {Error} If the vectors are not all of the same dimension.
     * @throws {Error} If there are no vectors.
     * @example
     * let v1 = new Vector([1, 2, 3])
     * let v2 = new Vector([4, 5, 6])
     * let v3 = new Vector([7, 8, 9])
     * let average = Vector.weightedAverage([v1, v2, v3], [1, 2, 3])
     *
     */
    static weightedAverage(
        vectors: Vector[],
        weights: number[]
    ): Vector | undefined {
        if (vectors.length === 0) {
            throw new Error(
                "At least one vector is required to compute the average"
            );
        }

        if (vectors.length !== weights.length) {
            throw new Error(
                "The number of vectors must match the number of weights"
            );
        }

        let dimension = vectors[0].values.length;
        vectors.forEach((vector) => {
            if (vector.values.length !== dimension) {
                throw new Error("All vectors must be of the same dimension");
            }
        });

        let sumValues = new Array(dimension).fill(0);
        for (let i = 0; i < vectors.length; i++) {
            let vector = vectors[i];
            let weight = weights[i];
            sumValues = sumValues.map(
                (sum, index) => sum + vector[index] * weight
            );
        }

        let sumWeights = weights.reduce((sum, weight) => sum + weight, 0);
        if (sumWeights === 0) {
            return undefined;
        }

        let averageValues = sumValues.map((sum) => sum / sumWeights);
        return new Vector(averageValues);
    }

    euclideanDistance(vector: Vector | number[]): number {
        if (this.values.length !== vector.values.length) {
            throw new Error("Vectors must be of the same dimension");
        }

        let sum = 0;
        for (let i = 0; i < this.values.length; i++) {
            sum += Math.pow(this[i] - vector[i], 2);
        }

        return Math.sqrt(sum);
    }

    static euclideanDistance(
        vector1: Vector | number[],
        vector2: Vector | number[]
    ): number {
        if (vector1.length !== vector2.length) {
            throw new Error("Vectors must be of the same dimension");
        }

        let sum = 0;
        for (let i = 0; i < vector1.length; i++) {
            sum += Math.pow(vector1[i] - vector2[i], 2);
        }

        return Math.sqrt(sum);
    }

    getValues(): ReadonlyArray<number> {
        return this;
    }

    toString() {
        return `[${this.getValues().join(", ")}]`;
    }
}

export { Vector };
