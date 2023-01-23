import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "", loadChildren: () => import("./components/index/index.module").then(m => m.IndexModule) },
  {
    path: 'app',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
  }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
