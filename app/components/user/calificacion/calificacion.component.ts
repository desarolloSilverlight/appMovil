import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
@Component({
	selector: "Calificacion",
	moduleId: module.id,
	templateUrl: "./calificacion.component.html",
	styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

	constructor(private page: Page ) {
		this.page.actionBarHidden = true;
	}

	ngOnInit(): void {
	}
}