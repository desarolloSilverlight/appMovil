import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ContenidosService} from "~/core/services/contenidos.service";
import {environment} from "../../../../../environments/environment";
import {TNSPlayer} from 'nativescript-audio-player';
import {Contenidos} from "~/core/models/Contenidos";
import {Page} from "tns-core-modules/ui/page";

import {RouterExtensions} from "nativescript-angular";
import {registerElement} from "nativescript-angular/element-registry";
import {Video} from 'nativescript-videoplayer';
import {AudioService} from "~/core/services/audio.service";
import {Frame} from "tns-core-modules/ui/frame";

// registerElement("VideoPlayer", () => Video);


registerElement("VideoPlayer", () => Video);

@Component({
  selector: "Actreconocimiento",
  moduleId: module.id,
  templateUrl: "./actReconocimiento.component.html",
  styleUrls: ['./actReconocimiento.component.css']
})
export class ActreconocimientoComponent implements OnInit, AfterViewInit {

  titulos = [
    {
      title: 'Neurociencias'
    },
    {
      title: 'Anti Estres General'
    },
    {
      title: 'Potenciando tu Cerebro'
    }
  ];


  Elementos = [{
    titulo: 'Capacidad de Cambio',
    conte: 'video',
    video: 'G0 F5  CAPACIDAD DE CAMBIO.mp4',
    tipo: 'VIDEO',
    ruta: 'video.png'
  },
    {
      titulo: 'Orígenes Oriental / Occidental',
      conte: 'G0 D10 .jpg',
      tipo: 'GRÁFICO',
      ruta: 'grafico.png'
    },
    {
      titulo: 'Cambio desde la mente',
      conte: 'G0 D10b .jpg',
      tipo: 'GRÁFICO',
      ruta: 'grafico.png'
    },
    {
      titulo: 'Conexión Mente - Cuerpo',
      conte: 'video',
      video: 'G0_F10A_CONEXION_MENTE_CUERPO.mp4',
      tipo: 'VIDEO',
      ruta: 'video.png'
    },
    {
      titulo: 'Causas en la infancia',
      conte: 'video',
      video: 'GO_F10B_EL_PODER_DE_LA_NINEZ.mp4',
      tipo: 'VIDEO',
      ruta: 'video.png'
    }
  ];

  Elementos1 = [
    {
      titulo: 'Urgencias',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10005
    },
    {
      titulo: 'AONC ',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10006
    },
    {
      titulo: 'Star Trek',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10007
    },
    {
      titulo: 'Bienestar General',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10008
    }
  ];
  Elementos2 = [
    {
      titulo: 'Smart Relax',
      conte: 'video',
      video: 'G0_F10C_APRENDE_A_RELAJARTE.mp4',
      tipo: 'VIDEO',
      ruta: 'video.png'
    },
    {
      titulo: 'Mejora tu conexión Mente - Cuerpo',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10020
    },
    {
      titulo: 'Mejora tu capacidad de visualizar',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10009
    },
    {
      titulo: 'Observa tu historia',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10010
    }
  ];
  _player: TNSPlayer;
  idActividad;
  Elemento;
  foto: string;
  dominio = environment.apiEndpoint + "s3/";
  Tpimagen;
  id;
  isBusy: boolean = true;
  ready: boolean;
  Titulo: string;
  contenido: Contenidos;
  imagen: string;
  Tpaudio: boolean = false;
  Tpvideo: boolean = false;
  video: string;
  getPlay;

  constructor(private routerExtensions: RouterExtensions, private page: Page, private actRoute: ActivatedRoute,
              private contenidoService: ContenidosService, public audioService: AudioService) {
    this.actRoute.params.subscribe(params => {
      this.Elemento = params.id;
      this.idActividad = params.idact;
    });


    this.page.actionBarHidden = true;
    this.Titulo = this.titulos[this.Elemento].title;
    let actividad;
    if (this.Elemento == "0") {
      actividad = this.Elementos[this.idActividad]
    }
    if (this.Elemento == "1") {
      actividad = this.Elementos1[this.idActividad]
    }
    if (this.Elemento == "2") {
      actividad = this.Elementos2[this.idActividad]
    }


    if (actividad.tipo == "GRÁFICO") {
      this.foto = "~/images/" + actividad.conte;
      console.log(this.imagen)
      this.Tpimagen = true;
      this.isBusy = false;
    }
    if (actividad.tipo == "AUDIO") {
      this.contenidoService.get(actividad.id).toPromise().then(r => {
        this.contenido = r;
        this.dominio += encodeURI(this.contenido.link);
        console.log(this.dominio, "           ", actividad.id, "        ", this.contenido)
        /*this._player = new TNSPlayer();
        this._player.debug = true;
        this._player
          .playFromUrl({
            audioFile: this.dominio,
            loop: false,
            completeCallback: this._trackComplete.bind(this),
            errorCallback: this._trackError.bind(this),
            autoPlay: true
          }).then(() => {
          this._player.getAudioTrackDuration().then(duration => {
            // iOS: duration is in seconds
            // Android: duration is in milliseconds
            console.log(`song duration:`, duration);
            this.Tpaudio = true
            this.isBusy = false;
          });
        });*/
        this.getPlay = this.audioService.playEvent.subscribe((value) => {
          console.log(value) //when audio is playing, should say 'File is playing now'
          this.Tpaudio = true
          this.ready = true
          this.isBusy = false;
        });
        this.audioService.playAudio(this.dominio);
        this.page.on('navigatingFrom', (data) => {
          if (this.getPlay) {
            this.audioService.pausePlayer();
            this.getPlay.unsubscribe()  //unsubscribe from service emitter when exit the page--to avoid multiplying the subscription every time you go to this page
          }
        });
      });
    }
    if (actividad.tipo == "VIDEO") {
      this.video = this.dominio + encodeURI(actividad.video);

      console.log(this.video);
      this.Tpvideo = true
      this.isBusy = false;

    }
  }


  public togglePlay() {
    if (this._player.isAudioPlaying()) {
      this._player.pause();
    } else {
      this._player.play();
    }
  }

  private _trackComplete(args: any) {
    console.log('reference back to player:', args.player);
    // iOS only: flag indicating if completed succesfully
    console.log('whether song play completed successfully:', args.flag);
  }

  private _trackError(args: any) {
    console.log('reference back to player:', args.player);
    console.log('the error:', args.error);
    // Android only: extra detail on error
    console.log('extra info on the error:', args.extra);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   const video = (this.page.getViewById('video-player') as Video);
    //   video.setMode('LANDSCAPE', true);
    //   console.log((this.page.getViewById('video-player') as Video).getVideoSize());
    // }, 2000)
    try{
    const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
    video.headers = new Map<string, string>();
    video.headers.set('hola', 'mundo');
    video.src = this.video;
    video.play();
    console.log(video);
    }catch (e) {
      console.log(e);
    }
  }

  cerrar() {
    this.audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');
    if (this._player.isAudioPlaying()) {
      this._player.pause();
    }
    this.routerExtensions.navigate(['/app/welcome'])
  }
}
