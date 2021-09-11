import { FormGroup } from "@angular/forms";
import { OpenFormControl } from "./form-control";
import { SchemaLike } from "./schema-like";

export class OpenFormGroup<TSchema extends SchemaLike> extends FormGroup {
    get properties(): { [P in keyof TSchema['properties']]: OpenFormControl } {
        return <any>this.controls;
    }

    patchValue(value: { [P in keyof TSchema['properties']]?: any }) {
        this.patchValue(value);
    }

    constructor(schema: TSchema){
        super({});
        for (let propName in schema.properties) {
            const propSchema = schema.properties[propName];
            const required = (<any>schema).required?.indexOf(propName) >= 0;
            const control = new OpenFormControl({
                required,
                schema: propSchema
            });
            this.addControl(propName, control);
        }
    }
}
