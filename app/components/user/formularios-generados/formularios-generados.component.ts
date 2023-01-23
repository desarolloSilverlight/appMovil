import { Component, OnInit } from "@angular/core";
import { FormulariosGenerados } from '../../../core/models/FormulariosGenerados';
import { AuthService } from '../../../core/services/auth.service';
import { FormulariosGeneradosService } from '../../../core/services/formulariosGenerados.service';
import { ItemEventData } from "tns-core-modules/ui/list-view"
import { RouterExtensions } from "nativescript-angular";
import Theme from "@nativescript/theme";
Theme.setMode(Theme.Light);
@Component({
	selector: "FormulariosGenerados",
	moduleId: module.id,
	templateUrl: "./formularios-generados.component.html",
	styleUrls: ['./formularios-generados.component.css']
})
export class FormulariosGeneradosComponent implements OnInit {

		constructor(private routerExtensions: RouterExtensions,private formularioGeneradoService: FormulariosGeneradosService, private authService: AuthService) { }
  
  	FormGenerado : FormulariosGenerados = new FormulariosGenerados()
  generados = []
  elegido = []
  
	onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
    this.elegido = this.generados[args.index] 
    this.routerExtensions.navigate(['/app/flujoFormularios' , this.elegido['id']])
  }

 	ngOnInit(): void {
    this.authService.protected().toPromise().then(resp =>{
      this.FormGenerado.usuario=resp.identity;
      console.log("usuario", this.FormGenerado.usuario)
      this.formularioGeneradoService.list(this.FormGenerado).toPromise().then(resp=>{
        this.generados= resp;
      });
    });
  }
}