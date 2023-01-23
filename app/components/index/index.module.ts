import {NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {IndexRoutingModule} from "./index-routing.module";

import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {NativeScriptUICalendarModule} from "nativescript-ui-calendar/angular";
import {NativeScriptUIChartModule} from "nativescript-ui-chart/angular";
import {NativeScriptUIDataFormModule} from "nativescript-ui-dataform/angular";
import {NativeScriptUIAutoCompleteTextViewModule} from "nativescript-ui-autocomplete/angular";
import {NativeScriptUIGaugeModule} from "nativescript-ui-gauge/angular";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client"

import {TerminosComponent} from './terminos/terminos.component'
import {RegistroComponent} from './registro/registro.component';
import {LoginComponent} from './login/login.component';
import {RecuperarComponent} from './recuperar/recuperar.component'

@NgModule({
  imports: [
    IndexRoutingModule,
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
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarComponent,
    TerminosComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class IndexModule {
}
