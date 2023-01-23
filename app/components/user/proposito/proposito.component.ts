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
	selector: "Proposito",
	moduleId: module.id,
	templateUrl: "./proposito.component.html",
	styleUrls: ['./proposito.component.css']
})
export class PropositoComponent implements OnInit {
	
	titulosDepro = [
		{
			title: 'Para que naciste',
			datos: [
				{
					titulo: 'Video',
					conte: 'video',
					tipo: 'VIDEO',
					video: 'G9 F98  PARA QUE NACISTE.mp4',
				}
			]
		},
		{
			title: 'Pasión',
			datos: [
				{
					titulo: 'Portada',
					conte: 'G9 D99 .jpg',
					id: undefined,
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

	constructor(private routerExtensions: RouterExtensions, private page: Page, private vcRef: ViewContainerRef, private modal: ModalDialogService) {
		this.page.actionBarHidden = true;
	}

	ngOnInit(): void {
	}
	continue(i,j) {
		console.log("posElemenyo" , i)
		console.log("id de la actividad data" , j)
		this.routerExtensions.navigate(['/app/actproposito', i, j])
	}
}
