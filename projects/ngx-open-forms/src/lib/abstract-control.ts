import { AbstractControl } from "@angular/forms";
import { SchemaLike } from "./schema-like";

export interface OpenAbstractControl extends AbstractControl {
    readonly schema: SchemaLike;
    readonly data: { [key: string]: any };
}