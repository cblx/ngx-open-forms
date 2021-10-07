import { NgModule } from '@angular/core';
import { ErrorMessagePipe } from './error-message.pipe';
@NgModule({
    declarations: [ErrorMessagePipe],
    exports: [ErrorMessagePipe]
})
export class OpenFormsModule { }
