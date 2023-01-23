import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {ParametrosService} from '../../../core/services/parametros.service';
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from '@angular/router';
import {GruposDiagnosticoService} from '../../../core/services/gruposDiagnostico.service';
import {ModalCalidicacionAcComponent} from './modal_CalificacionAc/modal_calificacionAc.component'
import {Page} from "tns-core-modules/ui/page";
import {FlujoConsulta} from "~/core/models/FlujoConsulta";
import {Contenidos} from "~/core/models/Contenidos";
import {GlobalsUser} from "~/core/globals/globalsUser";
import {TNSPlayer} from 'nativescript-audio-player';
import {ContenidosService} from "~/core/services/contenidos.service";
import {S3ClientService} from "~/core/services/s3Client.service";
import {FlujoConsultaService} from "~/core/services/flujoConsulta.service";
import {ModalCalificacionSiComponent} from "./modal_CalificacionSi/calificacion.component"
import Theme from "@nativescript/theme";
import {ConsultasService} from "~/core/services/consultas.service";
import {environment} from "../../../../environments/environment";
import {Frame, topmost} from "@nativescript/core/ui/frame";
import {AudioService} from "~/core/services/audio.service";

@Component({
  selector: "Actividad",
  moduleId: module.id,
  templateUrl: "./actividad.component.html",
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit, OnDestroy {
  bandera: boolean;
  flujoConsulta: FlujoConsulta;
  id: number;
  contenido: Contenidos;
  base64: string;
  mimetype: string;
  url;
  imagen: string;
  flujo: FlujoConsulta;
  video;
  dominio = environment.apiEndpoint + "s3/"
  idCon: number;
  contenidoss: Contenidos[] = []
  aux: FlujoConsulta;
  pos: any;
  ready: boolean = false;
  isBusy: boolean = true;
  foto: string;
  Tpimagen: boolean;
  _player: TNSPlayer;
  getPlay: any;

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private parametroService: ParametrosService,
              private modal: ModalDialogService, private vcRef: ViewContainerRef, private page: Page, private vcRef2: ViewContainerRef,
              private gruposDiagnosticoService: GruposDiagnosticoService, public globals: GlobalsUser, private contenidoService: ContenidosService,
              private flujoConsultaService: FlujoConsultaService, public _audioService: AudioService) {
    Theme.setMode(Theme.Light);
    this.bandera = true
    this.page.actionBarHidden = true;
    this.ready = false
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
      this.imagen = params.imagen === undefined ? 'guitarra.png' : params.imagen;
      this.flujo = globals.flujo;
      this.idCon = params.idConsulta;
      this.contenidoss = globals.contenidos;
      this.pos = params.posicion;
    });

    this.contenidoService.get(this.id).toPromise().then(r => {
      this.contenido = r;
      const link = this.contenido.linkMovil !== null ? this.contenido.linkMovil : this.contenido.link;
      this.dominio += encodeURI(link);
      if (this.contenido.tpContenido == 4) {
        this.Tpimagen = true;
        this.isBusy = false;

        this.foto = `${environment.apiEndpoint}s3/${encodeURI(link)}`;
      }
      if (this.contenido.tpContenido == 5 || this.contenido.tpContenido == 3) {

        // this.getPlay = this._audioService.playEvent.subscribe((value) => {
        //   console.log(value) //when audio is playing, should say 'File is playing now'
        //
        //
        // });
        this._audioService.playAudio(this.dominio).then(() => {
          setTimeout(() => {
            this.ready = true;
            this.isBusy = false;
          }, 1500);
        });
        this.page.on('navigatingFrom', (data) => {
          if (this.getPlay) {
            this._audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');
            this._audioService.pausePlayer();
            this.getPlay.unsubscribe()  //unsubscribe from service emitter when exit the page--to avoid multiplying the subscription every time you go to this page
          }
        });
      }
    });
  }


  ngOnInit(): void {


  }

  ngOnDestroy() {
    this._audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');
    this.getPlay.unsubscribe()
    this._audioService.pausePlayer();
  }

  public togglePlay() {
    if (this._audioService.isAudioPlaying()) {
      this._audioService.pausePlayer();
    } else {
      this._audioService.play();
    }
  }

  showModal() {
    this._audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');

    if (this.contenido.tpContenido == 5 || this.contenido.tpContenido == 3) {
      this._audioService.pausePlayer();
    }

    if (this.flujo) {
      this.flujoConsulta = this.flujo;
      console.log("Ya esta calificada")
      this.routerExtensions.navigate(['/app/welcome'], {queryParams: {pageActive: 1}})
      //redirigue a mis actividades
    } else {
      this.flujoConsulta = new FlujoConsulta();
      this.flujoConsulta.fecha = new Date();
      this.flujoConsulta.idConsulta = this.idCon;
      this.flujoConsulta.idContenido = this.id;
      this.flujoConsulta.idTema = this.contenido.idTemaConsulta === null ?
        this.contenidoss.find(s => s.id === this.contenido.id).idTemaConsulta : this.contenido.idTemaConsulta;
      this.bandera = false;
      //------------------------ACTIVIDAD---------------------------------
      let opciones: ModalDialogOptions = {
        context: {},
        fullscreen: true,
        viewContainerRef: this.vcRef
      }
      this.ready = false;
      this.isBusy = false;
      this.Tpimagen = false;
      this.modal.showModal(ModalCalidicacionAcComponent, opciones).then(seleccion => {

        if (seleccion != 0 || seleccion != undefined) {
          let page = Frame.topmost().currentPage;
          if (page && page.modal) {
            page.modal.closeModal();
          }
          let refPage: Page = this.vcRef.injector.get(Page);
          this.flujoConsulta.calificacion = seleccion;
          this.flujoConsultaService.insert(this.flujoConsulta).toPromise().then(r => {
            this.flujoConsulta = r;
            this.flujoConsultaService.save(this.flujoConsulta).toPromise().then(async res => {
              this.aux = res;
              let cont = this.getContenido();
              this.vcRef.clear();
              let opciones2: ModalDialogOptions = {
                context: {
                  flujoConsulta: this.aux.id,
                  consulta: this.aux.idConsulta,
                  posicion: Number(this.pos),
                  contenidos: this.contenidoss,
                  contenido: cont
                },
                fullscreen: true,
                viewContainerRef: this.vcRef

              }

              console.log('va  a abrir segundo modal');
              // if(this.contenidoss !== undefined){
              console.log('contendios', cont);
              if (cont != undefined && cont.orden !== 0) {
                setTimeout(() => {
                  page.closeModal()
                  this.modal.showModal(ModalCalificacionSiComponent, opciones2).then(seleccion2 => {
                    console.log('esta fue la ellecion', seleccion2);
                    setTimeout(() => {
                      this.bandera = false;
                      this.routerExtensions.navigate(['/app/welcome'], {queryParams: {pageActive: 1}})
                    }, 100);
                  }).catch(err => {
                    console.error("error-->", err);
                  });
                }, 200);
              } else {
                setTimeout(() => {
                  this.bandera = false;
                  this.routerExtensions.navigate(['/app/welcome'], {queryParams: {pageActive: 1}})
                }, 100);
              }

            });
          });
        } else {
          console.log("no se hizo ninguna calificacionAC")
        }
      });
    }
    //setTimeout(() => {
    //	this.bandera = false;
    //	this.routerExtensions.navigate(['/app/calificacion'])
    //}, 10);
  }

  getContenido() {

    if ((this.contenidoss as Contenidos[]) !== undefined) {
      for (let i = 0; i < this.contenidoss.length; i++) {
        if (this.contenidoss[i].id == this.contenido.id && this.globals.flujos[i] === undefined) {
          return this.contenidoss[i] as Contenidos
        }
      }
    } else {
      return this.contenido as Contenidos
    }

  }


  goActividades() {
    this._audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');
    this.routerExtensions.navigate(['/app/welcome'], {queryParams: {pageActive: 1}})
  }
}
