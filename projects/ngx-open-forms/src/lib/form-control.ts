import { FormControl, Validators } from "@angular/forms";
import { OpenAbstractControl } from "./abstract-control";
import { OpenFormGroup } from "./form-group";
import { OpenControlOption, OpenControlOptionData } from "./option";
import { SchemaLike, SchemaRefs } from "./schema-like";

export interface OpenFormControlSettings {
    name?: string;
    schema: SchemaLike;
    required?: boolean;
    refs?: SchemaRefs;
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
    get schema() { return this.settings.schema; }
    /**
     * Custom data
     */
    readonly data: { [key: string]: any } = {};
    /**
     * For OpenFormControls generated from
     * OpenFormGroups, this will be the correspondent
     * property name in the OpenApi Schema
     */
    get name() { return this.settings.name ?? ''; }

    /**
     * The component possible value options with
     * associated text.
     * This value will only be defined when
     * providing 'refs' option containing
     * the referenced enum or if this control is boolean.
     * This property can be set.
     */
    options: OpenControlOption[] = [];

    get asControl() { return this; }
    get asGroup() { return undefined; }

    get parent() { return super.parent as OpenFormGroup<any>; }

    constructor(private settings: OpenFormControlSettings) {
        super(settings.schema.default);
        this.initValidators();
        this.setupBooleanOptions();
        this.setupEnumOptions();
    }

    private initValidators() {
        const schema = this.settings.schema;

        if (this.settings.required) { this.addValidators(Validators.required); }

        if (schema.maximum || schema.maximum === 0) {
            this.addValidators(Validators.max(schema.maximum));
            if (schema.exclusiveMaximum) {
                this.addValidators(ctrl => ctrl.value == schema.maximum ? { exclusiveMax: { max: schema.maximum } } : null);
            }
        }

        if (schema.maxLength) { this.addValidators(Validators.maxLength(schema.maxLength)); }

        if (schema.minimum || schema.minimum === 0) {
            this.addValidators(Validators.min(schema.minimum));
            if (schema.exclusiveMinimum) {
                this.addValidators(ctrl => ctrl.value == schema.minimum ? { exclusiveMin: { min: schema.minimum } } : null);
            }
        }

        if (schema.minLength) { this.addValidators(Validators.minLength(schema.minLength)); }

        if (schema.pattern) { this.addValidators(Validators.pattern(schema.pattern)); }

        if (schema.format == 'email') { this.addValidators(Validators.email); }
    }

    private setupBooleanOptions() {
        if (!this.schema) { return; }
        if (this.schema.type == 'boolean') {
            let optionTrue: any = { text: 'true', value: true };
            let optionFalse: any = { text: 'false', value: false };
            this.options = [
                optionFalse,
                optionTrue
            ];
        }
    }

    public static resolveEnumOptionText = (enumName: string, enumSchema: SchemaLike, enumValueIndex: number) => {
        return enumSchema['x-enum-varnames']?.[enumValueIndex] ?? enumSchema?.enum?.[enumValueIndex];
    }

    private setupEnumOptions() {
        if (!this.schema) { return; }
        let refName = this.schema.$ref || this.schema.allOf?.find(() => true)?.$ref;
        if (!refName) { return; }
        refName = refName.replace('#/components/schemas/', '');
        const refSchema = this.settings.refs?.[refName];
        if (refSchema?.enum) {
            this.options = refSchema.enum.map(
                (en, index) => {
                    const data: OpenControlOptionData = {
                        refName,
                        refSchema,
                        index
                    };
                    const option: OpenControlOption = {
                        text: OpenFormControl.resolveEnumOptionText(refName!, refSchema, index),
                        value: en,
                        data
                    };
                    return option;
                }
            );
        }
    }
}