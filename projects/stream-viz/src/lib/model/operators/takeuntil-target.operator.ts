import { Emitter } from "../emitter/emitter";
import { Operator } from "./base.operator";
import { TakeUntilOperator } from "./takeuntil.operator";



export class TakeUntilOperatorTarget extends Operator {

    public override type: string = 'takeuntiltarget';
    public takeUntilSource?: TakeUntilOperator;


    override init(): void {
        //throw new Error("Method not implemented.");
    }
    override impact(item: any): void {
        //throw new Error("Method not implemented.");
        this.emit$.next(item);

    }
    override setEmitters(e: Emitter[]): void {
        //throw new Error("Method not implemented.");
    }


    
}