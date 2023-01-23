import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear,
} from "tns-core-modules/application-settings";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  token: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `JWT ${getString('token','defaultValue')}`
    }),
    params: undefined
  };

  constructor() {
    this.readToken();
  }

  base = environment.apiEndpoint;

  readToken() {
    const token = getString('token','defaultValue');
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `JWT ${getString('token','defaultValue')}`
    });
    console.log(this.httpOptions, this.httpOptions.headers.keys());
  }

}
