import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    protected checkInvariant(): void {
        InvalidStateException.assert(
            this.getNoComponents() >= 0,
            "Invariant violated: Name component count cannot be negative."
        );
    }

    public clone(): Name {
        throw new Error("Abstract method");
    }

    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        const n = this.getNoComponents();
        for (let i = 0; i < n; i++) {
            if (i > 0) result += delimiter;
            result += this.getComponent(i);
        }
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public isEqual(other: Object): boolean {
        const otherName = other as Name;
        if (!otherName || typeof otherName.getNoComponents !== 'function') return false;
        
        if (this.getNoComponents() !== otherName.getNoComponents()) return false;
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== otherName.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        let h = 0;
        const s = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return h;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public concat(other: Name): Name {
        let result: Name = this; 
        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        return result;
    }

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    
    public abstract setComponent(i: number, c: string): Name;
    public abstract insert(i: number, c: string): Name;
    public abstract append(c: string): Name;
    public abstract remove(i: number): Name;
}