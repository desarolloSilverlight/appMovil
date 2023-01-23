import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
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
import {isAndroid} from "platform";
import * as application from "application";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {Menu} from "nativescript-menu";
import {Frame} from "@nativescript/core/ui/frame";
import {AudioService} from "~/core/services/audio.service";
import {exit} from 'nativescript-exit';
import {typeLogging} from "~/core/models/UserLog";

@Component({
  selector: "Welcome",
  moduleId: module.id,
  templateUrl: "./welcome.component.html",
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
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
  items = [{
    label: 'Inicio', callback: () => {
      this.botonNav.nativeElement.selectedIndex = 0;
    }
  }, {
    label: 'Mis actividades', callback: () => {
      this.botonNav.nativeElement.selectedIndex = 1;

    }
  }, {
    label: 'Mi Historia', callback: () => {
      this.botonNav.nativeElement.selectedIndex = 2;
    }
  }, {
    label: 'Salir', callback: () => {
      this.authService.saveLog(typeLogging.logout);
      exit();
    }
  }];
  @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
  @ViewChild('botonNav', {static: false})
  private botonNav: ElementRef<BottomNavigation>;
  private pageActive: number = this.actRoute.snapshot.queryParams.pageActive;

  height = 150;
  heightBox = 180;
  heightBox2 = 150;


  MostrarMenu() {
    if (this.bandera) {
      this.bandera = false
      this.drawerComponent.sideDrawer.showDrawer();
    } else {
      this.drawerComponent.sideDrawer.closeDrawer();
      this.bandera = true
    }
  }


  constructor(private authService: AuthService,
              private globals: GlobalsUser, private consultatesService: ConsultantesService, private page: Page,
              private s3Service: S3ClientService, private consultaService: ConsultasService,
              private consultanteService: ConsultantesService, private flujoConsultaService: FlujoConsultaService,
              private parametroService: ParametrosService, private routerExtensions: RouterExtensions,
              private actRoute: ActivatedRoute, private _audioService: AudioService) {
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
    this._audioService.playEvent.subscribe(value => {
      console.log('event emitter ---->', value);
      console.log(this.routerExtensions.router.url);
      if (this.routerExtensions.router.url === '/app/welcome?pageActive=1') {
        this._audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');
      }
      if (value == true) {
        this._audioService.pausePlayer();
      }
    })
    if (isAndroid) {
      application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        data.cancel = true;
      });
    }
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

        this.setInitForm();
        if (this.pageActive !== undefined) {
          this.botonNav.nativeElement.selectedIndex = this.pageActive;
        }
        Object.keys(this.tpEstres).forEach(p => {
          this.parametroService.get(p).toPromise().then(r => {
            this.tpEstres[p] = r.descripcion;
          });
        });
        const consulta = new Consultas();
        consulta.idConsultante = r.idConsultante;
        consulta.status = 'P';
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
          return m.filter(s => s.status === 'P');
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
      this.heightBox2 = 100;
    }
  }

  executeEvent(item) {
    this.MostrarMenu();
    item.callback();

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
    if (posicion > flujos.length) {
      return;
    }
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

  showPopupMenu(event) {
    console.log(event);
    Menu.popup({
      view: this.page.getViewById(event),
      actions: ['Actualizar datos', 'Cambiar contraseña', 'Cerrar Sesion']
    }).then(action => {
      switch (action.id) {
        case 0:
          console.log('Actualizando datos');
          this.routerExtensions.navigate(['/app/configuracion']);
          break;
        case 1:
          console.log('Actualizando password');
          this.routerExtensions.navigate(['/app/password-update']);
          break;
        case 2:
          this.authService.saveLog(typeLogging.logout);
          this.routerExtensions.navigate(['/login']);
          break;
      }
    }).catch(console.log);
  }

  borrarActividad(idRuta: number) {
    this.consultaService.borrarRuta(idRuta).toPromise().then(r => {
      this.ngOnInit();
    });
  }
}
