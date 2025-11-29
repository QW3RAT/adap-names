import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.components = [...source];
        this.checkInvariant();
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    // --- Implementation of the Narrow Interface ---

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        // Precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            `getComponent: Index ${i} out of bounds`
        );
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        // Preconditions
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            `setComponent: Index ${i} out of bounds`
        );
        IllegalArgumentException.assert(c !== null && c !== undefined, "setComponent: Component cannot be null");

        this.components[i] = c;
        this.checkInvariant();
    }

    public insert(i: number, c: string) {
        // Preconditions (Note: i == length is allowed for append)
        IllegalArgumentException.assert(
            i >= 0 && i <= this.components.length,
            `insert: Index ${i} out of bounds`
        );
        IllegalArgumentException.assert(c !== null && c !== undefined, "insert: Component cannot be null");

        const oldLength = this.components.length;

        // Logic
        this.components.splice(i, 0, c);

        // Postcondition
        MethodFailedException.assert(
            this.components.length === oldLength + 1,
            "insert: Length did not increase by 1"
        );
        this.checkInvariant();
    }

    public append(c: string) {
        // Delegates to insert, so contracts are covered there
        this.insert(this.components.length, c);
    }

    public remove(i: number) {
        // Precondition
        IllegalArgumentException.assert(
            i >= 0 && i < this.components.length,
            `remove: Index ${i} out of bounds`
        );

        const oldLength = this.components.length;

        // Logic
        this.components.splice(i, 1);

        // Postcondition
        MethodFailedException.assert(
            this.components.length === oldLength - 1,
            "remove: Length did not decrease by 1"
        );
        this.checkInvariant();
    }
}