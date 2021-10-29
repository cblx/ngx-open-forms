import { SchemaLike } from "./schema-like";

export interface OpenControlOptionData {
    refName?: string,
    refSchema?: SchemaLike,
    index?: number,
}

export interface OpenControlOption {
    text: string,
    value?: any,
    data?: OpenControlOptionData
}
