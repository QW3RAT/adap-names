import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { Exception } from "../common/Exception";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
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

    public findNodes(bn: string): Set<Node> {
        try {
            const result = super.findNodes(bn);

            for (const child of this.childNodes) {
                const childResults = child.findNodes(bn); 
                
                childResults.forEach(node => {
                    result.add(node);
                });
            }

            return result;
        } catch (error) {
            throw new ServiceFailureException("findNodes failed service execution", error as Exception);
        }
    }
}