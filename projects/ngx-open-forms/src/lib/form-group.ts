import { FormGroup } from "@angular/forms";
import { OpenAbstractControl } from "./abstract-control";
import { OpenFormControl } from "./form-control";
import { SchemaLike, SchemaLikeOrOnlyProperties, SchemaRefs } from "./schema-like";

export class OpenFormGroup<TSchema extends SchemaLikeOrOnlyProperties> extends FormGroup implements OpenAbstractControl {
    get properties(): { [P in keyof TSchema['properties']]: OpenAbstractControl } {
        return <any>this.controls;
    }

    patchValue(value: { [P in keyof TSchema['properties']]?: any }) {
        this.patchValue(value);
    }

    constructor(public schema: TSchema, refs: SchemaRefs | object | undefined = undefined){
        super({});
        if(!schema){ return; }
        for (let propName in schema.properties) {
            const propSchema = schema.properties[propName!];
            const required = ((<SchemaLike>schema).required?.indexOf(propName) ?? -1) >= 0;
            const control = new OpenFormControl({
                name: propName,
                required,
                schema: propSchema,
                refs: <SchemaRefs>refs
            });
            this.addControl(propName, control);
        }
    }
}
