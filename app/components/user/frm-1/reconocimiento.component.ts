import {Component, OnInit} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '~/core/services/parametros.service';
import {Parametros} from '~/core/models/Parametros';
import {TP_PARAMETROS} from '~/core/constants/Parametros';
import {RouterExtensions} from "nativescript-angular";
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {alert} from "tns-core-modules/ui/dialogs";
import {Consultas} from "~/core/models/Consultas";
import {ConsultasService} from "~/core/services/consultas.service";
import {isAndroid} from "tns-core-modules/platform";
import {Frame} from "@nativescript/core/ui/frame";

@Component({
  selector: "Reconocimiento",
  moduleId: module.id,
  templateUrl: "./reconocimiento.component.html",
  styleUrls: ['./reconocimiento.component.css']
})
export class ReconocimientoComponent implements OnInit {


  idSelect: number;
  obj: EventData;
  id = 0
  Elementos = []
  oldSelect: Label;
  isAndroid = isAndroid;
  height = 230;

  onTap(args: EventData) {
    if (this.oldSelect == null) {
      this.oldSelect = args.object as Label
      let button = args.object as Label;
      button.className = "contSelect";
      this.idSelect = Number(button.id)
      this.obj = args;
    } else {
      let button = args.object as Label;
      this.oldSelect.className = "conten";
      button.className = "contSelect";
      this.oldSelect = button;
      this.idSelect = Number(button.id)
      this.obj = args;
    }
  }

  altura = 0

  constructor(private routerExtensions: RouterExtensions, private parametrosService: ParametrosService, public globals: GlobalsUser, private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);
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

  ngOnInit(): void {
    const p = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_STRESS;
    this.parametrosService.list(p).toPromise().then(r => {
      this.Elementos = r;
    });
    const currentPage = Frame.topmost().currentPage;
    console.log(currentPage.className);
    if (currentPage.className.includes('android360')) {
      this.height = 180;
    }
  }


  img(item) {
    if (item.id == 145) {
      return "~/images/economico.png"
    }
    if (item.id == 146) {
      return "~/images/tristeColorNegro.png"
    }
    if (item.id == 147) {
      return "~/images/amor.png"
    }
  }

  continue() {
    let options = {
      title: "Aviso",
      message: "Selecciona una por favor",
      okButtonText: "OK"
    };
    if (this.idSelect != undefined) {
      this.routerExtensions.navigate(['/app/frm-2', this.idSelect])
    } else {
      alert(options);
    }
  }

  goBack() {
    this.routerExtensions.router.navigateByUrl('/app/welcome');
  }
}
