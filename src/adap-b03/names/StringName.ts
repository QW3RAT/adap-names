import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { StringArrayName } from "./StringArrayName"; // Useful for cloning if needed

export class StringName extends AbstractName {

    protected name: string = "";
    // In a real implementation, you might cache this, or calculate it on the fly.
    // For this exercise, we assume 'name' holds the raw data string.

    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.name = source;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    // --- Helper to parse the string (Concept only) ---
    // Since this class stores data as a single string, we often need to 
    // split it to find specific components.
    private splitComponents(): string[] {
        // This is a simplified split. A real implementation handles escaping.
        if (this.name === "") return [];
        return this.name.split(this.delimiter);
    }

    // --- Implementation of the Narrow Interface ---

    public getNoComponents(): number {
        if (this.name.length === 0) return 0;
        // A quick way to count components is counting delimiters + 1
        // But correct implementation depends on your split logic
        return this.splitComponents().length;
    }

    public getComponent(i: number): string {
        const comps = this.splitComponents();
        if (i < 0 || i >= comps.length) throw new Error("Index out of bounds");
        return comps[i];
    }

    public setComponent(i: number, c: string) {
        const comps = this.splitComponents();
        if (i < 0 || i >= comps.length) throw new Error("Index out of bounds");
        comps[i] = c;
        // Rebuild the internal string
        this.name = comps.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        const comps = this.splitComponents();
        comps.splice(i, 0, c);
        this.name = comps.join(this.delimiter);
    }

    public append(c: string) {
        if (this.name.length > 0) {
            this.name += this.delimiter + c;
        } else {
            this.name = c;
        }
    }

    public remove(i: number) {
        const comps = this.splitComponents();
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
    }
}