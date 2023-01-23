import {Injectable} from '@angular/core';
import {Invitaciones} from '../models/Invitaciones';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitacionesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(invitaciones: Invitaciones): Observable<Invitaciones[]> {
    return this.http.post<Invitaciones[]>(this.cs.base + 'invitaciones/list', invitaciones, this.cs.httpOptions);
  }

  get(id: any): Observable<Invitaciones> {
    return this.http.get<Invitaciones>(this.cs.base + 'invitaciones/' + id, this.cs.httpOptions);
  }

  save(invitaciones: Invitaciones): Observable<Invitaciones> {
    return this.http.put<Invitaciones>(this.cs.base + 'invitaciones', invitaciones, this.cs.httpOptions);
  }

  insert(invitaciones: Invitaciones): Observable<Invitaciones> {
    return this.http.post<Invitaciones>(this.cs.base + 'invitaciones', invitaciones, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'invitaciones/' + id, this.cs.httpOptions);
  }
}