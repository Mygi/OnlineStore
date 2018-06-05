import { Observable } from 'rxjs';
import { AppConfig } from '../../../global/contracts/config/app-config';
import { HttpClient } from '@angular/common/http';

export abstract class RestfulService<T> {
    public readonly serviceUrl: string;
    public abstract getAll(): Observable<T[]>;
    public abstract getOne(id: any): Observable<T>;
    public abstract create(model: T): Observable<T>;
    public abstract update(model: T): Observable<T>;
    public abstract delete(id: string): Observable<T>;
    public abstract setServiceUrl(config: AppConfig): string;

    constructor(config: AppConfig) {
        this.serviceUrl = this.setServiceUrl(config);
    }
}
export abstract class ConcreteRestfulService<T> extends RestfulService<T> {

    public getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.serviceUrl);
    }
    public getOne(id: any): Observable<T> {
        return this.http.get<T>(this.serviceUrl + '/' + id);
    }
    public create(model: T): Observable<T> {
        return this.http.post<T>(this.serviceUrl, model);
    }
    public update(model: T): Observable<T> {
        return this.http.put<T>(this.serviceUrl, model);
    }
    public delete(id: string): Observable<T> {
        return this.http.delete<T>(this.serviceUrl + '/' + id);
    }
    public abstract setServiceUrl(config: AppConfig): string;

    constructor(config: AppConfig, protected http: HttpClient ) {
        super(config);
    }
}
