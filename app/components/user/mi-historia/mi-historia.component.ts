import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SegmentedBar, SegmentedBarItem} from "tns-core-modules/ui/segmented-bar";
import {ViewChild} from "@angular/core";
import {RadSideDrawerComponent, SideDrawerType} from "nativescript-ui-sidedrawer/angular";
import {AuthService} from '../../../core/services/auth.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {Consultantes} from '../../../core/models/Consultantes';
import {S3ClientService} from '../../../core/services/s3Client.service';
import {Page} from "tns-core-modules/ui/page";
import {ConsultasService} from "~/core/services/consultas.service";
import Theme from "@nativescript/theme";
import {ParametrosService} from "~/core/services/parametros.service";
import {Consultas} from "~/core/models/Consultas";
import {map} from "rxjs/operators";
import {FlujoConsultaService} from "~/core/services/flujoConsulta.service";
import {FlujoConsulta} from "~/core/models/FlujoConsulta";
import {RouterExtensions} from "nativescript-angular";
import {Contenidos} from "~/core/models/Contenidos";
import {BottomNavigation} from "@nativescript/core";
import {ActivatedRoute} from "@angular/router";
import {Frame} from "@nativescript/core/ui/frame";

@Component({
  selector: "mi-historia",
  moduleId: module.id,
  templateUrl: "./mi-historia.component.html",
  styleUrls: ['./mi-historia.component.css']
})
export class MiHistoriaComponent implements OnInit {
  Elementos = []
  idConsulta: number;
  bandera: boolean = true
  bandera2: boolean;
  consultante: Consultantes = new Consultantes()
  nombre: string = "";
  nombreC: string = "";
  apellido: string = "";
  tpEstres = {145: '', 146: '', 147: ''};
  isBusy: boolean = true;
  consultas: Consultas[] = [];
  @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
  @ViewChild('botonNav', {static: false})
  private botonNav: ElementRef<BottomNavigation>;
  private pageActive: number = this.actRoute.snapshot.queryParams.pageActive;
  height = 150;
  heightBox = 180;

  @Output()
  mostrarMenuEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  showPopUpEvent: EventEmitter<any> = new EventEmitter<any>();

  MostrarMenu() {
    this.mostrarMenuEvent.emit();
  }

  showPopupMenu() {
    this.showPopUpEvent.emit();
  }


  constructor(private authService: AuthService,
              private globals: GlobalsUser, private consultatesService: ConsultantesService, private page: Page,
              private s3Service: S3ClientService, private consultaService: ConsultasService,
              private consultanteService: ConsultantesService, private flujoConsultaService: FlujoConsultaService,
              private parametroService: ParametrosService, private routerExtensions: RouterExtensions,
              private actRoute: ActivatedRoute) {
    this.page.actionBarHidden = true;
    Theme.setMode(Theme.Light);
    this.globals.causaFrm2 = undefined;
    this.globals.causaFrm3 = undefined;
    this.globals.causaFrm4 = [];
    this.globals.causaFrm4View = false;
    this.globals.causaFrm5 = [];
    this.globals.causaFrm5View = false;
    this.globals.causaFrm6 = [];
    this.globals.causaFrm6View = false;
    this.globals.causaFrm7 = undefined;
    this.globals.causaFrm8 = undefined;
  }


  ngOnInit(): void {
    Theme.setMode(Theme.Light);
    this.authService.protected().toPromise().then(r => {
      this.globals.claimsUser = r;
      this.consultante.id = r.idConsultante;
      this.consultatesService.list(this.consultante).toPromise().then(resp => {
        //this.consultatesService.list(Consultantes2).toPromise().then(resp=>{
        if (resp.length > 0) {
          this.globals.consultante = resp[0];
          this.consultante.nombre = resp[0].nombre;
          this.consultante.apellidos = resp[0].apellidos;
          this.consultante.email = resp[0].email;
          this.consultante.idEmpresa = resp[0].idEmpresa;
          this.consultante.apellidos = resp[0].apellidos;
          this.consultante.primerIngreso = resp[0].primerIngreso;
        }

        // this.setInitForm();
        // if (this.pageActive !== undefined) {
        //   this.botonNav.nativeElement.selectedIndex = this.pageActive;
        // }
        Object.keys(this.tpEstres).forEach(p => {
          this.parametroService.get(p).toPromise().then(r => {
            this.tpEstres[p] = r.descripcion;
          });
        });
        const consulta = new Consultas();
        consulta.idConsultante = r.idConsultante;
        consulta.status = 'F';
        this.consultaService.listVi(consulta).pipe(map(m => {
          for (const s of m) {
            s.tema.grupo.ruta = `${this.tpEstres[s.tema.grupo.idtpEstres]} / ${s.tema.grupo.descripcion2}`;
            // const contenidos = Object.assign([], s.contenidos);
            // for (let i = 0; i < s.tema.nRepeticiones - 1; i++) {
            //   s.contenidos.push(...contenidos);
            // }
            s.contenidos.sort((a, b) => a.orden - b.orden);
            if (s.status === 'F') {
              const faltantes = s.total - s.contestadas;
              s.total = s.contestadas;
              for (let i = 0; i < faltantes; i++) {
                s.contenidos.pop();
              }
            }
          }
          return m.filter(s => s.status === 'F');
        })).toPromise().then(resp => {
          this.consultas = resp;
          setTimeout(() => {
            this.consultas.forEach(con => {
              const flujoConsulta = new FlujoConsulta();
              flujoConsulta.idConsulta = con.id;
              this.flujoConsultaService.list(flujoConsulta).toPromise().then(r => {
                con.flujos = r;
              });

              let x: number = con.contestadas;
              x = (x * 100) / con.total;
              this.isBusy = false;
            });
          }, 100);
        });
      })
    });
    const currentPage = Frame.topmost().currentPage;
    console.log(currentPage.className);
    if (currentPage.className.includes('android360')) {
      this.height = 80;
      this.heightBox = 120;
    }
  }

  setInitForm() {
    this.nombre = this.consultante.nombre;
    this.apellido = this.consultante.apellidos;
    this.nombreC = this.nombre + " " + this.apellido
    //this.nombreC= "Miguel Hernandez"

  }

  setFrom() {
    this.consultante.nombre = this.nombre;
    this.consultante.apellidos = this.apellido;
  }


  continue(id: number, flujo: FlujoConsulta, posicion: number, contenidos: Contenidos[], idConsulta: number, flujos: FlujoConsulta[]) {
    const imagen = 'guitarra.png';
    contenidos.filter(s => s.idTemaConsulta === null).forEach(m => {
      m.idTemaConsulta = contenidos.filter(s => s.idTemaConsulta !== null)[0].idTemaConsulta;
    });
    this.globals.contenidos = contenidos;
    this.globals.flujo = flujo;
    console.log('flujos', flujos)
    this.globals.flujos = flujos;
    //this.routerExtensions.navigate(['/app/actividad',id,posicion,idConsulta,imagen])
    this.routerExtensions.navigate(['/app/actividad', id, posicion, idConsulta, imagen])
  }
}
