import {Injectable} from '@angular/core';
import {FormulariosConsultante} from '../models/FormulariosConsultante';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulariosConsultanteService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(formulariosConsultante: FormulariosConsultante): Observable<FormulariosConsultante[]> {
    return this.http.post<FormulariosConsultante[]>(this.cs.base + 'formulariosConsultante/list', formulariosConsultante, this.cs.httpOptions);
  }
  listVi(formulariosConsultante: FormulariosConsultante): Observable<FormulariosConsultante[]> {
    return this.http.post<FormulariosConsultante[]>(this.cs.base + 'formulariosConsultante/list', formulariosConsultante, this.cs.httpOptions);
  }

  get(id: any): Observable<FormulariosConsultante> {
    return this.http.get<FormulariosConsultante>(this.cs.base + 'formulariosConsultante/' + id, this.cs.httpOptions);
  }

  save(formulariosConsultante: FormulariosConsultante): Observable<FormulariosConsultante> {
    return this.http.put<FormulariosConsultante>(this.cs.base + 'formulariosConsultante', formulariosConsultante, this.cs.httpOptions);
  }

  insert(formulariosConsultante: FormulariosConsultante): Observable<FormulariosConsultante> {
    return this.http.post<FormulariosConsultante>(this.cs.base + 'formulariosConsultante', formulariosConsultante, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'formulariosConsultante/' + id, this.cs.httpOptions);
  }
}