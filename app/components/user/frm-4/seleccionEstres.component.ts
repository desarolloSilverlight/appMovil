import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../core/services/parametros.service';
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from '@angular/router';
import {GruposDiagnosticoService} from '../../../core/services/gruposDiagnostico.service';
import {ModalEstresComponent} from "./modal_estres.component"
import {SbCausasEstres} from "~/core/models/SbCausasEstres";
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {Frame} from "@nativescript/core/ui/frame";
import {ConsultasService} from "~/core/services/consultas.service";
import {Consultas} from "~/core/models/Consultas";
import {alert} from "ui/dialogs";

@Component({
  selector: "Seleccionestres",
  moduleId: module.id,
  templateUrl: "./seleccionEstres.component.html",
  styleUrls: ['./seleccionEstres.component.css']
})
export class SeleccionestresComponent implements OnInit {


  Elementos: SbCausasEstres[] = [];
  ElementosIds = [];
  cantidad: number;
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

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private parametroService: ParametrosService, private modal: ModalDialogService, private vcRef: ViewContainerRef,
              private gruposDiagnosticoService: GruposDiagnosticoService, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);
    this.init();
    if (globals.causaFrm4View) {
      this.Elementos = this.globals.causaFrm4;
      this.bandera = true;
      this.cantidad = this.Elementos.length;
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

  ruta = "Tu ruta :"
  heightInput = 90;

  ngOnInit(): void {
    const currentPage = Frame.topmost().currentPage;
    console.log(currentPage.className);
    if (currentPage.className.includes('android360')) {
      this.heightInput = 60;
    }
    this.showModal();
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
    this.globals.causaFrm4View = false
    this.init();
    let opciones: ModalDialogOptions = {
      fullscreen: true,
      viewContainerRef: this.vcRef
    }
    let seleccion = await this.modal.showModal(ModalEstresComponent, opciones);
    this.Elementos = seleccion;

    if (this.Elementos.length >= 0 || this.Elementos != undefined) {
      this.bandera = true
      this.cantidad = this.Elementos.length;
    }
  }

  continue() {
    for (let index = 0; index < this.cantidad; index++) {
      if (this.Elementos[index].id != 0) {
        this.ElementosIds[index] = this.Elementos[index].id
      }
    }
    if (this.ElementosIds.length > 0) {
      if (this.globals.objReconocimiento === undefined) {
        this.globals.objReconocimiento = {
          spCausas: this.ElementosIds,
          partes: [],
          tpCerebero: undefined,
          dVivir: undefined,
          partesCuerpo: [],
          intensidadPC: []
        };
        this.globals.causaFrm4View = true;
        this.globals.causaFrm4 = this.Elementos;
      } else {
        this.globals.causaFrm4View = true;
        this.globals.causaFrm4 = this.Elementos;
        this.globals.objReconocimiento.spCausas = this.ElementosIds;
      }
      this.routerExtensions.navigate(['/app/frm-5', this.idEstres, this.idCausaEstres])
    }
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
