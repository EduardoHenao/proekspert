export type Method =  "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface IJsonService {
    fetchAsJson<T>(method: Method, path: string, data: any, queryParameters: any) : Promise<{ status: number, value: T, headers: Headers }>;
}

export class JsonService implements IJsonService {
    
    private _baseUrl: string = '';
    private _headers:{[key:string]: string} = {
        // 'Content-Type': 'application/json'
    };

    public get baseUrl(): string {
        return this._baseUrl;
    }
    
    public configure(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    fetch(method: Method, path: string, data: any, queryParameters: any) {
        var request:RequestInit = {
            method: method,
            // credentials: 'same-origin',
            headers: this._headers
        };
        if (data){
            request.body = data;
        }
        
        if (queryParameters){
            path += "?" + this.encodeUri(queryParameters);
        }
        
        return fetch(this._baseUrl + path, request)
    }

    fetchAsJson<T>(method: Method, path: string, data: any, queryParameters: any) {
        return this.fetch(method, path, data, queryParameters).then(r => {
            if (r.ok && r.status != 204) {
                return r.json().then(t => { return { status: r.status, value: t, headers: r.headers } });    
            }
            else{
                return { status: r.status, value: <T>null, headers: r.headers };
            }
        });
    }

    private encodeUri(data:any, prefix?:string){
        var form:string[] = [];
        for (var property in data){
            let value = data[property];
            if (value == null){
                continue;
            }

            let key = prefix ? `${prefix}[${property}]` : property;
            let encodedParam =  (typeof value === 'object') ?
                this.encodeUri(value, key) :
                encodeURIComponent(key) + "=" + encodeURIComponent(data[property]);
            form.push(encodedParam);
        }
        return form.join('&');
    }
}