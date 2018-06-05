import { JsonProperty } from 'json2typescript';
export class Type {
    @JsonProperty('id')
    id: number;

    @JsonProperty('label')
    label: string;

    @JsonProperty('isUserDefined', Boolean)
    isUserDefined: Boolean;
}
