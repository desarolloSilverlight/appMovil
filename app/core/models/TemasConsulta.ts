import {GruposDiagnostico} from './GruposDiagnostico';

export class TemasConsulta {
  id: number;
  idGrupo: number;
  tpEnergia: number;
  nRepeticiones: number;
  tpCerebro: number;
  orden: number;
  snHab: boolean;
  txGrupo: string;
  txTpEnergia: string;
  txTpCerebro: string;
  descripcion: string;
  grupo: GruposDiagnostico;
}
