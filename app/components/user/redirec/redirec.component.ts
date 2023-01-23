import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from "nativescript-angular";
import Theme from "@nativescript/theme";

@Component({
	selector: "Redirec",
	moduleId: module.id,
	templateUrl: "./redirec.component.html",
	styleUrls: ['./redirec.component.css']
})
export class RedirecComponent implements OnInit {
	idFormulario: any;
	idPregunta: any;

	constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute) {
	Theme.setMode(Theme.Light);
	this.actRoute.params.subscribe(params => {
      this.idFormulario = params.id;
		this.idPregunta = params.idPregunta;
		this.routerExtensions.navigate(['/app' , 'formulario' , this.idFormulario, this.idPregunta]);
	});
	}

	ngOnInit(): void {
	}


}