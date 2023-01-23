import {TemasConsulta} from './TemasConsulta';
import {Contenidos} from './Contenidos';
import {FlujoConsulta} from './FlujoConsulta';

export class Consultas {
  id: number;
  idConsultante: number;
  fecha: Date;
  idTema: number;
  txTema: string;
  porcentaje: number;
  tema: TemasConsulta;
  contestadas: number;
  total: number;
  contenidos: Contenidos[];
  flujos: FlujoConsulta[];
  status: string;
}
