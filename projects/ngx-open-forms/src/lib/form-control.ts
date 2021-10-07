import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { OpenAbstractControl } from "./abstract-control";
import { SchemaLike } from "./schema-like";


export interface OpenFormControlSettings {
    required?: boolean;
    schema: SchemaLike;
}

export class OpenFormControl extends FormControl implements OpenAbstractControl {
    get schema(){ return this.settings.schema; }
    customData: any;
    constructor(private settings: OpenFormControlSettings) {
        super(settings.schema.default);
        this.initValidators();
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
}