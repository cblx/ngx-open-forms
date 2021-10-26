export const PT_ERROR_MESSAGES = {
    email: 'email inválido',
    exclusiveMax: (data: any) => `deve ser menor que ${data.max}`,
    exclusiveMin: (data: any) => `deve ser maior que ${data.min}`,
    max: (data: any) => `máximo deve ser ${data.max}`,
    maxlength: (data: any) => `máximo ${data.requiredLength} caracteres`,
    min: (data: any) => `mínimo deve ser ${data.min}`,
    minlength: (data: any) => 
        !data.actualLength ? `mínimo ${data.requiredLength} caracteres`
        : `utilize mais ${data.requiredLength - data.actualLength} caracteres`,
    pattern: 'valor inválido',
    required: 'obrigatório',
};