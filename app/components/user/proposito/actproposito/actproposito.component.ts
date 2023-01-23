import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ContenidosService} from "~/core/services/contenidos.service";
import {environment} from "../../../../../environments/environment";
import {TNSPlayer} from 'nativescript-audio-player';
import {Contenidos} from "~/core/models/Contenidos";
import {Page} from "tns-core-modules/ui/page";
import {registerElement} from "nativescript-angular/element-registry";

registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);
import {RouterExtensions} from "nativescript-angular";
import {AudioService} from "~/core/services/audio.service";


class GenericContent {
  title: string;
  datos: TitulosDepro[];

}

class TitulosDepro {
  titulo: string;
  conte: string;
  tipo: string;
  video?: string;
  id?: string | number;
}

@Component({
  selector: "Actproposito",
  moduleId: module.id,
  templateUrl: "./actproposito.component.html",
  styleUrls: ['./actproposito.component.css']
})
export class ActpropositoComponent implements OnInit {
  video = '';
  titulosDepro: GenericContent[] = [
    {
      title: 'Para que naciste',
      datos: [
        {
          titulo: 'Video',
          conte: 'video',
          tipo: 'VIDEO',
          video: 'G9 F98  PARA QUE NACISTE.mp4',
          id: 10018
        }
      ]
    },
    {
      title: 'Pasión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D99 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          id: 10001,
          tipo: 'ACTIVIDAD',
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          id: 10002,
          tipo: 'ACTIVIDAD',
        }
      ]
    },
    {
      title: 'Misión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D100 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          id: 10011,
          tipo: 'ACTIVIDAD',
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          id: 10011,
          tipo: 'ACTIVIDAD',
        }
      ]
    },
    {
      title: 'Vocación',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D101 .jpg',
          tipo: 'GRAFICO',
          id: 10018
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10012
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10016
        }
      ]
    },
    {
      title: 'Profesión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D102 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10013
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10017
        }
      ]
    },
    {
      title: 'Valores',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D103 .jpg',
          tipo: 'GRAFICO',
          id: 10018
        },
        {
          titulo: 'Practica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10019
        }
      ]
    },
    {
      title: 'Visión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D104 .jpg',
          tipo: 'GRAFICO',
          id: 10018
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10014
        },
        {
          titulo: 'Practica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10018
        }
      ]
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
  duration = '';
  getPlay;

  constructor(private routerExtensions: RouterExtensions, private page: Page, private actRoute: ActivatedRoute,
              private contenidoService: ContenidosService, public audioService: AudioService) {
    this.actRoute.params.subscribe(params => {
      this.Elemento = params.id;
      this.idActividad = params.idact;
    });
    this.page.actionBarHidden = true;
    this.Titulo = this.titulosDepro[this.Elemento].datos[this.idActividad].titulo;
    let actividad = this.titulosDepro[this.Elemento].datos[this.idActividad]

    if (actividad.tipo == "GRAFICO") {
      this.foto = "~/images/" + actividad.conte;
      this.Tpimagen = true;
      this.isBusy = false;
    }
    if (actividad.tipo == "AUDIO" || actividad.tipo == "ACTIVIDAD") {
      this.contenidoService.get(actividad.id).toPromise().then(r => {
        this.contenido = r;
        this.dominio += encodeURI(this.contenido.link);
        /*console.log(this.dominio, "           ", actividad.id, "        ", this.contenido)
        this._player = new TNSPlayer();
        this._player.debug = true;
        this._player
          .playFromUrl(
            {
              audioFile: this.dominio,
              loop: false,
              completeCallback: this._trackComplete.bind(this),
              errorCallback: this._trackError.bind(this),
            }).then(() => {
          this._player.getAudioTrackDuration().then(duration => {
            // iOS: duration is in seconds
            // Android: duration is in milliseconds
            console.log(`song duration:`, duration);
            this.Tpaudio = true;
            this.duration = duration;
            this.isBusy = false;

          });
        });*/
        this.getPlay = this.audioService.playEvent.subscribe((value) => {
          console.log(value) //when audio is playing, should say 'File is playing now'
          this.ready = true;
          this.Tpaudio = true;
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

  ngOnInit(): void {
  }


  public togglePlay() {
    if (this.audioService.isAudioPlaying()) {
      this.audioService.pausePlayer();
    } else {
      this.audioService.play();
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

  cerrar() {
    this.audioService.playAudio('https://api-backend.zerostress.io/s3/no-audio.mp3');
    if (this._player.isAudioPlaying()) {
      this._player.pause();
    }
    this.routerExtensions.navigate(['/app/proposito'])
  }


}

