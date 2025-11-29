import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        // Technically strict, but has() often allows nulls to return false. 
        // We will be strict here just in case.
        if (!cn) return false;
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "addChildNode: Node cannot be null");
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "removeChildNode: Node cannot be null");
        this.childNodes.delete(cn); 
    }
}