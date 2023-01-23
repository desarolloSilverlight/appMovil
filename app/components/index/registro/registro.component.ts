import {Component, OnInit} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Button} from "tns-core-modules/ui/button";
import {RouterExtensions} from "nativescript-angular/router";
import {Page} from "tns-core-modules/ui/page";
import Theme from "@nativescript/theme";
import {Empresa} from "~/core/models/Empresa";
import {EmpresaService} from "~/core/services/empresa.service";
import {InvitacionesService} from "~/core/services/invitaciones.service";
import {ConsultantesService} from "~/core/services/consultantes.service";
import {NotificacionesService} from "~/core/services/notificaciones.service";
import {ParametrosService} from "~/core/services/parametros.service";
import {UsuariosService} from "~/core/services/usuarios.service";
import {Consultantes} from "~/core/models/Consultantes";
import {Invitaciones} from "~/core/models/Invitaciones";
import {Usuarios} from "~/core/models/Usuarios";
import {sha256} from "js-sha256";
import {Notificaciones} from "~/core/models/Notificaciones";
import {alert} from "tns-core-modules/ui/dialogs";
import {Parametros} from "~/core/models/Parametros";
import {TP_PARAMETROS} from "~/core/constants/Parametros";

let openUrl = require('nativescript-openurl');


@Component({
  selector: "Registro",
  moduleId: module.id,
  templateUrl: "./registro.component.html",
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  id: number;
  terminos: boolean = false;
  codigo: boolean = false;
  tpRegistro: number = null;
  tpRegistroA: Parametros[] = [];
  primer: boolean = true;
  oldSelect: Button = null;
  ver: boolean = false;

  constructor(private page: Page, private routerExtensions: RouterExtensions, private parametroService: ParametrosService, private empresaService: EmpresaService,
              private usuarioService: UsuariosService, private invitacionesService: InvitacionesService,
              private consultanteService: ConsultantesService, private notificacionService: NotificacionesService) {
    Theme.setMode(Theme.Light);
  }

  ngOnInit(): void {
    const param = new Parametros();
    param.idTpParametro = TP_PARAMETROS.TP_REGISTRO;
    this.parametroService.list(param).toPromise().then(resp => {
      this.tpRegistroA = resp;
      this.tpRegistro = this.tpRegistroA[0].id;
    });
    this.page.actionBarHidden = true;
  }

  cambio(args: EventData) {
    let button = args.object as Button;
    this.id = Number(button.id)
    if (this.tpRegistroA[0].id != this.id) {
      if (this.oldSelect == null && this.id == this.tpRegistro) {
        this.oldSelect = args.object as Button
        let button = args.object as Button;
        button.className = "cnSelect";
        this.tpRegistro = Number(button.id)
      } else {
        this.primer = false;
        let button = args.object as Button;
        this.oldSelect.className = "ctNormal";
        button.className = "cnSelect";
        this.oldSelect = button;
        this.tpRegistro = Number(button.id)
      }
    }
  }


  routin() {

    this.routerExtensions.navigate(['/login'])
  }

  routin2() {
    openUrl('https://api-backend.zerostress.io/media/terminos.pdf')
    // this.routerExtensions.navigate(['/terminos'])
  }

  mostrarP() {
    if (this.ver) {
      this.ver = false;
    } else {
      this.ver = true;
    }
  }

  email: string;
  direccion: string;
  razonSocial: string;
  nit: string;
  nombreContacto: string;
  telefonoContacto: number;
  password: string;
  apellidos: string;
  nombre: string;
  codigoInvitacion: string;
  passwordR: string;

  validar(): boolean {
    if (this.tpRegistro == 1) {
      if (this.email != undefined && this.razonSocial != undefined
        && this.nit != undefined && this.nombreContacto != undefined
        && this.telefonoContacto != undefined && this.apellidos != undefined && this.password != undefined && this.password == this.passwordR && this.terminos == true) {
        return true;
      } else {
        console.log(" no estan bien los datos2222")
        let options = {
          title: "Aviso",
          message: "Por favor verifica los campos",
          okButtonText: "OK"
        };
        alert(options);
        return false;
      }
    } else if (this.tpRegistro > 1) {
      if (this.terminos == false) {
        let options = {
          title: "Aviso",
          message: "Debes aceptar los térmios de uso",
          okButtonText: "OK"
        };
        alert(options);
        return false;
      }
      if (this.email != undefined && this.codigoInvitacion != undefined
        && this.nombre != undefined && this.nombre.trim() != ''
        && this.apellidos != undefined && this.apellidos.trim() != '' && this.password != undefined && this.password == this.passwordR) {
        if (this.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
          return true;
        } else {
          let options = {
            title: "Aviso",
            message: "El correo no es valido",
            okButtonText: "OK"
          };
          alert(options);
          return false;
        }

      } else {
        console.log("no  estan bien los datos1111")
        let options = {
          title: "Aviso",
          message: "Por favor verifica los campos",
          okButtonText: "OK"
        };
        alert(options);
        return false;
      }
    }
  }

  reset() {
    this.email = undefined;
    this.direccion = undefined;
    this.razonSocial = undefined;
    this.nit = undefined;
    this.nombreContacto = undefined;
    this.telefonoContacto = undefined;
    this.password = undefined;
    this.apellidos = undefined;
    this.nombre = undefined;
    this.codigoInvitacion = undefined;
    this.passwordR = undefined;
    this.codigoInvitacion = "";
    this.terminos = false;
    this.codigo = false;

  }

  registrar() {
    if (this.validar()) {
      if (this.tpRegistro > 1) {
        this.tpRegistro = 2;
      }
      switch (this.tpRegistro) {
        case 1:
          const empresa = new Empresa();
          empresa.email = this.email.toLowerCase();
          empresa.direccion = this.direccion;
          empresa.razonSocial = this.razonSocial;
          empresa.nit = this.nit;
          empresa.apellidos = this.apellidos;
          empresa.nombreContacto = this.nombreContacto;
          empresa.telefonoContacto = String(this.telefonoContacto);
          console.log(empresa)
          this.empresaService.insert(empresa).toPromise().then((resp) => {
            const usuario = new Usuarios();
            usuario.email = this.email.toLowerCase();
            usuario.idEmpresa = resp.id;
            usuario.usuarioEmpresarial = true;
            usuario.password = sha256(this.password);
            usuario.idRol = 0;
            usuario.usuarioAdmin = true;
            this.usuarioService.insert(usuario).toPromise().then(() => {
              let options = {
                title: "Aviso",
                message: "Exito en registro",
                okButtonText: "OK"
              };
              alert(options);
              this.routerExtensions.navigate(['/login']);
            });
          });
          break;
        case 2:
          const consultante = new Consultantes();
          consultante.apellidos = this.apellidos;
          consultante.nombre = this.nombre;
          consultante.email = this.email.toLowerCase();
          let invitacion = new Invitaciones();
          invitacion.codigoInvitacion = this.codigoInvitacion;
          console.log(consultante)
          this.invitacionesService.list(invitacion).toPromise().then(resp => {
              if (resp.length > 0) {
                invitacion = resp[0];
                const c = new Consultantes();
                c.idInvitacion = resp[0].id;
                this.consultanteService.list(c).toPromise().then(rs => {
                  if (rs.length > 0) {
                    let options = {
                      title: "Error",
                      message: "Este código de invitación ya fue usado",
                      okButtonText: "OK"
                    };
                    alert(options);
                  } else {
                    consultante.idEmpresa = invitacion.idEmpresa;
                    consultante.primerIngreso = true;
                    consultante.idInvitacion = invitacion.id;
                    this.consultanteService.insert(consultante).toPromise().then(r => {
                      const usuario = new Usuarios();
                      usuario.estado = true;
                      usuario.usuarioAdmin = false;
                      usuario.idEmpresa = r.idEmpresa;
                      usuario.idRol = 0;
                      usuario.idConsultante = r.id;
                      usuario.email = r.email.toLowerCase();
                      usuario.password = sha256(this.password);
                      usuario.usuarioEmpresarial = false;
                      const notificacion = new Notificaciones();
                      notificacion.correos = r.email;
                      notificacion.envioInmediato = true;
                      notificacion.usuario = r.email.toLowerCase();
                      notificacion.idTpNotificacion = 1;
                      notificacion.variables = JSON.stringify({
                        nombre: consultante.nombre,
                        apellidos: consultante.apellidos,
                        email: consultante.email,
                        invitacion: invitacion.codigoInvitacion
                      });
                      this.usuarioService.insert(usuario).toPromise().then(() => {
                        this.notificacionService.insert(notificacion).toPromise().then(() => {
                          let options = {
                            title: "Aviso",
                            message: "Exito en registro",
                            okButtonText: "OK"
                          };
                          alert(options);
                          this.routerExtensions.navigate(['/login']);

                        });
                      }, reason => {
                        let options = {
                          title: "Aviso",
                          message: reason.error.message,
                          okButtonText: "OK"
                        };
                        alert(options);
                      });
                    }, reason => {
                      let options = {
                        title: "Aviso",
                        message: reason.error.message,
                        okButtonText: "OK"
                      };
                      alert(options);
                    });
                  }

                });
              } else {
                let options = {
                  title: "Aviso",
                  message: "No existe este código de invitación",
                  okButtonText: "OK"
                };
                alert(options);
              }
            }
          );
          break;
        case 3:
          break;
      }
    }
  }

  termi() {
    console.log("entro")
    if (this.terminos) {
      this.terminos = false;
    } else {
      this.terminos = true;
    }
  }

  vCodigoInv() {
    let options = {
      title: "Error",
      message: "No existe este código de invitación",
      okButtonText: "OK"
    };
    const invitacion = new Invitaciones();
    console.log("este es el codigo ", this.codigoInvitacion)
    invitacion.codigoInvitacion = this.codigoInvitacion;
    if (this.codigoInvitacion != undefined && this.codigoInvitacion != "") {
      this.invitacionesService.list(invitacion).toPromise().then(resp => {
        //console.log(resp)
        if (resp.length > 0) {
          this.codigo = true;
        } else {
          this.codigo = false;
          this.codigoInvitacion = "";
          alert(options);
        }
      });
    } else {
      this.codigo = false;
      this.codigoInvitacion = "";
      alert(options);
    }
  }
}
