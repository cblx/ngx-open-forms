import { Inject, Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ErrorMessages } from "./error-message-fn";
import { ERROR_MESSAGES } from "./error-messages.token";

@Pipe({
    name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform{
    constructor(@Inject(ERROR_MESSAGES) private errorMessages: ErrorMessages){}
    
    transform(errors?: ValidationErrors | null, ...args: any[]) {
        if(!errors){ return ''; }
        for(let errName in errors){
            let errVal = errors[errName];
            if(typeof errVal === 'string'){ return errVal; }
            if(errName in this.errorMessages){ return this.errorMessages[errName](errVal); }
            return errName;
        }
        return '';
    }
 
}