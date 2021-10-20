import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { OpenFormGroup } from "./form-group";
import { OpenFormsModule } from "./ngx-open-forms.module";
import { SchemaLike, SchemaRefs } from "./schema-like";


@Injectable({providedIn: OpenFormsModule })
export class OpenFormBuilder extends FormBuilder {
    groupSchema<TSchema extends SchemaLike>(schema: TSchema, refs: SchemaRefs | object | undefined = undefined){
        return new OpenFormGroup(schema, refs);
    }
}