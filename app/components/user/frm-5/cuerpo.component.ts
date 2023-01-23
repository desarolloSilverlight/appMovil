import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ParametrosService} from '../../../core/services/parametros.service';
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from '@angular/router';
import {GruposDiagnosticoService} from '../../../core/services/gruposDiagnostico.service';
import {ModalCuerpoComponent} from "./modal_cuerpo.component"
import {TouchGestureEventData} from 'tns-core-modules/ui/gestures';
import * as platform from 'platform';
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {ConsultasService} from "~/core/services/consultas.service";
import {Consultas} from "~/core/models/Consultas";
import {alert} from "ui/dialogs";

@Component({
  selector: "Cuerpo",
  moduleId: module.id,
  templateUrl: "./cuerpo.component.html",
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {
  htmlString: string;
  idEstres: number;
  idCausaEstres: number;
  cabeza = 0;
  genital = 0;
  brazos = 0;
  piernas = 0;
  garganta = 0;
  estomago = 0;
  partes = [];
  intensidad = [];
  flag = false;

  ElementosView: boolean[] = [false, false, false, false, false, false, false, false];
  ElementosValue: number[] = [0, 0, 0, 0, 0, 0]

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private parametroService: ParametrosService, private modal: ModalDialogService, private vcRef: ViewContainerRef,
              private gruposDiagnosticoService: GruposDiagnosticoService, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);

    if (this.globals.causaFrm5View) {
      this.reView(this.globals.causaFrm5)
    }
    this.actRoute.params.subscribe(params => {
      this.idEstres = params.idEstres;
      this.idCausaEstres = params.idGrupo;
    });
    this.parametroService.get(this.idEstres).subscribe(resp => {
      this.ruta = this.ruta + resp.descripcion + " / ";
      this.gruposDiagnosticoService.get(this.idCausaEstres).toPromise().then(resp => {
        this.ruta = this.ruta + resp.descripcion2 + " / ";
      });
    })
  }

  touchImage(event: TouchGestureEventData) {
    const scale: number = platform.screen.mainScreen.scale;
    if (event.action === 'down') {
      const point = {
        y: event.getY() / (event.view.getMeasuredHeight() / scale),
        x: event.getX() / (event.view.getMeasuredWidth() / scale)
      };
      console.log("esto es x" + point.x)
      console.log("esto es y" + point.y)
      // cabeza
      if (point.x > 0.42 && point.x < 0.57 && point.y > 0.04 && point.y < 0.2) {
        //console.log('entro a cabeza con :' + " x:" + point.x + " y: " + point.y);
        console.log(this.ElementosView[0]);
        if (this.ElementosView[0] == true) {
          this.ElementosView[0] = false;
          this.ElementosValue[0] = 0;
          // this.showModal()
        } else {
          this.ElementosView[0] = true;
          this.ElementosValue[0] = 1
          // this.showModal()
        }
      }
      // pecho
      if (point.x > 0.40 && point.x < 0.60 && point.y > 0.21 && point.y < 0.38) {
        //console.log('entro a pecho con :' + " x:" + point.x + " y: " + point.y);

        if (this.ElementosView[4] == true) {
          // this.showModal()
          this.ElementosView[4] = false;
          this.ElementosValue[4] = 0;
        } else {
          this.ElementosView[4] = true;
          this.ElementosValue[4] = 1
          // this.showModal()
        }
      }
      //abdomen
      if (point.x > 0.40 && point.x < 0.60 && point.y > 0.38 && point.y < 0.53) {
        //console.log('entro a abdomen con :' + " x:" + point.x + " y: " + point.y);

        if (this.ElementosView[5] == true) {
          // this.showModal()
          this.ElementosView[5] = false;
          this.ElementosValue[5] = 0;
        } else {
          this.ElementosView[5] = true;
          this.ElementosValue[5] = 1
          // this.showModal()
        }
      }
      //cintura
      if (point.x > 0.38 && point.x < 0.62 && point.y > 0.54 && point.y < 0.64) {
        //console.log('entro a cintura con :' + " x:" + point.x + " y: " + point.y);
        if (this.ElementosView[1] == true) {
          // this.showModal()
          this.ElementosView[1] = false;
          this.ElementosValue[1] = 0;
        } else {
          this.ElementosView[1] = true;
          this.ElementosValue[1] = 1
          // this.showModal()
        }
      }
      //pierna
      if ((point.x > 0.35 && point.x < 0.50 && point.y > 0.64 && point.y < 0.98) || (point.x > 0.50 && point.x < 0.65 && point.y > 0.64 && point.y < 0.98)) {
        if (this.ElementosView[3] == true) {
          // this.showModal()
          this.ElementosView[3] = false;
          this.ElementosValue[3] = 0;
        } else {
          this.ElementosView[3] = true;
          this.ElementosValue[3] = 1
          // this.showModal()
        }
      }
      //brazo
      if ((point.x > 0.30 && point.x < 0.40 && point.y > 0.23 && point.y < 0.53) || (point.x > 0.60 && point.x < 0.70 && point.y > 0.23 && point.y < 0.53)) {
        if (this.ElementosView[2] == true) {
          // this.showModal()
          this.ElementosView[2] = false;
          this.ElementosValue[2] = 0;
        } else {
          this.ElementosView[2] = true;
          this.ElementosValue[2] = 1
          // this.showModal()
        }
      }
      //console.log('no entro a nada :' + " x:" + point.x + " y: " + point.y);
    }
  }

  ruta = "Tu ruta :"

  ngOnInit(): void {
    const p = new Consultas();
    let options = {
      title: "Aviso",
      message: "Ya tienes en curso una actividad",
      okButtonText: "OK"
    };
    p.idConsultante = this.globals.consultante.id;
    p.status = 'P';
    this.consultaService.listVi(p).toPromise().then(r => {
      if (r.length > 0) {
        alert(options).then(() => {
          this.routerExtensions.navigate(['/app/welcome']);
        });

      }
    });
  }

  async showModal() {
    let opciones: ModalDialogOptions = {
      context: {valores: this.ElementosValue},
      fullscreen: true,
      viewContainerRef: this.vcRef
    }
    let seleccion = await this.modal.showModal(ModalCuerpoComponent, opciones);
    this.ElementosValue = seleccion;
    this.reView(seleccion);
  }

  reView(args) {
    for (let i = 0; i < args.length; i++) {
      if (args[i] == 0) {
        this.ElementosView[i] = false;
      } else {
        this.ElementosView[i] = true;
      }
    }
  }

  isSelectedElements(): boolean {
    for (const element of this.ElementosView) {
      if (element) {
        return true;
      }
    }
    return false;
  }

  continue() {

    if (!this.flag && this.isSelectedElements()) {
      this.showModal();
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 10000);
      return;
    } else if (!this.isSelectedElements()) {
      let options = {
        title: "Aviso",
        message: "Selleciona una parte del cuerpo para continuar",
        okButtonText: "OK"
      };
      alert(options);
      return;
    }

    if (this.ElementosValue[0] != 0) {
      this.cabeza = 1;
      this.partes.push(17)
      this.intensidad.push(this.ElementosValue[0])
    }
    if (this.ElementosValue[1] != 0) {
      this.genital = 1;
      this.partes.push(21)
      this.intensidad.push(this.ElementosValue[1])
    }
    if (this.ElementosValue[2] != 0) {
      this.brazos = 1;
      this.partes.push(19)
      this.intensidad.push(this.ElementosValue[2])
    }
    if (this.ElementosValue[3] != 0) {
      this.piernas = 1;
      this.partes.push(22)
      this.intensidad.push(this.ElementosValue[3])
    }
    if (this.ElementosValue[4] != 0) {
      this.garganta = 1;
      this.partes.push(18)
      this.intensidad.push(this.ElementosValue[4])
    }
    if (this.ElementosValue[5] != 0) {
      this.estomago = 1;
      this.partes.push(20)
      this.intensidad.push(this.ElementosValue[5])
    }


    this.globals.objReconocimiento.partes = this.partes;
    this.globals.objReconocimiento.intensidadPC = this.intensidad;
    this.globals.causaFrm5 = this.ElementosValue;
    this.globals.causaFrm5View = true
    this.routerExtensions.navigate(['/app/frm-6', this.idEstres, this.idCausaEstres, this.cabeza, this.genital, this.brazos, this.piernas, this.garganta, this.estomago])
  }

  flujo(arg) {
    if (arg == "a") {
      this.routerExtensions.backToPreviousPage();
    }
  }
}
