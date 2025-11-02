import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { StringArrayName } from "./StringArrayName";

// @class StringName
// Implements Name using a single string as internal representation
export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype initialization method
    constructor(source: string, delimiter?: string) {
        if (typeof source !== "string") {
            throw new Error("Constructor expects a string");
        }
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
        this.noComponents = source.length === 0 ? 0 : source.split(this.delimiter).length;
    }

    // @methodtype conversion method
    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter);
    }

    // @methodtype conversion method
    public asDataString(): string {
        const escaped = this.name
            .replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER)
            .replace(new RegExp(`\\${this.delimiter}`, "g"), ESCAPE_CHARACTER + this.delimiter);
        return escaped;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype boolean query method
    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // --- Helper ---
    private toArrayName(): StringArrayName {
        const comps = this.name === "" ? [] : this.name.split(this.delimiter);
        return new StringArrayName(comps, this.delimiter);
    }

    private fromArrayName(arrayName: StringArrayName): void {
        this.name = arrayName.asString(this.delimiter);
        this.noComponents = arrayName.getNoComponents();
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        const arr = this.toArrayName();
        return arr.getComponent(i);
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        const arr = this.toArrayName();
        arr.setComponent(i, c);
        this.fromArrayName(arr);
    }

    // @methodtype command method
    public insert(i: number, c: string): void {
        const arr = this.toArrayName();
        arr.insert(i, c);
        this.fromArrayName(arr);
    }

    // @methodtype command method
    public append(c: string): void {
        const arr = this.toArrayName();
        arr.append(c);
        this.fromArrayName(arr);
    }

    // @methodtype command method
    public remove(i: number): void {
        const arr = this.toArrayName();
        arr.remove(i);
        this.fromArrayName(arr);
    }

    // @methodtype command method
    public concat(other: Name): void {
        const arr = this.toArrayName();
        arr.concat(other);
        this.fromArrayName(arr);
    }
}
