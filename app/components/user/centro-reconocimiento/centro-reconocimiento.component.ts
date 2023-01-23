import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { Label } from "tns-core-modules/ui/label";
import { ModalDialogOptions } from "nativescript-angular";
import { ModalDialogService } from "nativescript-angular";
import { ModalCuerpoComponent } from '../frm-5/modal_cuerpo.component'
import { from } from "rxjs";
import { RouterExtensions } from "nativescript-angular";
@Component({
  selector: "CentroReconocimiento",
  moduleId: module.id,
  templateUrl: "./centro-reconocimiento.component.html",
  styleUrls: ['./centro-reconocimiento.component.css']
})
export class CentroReconocimientoComponent implements OnInit {

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
  
  constructor(private routerExtensions: RouterExtensions,private page: Page, private vcRef: ViewContainerRef, private modal: ModalDialogService) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }
  
  continue(idActi, idElemento: EventData) {
    let idE = idElemento.object as Label;
    this.routerExtensions.navigate(['/app/actRecono',idE.id,idActi])
  }
}
