import { JsonProperty } from 'json2typescript';
import { TagContract } from '../../../global/contracts/modules/tag.contract';

export class Tag implements TagContract {

    @JsonProperty('id')
    public id: number;

    @JsonProperty('foreignId')
    foreignId: number;

    @JsonProperty('foreignType')
    public foreignType: string;

    @JsonProperty('name')
    public name: string;

    @JsonProperty('slug')
    public slug: string;

    @JsonProperty('suggest')
    public suggest: string;

    @JsonProperty('tagGroupID')
    tagGroupID?: number;

    @JsonProperty('count')
    count?: number;

    constructor( id: number, foreignId: number, foreignType: string, tag: string) {
        this.foreignId      = foreignId;
        this.id             = id;
        this.foreignType    = foreignType;
        this.name           = tag;
    }
}
