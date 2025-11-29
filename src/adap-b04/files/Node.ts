import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        // We can't use 'this' before super, but since this is the base class, 
        // we just initialize.
        
        // Note: We assign parentNode temporarily to satisfy TS, 
        // but initialize() overwrites it.
        this.parentNode = pn; 
        
        this.doSetBaseName(bn);
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        IllegalArgumentException.assert(pn !== null && pn !== undefined, "Node initialize: Parent directory cannot be null");
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        IllegalArgumentException.assert(to !== null && to !== undefined, "move: Target directory cannot be null");
        
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        // Recursive call needs to trust parentNode is set (Invariant)
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        IllegalArgumentException.assert(bn !== null && bn !== undefined, "rename: Name cannot be null");
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }
}