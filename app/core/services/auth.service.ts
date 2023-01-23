import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {ConfigService} from './config.service';
import {map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Menu} from '../models/Menu';
import {Claims} from '../models/Claims';

import {getString, setString} from "tns-core-modules/application-settings";
import {typeLogging, UserLog} from "~/core/models/UserLog";
import {DeviceInfo} from "~/core/models/DeviceInfo";
import {device} from "@nativescript/core/platform";


export interface TokenResp {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper;

  constructor(private http: HttpClient, private cs: ConfigService) {
    this.helper = new JwtHelperService();
  }

  login(user: Usuario): Observable<any> {
    return this.http.post(`${this.cs.base}auth`, user, this.cs.httpOptions).pipe(map((resp: TokenResp) => {
      if (resp.access_token) {
        const tokenDecoded = this.decodedToken(resp.access_token);
        const exp = Number(tokenDecoded.exp) * 1000;
        setString('token', resp.access_token);
        setString('expiredToken', exp.toString());
        setString('refreshToken', resp.refresh_token);
        return resp;
      }
    }));
  }

  async saveToken(token: string, refreshToken: string) {
    const tokenDecoded = this.decodedToken(token);
    const exp = Number(tokenDecoded.exp) * 1000;

    setString('token', token);
    setString('expiredToken', exp.toString());
    setString('refreshToken', refreshToken);
  }

  refreshToken(): void {
    const refreshToken = getString('refreshTokenUser');
    if (refreshToken === undefined || refreshToken === null) {
      return;
    }
    this.http.post(`${this.cs.base}refresh`, {}, this.cs.httpOptions).subscribe((resp: any) => {
      this.saveToken(resp.access_token, refreshToken);
    });
  }

  menu(): Observable<Menu[]> {
    this.cs.readToken();
    return this.http.post<Menu[]>(`${this.cs.base}menu`, {}, this.cs.httpOptions).pipe(retry(3));
  }

  protected(): Observable<Claims> {
    this.cs.readToken()
    return this.http.post<Claims>(`${this.cs.base}protected`, {}, this.cs.httpOptions);
  }

  private decodedToken(token: string): any {
    return this.helper.decodeToken(token);
  }

  isAuthenticate(): boolean {
    const token = getString('token');
    if (token != null && token.length < 2) {
      return false;
    }
    const expiredToken = Number(getString('expiredToken'));
    return new Date(expiredToken).getTime() > new Date().getTime();
  }

  saveLog(type: typeLogging) {
    console.log('token ------------------------>', getString('token'));
    const log = new UserLog();
    log.type = type;
    log.token = getString('token');

    log.device_info = new DeviceInfo();
    log.device_info.browser = null;
    log.device_info.device_family = device.manufacturer;
    log.device_info.os_name = device.os;
    log.device_info.os_version = device.osVersion;
    log.device_info.browser_version = null;
    log.device_info.device_model = device.model;
    log.platform = device.deviceType;
    this.http.get('https://api.ipify.org?format=json').toPromise().then((resp: any) => {
      console.log('ip ----->', resp)
      log.ip_address = resp.ip;
      this.http.post(`${this.cs.base}usersLogin`, log, this.cs.httpOptions).toPromise().then();
    })

  }
}
