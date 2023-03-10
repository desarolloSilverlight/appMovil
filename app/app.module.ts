import {NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {AudioService} from "~/core/services/audio.service";


@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    AudioService
  ]
})
export class AppModule {
}
