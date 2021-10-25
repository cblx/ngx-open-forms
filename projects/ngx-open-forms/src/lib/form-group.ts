import { FormGroup } from "@angular/forms";
import { OpenAbstractControl } from "./abstract-control";
import { OpenFormControl } from "./form-control";
import { OpenControlOption } from "./option";
import { SchemaLike, SchemaLikeOrOnlyProperties, SchemaRefs } from "./schema-like";

export class OpenFormGroup<TSchema extends SchemaLikeOrOnlyProperties> extends FormGroup implements OpenAbstractControl {
    /**
     * The OpenApi component name of this FormGroup.
     * This will only be set if this FormGroup schema instance
     * is provided in the refs object, otherwise this will
     * be an empty string.
     */
    readonly name: string = '';

    /**
     * Custom data
    */
    readonly data: { [key: string]: any } = {};

    /** 
     * same as 'controls'
    */
    get properties(): { [P in keyof TSchema['properties']]: OpenAbstractControl } {
        return <any>this.controls;
    }

    patchValue(value: { [P in keyof TSchema['properties']]?: any }) {
        super.patchValue(value);
    }

    get asControl(){ return undefined; }
    get asGroup(){ return this; }
    options: OpenControlOption[] = [];

    constructor(public schema: TSchema, refs: SchemaRefs | object | undefined = undefined){
        super({});
        if(!schema){ return; }
        if(refs){
            for(let propName in refs){
                if((<any>refs)[propName] ==  schema){
                    this.name = propName;
                    break;
                }
            }
        }
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
