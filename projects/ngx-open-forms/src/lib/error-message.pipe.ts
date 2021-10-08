import { Inject, Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ErrorMessages } from "./error-message-fn";
import { ERROR_MESSAGES } from "./error-messages.token";

@Pipe({
    name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform{
    constructor(@Inject(ERROR_MESSAGES) private errorMessages: ErrorMessages){}
    
    transform(
        errors?: ValidationErrors | null, 
        overrideMessages?: ErrorMessages
    ) {
        if(!errors){ return ''; }
        for(let errName in errors){
            let errVal = errors[errName];
            let errorMessage = this.extractMessage(errName, errVal, overrideMessages);
            if(errorMessage){ return errorMessage; }
            if(typeof errVal === 'string'){ return errVal; }
            errorMessage = this.extractMessage(errName, errVal, this.errorMessages);
            if(errorMessage){ return errorMessage; }
            return errName;
        }
        return '';
    }

    private extractMessage(errorName: string, errorVal: any, errorMessages?: ErrorMessages){
        if(errorMessages && (errorName in errorMessages)){
            const message = errorMessages[errorName];
            if(typeof message === 'string'){ return message; }
            return message(errorVal);
        }
        return null;
    }
 
}