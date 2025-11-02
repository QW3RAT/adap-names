import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

// @class StringArrayName
// Implements Name using a string[] as internal representation
export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    // @methodtype initialization method
    constructor(source: string[], delimiter?: string) {
        if (!Array.isArray(source)) {
            throw new Error("Constructor expects an array of strings");
        }
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = [...source]; // Defensive copy
    }

    // @methodtype conversion method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    // @methodtype conversion method
    public asDataString(): string {
        const escaped = this.components.map(c =>
            c
                .replace(new RegExp(`\\${ESCAPE_CHARACTER}`, "g"), ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                .replace(new RegExp(`\\${this.delimiter}`, "g"), ESCAPE_CHARACTER + this.delimiter)
        );
        return escaped.join(this.delimiter);
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype boolean query method
    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Index ${i} out of bounds`);
        }
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Index ${i} out of bounds`);
        }
        this.components[i] = c;
    }

    // @methodtype command method
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error(`Index ${i} out of bounds`);
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command method
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Index ${i} out of bounds`);
        }
        this.components.splice(i, 1);
    }

    // @methodtype command method
    public concat(other: Name): void {
        const delimiter = this.delimiter;
        const parts: string[] = [];
        for (let i = 0; i < other.getNoComponents(); i++) {
            parts.push(other.getComponent(i));
        }
        this.components.push(...parts);
    }
}
