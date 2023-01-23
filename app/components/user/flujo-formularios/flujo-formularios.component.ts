import { Component, OnInit } from "@angular/core";
import { FormulariosGenerados } from '../../../core/models/FormulariosGenerados';
import { AuthService } from '../../../core/services/auth.service';
import { FormulariosGeneradosService } from '../../../core/services/formulariosGenerados.service';
import { ActivatedRoute } from '@angular/router';
import { FlujosFormularios } from '../../../core/models/FlujosFormularios';
import { FlujosFormulariosService } from '../../../core/services/flujosFormularios.service';
import { ItemEventData } from "tns-core-modules/ui/list-view"
import { RouterExtensions } from "nativescript-angular";
import Theme from "@nativescript/theme";
Theme.setMode(Theme.Light);
@Component({
	selector: "FlujoFormularios",
	moduleId: module.id,
	templateUrl: "./flujo-formularios.component.html",
	styleUrls: ['./flujo-formularios.component.css']
})
export class FlujoFormulariosComponent implements OnInit {

  Sincontenido= false;

  singularValue=''

  Flujo: FlujosFormularios = new FlujosFormularios;
  FormulariosFlujo = []
  constructor(private routerExtensions: RouterExtensions,private actRoute: ActivatedRoute,
     private FlujoFormulariosService: FlujosFormulariosService) {
    this.actRoute.params.subscribe(params => {
      this.Flujo.idFormularioGenerador=params.id;
      this.FlujoFormulariosService.list(this.Flujo).toPromise().then(resp=>{
        if(resp.length!=0){
          this.FormulariosFlujo = resp;
        }else{
          this.Sincontenido=true;
        }
      });     
    });
   }
  ngOnInit(): void {
  }
  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
    //this.elegido = this.generados[args.index] 
    //this.routerExtensions.navigate(['/app/flujoFormularios' , this.elegido['id']])
  }
}