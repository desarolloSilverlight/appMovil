import {DeviceInfo} from './DeviceInfo';

export class UserLog {
  token: string;
  platform: string;
  type: typeLogging;
  // tslint:disable-next-line:variable-name
  device_info: DeviceInfo;
  // tslint:disable-next-line:variable-name
  ip_address: string;
}

export enum typeLogging {
  login = 'login',
  logout = 'logout'
}


