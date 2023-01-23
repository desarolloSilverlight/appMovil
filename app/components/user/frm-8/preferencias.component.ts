import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../core/services/parametros.service';
import {Parametros} from '../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../core/constants/Parametros';
import {RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from "@angular/router";
import {GruposDiagnosticoService} from "~/core/services/gruposDiagnostico.service";
import {UsrCausaEstresService} from "~/core/services/usrCausaEstres.service";
import {UsrPartCuerpoService} from "~/core/services/usrPartCuerpo.service";
import {GlobalsUser} from "~/core/globals/globalsUser";
import {UsrCausaEstres} from "~/core/models/UsrCausaEstres";
import {UsrPartCuerpo} from "~/core/models/UsrPartCuerpo";
import {ConsultantesService} from "~/core/services/consultantes.service";
import {Contenidos} from "~/core/models/Contenidos";
import {Consultas} from "~/core/models/Consultas";
import {ConsultasService} from "~/core/services/consultas.service";
import {ContenidosService} from "~/core/services/contenidos.service";
import Theme from "@nativescript/theme";
import {alert} from "ui/dialogs";
import {Frame} from "@nativescript/core/ui/frame";

@Component({
  selector: "Preferencias",
  moduleId: module.id,
  templateUrl: "./preferencias.component.html",
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {
  banderaSelect: boolean;
  idSelect: number;
  id = 0
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

  idEstres: number;
  idCausaEstres: number;
  ruta = "Tu ruta :"

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private parametroService: ParametrosService, private vcRef: ViewContainerRef,
              private gruposDiagnosticoService: GruposDiagnosticoService, private parametrosService: ParametrosService, private usrCausaEstresService: UsrCausaEstresService,
              public globals: GlobalsUser,
              private usrPartCuerpoService: UsrPartCuerpoService, private consultanteService: ConsultantesService, private consultaService: ConsultasService,
              private contenidoService: ContenidosService) {
    Theme.setMode(Theme.Light);

    if (globals.causaFrm8 != undefined) {
      this.banderaSelect = true;
      let evento = globals.causaFrm8;
      let data = evento.object as Label
      this.idSelect = Number(data.id);
      this.eventoEnvio = globals.causaFrm8;
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
    const currentPage = Frame.topmost().currentPage;
    if (currentPage.className.includes('android360')) {
      this.height = 180;
    }
    if (currentPage.className.includes('android380')) {
      this.height = 200;
    }
    const p = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_STRESS;
    this.parametrosService.list(p).toPromise().then(r => {
      //this.Elementos = r;
      this.Elementos[0] = {
        "id": 1,
        "idTpParametro": 0,
        "descripcion": "Analizar casi todo de manera detallada",
        "alfanumerico": 0,
        "numerico": 0
      }

      this.Elementos[1] = {
        "id": 2,
        "idTpParametro": 0,
        "descripcion": "Orientarte por la intuición, los sentimientos y las emociones",
        "alfanumerico": 0,
        "numerico": 0
      }

      this.Elementos[2] = {
        "id": 3,
        "idTpParametro": 0,
        "descripcion": "Reaccionar rápido para anticiparse",
        "alfanumerico": 0,
        "numerico": 0
      }
    });
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
      return "~/images/calculadora.png"
    }
    if (item.id == 2) {
      return "~/images/corazon.png"
    }
    if (item.id == 3) {
      return "~/images/relog.png"
    }
  }

  continue() {
    for (let i = 0; i < this.globals.objReconocimiento.spCausas.length; i++) {
      const usrCausaEstres = new UsrCausaEstres();
      usrCausaEstres.idConsultante = this.globals.consultante.id;
      usrCausaEstres.idSbCausaEstres = this.globals.objReconocimiento.spCausas[i];
      usrCausaEstres.orden = i + 1;
      this.usrCausaEstresService.insert(usrCausaEstres).toPromise().then();
    }
    for (let i = 0; i < this.globals.objReconocimiento.partesCuerpo.length; i++) {
      const usrPartCuerpo = new UsrPartCuerpo();
      usrPartCuerpo.idPartCuerpo = this.globals.objReconocimiento.partesCuerpo[i];
      usrPartCuerpo.idZonaCuerpo = null;
      usrPartCuerpo.intensidadZona = this.globals.objReconocimiento.intensidadPC[i];
      usrPartCuerpo.orden = i + 1;
      this.usrPartCuerpoService.insert(usrPartCuerpo).toPromise().then();
    }
    const consultante = this.globals.consultante;
    consultante.tpCerebro = this.globals.objReconocimiento.tpCerebero;
    consultante.dVivir = String(this.idSelect);
    consultante.primerIngreso = false;
    this.consultanteService.save(consultante).toPromise().then(() => {
      const contenido = new Contenidos();
      contenido.orden = 0;
      contenido.idTemaConsulta = this.globals.temaConsulta.id;
      const consulta = new Consultas();
      consulta.idConsultante = this.globals.consultante.id;
      consulta.fecha = new Date();
      this.consultaService.insert(consulta).toPromise().then((r) => {
        for (let i = 0; i < this.globals.objReconocimiento.partesCuerpo.length; i++) {
          const usrPartCuerpo = new UsrPartCuerpo();
          usrPartCuerpo.idPartCuerpo = this.globals.objReconocimiento.partesCuerpo[i];
          usrPartCuerpo.idZonaCuerpo = null;
          // usrPartCuerpo.intensidadZona = Number(this.globals.objReconocimiento.intensidad[i].split(',')[1]);
          usrPartCuerpo.intensidadZona = this.globals.objReconocimiento.intensidadPC[i];
          usrPartCuerpo.orden = i + 1;
          usrPartCuerpo.idConsulta = r.id;
          this.usrPartCuerpoService.insert(usrPartCuerpo).toPromise().then();
        }

        for (let i = 0; i < this.globals.objReconocimiento.spCausas.length; i++) {
          const usrCausaEstres = new UsrCausaEstres();
          usrCausaEstres.idConsultante = this.globals.consultante.id;
          usrCausaEstres.idSbCausaEstres = this.globals.objReconocimiento.spCausas[i];
          usrCausaEstres.orden = i + 1;
          usrCausaEstres.idConsulta = r.id;
          this.usrCausaEstresService.insert(usrCausaEstres).toPromise().then();
        }
        this.globals.consulta = r;
        this.contenidoService.list(contenido).toPromise().then(res => {
          this.routerExtensions.navigate(['/app/actividad', res[0].id, 0, r.id])
        });
      });
    });
  }

  flujo(arg) {
    if (arg == "a") {
      if (this.idSelect != undefined) {
        this.globals.causaFrm8 = this.eventoEnvio;
        this.routerExtensions.backToPreviousPage();
      } else {
        this.routerExtensions.backToPreviousPage();
      }

    }
  }
}
		
		
	
