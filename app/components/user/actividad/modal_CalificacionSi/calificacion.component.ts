import {Component, OnInit} from '@angular/core'
import {ModalDialogParams, RouterExtensions} from 'nativescript-angular'
import {SbCausasEstresService} from '../../../../core/services/sbCausasEstres.service'
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {Parametros} from '../../../../core/models/Parametros';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {UsrPartCuerpoService} from '../../../../core/services/usrPartCuerpo.service'
import {UsrPartCuerpo} from '~/core/models/UsrPartCuerpo'
import {CalCuerpoFlujo} from '~/core/models/CalCuerpoFlujo'
import {CalCuerpoFlujoService} from '~/core/services/calCuerpoFlujo.service'
import {Contenidos} from '~/core/models/Contenidos'
import {ContenidosAddConsulta} from '~/core/models/ContenidosAddConsulta'
import {ContenidosAddConsultaService} from '~/core/services/contenidosAddConsulta.service'
import {ConsultasService} from '~/core/services/consultas.service'
import {alert} from "tns-core-modules/ui/dialogs";

@Component({
  selector: "Calificacion",
  templateUrl: "./calificacion.component.html",
  styleUrls: ['./calificacion.component.css']
})
export class ModalCalificacionSiComponent implements OnInit {


  id = ['b', 't', 'f', 'e'];
  partes: Parametros[] = [];
  calificaciones = [];
  cantidadP: number [] = [];

  constructor(private routerExtensions: RouterExtensions, private modal: ModalDialogParams, private sbCausasSerive: SbCausasEstresService, private parametrosService: ParametrosService, private usrPartCuerpoService: UsrPartCuerpoService, private calCuerpoFlujoService: CalCuerpoFlujoService,
              private contenidosAddConsultaService: ContenidosAddConsultaService, private consultaSevice: ConsultasService) {

  }

  public close() {
    this.modal.closeCallback()
  }

  ngOnInit(): void {
    console.log("entro a calidicacionesssssss")
    const usrPartCuerpo = new UsrPartCuerpo();
    usrPartCuerpo.idConsulta = this.modal.context.consulta;
    console.log("estas son las partes --->", this.modal.context.consulta)
    this.usrPartCuerpoService.list(usrPartCuerpo).toPromise().then(r => {
      this.cantidadP.push(0)
      console.log("esto es rrrrrrrrrrrrrrrr ->", r)
      r.forEach(p => {
        this.parametrosService.get(p.idPartCuerpo).toPromise().then(res => {
          console.log("esto es res ->", res)
          this.partes.push(res);
          this.calificaciones.push({idcuerpo: p.id, calificacion: 0});
        });
      });
      console.log("estas son las partes --->", this.partes)
      console.log("estas son las calificaciones --->", this.calificaciones)
    });
  }


  async next() {
    const resp = this.calificaciones.filter(r => r.calificacion === 0);
    if (resp.length === 0) {
      console.log("LEGOOO 55555555")
      for (const s of this.calificaciones) {
        const cal = new CalCuerpoFlujo();
        cal.calificacion = s.calificacion;
        cal.idPartCuerpo = s.idcuerpo;
        cal.idConsulta = this.modal.context.consulta;
        cal.idFlujoConsulta = this.modal.context.flujoConsulta;
        await this.calCuerpoFlujoService.insert(cal).toPromise();
      }
      let count = 0;
      for (const calif of this.calificaciones) {
        count += calif.calificacion;
      }
      const result = count / this.calificaciones.length;
      console.log('promedio --->', result);
      console.log(this.modal.context.contenido)
      if (result < 1.5 && (this.modal.context.contenido as Contenidos).orden2 === 1) {
        const contenidoAdd = new ContenidosAddConsulta();
        contenidoAdd.idConsulta = this.modal.context.consulta;
        contenidoAdd.idContenido = 10000;
        if (this.modal.context.posicion !== undefined) {
          contenidoAdd.orden = this.modal.context.contenido.orden + 0.5
        } else {
          contenidoAdd.orden = 1.5
        }

        console.log('poision--->', this.modal.context.posicion, 'orden', contenidoAdd.orden);
        if (this.modal.context.contenidos !== undefined && this.modal.context.contenidos[this.modal.context.posicion].id !== 10000) {
          await this.contenidosAddConsultaService.insert(contenidoAdd).toPromise();
        }
        if (this.modal.context.contenidos === undefined) {
          await this.contenidosAddConsultaService.insert(contenidoAdd).toPromise();
        }
        this.consultaSevice.generarRuta(this.modal.context.consulta).toPromise().then();

        this.modal.closeCallback()
      } else {
        this.consultaSevice.generarRuta(this.modal.context.consulta).toPromise().then();
        if (result < 1.5 && (this.modal.context.contenido as Contenidos).id === 10000) {
          alert({
            title: 'Felicidades',
            message: 'Ya puedes ir a solucionar otra de tus causas de estres',
            okButtonText: 'Regresar'
          }).then(() => {
            this.routerExtensions.navigateByUrl('/app/welcome');
            this.modal.closeCallback();
          });
        } else {
          this.modal.closeCallback()
        }

      }
    }
  }


  onTap(args: EventData, id: string): void {
    let button = args.object as Label;
    console.log("metenia en la parte : " + id + " con la calificacion " + button.id)
    this.calificaciones[id].calificacion = Number(button.id);
    this.cantidadP[id] = Number(button.id);
  }
}
