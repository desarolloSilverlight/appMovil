import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular";


import {WelcomeComponent} from './welcome/welcome.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component'
import {FormulariosComponent} from './formularios/formularios.component'
import {FormulariosConsultanteComponent} from './formulario-consultante/formulariosConsultante.component'
import {RedirecComponent} from './redirec/redirec.component'
import {FormularioFinishComponent} from "./formulario-finish/formulario-finish.component";
import {FlujoFormulariosComponent} from "./flujo-formularios/flujo-formularios.component";
import {FormulariosGeneradosComponent} from "./formularios-generados/formularios-generados.component";


import {ReconocimientoComponent} from "./frm-1/reconocimiento.component"
import {CausaestresComponent} from "./frm-2/causaEstres.component"
import {OpcionesComponent} from "./frm-3/opciones.component"
import {SeleccionestresComponent} from './frm-4/seleccionEstres.component'
import {CuerpoComponent} from './frm-5/cuerpo.component'
import {OrganosComponent} from './frm-6/organos.component'
import {RecuerdosComponent} from './frm-7/recuerdos.component'
import {PreferenciasComponent} from './frm-8/preferencias.component'
import {ActividadComponent} from './actividad/actividad.component'
import {CalificacionComponent} from './calificacion/calificacion.component'
import {CentroReconocimientoComponent} from './centro-reconocimiento/centro-reconocimiento.component'
import {ActreconocimientoComponent} from './centro-reconocimiento/actRecono/actReconocimiento.component'
import {PropositoComponent} from './proposito/proposito.component'
import {ActpropositoComponent} from "./proposito/actproposito/actproposito.component"
import {from} from "rxjs";
import {PasswordUpdate} from "~/components/user/password-update/password-update";

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
    path: 'formularios/:id',
    component: FormulariosComponent
  },
  {
    path: 'formularioConsultante',
    component: FormulariosConsultanteComponent
  },
  {
    path: 'formulario/:id/:idPregunta',
    component: FormulariosComponent
  },
  {
    path: 'redirec/:id/:idPregunta',
    component: RedirecComponent
  },
  {
    path: 'finish/:idFormulario',
    component: FormularioFinishComponent
  },
  {
    path: 'flujoFormularios/:id',
    component: FlujoFormulariosComponent
  },
  {
    path: 'formulariosgenerados',
    component: FormulariosGeneradosComponent
  },
  {
    path: 'frm-1',
    component: ReconocimientoComponent
  },
  {
    path: 'frm-2/:idEstres',
    component: CausaestresComponent
  },
  {
    path: 'frm-3/:idEstres/:idGrupo',
    component: OpcionesComponent
  },
  {
    path: 'frm-4/:idEstres/:idGrupo',
    component: SeleccionestresComponent
  },
  {
    path: 'frm-5/:idEstres/:idGrupo',
    component: CuerpoComponent
  },
  {
    path: 'frm-6/:idEstres/:idGrupo/:cabeza/:genital/:brazos/:piernas/:garganta/:estomago',
    component: OrganosComponent
  },
  {
    path: 'frm-7/:idEstres/:idGrupo',
    component: RecuerdosComponent
  },
  {
    path: 'frm-8/:idEstres/:idGrupo',
    component: PreferenciasComponent
  },
  {
    //path: 'actividad/:id/:posicion/:idConsulta/:imagen',
    path: 'actividad/:id/:posicion/:idConsulta/:imagen',
    component: ActividadComponent
  },
  {
    path: 'actividad/:id/:posicion/:idConsulta',
    component: ActividadComponent
  },
  {
    path: 'calificacion',
    component: CalificacionComponent
  },
  {
    path: 'centro-reconocimiento',
    component: CentroReconocimientoComponent
  },
  {
    path: 'actRecono/:id/:idact',
    component: ActreconocimientoComponent
  },
  {
    path: 'proposito',
    component: PropositoComponent
  },
  {
    path: 'actproposito/:id/:idact',
    component: ActpropositoComponent
  },
  {
    path: 'password-update',
    component: PasswordUpdate
  }];


@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})

export class UserRoutingModule {
}
