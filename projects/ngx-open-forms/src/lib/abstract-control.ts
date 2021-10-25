import { AbstractControl } from "@angular/forms";
import { OpenFormControl } from "./form-control";
import { OpenFormGroup } from "./form-group";
import { OpenControlOption } from "./option";
import { SchemaLike } from "./schema-like";

export interface OpenAbstractControl extends AbstractControl {
    readonly name: string;
    readonly schema: SchemaLike;
    readonly data: { [key: string]: any };
    asControl?: OpenFormControl;
    asGroup?: OpenFormGroup<any>;
    /**
     * The component possible value options with
     * associated text.
     * This value will only be defined when
     * providing 'refs' option containing
     * the referenced enum or if this control is boolean.
     * This property can be set.
     */
     options: OpenControlOption[];
}