import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {Page} from "tns-core-modules/ui/page";
import Theme from "@nativescript/theme";
import {UsuariosService} from "~/core/services/usuarios.service";
import {NotificacionesService} from "~/core/services/notificaciones.service";
import {Usuarios} from "~/core/models/Usuarios";
import {Notificaciones} from "~/core/models/Notificaciones";
import {sha256} from "js-sha256";
import {alert} from "tns-core-modules/ui/dialogs";

@Component({
  selector: "Recuperar",
  moduleId: module.id,
  templateUrl: "./recuperar.component.html",
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  bandera = false;
  email: string;
  caracteres: string = "#$%&/=?¿";
  letras: string = "abcdeefghijklmnopqrstuvwxyz"

  constructor(private page: Page, private routerExtensions: RouterExtensions, private usuariosService: UsuariosService, private notificacionService: NotificacionesService) {
    Theme.setMode(Theme.Light);
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  valit(): boolean {
    if (this.email != "") {
      return true;
    } else {
      return false;
    }
  }

  submit(): void {
    if (this.valit()) {
      let pass: string = String(Math.floor(Math.random() * this.letras.length));
      const usuario = new Usuarios();
      usuario.email = this.email.toLowerCase();
      this.usuariosService.list(usuario).toPromise().then(resp => {
        console.log('usuarios ====>', resp);
        if (resp.length > 0) {
          const element = resp[0];
          for (let i = 0; i < 12; i++) {
            if (i != 7 && i != 9 && i != 10) {
              pass += this.letras.charAt(Math.floor(Math.random() * this.caracteres.length));
            } else {
              pass += this.caracteres.charAt(Math.floor(Math.random() * this.letras.length));
            }
          }
          const notificacion = new Notificaciones();
          notificacion.correos = element.email;
          notificacion.envioInmediato = true;
          notificacion.usuario = element.email;
          notificacion.idTpNotificacion = 8;
          notificacion.variables = JSON.stringify({
            password: pass
          });
          let usuarios: Usuarios = new Usuarios();
          usuarios = element;
          usuarios.password = sha256(pass);
          this.usuariosService.save(usuarios).subscribe(
            (res) => {
              this.notificacionService.insert(notificacion).toPromise().then();
              this.bandera = true;
              alert({
                title: 'Exito',
                message: 'Su nueva contraseña ha sido enviada a su correo electrónico',
                okButtonText: 'ok'
              }).then(() => {
                  this.routerExtensions.navigateByUrl('/login');
                }
              );
            }
          );
        } else {
          alert({
            title: 'Error',
            message: 'El correo ingresado no existe',
            okButtonText: 'ok'
          })
        }
      });
    }
  }
}
