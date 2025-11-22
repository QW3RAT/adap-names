import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        // We create a copy to ensure encapsulation
        this.components = [...source];
    }

    public clone(): Name {
        // We return a new instance with a copy of our data
        return new StringArrayName(this.components, this.delimiter);
    }

    // --- Implementation of the Narrow Interface ---

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) throw new Error("Index out of bounds");
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.components.length) throw new Error("Index out of bounds");
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        // splice is perfect for inserting at an index
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.components.splice(i, 1);
    }
}