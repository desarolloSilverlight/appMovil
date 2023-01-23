import {Component, OnInit} from "@angular/core";

import {AuthService} from '../../../core/services/auth.service';
import {sha256} from 'js-sha256';
import {Usuario} from '../../../core/models/Usuario';
import {RouterExtensions} from "nativescript-angular/router";
import {Page} from "tns-core-modules/ui/page";
import Theme from "@nativescript/theme";
import {alert} from "tns-core-modules/ui/dialogs";
import {setString} from "tns-core-modules/application-settings";
import * as trace from "trace";
import {Frame} from "@nativescript/core/ui/frame";
import {isAndroid} from "platform";
import * as application from "application";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {keepAwake} from "nativescript-insomnia";
import {typeLogging} from "~/core/models/UserLog";

Theme.setMode(Theme.Light);


@Component({
  selector: "Login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  htmlString: string;
  options = {
    title: "Error login",
    message: "Usuario o Contraseña inválido",
    okButtonText: "OK"
  };
  ver: boolean = true;
  busy = false;

  constructor(private page: Page, private routerExtensions: RouterExtensions, private authService: AuthService) {

    //constructor(private routerExtensions:RouterExtensions) {
    this.htmlString = `
		<div style="text-align: center;
					">
			<span>
				<h1>Te damos la bienvenida hoy</h1>
			</span>
		</div>`;
    Theme.setMode(Theme.Light);
  }

  ngOnInit(): void {
    keepAwake().then(function() {
      console.log("Insomnia is active");
    })
    this.page.actionBarHidden = true;
    if (isAndroid) {
      application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        data.cancel = false;
      });
    }
  }

  password: string = ""
  emeil: string = ""

  valit(): boolean {
    if (this.emeil != "" && this.password != "") {
      return true;
    } else {
      return false;
    }
  }

  mostrarP() {
    if (this.ver) {
      this.ver = false;
    } else {
      this.ver = true;
    }
  }

  submit(): void {
    const currentPage = Frame.topmost().currentPage;
    trace.write(`class ---> ${currentPage.className}`, trace.categories.Debug, trace.messageType.info);
    if (this.valit()) {
      const user = new Usuario();
      user.email = this.emeil;
      user.email = user.email.toLowerCase();
      user.password = sha256(this.password);
      console.log(user);
      this.busy = true;

      this.authService.login(user).subscribe((resp: any) => {
        this.busy = false;
        console.log(resp)
        if (resp.access_token) {
          setString('token', resp.access_token);
          this.authService.saveLog(typeLogging.login);
          this.routerExtensions.navigate(['/app/welcome'])
        }
      }, err => {
        this.busy = false;
        alert({
          title: "Error",
          message: err.error.message,
          okButtonText: "OK"
        });
        console.log(err)
      });
    } else {
      alert(this.options);
    }
  }
}
