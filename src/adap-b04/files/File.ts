import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        // Precondition: Can only open if currently closed
        IllegalArgumentException.assert(
            this.state === FileState.CLOSED, 
            "Precondition failed: Cannot open file. Current state is not CLOSED."
        );
        
        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        // Precondition: Can only read if open
        IllegalArgumentException.assert(
            this.state === FileState.OPEN,
            "Precondition failed: Cannot read file. Current state is not OPEN."
        );
        
        // Mock implementation
        return new Int8Array(noBytes);
    }

    public close(): void {
        // Precondition: Can only close if open
        IllegalArgumentException.assert(
            this.state === FileState.OPEN,
            "Precondition failed: Cannot close file. Current state is not OPEN."
        );

        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }
}