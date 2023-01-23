import { Component, OnInit } from "@angular/core";
import { PDFViewNg } from 'nativescript-pdfview-ng';
import { registerElement } from 'nativescript-angular';
registerElement('PDFViewNg', () => PDFViewNg);
@Component({
	selector: "Terminos",
	moduleId: module.id,
	templateUrl: "./terminos.component.html",
	styleUrls: ['./terminos.component.css']
})
export class TerminosComponent implements OnInit {
   

	src = "https://api-backend.zerostress.io/media/terminos.pdf"




	htmlString: string = `
	<div>
		<frame src='https://api-backend.zerostress.io/media/terminos.pdf'>
		</frame>
	</div>`;

	constructor() {
	}

	ngOnInit(): void {
	}
	onLoad(): void {
        console.log("PDF Loaded");
    }
}
