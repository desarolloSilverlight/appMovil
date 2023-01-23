import {Component, OnInit} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../core/services/parametros.service';
import {RouterExtensions} from "nativescript-angular";
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {TemasConsulta} from '../../../core/models/TemasConsulta';
import {TemasConsultaService} from '../../../core/services/temasConsulta.service';
import {GruposDiagnostico} from '../../../core/models/GruposDiagnostico';
import {GruposDiagnosticoService} from '../../../core/services/gruposDiagnostico.service';
import {GlobalsUser} from "~/core/globals/globalsUser";
import Theme from "@nativescript/theme";
import {Consultas} from "~/core/models/Consultas";
import {alert} from "ui/dialogs";
import {ConsultasService} from "~/core/services/consultas.service";

@Component({
  selector: "Opciones",
  templateUrl: "./opciones.component.html",
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  idSelect: string;
  idEstres: string;
  idCausaEstres: number
  Elementos: TemasConsulta [] = [];
  ruta = "Tu ruta: ";
  tema: TemasConsulta;
  banderaSelect: boolean;
  eventoEnvio: EventData;

  constructor(private routerExtensions: RouterExtensions, private parametroService: ParametrosService, private actRoute: ActivatedRoute, private temasConsultaService: TemasConsultaService,
              private gruposDiagnosticoService: GruposDiagnosticoService, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    Theme.setMode(Theme.Light);


    if (globals.causaFrm3 != undefined) {
      this.banderaSelect = true;
      let evento = globals.causaFrm3;
      let data = evento.object as Label
      this.idSelect = data.id;
      this.eventoEnvio = globals.causaFrm3;
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
    const temaConsulta = new TemasConsulta();
    temaConsulta.snHab = true;
    temaConsulta.idGrupo = this.idCausaEstres;
    this.temasConsultaService.list(temaConsulta).toPromise().then(r => {
      r.forEach(element => {
        this.Elementos.push(element)
      });
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

  onTap(args: EventData) {
    let button = args.object as Label;
    this.idSelect = button.id
    this.eventoEnvio = args;
  }

  onTap2(args: EventData) {
    this.banderaSelect = true;
    this.onTap(args)
  }


  continue() {
    const temaConsulta = new TemasConsulta();
    temaConsulta.id = this.idCausaEstres;
    this.temasConsultaService.get(temaConsulta.id).toPromise().then(r => {
      this.tema = r;
      this.tema.id = this.idCausaEstres;
      this.globals.temaConsulta = this.tema;
      this.globals.causaFrm3 = this.eventoEnvio;
      this.routerExtensions.navigate(['/app/frm-4', this.idEstres, this.idSelect])
    });
  }

  flujo(arg) {
    if (arg == "a") {
      this.routerExtensions.backToPreviousPage();
    }
  }
}
