export const PT_ERROR_MESSAGES = {
    email: () => 'email inválido',
    max: (data: any) => `deve ser menor que ${data.max}`,
    maxLength: (data: any) => `máximo ${data.requiredLength} caracteres`,
    min: (data: any) => `deve ser maior que ${data.min}`,
    minLength: (data: any) => `mínimo ${data.requiredLength} caracteres`,
    pattern: () => 'valor inválido',
    required: () => 'obrigatório',
};