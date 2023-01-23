import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../core/services/parametros.service';
import {RouterExtensions} from "nativescript-angular";
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {GruposDiagnostico} from '../../../core/models/GruposDiagnostico';
import {GruposDiagnosticoService} from '../../../core/services/gruposDiagnostico.service';
import {ModalDialogService} from "nativescript-angular";
import {ModalOrganosComponent} from "./modal_organos.component"
import {ModalDialogOptions} from "nativescript-angular";
import {SbCausasEstres} from "~/core/models/SbCausasEstres";
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {Consultas} from "~/core/models/Consultas";
import {alert} from "ui/dialogs";
import {ConsultasService} from "~/core/services/consultas.service";
import {Frame} from "@nativescript/core/ui/frame";

@Component({
  selector: "Organos",
  moduleId: module.id,
  templateUrl: "./organos.component.html",
  styleUrls: ['./organos.component.css']
})
export class OrganosComponent implements OnInit {

  Elementos: SbCausasEstres[] = [];
  Aux: SbCausasEstres = {
    "id": 0,
    "tpCatCausa": 0,
    "tpCausa": 0,
    "descripcion": "",
    "txTpCausa": "",
    "txTpCatCausa": ""
  };
  Aux2: SbCausasEstres = {
    "id": 0,
    "tpCatCausa": 0,
    "tpCausa": 0,
    "descripcion": "",
    "txTpCausa": "",
    "txTpCatCausa": ""
  };
  bandera = false;
  idEstres: number;
  idCausaEstres: number;
  titulos = [];
  cabeza = ""
  genital = ""
  brazos = ""
  piernas = ""
  garganta = ""
  estomago = ""
  cantidad: number;
  ElementosIds = [];

  heightInput = 90;

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private parametroService: ParametrosService, private modal: ModalDialogService, private vcRef: ViewContainerRef,
              private gruposDiagnosticoService: GruposDiagnosticoService, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);
    if (globals.causaFrm6View) {
      this.bandera = true
      this.Elementos = globals.causaFrm6;
      this.actRoute.params.subscribe(params => {
        this.idEstres = params.idEstres;
        this.idCausaEstres = params.idGrupo;
        this.cabeza = params.cabeza;
        this.genital = params.genital;
        this.brazos = params.brazos;
        this.piernas = params.piernas;
        this.garganta = params.garganta;
        this.estomago = params.estomago;

        if (this.cabeza == "1") {
          this.titulos[0] = "cabeza";
        }
        if (this.genital == "1") {
          this.titulos[1] = "genital";
        }
        if (this.brazos == "1") {
          this.titulos[2] = "brazos";
        }
        if (this.piernas == "1") {
          this.titulos[3] = "piernas";
        }
        if (this.garganta == "1") {
          this.titulos[4] = "garganta";
        }
        if (this.estomago == "1") {
          this.titulos[5] = "estomago";
        }
      });
    } else {
      this.actRoute.params.subscribe(params => {
        this.idEstres = params.idEstres;
        this.idCausaEstres = params.idGrupo;
        this.cabeza = params.cabeza;
        this.genital = params.genital;
        this.brazos = params.brazos;
        this.piernas = params.piernas;
        this.garganta = params.garganta;
        this.estomago = params.estomago;

        if (this.cabeza == "1") {
          this.titulos[0] = "cabeza";
        }
        if (this.genital == "1") {
          this.titulos[1] = "genital";
        }
        if (this.brazos == "1") {
          this.titulos[2] = "brazos";
        }
        if (this.piernas == "1") {
          this.titulos[3] = "piernas";
        }
        if (this.garganta == "1") {
          this.titulos[4] = "garganta";
        }
        if (this.estomago == "1") {
          this.titulos[5] = "estomago";
        }
      });
      this.init();
    }
    this.parametroService.get(this.idEstres).subscribe(resp => {
      this.ruta = this.ruta + resp.descripcion + " / ";
      this.gruposDiagnosticoService.get(this.idCausaEstres).toPromise().then(resp => {
        this.ruta = this.ruta + resp.descripcion2 + " / ";
      });
    })
  }

  ruta = "Tu ruta :"

  ngOnInit(): void {
    const currentPage = Frame.topmost().currentPage;
    console.log(currentPage.className);
    if (currentPage.className.includes('android360')) {
      this.heightInput = 60;
    }
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
    this.showModal();
  }

  async showModal() {
    this.init();
    let opciones: ModalDialogOptions = {
      context: {titulos: this.titulos},
      fullscreen: true,
      viewContainerRef: this.vcRef
    }
    let seleccion = await this.modal.showModal(ModalOrganosComponent, opciones);
    this.bandera = true;
    this.Elementos = seleccion;
    this.cantidad = this.Elementos.length;
  }

  continue() {
    for (let index = 0; index < this.cantidad; index++) {
      if (this.Elementos[index].id != 0) {
        this.ElementosIds[index] = this.Elementos[index].id
      }
    }
    this.globals.causaFrm6 = this.Elementos;
    this.globals.causaFrm6View = true;
    this.globals.objReconocimiento.partesCuerpo = this.ElementosIds;
    this.routerExtensions.navigate(['/app/frm-7', this.idEstres, this.idCausaEstres])
  }

  flujo(arg) {
    if (arg == "a") {
      this.routerExtensions.backToPreviousPage();
    }
  }

  init() {
    this.Elementos[0] = this.Aux;
    this.Elementos[1] = this.Aux;
    this.Elementos[2] = this.Aux;
    this.Elementos[3] = this.Aux;
    this.Elementos[4] = this.Aux;
    this.Elementos[5] = this.Aux;
  }

  cambiarArriba(args: EventData) {
    let button = args.object as Label;
    let auxiliar = new SbCausasEstres();
    if (button.id == "5" && this.Elementos[5].id != 0 && this.Elementos[4].id != 0) {
      auxiliar = this.Elementos[5];
      this.Elementos[5] = this.Elementos[4];
      this.Elementos[4] = auxiliar;
    } else {
      if (this.Elementos[Number(button.id)].id != 0 && this.Elementos[Number(button.id) - 1].id != 0) {
        auxiliar = this.Elementos[Number(button.id)];
        this.Elementos[Number(button.id)] = this.Elementos[Number(button.id) - 1]
        this.Elementos[Number(button.id) - 1] = auxiliar
      }
    }
  }

  cambiarAbajo(args: EventData) {
    let button = args.object as Label;
    let auxiliar = new SbCausasEstres();
    if (button.id == "0" && this.Elementos[1].id != 0 && this.Elementos[0].id != 0) {
      auxiliar = this.Elementos[0];
      this.Elementos[0] = this.Elementos[1];
      this.Elementos[1] = auxiliar;
    } else {
      if (this.Elementos[Number(button.id)].id != 0 && this.Elementos[Number(button.id) + 1].id != 0) {
        auxiliar = this.Elementos[Number(button.id)];
        this.Elementos[Number(button.id)] = this.Elementos[Number(button.id) + 1]
        this.Elementos[Number(button.id) + 1] = auxiliar
      }
    }
  }
}
