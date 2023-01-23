import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view"
import { RouterExtensions} from "nativescript-angular";
import { FormulariosConsultante } from '../../../core/models/FormulariosConsultante';
import { FormulariosConsultanteService } from '../../../core/services/formulariosConsultante.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormulariosService } from '../../../core/services/formularios.service';
import { General } from '../../../core/constants/General';
import { map } from 'rxjs/operators';
//
import Theme from "@nativescript/theme";
Theme.setMode(Theme.Light);
@Component({
  selector: "Formularios",
  moduleId: module.id,
  templateUrl: "./formulariosConsultante.component.html",
  styleUrls: ['./formulariosConsultante.component.css']
})
  
export class FormulariosConsultanteComponent implements OnInit {

  formul = [];
  formularios = [];
   
  onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');
    this.formul = this.formularios[args.index]
    this.routerExtensions.navigate(['/app/formularios', this.formul['idFormulario']])
  }

  singularValue = ''
  constructor(private routerExtensions: RouterExtensions, private formulariosConsultanteService: FormulariosConsultanteService,
    private authService: AuthService, private formulariosService: FormulariosService) {

  }

  Fconsultante: FormulariosConsultante = new FormulariosConsultante()

  ngOnInit(): void {
    this.authService.protected().toPromise().then(resp => {
      this.Fconsultante.idConsultante = resp.idConsultante;
      this.formulariosConsultanteService.list(this.Fconsultante).pipe(map(orden => {
        orden.sort((a, b) => {
          return a.orden - b.orden;
        })
        return orden;
      })).toPromise().then(resp => {
        this.formularios = resp;
      });
    }
    );
  }
}
