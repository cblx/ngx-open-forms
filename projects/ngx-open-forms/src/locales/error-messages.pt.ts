export const PT_ERROR_MESSAGES = {
    email: 'email inválido',
    max: (data: any) => `deve ser menor que ${data.max}`,
    maxlength: (data: any) => `máximo ${data.requiredLength} caracteres`,
    min: (data: any) => `deve ser maior que ${data.min}`,
    minlength: (data: any) => 
        !data.actualLength ? `mínimo ${data.requiredLength} caracteres`
        : `utilize mais ${data.requiredLength - data.actualLength} caracteres`,
    pattern: 'valor inválido',
    required: 'obrigatório',
};