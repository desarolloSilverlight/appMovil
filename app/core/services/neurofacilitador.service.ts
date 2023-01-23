import {Injectable} from '@angular/core';
import {Neurofacilitador} from '../models/Neurofacilitador';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NeurofacilitadorService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(neurofacilitadores: Neurofacilitador): Observable<Neurofacilitador[]> {
    return this.http.post<Neurofacilitador[]>(this.cs.base + 'neurofacilitadores/list', neurofacilitadores, this.cs.httpOptions);
  }

  get(id: any): Observable<Neurofacilitador> {
    return this.http.get<Neurofacilitador>(this.cs.base + 'neurofacilitadores/' + id, this.cs.httpOptions);
  }

  save(neurofacilitadores: Neurofacilitador): Observable<Neurofacilitador> {
    return this.http.put<Neurofacilitador>(this.cs.base + 'neurofacilitadores', neurofacilitadores, this.cs.httpOptions);
  }

  insert(neurofacilitadores: Neurofacilitador): Observable<Neurofacilitador> {
    return this.http.post<Neurofacilitador>(this.cs.base + 'neurofacilitadores', neurofacilitadores, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'neurofacilitadores/' + id, this.cs.httpOptions);
  }
}
