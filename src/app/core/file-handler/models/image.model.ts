// 3rd party decorator
import { JsonObject, JsonProperty } from 'json2typescript';
import { ImageContract } from '../../../global/contracts/modules/image.contract';

export class Image implements ImageContract {

    @JsonProperty('id')
    id: number;

    @JsonProperty('data', Blob)
    data: Blob;

    @JsonProperty('remoteUrl', String)
    remoteUrl: string;

    @JsonProperty('caption', String)
    caption: string;

    @JsonProperty('addDate')
    addDate: number;

    @JsonProperty('fileName', String)
    fileName: string;

    @JsonProperty('fileName', String)
    fileType: string;

    @JsonProperty('order')
    order = 0;

    constructor(remoteUrl: string, id?: number, data?: File,  caption?: string, order?: number,
         addDate?: number, fileName?: string, fileType?: string) {
        this.id             = id;
        this.data           = data;
        this.remoteUrl      = remoteUrl;
        this.caption        = caption;
        this.addDate        = addDate;
        this.fileName       = fileName;
        this.fileType       = fileType;
        this.order          = order;
    }
    getId(): number {
        return this.id;
    }
    getUrl(): string {
        return this.remoteUrl;
    }
}
