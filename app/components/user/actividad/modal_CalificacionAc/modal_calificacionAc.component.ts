import {Component} from '@angular/core'
import {ModalDialogParams, RouterExtensions} from 'nativescript-angular'
import {SbCausasEstresService} from '../../../../core/services/sbCausasEstres.service'
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {ParametrosService} from '../../../../core/services/parametros.service';
import Theme from "@nativescript/theme";
import {TouchGestureEventData} from "ui/gestures";

@Component({
    selector: "my-modal",
    templateUrl: "modal_calificacionAc.html",
    styleUrls: ['./modal_calificacionAc.component.css']
})
export class ModalCalidicacionAcComponent{

    oldSelect : Label;
    idSelect = 0;
	constructor(private routerExtensions: RouterExtensions, private modal: ModalDialogParams, private sbCausasSerive: SbCausasEstresService, private parametrosService: ParametrosService) {
		Theme.setMode(Theme.Light);
	}
    public close(event: TouchGestureEventData) {
			console.log('evento pimer modal -->',event.action);
				this.modal.closeCallback(this.idSelect);
    }

    onTap(args: EventData) {
		if (this.oldSelect == null) {
			this.oldSelect = args.object as Label
			let button = args.object as Label;
			button.className = "itemSelect";
			this.idSelect = Number(button.id)
		} else {
			let button = args.object as Label;
			console.log(button.id)
			this.oldSelect.className = "items";
			button.className = "itemSelect";
			this.oldSelect = button;
			this.idSelect = Number(button.id)
		}
	}
}
