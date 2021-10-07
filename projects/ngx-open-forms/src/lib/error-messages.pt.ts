import { ErrorMessages } from "./error-message-fn";

export const PT_ERROR_MESSAGES: ErrorMessages = {
    email: _ => 'email inválido',
    max: data => `deve ser menor que ${data.max}`,
    maxLength: data => `máximo ${data.requiredLength} caracteres`,
    min: data => `deve ser maior que ${data.min}`,
    minLength: data => `mínimo ${data.requiredLength} caracteres`,
    pattern: _ => 'valor inválido',
    required: _ => 'obrigatório',
};