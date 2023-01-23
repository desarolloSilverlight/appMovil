import {Injectable} from '@angular/core';
import {Claims} from '../models/Claims';
import {FormulariosGenerados} from '../models/FormulariosGenerados';
import {Formularios} from '../models/Formularios';
import {Consultantes} from '../models/Consultantes';
import {Consultas} from '../models/Consultas';
import {TemasConsulta} from '../models/TemasConsulta';
import {BehaviorSubject} from 'rxjs';
import {from} from 'rxjs';
import {EventData} from "tns-core-modules/data/observable";
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
import {Contenidos} from '../models/Contenidos';
import {Label} from 'tns-core-modules/ui/label';
import {SbCausasEstres} from '../models/SbCausasEstres';
import {FlujoConsulta} from "~/core/models/FlujoConsulta";

export interface ReconocimientoInterface {
  partes: number[];
  spCausas: number[];
  tpCerebero: string;
  dVivir: string;
  partesCuerpo: number[];
}

export interface ReconocimientoInterface {
  partes: number[];
  spCausas: number[];
  tpCerebero: string;
  dVivir: string;
  partesCuerpo: number[];
  intensidadPC: number[];
}

export interface ConsultanteInterface {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  idEmpresa: number;
  primerIngreso: boolean;
  tipoDocumento: string;
  numDocumento: number;
  fechaNacimiento: Date;
  estadoCivil: string;
  ciudad: string;
  direccion: string;
  telefono: number;
  imagen: string;
  genero: string;
  idInvitacion: number;
  tpCerebro: string;
  dVivir: string;
}

export interface TemaConsultaInterface {
  id: number;

}

@Injectable()
export class GlobalsUser {
  loadedClaims: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  claimsUser: Claims;
  formularioGenrado: FormulariosGenerados;
  formulario: Formularios;
  objReconocimiento: ReconocimientoInterface;
  consultante: ConsultanteInterface;
  temaConsulta: TemaConsultaInterface;
  consulta: Consultas;
  ruta;
  formularioPrimerIngreso: boolean;
  contenidos: Contenidos[] = undefined;
  flujo: any;
  causaFrm2: EventData;
  causaFrm3: EventData;
  causaFrm4: SbCausasEstres[] = [];
  causaFrm4View: boolean = false;
  causaFrm5 = [];
  causaFrm5View: boolean = false;
  causaFrm6: SbCausasEstres[] = [];
  causaFrm6View: boolean = false;
  causaFrm7: EventData;
  causaFrm8: EventData;
  flujos: FlujoConsulta[];
}

