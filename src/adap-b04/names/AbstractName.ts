import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    /**
     * Checks the class invariant.
     * Invariant: A Name must define a non-negative number of components.
     */
    protected checkInvariant(): void {
        InvalidStateException.assert(
            this.getNoComponents() >= 0,
            "Invariant violated: Name component count cannot be negative."
        );
    }

    // --- Template Methods ---

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

    public isEqual(other: Object): boolean {
        // Safe casting to check if 'other' is actually a Name compatible object
        const otherName = other as Name;
        
        // Basic check: does it have the method we need?
        if (!otherName || typeof otherName.getNoComponents !== 'function') {
            return false;
        }

        if (this.getNoComponents() !== otherName.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== otherName.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
    
    public getHashCode(): number {
        let h = 0;
        const s = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return h;
    }

    // --- Abstract Narrow Interface ---
    public abstract clone(): Name;
    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    public abstract setComponent(i: number, c: string): void;
    public abstract insert(i: number, c: string): void;
    public abstract append(c: string): void;
    public abstract remove(i: number): void;
}