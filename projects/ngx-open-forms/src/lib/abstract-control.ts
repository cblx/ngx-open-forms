import { AbstractControl } from "@angular/forms";
import { SchemaLike } from "./schema-like";

export interface OpenAbstractControl extends AbstractControl {
    get schema(): SchemaLike;
}