export type SchemaLike = { 
    properties?: {
        [propertyName: string]: SchemaLike;
    };
    format?: 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' | 'date' | 'date-time' | 'password' | string;
    type?: 'integer' | 'number' | 'string' | 'boolean' | 'object' | 'null' | 'array';
    description?: string;
    default?: any;
    title?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    required?: string[];
    enum?: any[];
    allOf?: SchemaLike[];
    $ref?: string;
    'x-enum-varnames'?: string[];
};

export type SchemaRefs = { [key: string]: SchemaLike };