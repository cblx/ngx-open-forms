import { AbstractControl } from "@angular/forms";
import { SchemaLike } from "ngx-open-forms";

export interface OpenAbstractControl extends AbstractControl {
    get schema(): SchemaLike;
}