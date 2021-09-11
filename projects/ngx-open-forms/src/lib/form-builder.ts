import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { OpenFormGroup } from "./form-group";
import { NgxOpenFormsModule } from "./ngx-open-forms.module";
import { SchemaLike } from "./schema-like";


@Injectable({providedIn: NgxOpenFormsModule })
export class OpenFormBuilder extends FormBuilder {
    groupFromSchema<TSchema extends SchemaLike>(schema: TSchema){
        return new OpenFormGroup(schema);
    }
}