import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class S3ClientService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }


  upload(formData: FormData) {
    const httpOptions = Object.assign({}, this.cs.httpOptions);
    httpOptions.headers = new HttpHeaders({
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    );
    console.log(httpOptions);
    return this.http.post(`${this.cs.base}upload`, formData, httpOptions);
  }


  download(path: string): Observable<any> {
    return this.http.post(`${this.cs.base}download`, {path}, this.cs.httpOptions);
  }

  search(filename: string): Observable<any> {
    return this.http.post(`${this.cs.base}searchKey`, {filename}, this.cs.httpOptions);
  }

}
