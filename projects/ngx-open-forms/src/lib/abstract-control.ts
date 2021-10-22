import { AbstractControl } from "@angular/forms";
import { OpenFormControl } from "./form-control";
import { OpenFormGroup } from "./form-group";
import { SchemaLike } from "./schema-like";

export interface OpenAbstractControl extends AbstractControl {
    readonly schema: SchemaLike;
    readonly data: { [key: string]: any };
    asControl: OpenFormControl | null;
    asGroup: OpenFormGroup<any> | null;
}