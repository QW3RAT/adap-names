import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";

    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.name = source;
        this.checkInvariant();
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    private splitComponents(): string[] {
        if (this.name === "") return [];
        return this.name.split(this.delimiter);
    }

    // --- Implementation of the Narrow Interface ---

    public getNoComponents(): number {
        if (this.name.length === 0) return 0;
        return this.splitComponents().length;
    }

    public getComponent(i: number): string {
        const comps = this.splitComponents();
        
        // Precondition
        IllegalArgumentException.assert(
            i >= 0 && i < comps.length, 
            `getComponent: Index ${i} out of bounds`
        );

        return comps[i];
    }

    public setComponent(i: number, c: string) {
        const comps = this.splitComponents();
        
        // Preconditions
        IllegalArgumentException.assert(
            i >= 0 && i < comps.length, 
            `setComponent: Index ${i} out of bounds`
        );
        IllegalArgumentException.assert(c !== null && c !== undefined, "setComponent: Component cannot be null");

        comps[i] = c;
        this.name = comps.join(this.delimiter);
        this.checkInvariant();
    }

    public insert(i: number, c: string) {
        const comps = this.splitComponents();

        // Preconditions
        IllegalArgumentException.assert(
            i >= 0 && i <= comps.length, 
            `insert: Index ${i} out of bounds`
        );
        IllegalArgumentException.assert(c !== null && c !== undefined, "insert: Component cannot be null");

        const oldLength = comps.length; // virtual length

        // Logic
        comps.splice(i, 0, c);
        this.name = comps.join(this.delimiter);

        // Postcondition
        // We have to re-split to check the new virtual length
        const newLength = this.splitComponents().length;
        MethodFailedException.assert(
            newLength === oldLength + 1,
            "insert: Length did not increase by 1"
        );
        this.checkInvariant();
    }

    public append(c: string) {
        // Precondition on input
        IllegalArgumentException.assert(c !== null && c !== undefined, "append: Component cannot be null");

        if (this.name.length > 0) {
            this.name += this.delimiter + c;
        } else {
            this.name = c;
        }
        // Invariant check implies implicit postcondition check
        this.checkInvariant();
    }

    public remove(i: number) {
        const comps = this.splitComponents();

        // Precondition
        IllegalArgumentException.assert(
            i >= 0 && i < comps.length, 
            `remove: Index ${i} out of bounds`
        );

        const oldLength = comps.length;

        // Logic
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);

        // Postcondition
        const newLength = (this.name.length === 0) ? 0 : this.splitComponents().length;
        MethodFailedException.assert(
            newLength === oldLength - 1,
            "remove: Length did not decrease by 1"
        );
        this.checkInvariant();
    }
}