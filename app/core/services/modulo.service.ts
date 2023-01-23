import {Injectable} from '@angular/core';
import {Modulo} from '../models/Modulo';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(modulos: Modulo): Observable<Modulo[]> {
    return this.http.post<Modulo[]>(this.cs.base + 'modulos/list', modulos, this.cs.httpOptions);
  }

  get(id: any): Observable<Modulo> {
    return this.http.get<Modulo>(this.cs.base + 'modulos/' + id, this.cs.httpOptions);
  }

  save(modulos: Modulo): Observable<Modulo> {
    return this.http.put<Modulo>(this.cs.base + 'modulos', modulos, this.cs.httpOptions);
  }

  insert(modulos: Modulo): Observable<Modulo> {
    return this.http.post<Modulo>(this.cs.base + 'modulos', modulos, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'modulos/' + id, this.cs.httpOptions);
  }
}
