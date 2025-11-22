import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    // --- The Narrow Inheritance Interface (Primitives) ---
    // These must be implemented by the subclasses because 
    // only they know how the data is stored.
    public abstract clone(): Name;
    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    public abstract setComponent(i: number, c: string): void;
    public abstract insert(i: number, c: string): void;
    public abstract append(c: string): void;
    public abstract remove(i: number): void;

    // --- Shared Implementation (Template Methods) ---

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    // This is the most powerful shared method. 
    // It builds the string regardless of storage type.
    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        const n = this.getNoComponents();
        for (let i = 0; i < n; i++) {
            if (i > 0) {
                result += delimiter;
            }
            result += this.getComponent(i);
        }
        return result;
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    // Does not need to be abstract! We can implement it using append/getComponent.
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
    
    // HashCode is usually complex, but a simple version loops over components
    public getHashCode(): number {
        let h = 0;
        const s = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return h;
    }
}