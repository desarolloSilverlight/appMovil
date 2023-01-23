import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../core/services/parametros.service';
import {Parametros} from '../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../core/constants/Parametros';
import {RouterExtensions} from "nativescript-angular";
import {GruposDiagnosticoService} from "~/core/services/gruposDiagnostico.service";
import {ModalDialogService} from "nativescript-angular";
import {ActivatedRoute} from "@angular/router";
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {Frame} from "@nativescript/core/ui/frame";
import {Consultas} from "~/core/models/Consultas";
import {alert} from "ui/dialogs";
import {ConsultasService} from "~/core/services/consultas.service";

@Component({
  selector: "Recuerdos",
  moduleId: module.id,
  templateUrl: "./recuerdos.component.html",
  styleUrls: ['./recuerdos.component.css']
})
export class RecuerdosComponent implements OnInit {
  banderaSelect: boolean;
  idSelect: number;
  id = 0
  Elementos = []
  oldSelect: Label;
  ruta = "Tu ruta :"
  eventoEnvio: EventData;
  height = 250;

  onTap(args: EventData) {
    if (this.oldSelect == null) {
      this.oldSelect = args.object as Label
      let button = args.object as Label;
      button.className = "contSelect";
      this.idSelect = Number(button.id)
      this.eventoEnvio = args;
    } else {
      let button = args.object as Label;
      this.oldSelect.className = "conten";
      button.className = "contSelect";
      this.oldSelect = button;
      this.idSelect = Number(button.id)
      this.eventoEnvio = args;
    }
  }

  onTap2(args: EventData) {
    this.banderaSelect = true;
    this.onTap(args)
  }

  idEstres: number;
  idCausaEstres: number;

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private parametroService: ParametrosService, private modal: ModalDialogService, private vcRef: ViewContainerRef,
              private gruposDiagnosticoService: GruposDiagnosticoService, private parametrosService: ParametrosService, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);

    if (globals.causaFrm7 != undefined) {
      this.banderaSelect = true;
      let evento = globals.causaFrm7;
      let data = evento.object as Label
      this.idSelect = Number(data.id);
      this.eventoEnvio = globals.causaFrm7;
    } else {
      this.banderaSelect = false;
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

  ngOnInit(): void {
    const p = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_STRESS;
    this.parametrosService.list(p).toPromise().then(r => {
      //this.Elementos = r;
      this.Elementos[0] = {"id": 1, "idTpParametro": 0, "descripcion": "IMÁGENES", "alfanumerico": 0, "numerico": 0}

      this.Elementos[1] = {"id": 2, "idTpParametro": 0, "descripcion": "SONIDOS", "alfanumerico": 0, "numerico": 0}

      this.Elementos[2] = {
        "id": 3,
        "idTpParametro": 0,
        "descripcion": "SENSACIONES FÍSICAS",
        "alfanumerico": 0,
        "numerico": 0
      }
    });
    const currentPage = Frame.topmost().currentPage;
    console.log(currentPage.className);
    if (currentPage.className.includes('android360')) {
      this.height = 180;
    }
    if (currentPage.className.includes('android380')) {
      this.height = 200;
    }
    let fn = () => {
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
    fn();
  }


  img(item) {
    if (item.id == 1) {
      return "~/images/ojo.png"
    }
    if (item.id == 2) {
      return "~/images/bocina.png"
    }
    if (item.id == 3) {
      return "~/images/mano.png"
    }
  }

  continue() {
    this.globals.objReconocimiento.tpCerebero = String(this.idSelect);
    this.globals.causaFrm7 = this.eventoEnvio;
    this.routerExtensions.navigate(['/app/frm-8', this.idEstres, this.idCausaEstres])
  }


  flujo(arg) {
    if (arg == "a") {
      this.routerExtensions.backToPreviousPage();
    }

  }
}
