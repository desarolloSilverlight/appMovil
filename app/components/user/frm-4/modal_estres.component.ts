import {Component, OnInit} from '@angular/core'
import {ModalDialogParams} from 'nativescript-angular'
import {SbCausasEstres} from '../../../core/models/SbCausasEstres'
import {SbCausasEstresService} from '../../../core/services/sbCausasEstres.service'
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import Theme from "@nativescript/theme";

@Component({
  selector: "my-modal",
  templateUrl: "modal_estres.html",
  styleUrls: ['./modal_estres.component.css']
})
export class ModalEstresComponent implements OnInit {

  options = {
    title: "Aviso ",
    message: "Debes seleccionar al menos uno ",
    okButtonText: "OK"
  };
  ElementosID = ["", "", "", "", "", ""]
  ElementosRetorno: SbCausasEstres[] = [];
  ElementosIra = [];
  ElementosMiedo = [];
  ElementosTristeza = [];
  bandera = true;
  contador = 0;
  Aux: SbCausasEstres = {
    "id": 0,
    "tpCatCausa": 0,
    "tpCausa": 0,
    "descripcion": "",
    "txTpCausa": "",
    "txTpCatCausa": ""
  };

  constructor(private modal: ModalDialogParams, private sbCausasSerive: SbCausasEstresService) {

    Theme.setMode(Theme.Light);
    const ira = new SbCausasEstres();
    ira.tpCausa = 40;
    const miedo = new SbCausasEstres();
    miedo.tpCausa = 43;
    const tristeza = new SbCausasEstres();
    tristeza.tpCausa = 44;
    this.sbCausasSerive.list(ira).toPromise().then(respIra => {
      const division = respIra.length / 3;
      for (let i = 0; i < respIra.length; i += division) {
        let pedazo = respIra.slice(i, i + division);
        this.ElementosIra.push(pedazo);
      }

      console.log(this.ElementosIra.length);
      this.sbCausasSerive.list(miedo).toPromise().then(respMiedo => {
        const division = respMiedo.length / 3;
        for (let i = 0; i < respMiedo.length; i += division) {
          let pedazo = respMiedo.slice(i, i + division);
          this.ElementosMiedo.push(pedazo);
        }
        this.sbCausasSerive.list(tristeza).toPromise().then(respTristeza => {
          const division = respTristeza.length / 3;
          for (let i = 0; i < respTristeza.length; i += division) {
            let pedazo = respTristeza.slice(i, i + division);
            this.ElementosTristeza.push(pedazo);
          }
        });
      });
    });

    this.ElementosRetorno[0] = this.Aux;
    this.ElementosRetorno[1] = this.Aux;
    this.ElementosRetorno[2] = this.Aux;
    this.ElementosRetorno[3] = this.Aux;
    this.ElementosRetorno[4] = this.Aux;
    this.ElementosRetorno[5] = this.Aux;

  }

  public close() {

    if (this.ElementosID[0] != "") {
      this.sbCausasSerive.get(this.ElementosID[0]).toPromise().then(resp => {
        this.ElementosRetorno[0] = resp;
      });
    }
    if (this.ElementosID[1] != "") {
      this.sbCausasSerive.get(this.ElementosID[1]).toPromise().then(resp => {
        this.ElementosRetorno[1] = resp;
      });
    }
    if (this.ElementosID[2] != "") {
      this.sbCausasSerive.get(this.ElementosID[2]).toPromise().then(resp => {
        this.ElementosRetorno[2] = resp;
      });
    }
    if (this.ElementosID[3] != "") {
      this.sbCausasSerive.get(this.ElementosID[3]).toPromise().then(resp => {
        this.ElementosRetorno[3] = resp;
      });
    }
    if (this.ElementosID[4] != "") {
      this.sbCausasSerive.get(this.ElementosID[4]).toPromise().then(resp => {
        this.ElementosRetorno[4] = resp;
      });
    }
    if (this.ElementosID[5] != "") {
      this.sbCausasSerive.get(this.ElementosID[5]).toPromise().then(resp => {
        this.ElementosRetorno[5] = resp;
      });
    }
    this.modal.closeCallback(this.ElementosRetorno)
  }

  ngOnInit(): void {
  }

  onTap(args: EventData) {
    let button = args.object as Label;
    if (button.id == this.ElementosID[0] || button.id == this.ElementosID[1] || button.id == this.ElementosID[2] || button.id == this.ElementosID[3] || button.id == this.ElementosID[4] || button.id == this.ElementosID[5]) {
      for (let index = 0; index < this.ElementosID.length; index++) {
        if (this.ElementosID[index] == button.id) {
          this.ElementosID[index] = "";
          this.contador -= 1;
        }
      }
    } else {
      if (this.ElementosID[0] != "" && this.ElementosID[1] != "" && this.ElementosID[2] != "" && this.ElementosID[3] != "" && this.ElementosID[4] != "" && this.ElementosID[5] != "") {
      } else {
        for (let index = 0; index < this.ElementosID.length; index++) {
          if (this.ElementosID[index] == "" && this.bandera) {
            this.ElementosID[index] = button.id;
            this.bandera = false;
            this.contador += 1;
          }
        }
        this.bandera = true;
      }
    }
  }

  alert() {
    alert(this.options);
  }
}
