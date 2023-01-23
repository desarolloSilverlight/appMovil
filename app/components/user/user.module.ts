import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {
  ModalDialogService,
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptHttpClientModule
} from "nativescript-angular";
import {UserRoutingModule} from "./user-routing.module";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {NativeScriptUICalendarModule} from "nativescript-ui-calendar/angular";
import {NativeScriptUIChartModule} from "nativescript-ui-chart/angular";
import {NativeScriptUIDataFormModule} from "nativescript-ui-dataform/angular";
import {NativeScriptUIAutoCompleteTextViewModule} from "nativescript-ui-autocomplete/angular";
import {NativeScriptUIGaugeModule} from "nativescript-ui-gauge/angular";
import {ModalEstresComponent} from "./frm-4/modal_estres.component"
import {ModalOrganosComponent} from "./frm-6/modal_organos.component"
import {ModalCuerpoComponent} from "./frm-5/modal_cuerpo.component"
import {ModalCalidicacionAcComponent} from './actividad/modal_CalificacionAc/modal_calificacionAc.component'

import {WelcomeComponent} from './welcome/welcome.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component'
import {FormulariosComponent} from './formularios/formularios.component'
import {FormulariosConsultanteComponent} from './formulario-consultante/formulariosConsultante.component'
import {GlobalsUser} from '../../core/globals/globalsUser'
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
import {ModalCalificacionSiComponent} from './actividad/modal_CalificacionSi/calificacion.component'
import {ActreconocimientoComponent} from './centro-reconocimiento/actRecono/actReconocimiento.component'
import {CentroReconocimientoComponent} from './centro-reconocimiento/centro-reconocimiento.component'
import {CalificacionComponent} from "~/components/user/calificacion/calificacion.component";
import {PropositoComponent} from './proposito/proposito.component'
import {ActpropositoComponent} from "./proposito/actproposito/actproposito.component"
import {PinchToZoomDirective} from "~/core/directives/zoom.directive";
import {MiHistoriaComponent} from "~/components/user/mi-historia/mi-historia.component";
import {PasswordUpdate} from "~/components/user/password-update/password-update";
import {AudioPlayerComponent} from "~/components/user/audio-player/audio-player.component";

@NgModule({
  imports: [
    UserRoutingModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,
    NativeScriptUICalendarModule,
    NativeScriptUIChartModule,
    NativeScriptUIDataFormModule,
    NativeScriptUIAutoCompleteTextViewModule,
    NativeScriptUIGaugeModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule
  ],
  entryComponents: [ModalEstresComponent, ModalOrganosComponent, ModalCuerpoComponent, ModalCalidicacionAcComponent, ModalCalificacionSiComponent,],
  declarations: [
    CalificacionComponent,
    WelcomeComponent,
    ConfiguracionComponent,
    FormulariosComponent,
    FormulariosConsultanteComponent,
    RedirecComponent,
    FormularioFinishComponent,
    FlujoFormulariosComponent,
    FormulariosGeneradosComponent,
    ReconocimientoComponent,
    CausaestresComponent,
    OpcionesComponent,
    SeleccionestresComponent,
    ModalEstresComponent,
    CuerpoComponent,
    OrganosComponent,
    ModalOrganosComponent,
    RecuerdosComponent,
    PreferenciasComponent,
    ModalCuerpoComponent,
    ModalCalidicacionAcComponent,
    ActividadComponent,
    ModalCalificacionSiComponent,
    CentroReconocimientoComponent,
    ActreconocimientoComponent,
    PropositoComponent,
    ActpropositoComponent,
    PinchToZoomDirective,
    MiHistoriaComponent,
    PasswordUpdate,
    AudioPlayerComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [GlobalsUser, ModalDialogService],

})
export class UserModule {
}
