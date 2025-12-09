import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

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

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, `Index ${i} out of bounds`);
        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "Index out of bounds");
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component cannot be null");

        const newComponents = [...this.components];
        newComponents[i] = c;
        return new StringArrayName(newComponents, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i <= this.components.length, "Index out of bounds");
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component cannot be null");

        const newComponents = [...this.components];
        newComponents.splice(i, 0, c);
        return new StringArrayName(newComponents, this.delimiter);
    }

    public append(c: string): Name {
        return this.insert(this.components.length, c);
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "Index out of bounds");

        const newComponents = [...this.components];
        newComponents.splice(i, 1);
        return new StringArrayName(newComponents, this.delimiter);
    }
}