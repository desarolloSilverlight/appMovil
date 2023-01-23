import {Component, OnInit} from "@angular/core";
import {Consultantes} from '../../../core/models/Consultantes';
import {AuthService} from '../../../core/services/auth.service';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {RouterExtensions} from "nativescript-angular";
import Theme from "@nativescript/theme";
import {Usuarios} from "~/core/models/Usuarios";
import {UsuariosService} from "~/core/services/usuarios.service";
import {sha256} from "js-sha256";
import {alert} from "tns-core-modules/ui/dialogs";

@Component({
  selector: "PasswordUpdate",
  moduleId: module.id,
  templateUrl: "./password-update.html",
  styleUrls: ['./password-update.css']
})
export class PasswordUpdate implements OnInit {

  consultante: Consultantes = new Consultantes()
  submitted = true;
  pageTitle = 'Actualizar Contraseña';
  ver: boolean = true;
  Contrasena = "";
  ReContrasena = "";
  user: Usuarios = new Usuarios();

  constructor(private routerExtensions: RouterExtensions, private authService: AuthService,
              private consultatesService: ConsultantesService, private usuariosService: UsuariosService) {
    Theme.setMode(Theme.Light);
  }


  ngOnInit(): void {
    this.authService.protected().toPromise().then(resp => {
      this.user.idConsultante = resp.idConsultante;
      this.usuariosService.list(this.user).toPromise().then(res => {
        this.user = res[0];
      });
    });
  }


  save() {
    this.submitted = true;
    if (this.Contrasena.trim() != "" && this.ReContrasena.trim() != "") {
      this.user.password = sha256(this.Contrasena);
      this.usuariosService.save(this.user).subscribe((res) => {
        const options = {
          title: 'Exito',
          message: 'Tu contraseña ha sido actualizada',
          okButtonText: 'OK'
        };
        alert(options).then(() => {
          this.routerExtensions.navigate(['/login']);
        });

      });
    }
  }


  mostrarP() {
    if (this.ver) {
      this.ver = false;
    } else {
      this.ver = true;
    }
  }
}
