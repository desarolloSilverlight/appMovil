import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class ReporteService{
    
    constructor(private http: HttpClient, private cs: ConfigService){
    }

    reporte(): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
        return this.http.get(this.cs.base + '/reporte', {headers, responseType: 'blob' as 'json' });
    }
}
