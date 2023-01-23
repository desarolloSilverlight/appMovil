import {Component, OnInit} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../core/services/parametros.service';
import {RouterExtensions} from "nativescript-angular";
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {GruposDiagnostico} from '../../../core/models/GruposDiagnostico';
import {GruposDiagnosticoService} from '../../../core/services/gruposDiagnostico.service';
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {Frame} from "@nativescript/core/ui/frame";
import {Consultas} from "~/core/models/Consultas";
import {alert} from "ui/dialogs";
import {ConsultasService} from "~/core/services/consultas.service";

@Component({
  selector: "Causaestres",
  moduleId: module.id,
  templateUrl: "./causaEstres.component.html",
  styleUrls: ['./causaEstres.component.css']
})

export class CausaestresComponent implements OnInit {

  constructor(private parametroService: ParametrosService, private actRoute: ActivatedRoute, private routerExtensions: RouterExtensions, private parametrosService: ParametrosService,
              private authService: AuthService,
              private gruposDiagnosticoService: GruposDiagnosticoService, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);
    if (globals.causaFrm2 != undefined) {
      this.banderaSelect = true;
      let evento = globals.causaFrm2;
      let data = evento.object as Label
      this.idSelect = Number(data.id);
      this.eventoEnvio = globals.causaFrm2;
    } else {
      this.banderaSelect = false;
    }


    this.actRoute.params.subscribe(params => {
      this.idEstre = params.idEstres;
      this.parametroService.get(this.idEstre).subscribe(resp => {
        this.ruta += resp.descripcion + " / ";
      })
    });
  }

  banderaSelect: boolean;
  ruta = "";
  Ruta2 = "Tu ruta";
  idEstre: number;
  idSelect: number;
  Elementos = []
  oldSelect: Label;
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


  ngOnInit(): void {
    const currentPage = Frame.topmost().currentPage;
    console.log(currentPage.className);
    if (currentPage.className.includes('android360')) {
      this.height = 180;
    }
    if (currentPage.className.includes('android380')) {
      this.height = 190;
    }
    const grupo = new GruposDiagnostico();
    grupo.idtpEstres = this.idEstre;
    this.gruposDiagnosticoService.list(grupo).toPromise().then(resp => {
      this.Elementos = resp;
    });
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

  /*
  ngOnInit(): void {
    this.gruposDiagnosticoService.list(new GruposDiagnostico()).toPromise().then(resp => {
      resp.forEach(element => {
        if (element.id<=4) {
          this.Elementos.push(element)
        }
      });
    });
  }
  **/
  img(item) {
    if (item.id == 1) {
      return "~/images/flech.png"
    }
    if (item.id == 2) {
      return "~/images/decisiones.png"
    }
    if (item.id == 3) {
      return "~/images/reconocimiento.png"
    }
    if (item.id == 4) {
      return "~/images/conflicto.png"
    }
    if (item.id == 5) {
      return "~/images/accident.png"
    }
    if (item.id == 6) {
      return "~/images/dinero.png"
    }
    if (item.id == 7) {
      return "~/images/covid.png"
    }
    if (item.id == 8) {
      return "~/images/muerte.png"
    }

  }

  continue() {
    let options = {
      title: "Aviso",
      message: "Selecciona una por favor",
      okButtonText: "OK"
    };
    if (this.idSelect != undefined) {
      this.parametroService.get(this.idEstre).subscribe(resp => {
        this.ruta = this.ruta + resp.descripcion + " / ";
        this.gruposDiagnosticoService.get(this.idSelect).toPromise().then(resp => {
          this.ruta += "/" + resp.descripcion2;
          this.globals.ruta = this.ruta;
          this.globals.causaFrm2 = this.eventoEnvio;
          this.routerExtensions.navigate(['/app/frm-3', this.idEstre, this.idSelect])
        });
      })
    } else {
      alert(options);
    }
  }

  flujo(arg) {
    if (arg == "a") {
      this.routerExtensions.backToPreviousPage();
    }
  }
}



