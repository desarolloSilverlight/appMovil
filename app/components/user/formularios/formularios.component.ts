import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view"

import {Formularios} from '../../../core/models/Formularios';
import {FormulariosService} from '../../../core/services/formularios.service';
import {PreguntasService} from '../../../core/services/preguntas.service';
import {Preguntas} from '../../../core/models/Preguntas';
import {Respuestas} from '../../../core/models/Respuestas';
import { RespuestasService } from '../../../core/services/respuestas.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {FormulariosGeneradosService} from '../../../core/services/formulariosGenerados.service';
import {FlujosFormulariosService} from '../../../core/services/flujosFormularios.service';
import {FlujosFormularios} from '../../../core/models/FlujosFormularios';
import {ReglasPregunta} from '../../../core/models/ReglasPregunta';
import {ReglasPreguntaService} from '../../../core/services/reglasPregunta.service';
import {FormulariosGenerados} from '../../../core/models/FormulariosGenerados';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from "nativescript-angular";
import Theme from "@nativescript/theme";
Theme.setMode(Theme.Light);


import { Slider } from "tns-core-modules/ui/slider";


@Component({
	selector: "Formularios",
	moduleId: module.id,
	templateUrl: "./formularios.component.html",
	styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

	
	onItemTap(args: ItemEventData): void {
		console.log('Item with index: ' + args.index + ' tapped');
  }


  
  selectedListPickerIndex: number = 0;

  
  onButtonTap(): void {
    if (this.pregunta.tpPregunta == 1) {
      console.log("entro click en boton")
      this.respuesta = this.respuestas2[this.selectedListPickerIndex];
      this.submit();
    } else { 
      this.submit();
    }
  }

    bandera: boolean = true
    dataBoundVariable :any

  onSliderValueChange(args) {
    let slider = <Slider>args.object;
    console.log(`Slider new value ${args.value}`);
    this.respuesta = args.value
  }



	idFormulario: number;
	idPregunta: number;
  formulario: Formularios = new Formularios();
 	pregunta: Preguntas = new Preguntas();
  respuestas: Respuestas[] = [];
  respuestas2: Array<string> = []
  submited = false;
	respuesta: any;

	nIntentBuscarPregunta = 0;

	
  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute, private formularioService: FormulariosService, private preguntaService: PreguntasService, private respuestaService: RespuestasService,

    private globals: GlobalsUser,

    private formularioGeneradoService: FormulariosGeneradosService, private flujoFormularioService: FlujosFormulariosService,
    private reglasPreguntaService: ReglasPreguntaService) {
    
    this.actRoute.params.subscribe(params => {
      this.idFormulario = params.id;
      this.idPregunta = params.idPregunta;
      this.formularioService.get(this.idFormulario).toPromise().then(r => {
        this.formulario = r;
        this.globals.formulario = r;
        if (this.idPregunta === undefined) {
          const formularioGen = new FormulariosGenerados();
          formularioGen.idFormulario = this.idFormulario;
          formularioGen.usuario = this.globals.claimsUser.identity;
          formularioGen.fecha = new Date();
          this.formularioGeneradoService.insert(formularioGen).toPromise().then(res => {
            this.globals.formularioGenrado = res;
            console.log("para ver:  ",res)
          });
          const p = new Preguntas();
          p.idFormulario = this.idFormulario;
          p.orden = 1;
          this.preguntaService.list(p).toPromise().then(res => {
          this.routerExtensions.navigate(['/app/formulario/' + this.idFormulario + '/' + res[0].id])
          });
        }
      });
    });
    this.ngOnInit();
  }

  ngOnInit(): void {
    if (this.idPregunta === undefined) {
      return;
    }
    this.preguntaService.get(this.idPregunta).toPromise().then(r => {
      console.log("esto grae rrrrrrrrrr :" + r)
      console.log("esto grae rrrrrrrrrr2 :" + this.idPregunta)
      this.pregunta = r;
      const respuesta = new Respuestas();
      respuesta.idPregunta = this.idPregunta;
      this.respuestaService.list(respuesta).toPromise().then(res => {
        this.respuestas2 = []
        res.forEach(element => {
          console.log(element.descripcion)
          this.respuestas2.push(String(element.descripcion))
        });
        this.respuestas = res.sort((a, b) => {
          return a.orden - b.orden;
        });
      });
    });
	}
	
	
submit() {
  this.submited = true;
  console.log(this.respuesta)
    if (this.respuesta != null) {
      const flujoFormulario = new FlujosFormularios();
      if (this.pregunta.tpPregunta === 1) {
        const respuesta: Respuestas = this.respuesta;
        flujoFormulario.fecha = new Date();
        flujoFormulario.idFormularioGenerador = this.globals.formularioGenrado.id;
        flujoFormulario.idRespuesta = respuesta.id;
        flujoFormulario.idTransaccion = respuesta.retornaA;
        flujoFormulario.puntaje = respuesta.puntaje;
        this.flujoFormularioService.insert(flujoFormulario).toPromise().then();
        if (respuesta.retornaA == null) {
            console.log("entro al primer al verdad")
          this.buscarPregunta(this.pregunta.orden + 1);
        } else {
            console.log("entro al primer al falso")
          this.redireccion(respuesta.retornaA, respuesta.idRetornaA);
        }
      } else {
        flujoFormulario.fecha = new Date();
        flujoFormulario.idFormularioGenerador = this.globals.formularioGenrado.id;
        flujoFormulario.puntaje = this.respuesta;
        this.flujoFormularioService.insert(flujoFormulario).toPromise().then();
        const reglasPregunta = new ReglasPregunta();
        reglasPregunta.idPregunta = this.pregunta.id;
        this.reglasPreguntaService.list(reglasPregunta).toPromise().then(resp => {
          const condicionesIguales = resp.filter(r => r.tpCondicion === '=');
          for (const cond of condicionesIguales) {
            if (flujoFormulario.puntaje === Number(cond.valor)) {
              this.redireccion(cond.retornaA, cond.idRetornaA);
              return;
            }
          }
          const condicionesMenores = resp.filter(r => r.tpCondicion === '<');
          for (const cond of condicionesMenores) {
            if (flujoFormulario.puntaje < Number(cond.valor)) {
              this.redireccion(cond.retornaA, cond.idRetornaA);
              return;
            }
          }
          const condicionesMeyores = resp.filter(r => r.tpCondicion === '>');
          for (const cond of condicionesMeyores) {
            if (flujoFormulario.puntaje > Number(cond.valor)) {
              this.redireccion(cond.retornaA, cond.idRetornaA);
              return;
            }
          }
          this.buscarPregunta(this.pregunta.orden + 1);
        });
      }


    }

	}
	buscarPregunta(orden) {
    const p = new Preguntas();
    p.orden = orden;
    p.idFormulario = this.idFormulario;
    this.preguntaService.list(p).toPromise().then(r => {
      if (r.length === 0 && this.nIntentBuscarPregunta <= 3) {
        console.log("entroal buscarpreguntyas")
        this.nIntentBuscarPregunta += 1;
        this.buscarPregunta(orden + 1);
      } else if (r.length === 0 && this.nIntentBuscarPregunta > 3) {
        console.log("entroal buscarpreguntyas222222222")
        this.formularioGeneradoService.finish(this.globals.formularioGenrado.id).toPromise().then();
		    //this.router.navigate(['/app', 'formulario', 'finish', this.idFormulario]);
		    this.routerExtensions.navigate(['/app','finish', this.idFormulario])
      } else {
        console.log("entroal buscarpreguntyas333333333333")
		    //this.routerExtensions.navigateByUrl('/app/formulario/' + this.idFormulario + '/' + r[0].id).then();
        this.routerExtensions.navigate(['/app' , 'redirec' , this.idFormulario, r[0].id]);
        this.nIntentBuscarPregunta = 0;
      }
    });
	}
	
  redireccion(retornaA, idRetornaA) {
    console.log("entro al enrutador")
    if (retornaA === 1) {
    //this.router.navigateByUrl('/app/contenido/' + idRetornaA);
      console.log("entro al ifffff")
	  this.routerExtensions.navigate(['/app/contenido/' + idRetornaA])
    } else {
		//this.router.navigateByUrl('/app/formulario/' + this.idFormulario + '/' + idRetornaA)
		this.routerExtensions.navigate(['/app/formulario/' + this.idFormulario + '/' + idRetornaA])
	  ;
    }
  } 
}