import {Component, OnInit} from '@angular/core'
import {ModalDialogParams, ModalDialogService} from 'nativescript-angular'
import {SbCausasEstres} from '../../../core/models/SbCausasEstres'
import {SbCausasEstresService} from '../../../core/services/sbCausasEstres.service'
import {TP_PARAMETROS} from '../../../core/constants/Parametros'
import {EventData} from "tns-core-modules/data/observable";
import {Label} from "tns-core-modules/ui/label";
import {Parametros} from '../../../core/models/Parametros';
import {ParametrosService} from '../../../core/services/parametros.service';
import Theme from "@nativescript/theme";
import {alert, confirm, prompt, login, action, inputType} from "tns-core-modules/ui/dialogs";

@Component({
  selector: "my-modal",
  templateUrl: "modal_organos.html",
  styleUrls: ['./modal_organos.component.css']
})
export class ModalOrganosComponent implements OnInit {

  options = {
    title: "Aviso ",
    message: "Debes seleccionar al menos uno ",
    okButtonText: "OK"
  };
  ElementosID = ["", "", "", "", "", ""]
  ElementosRetorno: Parametros[] = [];
  ElementosCabeza = [];
  ElementosGenital = [];
  ElementosPiernas = [];
  ElementosBrazos = [];
  ElementosGarganta = [];
  ElementosEstomago = [];
  Banderas = [false, false, false, false, false, false]
  bandera = true;
  contador = 0;
  contadoTitulos = 0;
  contadorT0 = 0;
  contadorT1 = 0;
  contadorT2 = 0;
  contadorT3 = 0;
  contadorT4 = 0;
  contadorT5 = 0;
  contadorT0A = [];
  contadorT1A = [];
  contadorT2A = [];
  contadorT3A = [];
  contadorT4A = [];
  contadorT5A = [];
  Aux: Parametros = {
    "id": 0,
    "idTpParametro": 0,
    "descripcion": "",
    "alfanumerico": "",
    "numerico": 0
  };
  titulos = []

  constructor(private modal: ModalDialogParams, private sbCausasSerive: SbCausasEstresService, private parametrosService: ParametrosService) {
    Theme.setMode(Theme.Light);
    this.titulos = this.modal.context.titulos
    if (this.titulos[0] == "cabeza" || this.titulos[1] == "cabeza" || this.titulos[2] == "cabeza" || this.titulos[3] == "cabeza" || this.titulos[4] == "cabeza" || this.titulos[5] == "cabeza") {
      this.contadoTitulos++;
      this.Banderas[0] = true;
      const cabeza = new Parametros();
      cabeza.idTpParametro = TP_PARAMETROS.TP_CABEZA;
      this.parametrosService.list(cabeza).toPromise().then(r => {
        const division = r.length / 2;
        for (let i = 0; i < r.length; i += division) {
          let pedazo = r.slice(i, i + division);
          this.ElementosCabeza.push(pedazo);
        }
      });
    }

    if (this.titulos[0] == "garganta" || this.titulos[1] == "garganta" || this.titulos[2] == "garganta" || this.titulos[3] == "garganta" || this.titulos[4] == "garganta" || this.titulos[5] == "garganta") {
      this.contadoTitulos++;
      this.Banderas[1] = true;
      const garganta = new Parametros();
      garganta.idTpParametro = TP_PARAMETROS.TP_GARGANTA;
      this.parametrosService.list(garganta).toPromise().then(r => {
        const division = r.length / 2;
        for (let i = 0; i < r.length; i += division) {
          let pedazo = r.slice(i, i + division);
          this.ElementosGarganta.push(pedazo);
        }
      });
    }

    if (this.titulos[0] == "brazos" || this.titulos[1] == "brazos" || this.titulos[2] == "brazos" || this.titulos[3] == "brazos" || this.titulos[4] == "brazos" || this.titulos[5] == "brazos") {
      this.contadoTitulos++;
      this.Banderas[2] = true;
      const brazos = new Parametros();
      brazos.idTpParametro = TP_PARAMETROS.TP_BRAZOS;
      this.parametrosService.list(brazos).toPromise().then(r => {
        const division = r.length / 2;
        for (let i = 0; i < r.length; i += division) {
          let pedazo = r.slice(i, i + division);
          this.ElementosBrazos.push(pedazo);
        }
      });
    }
    if (this.titulos[0] == "estomago" || this.titulos[1] == "estomago" || this.titulos[2] == "estomago" || this.titulos[3] == "estomago" || this.titulos[4] == "estomago" || this.titulos[5] == "estomago") {
      this.contadoTitulos++;
      this.Banderas[3] = true;
      const estomago = new Parametros();
      estomago.idTpParametro = TP_PARAMETROS.TP_ESTOMAGO;
      this.parametrosService.list(estomago).toPromise().then(r => {
        const division = r.length / 2;
        for (let i = 0; i < r.length; i += division) {
          let pedazo = r.slice(i, i + division);
          this.ElementosEstomago.push(pedazo);
        }
      });
    }
    if (this.titulos[0] == "genital" || this.titulos[1] == "genital" || this.titulos[2] == "genital" || this.titulos[3] == "genital" || this.titulos[4] == "genital" || this.titulos[5] == "genital") {
      this.contadoTitulos++;
      this.Banderas[4] = true;
      const genital = new Parametros();
      genital.idTpParametro = TP_PARAMETROS.TP_ZONA_GENITAL;
      this.parametrosService.list(genital).toPromise().then(r => {
        const division = r.length / 2;
        for (let i = 0; i < r.length; i += division) {
          let pedazo = r.slice(i, i + division);
          this.ElementosGenital.push(pedazo);
        }
      });
    }
    if (this.titulos[0] == "piernas" || this.titulos[1] == "piernas" || this.titulos[2] == "piernas" || this.titulos[3] == "piernas" || this.titulos[4] == "piernas" || this.titulos[5] == "piernas") {
      this.contadoTitulos++;
      this.Banderas[5] = true;
      const piernas = new Parametros();
      piernas.idTpParametro = TP_PARAMETROS.TP_PIERNAS;
      this.parametrosService.list(piernas).toPromise().then(r => {
        const division = r.length / 2;
        for (let i = 0; i < r.length; i += division) {
          let pedazo = r.slice(i, i + division);
          this.ElementosPiernas.push(pedazo);
        }
      });
    }
    this.ElementosRetorno[0] = this.Aux;
    this.ElementosRetorno[1] = this.Aux;
    this.ElementosRetorno[2] = this.Aux;
    this.ElementosRetorno[3] = this.Aux;
    this.ElementosRetorno[4] = this.Aux;
    this.ElementosRetorno[5] = this.Aux;
  }

  public close() {
    let options = {
      title: "Aviso",
      message: "Selecciona almenos una de cada parte del cuerpo",
      okButtonText: "OK"
    };

    if (this.ElementosID[0] != "") {
      this.parametrosService.get(this.ElementosID[0]).toPromise().then(resp => {
        this.ElementosRetorno[0] = resp;
      });
    }
    if (this.ElementosID[1] != "") {
      this.parametrosService.get(this.ElementosID[1]).toPromise().then(resp => {
        this.ElementosRetorno[1] = resp;
      });
    }
    if (this.ElementosID[2] != "") {
      this.parametrosService.get(this.ElementosID[2]).toPromise().then(resp => {
        this.ElementosRetorno[2] = resp;
      });
    }
    if (this.ElementosID[3] != "") {
      this.parametrosService.get(this.ElementosID[3]).toPromise().then(resp => {
        this.ElementosRetorno[3] = resp;
      });
    }
    if (this.ElementosID[4] != "") {
      this.parametrosService.get(this.ElementosID[4]).toPromise().then(resp => {
        this.ElementosRetorno[4] = resp;
      });
    }
    if (this.ElementosID[5] != "") {
      this.parametrosService.get(this.ElementosID[5]).toPromise().then(resp => {
        this.ElementosRetorno[5] = resp;
      });
    }
    let suma = this.contadorT0 + this.contadorT1 + this.contadorT2 + this.contadorT3 + this.contadorT4 + this.contadorT5;
    if (suma >= this.contadoTitulos) {
      this.modal.closeCallback(this.ElementosRetorno)
    } else {
      alert(options);
    }
  }

  ngOnInit(): void {
  }

  onTap(args: EventData) {
    let button = args.object as Label;
    let cont = new Parametros();
    //TP_CABEZA: 17,
    //TP_GARGANTA: 18,
    //TP_BRAZOS: 19,
    //TP_ESTOMAGO: 20,
    //TP_ZONA_GENITAL: 21,
    //TP_PIERNAS: 22

    this.parametrosService.get(button.id).toPromise().then(resp => {
      cont = resp;
      let auxsi = 1;
      if (cont.idTpParametro == 17) {
        for (let index = 0; index < this.contadorT0A.length; index++) {
          if (this.contadorT0A[index] == cont.id) {
            this.contadorT0A[index] = 0;
            this.contadorT0 -= 1;
            auxsi = -1;
          }
        }
        if (auxsi == 1) {
          this.contadorT0A.push(cont.id)
          this.contadorT0 += 1;
        }
      }

      if (cont.idTpParametro == 18) {
        for (let index = 0; index < this.contadorT1A.length; index++) {
          if (this.contadorT1A[index] == cont.id) {
            this.contadorT1A[index] = 0;
            this.contadorT1 -= 1;
            auxsi = -1;
          }
        }
        if (auxsi == 1) {
          this.contadorT1A.push(cont.id)
          this.contadorT1 += 1;
        }
      }

      if (cont.idTpParametro == 19) {
        for (let index = 0; index < this.contadorT2A.length; index++) {
          if (this.contadorT2A[index] == cont.id) {
            this.contadorT2A[index] = 0;
            this.contadorT2 -= 1;
            auxsi = -1;
          }
        }
        if (auxsi == 1) {
          this.contadorT2A.push(cont.id)
          this.contadorT2 += 1;
        }
      }
      if (cont.idTpParametro == 20) {
        for (let index = 0; index < this.contadorT3A.length; index++) {
          if (this.contadorT3A[index] == cont.id) {
            this.contadorT3A[index] = 0;
            this.contadorT3 -= 1;
            auxsi = -1;
          }
        }
        if (auxsi == 1) {
          this.contadorT3A.push(cont.id)
          this.contadorT3 += 1;
        }
      }
      if (cont.idTpParametro == 21) {
        for (let index = 0; index < this.contadorT4A.length; index++) {
          if (this.contadorT4A[index] == cont.id) {
            this.contadorT4A[index] = 0;
            this.contadorT4 -= 1;
            auxsi = -1;
          }
        }
        if (auxsi == 1) {
          this.contadorT4A.push(cont.id)
          this.contadorT4 += 1;
        }
      }
      if (cont.idTpParametro == 22) {
        for (let index = 0; index < this.contadorT5A.length; index++) {
          if (this.contadorT5A[index] == cont.id) {
            this.contadorT5A[index] = 0;
            this.contadorT5 -= 1;
            auxsi = -1;
          }
        }
        if (auxsi == 1) {
          this.contadorT5A.push(cont.id)
          this.contadorT5 += 1;
        }
      }
    });


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
