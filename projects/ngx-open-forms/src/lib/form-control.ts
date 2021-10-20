import { FormControl, Validators } from "@angular/forms";
import { OpenAbstractControl } from "./abstract-control";
import { SchemaLike, SchemaRefs } from "./schema-like";

export interface OpenFormControlSettings {
    required?: boolean;
    schema: SchemaLike;
    refs?: SchemaRefs;
}

export interface OpenFormControlOption {
    text: string,
    value?: any
}

let uidGen = 0;

export class OpenFormControl extends FormControl implements OpenAbstractControl {
    /**
     * Instance unique id
     */
    readonly id = `ctrl${uidGen++}`;
    /**
     * The schema that originated this FormControl
     */
    get schema(){ return this.settings.schema; }
    /**
     * Custom data
     */
    readonly data: { [key: string]: any } = {};
    /**
     * The component name in the OpenApi schema. 
     * This value will only be defined when
     * providing 'refs' option containing
     * this control schema.
     */
    readonly name: string | undefined;

    /**
     * The component possible value options with
     * associated text.
     * This value will only be defined when
     * providing 'refs' option containing
     * the referenced enum or if this control is boolean.
     * This property can be set.
     */
    options?: OpenFormControlOption[];

    constructor(private settings: OpenFormControlSettings) {
        super(settings.schema.default);
        const refs = settings.refs;
        if(refs){
            for(let prop in refs){
                if(refs[prop] ==  settings.schema){
                    this.name = prop;
                    break;
                }
            }
        }
        this.initValidators();
        this.setupBooleanOptions();
        this.setupEnumOptions();
    }

    private initValidators() {
        const schema = this.settings.schema;

        if (this.settings.required) { this.addValidators(Validators.required); }

        if (schema.maximum || schema.maximum === 0) { this.addValidators(Validators.max(schema.maximum)); }

        if (schema.maxLength) { this.addValidators(Validators.maxLength(schema.maxLength)); }

        if (schema.minimum || schema.minimum === 0) { this.addValidators(Validators.min(schema.minimum)); }

        if (schema.minLength) { this.addValidators(Validators.minLength(schema.minLength)); }

        if (schema.pattern) { this.addValidators(Validators.pattern(schema.pattern)); }

        if (schema.format == 'email') { this.addValidators(Validators.email); }
    }

    private setupBooleanOptions(){
        if(!this.schema) { return; }
        if(this.schema.type == 'boolean'){
            let optionTrue: any = { text: 'true', value: true };
            let optionFalse: any = { text: 'false', value: false };
            this.options = [
                optionFalse,
                optionTrue
            ];
        }
    }

    private setupEnumOptions() {
        if(!this.schema) { return; }
        let ref = this.schema.$ref || this.schema.allOf?.find(() => true)?.$ref;
        if (!ref) { return; }
        ref = ref.replace('#/components/schemas/', '');
        const refSchema = this.settings.refs?.[ref];
        if (refSchema?.enum) {
            this.options = refSchema.enum.map(
                (en, i) => {
                    const option: any = { 
                        text: refSchema['x-enum-varnames']?.[i] ?? en, 
                        value: en 
                    };
                    return option;
                }
            );
        }
    }
}