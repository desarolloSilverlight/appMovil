import {Injectable} from '@angular/core';
import {FormulariosGenerados} from '../models/FormulariosGenerados';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulariosGeneradosService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(formulariosGenerados: FormulariosGenerados): Observable<FormulariosGenerados[]> {
    return this.http.post<FormulariosGenerados[]>(this.cs.base + 'formulariosGenerados/list', formulariosGenerados, this.cs.httpOptions);
  }

  get(id: any): Observable<FormulariosGenerados> {
    return this.http.get<FormulariosGenerados>(this.cs.base + 'formulariosGenerados/' + id, this.cs.httpOptions);
  }

  save(formulariosGenerados: FormulariosGenerados): Observable<FormulariosGenerados> {
    return this.http.put<FormulariosGenerados>(this.cs.base + 'formulariosGenerados', formulariosGenerados, this.cs.httpOptions);
  }

  insert(formulariosGenerados: FormulariosGenerados): Observable<FormulariosGenerados> {
    return this.http.post<FormulariosGenerados>(this.cs.base + 'formulariosGenerados', formulariosGenerados, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'formulariosGenerados/' + id, this.cs.httpOptions);
  }
  
  finish(idFormularioGenerado: number): Observable<FormulariosGenerados> {
    return this.http.post<FormulariosGenerados>(this.cs.base + `formulariosGenerados/finish/${idFormularioGenerado}`,
      {}, this.cs.httpOptions);
  }

}