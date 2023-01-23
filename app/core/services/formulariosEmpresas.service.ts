import {Injectable} from '@angular/core';
import {FormulariosEmpresas} from '../models/FormulariosEmpresas';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulariosEmpresasService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(formulariosEmpresas: FormulariosEmpresas): Observable<FormulariosEmpresas[]> {
    return this.http.post<FormulariosEmpresas[]>(this.cs.base + 'formulariosEmpresas/list', formulariosEmpresas, this.cs.httpOptions);
  }
  
  listVi(formulariosEmpresas: FormulariosEmpresas): Observable<FormulariosEmpresas[]> {
    return this.http.post<FormulariosEmpresas[]>(this.cs.base + 'formulariosEmpresas/listVi', formulariosEmpresas, this.cs.httpOptions);
  }

  get(id: any): Observable<FormulariosEmpresas> {
    return this.http.get<FormulariosEmpresas>(this.cs.base + 'formulariosEmpresas/' + id, this.cs.httpOptions);
  }

  save(formulariosEmpresas: FormulariosEmpresas): Observable<FormulariosEmpresas> {
    return this.http.put<FormulariosEmpresas>(this.cs.base + 'formulariosEmpresas', formulariosEmpresas, this.cs.httpOptions);
  }

  insert(formulariosEmpresas: FormulariosEmpresas): Observable<FormulariosEmpresas> {
    return this.http.post<FormulariosEmpresas>(this.cs.base + 'formulariosEmpresas', formulariosEmpresas, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'formulariosEmpresas/' + id, this.cs.httpOptions);
  }
}