import { RestfulService, ConcreteRestfulService } from '../services/restful-service.abstract';
import { JsonProperty } from 'json2typescript';

export interface FileContract {
    getId(): number;
    getUrl(): string;
}

export interface ImageContract extends FileContract {
   caption: string;
}
export abstract class ImageHandlerService extends ConcreteRestfulService<ImageContract> {
}
