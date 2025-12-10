import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

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

    public getNoComponents(): number {
        if (this.name.length === 0) return 0;
        return this.splitComponents().length;
    }

    public getComponent(i: number): string {
        const comps = this.splitComponents();
        IllegalArgumentException.assert(i >= 0 && i < comps.length, `Index ${i} out of bounds`);
        return comps[i];
    }

    public setComponent(i: number, c: string): Name {
        const comps = this.splitComponents();
        IllegalArgumentException.assert(i >= 0 && i < comps.length, "Index out of bounds");
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component cannot be null");

        comps[i] = c;
        return new StringName(comps.join(this.delimiter), this.delimiter);
    }

    public insert(i: number, c: string): Name {
        const comps = this.splitComponents();
        IllegalArgumentException.assert(i >= 0 && i <= comps.length, "Index out of bounds");
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component cannot be null");

        comps.splice(i, 0, c);
        return new StringName(comps.join(this.delimiter), this.delimiter);
    }

    public append(c: string): Name {
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component cannot be null");
        let newString = this.name;
        if (newString.length > 0) {
            newString += this.delimiter + c;
        } else {
            newString = c;
        }
        return new StringName(newString, this.delimiter);
    }

    public remove(i: number): Name {
        const comps = this.splitComponents();
        IllegalArgumentException.assert(i >= 0 && i < comps.length, "Index out of bounds");

        comps.splice(i, 1);
        return new StringName(comps.join(this.delimiter), this.delimiter);
    }
}