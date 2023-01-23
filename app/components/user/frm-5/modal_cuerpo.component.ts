import {Component, OnInit} from '@angular/core'
import {ModalDialogParams, ModalDialogService} from 'nativescript-angular'
import {SbCausasEstres} from '../../../core/models/SbCausasEstres'
import {SbCausasEstresService} from '../../../core/services/sbCausasEstres.service'
import {TP_PARAMETROS} from '../../../core/constants/Parametros'
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {Parametros} from '../../../core/models/Parametros';
import {ParametrosService} from '../../../core/services/parametros.service';
import {Slider} from 'tns-core-modules/ui/slider'
import Theme from "@nativescript/theme";

@Component({
  selector: "my-modal",
  templateUrl: "modal_cuerpo.html",
  styleUrls: ['./modal_cuerpo.component.css']
})
export class ModalCuerpoComponent implements OnInit {
  ElementosValue = [];

  constructor(private modal: ModalDialogParams, private sbCausasSerive: SbCausasEstresService, private parametrosService: ParametrosService) {
    Theme.setMode(Theme.Light);
  }

  public close() {
    this.modal.closeCallback(this.ElementosValue)
  }

  ngOnInit(): void {
    this.ElementosValue = this.modal.context.valores;
  }

  onTap(args: EventData) {
    let button = args.object as Label;
    this.ElementosValue[Number(button.id)] = 0
  }

  onSliderValueChange(args) {
    const slider = <Slider>args.object;
    this.ElementosValue[slider.id] = slider.value
    console.log('slider --->', slider.id, "value = ", slider.value);
  }
}
