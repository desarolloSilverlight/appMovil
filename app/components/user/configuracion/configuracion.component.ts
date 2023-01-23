import {Component, OnInit} from "@angular/core";
import {Consultantes} from '../../../core/models/Consultantes';
import {AuthService} from '../../../core/services/auth.service';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {RouterExtensions} from "nativescript-angular";
import {action} from "tns-core-modules/ui/dialogs";
import {S3ClientService} from '../../../core/services/s3Client.service';
import Theme from "@nativescript/theme";

@Component({
    selector: "Configuracion",
    moduleId: module.id,
    templateUrl: "./configuracion.component.html",
    styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

    consultante: Consultantes = new Consultantes()
    submitted = true;

    nombre: string = "";
    apellido: string = "";
    public tipoDocumento: string = "";
    estadoCivil: string = "";
    genero: string = "";
    numDocumento: number;
    telefono: number = 0;
    direccion: string = "";
    fechaNacimiento: Date;
    ciudad: string = "";
    email: string = "";
    empresa: number;
    ver: boolean = false;
    Contrasena = "";
    ReContrasena = "";
    foto: string;

    constructor(private routerExtensions: RouterExtensions, private authService: AuthService,
                private consultatesService: ConsultantesService, private s3Service: S3ClientService) {
        Theme.setMode(Theme.Light);
        this.foto = "~/images/avatar.png"
    }


    ngOnInit(): void {
        this.authService.protected().toPromise().then(resp => {
            this.consultante.id = resp.idConsultante;

            this.consultatesService.list(this.consultante).toPromise().then(resp => {
                console.log(" ESMOFGNKJWEFNwekfjnkjWNEFKLJnwefflkjnWKJEF")
                console.log(resp[0])
                this.consultante.nombre = resp[0].nombre;
                this.consultante.apellidos = resp[0].apellidos;
                this.consultante.tipoDocumento = resp[0].tipoDocumento;
                this.consultante.genero = resp[0].genero;
                this.consultante.numDocumento = resp[0].numDocumento;
                this.consultante.estadoCivil = resp[0].estadoCivil;
                this.consultante.email = resp[0].email;
                this.consultante.idEmpresa = resp[0].idEmpresa;
                this.consultante.telefono = resp[0].telefono;
                this.consultante.primerIngreso = resp[0].primerIngreso;
                this.consultante.fechaNacimiento = resp[0].fechaNacimiento;
                this.consultante.ciudad = resp[0].ciudad;
                this.consultante.direccion = resp[0].direccion
                this.setInitForm();
            })
        });

        this.authService.protected().toPromise().then(resp => {
            this.consultante.id = resp.idConsultante;
            this.consultatesService.list(this.consultante).toPromise().then(res => {
                this.consultante.email = res[0].email
                this.consultante.idEmpresa = res[0].idEmpresa
                this.consultante.primerIngreso = res[0].primerIngreso
                if (res[0].imagen != undefined && res[0].imagen != null) {
                    this.s3Service.search(res[0].imagen).subscribe((respSearch: any) => {
                        this.s3Service.download(respSearch.path).subscribe((respDo: any) => {
                            this.foto = "data:image/gif;base64," + respDo.base64;
                        })
                    })
                }
            });
        });
    }

    setInitForm() {
        this.nombre = this.consultante.nombre;
        this.apellido = this.consultante.apellidos;
        this.tipoDocumento = this.consultante.tipoDocumento;
        this.estadoCivil = this.consultante.estadoCivil;
        this.genero = this.consultante.genero;
        this.numDocumento = this.consultante.numDocumento;
        this.telefono = this.consultante.telefono;
        this.direccion = this.consultante.direccion;
        this.fechaNacimiento = this.consultante.fechaNacimiento;
        this.ciudad = this.consultante.ciudad;
        this.email = this.consultante.email;
        this.empresa = this.consultante.idEmpresa
    }

    setFrom() {
        this.consultante.nombre = this.nombre;
        this.consultante.apellidos = this.apellido;
        this.consultante.tipoDocumento = this.tipoDocumento
        this.consultante.estadoCivil = this.estadoCivil
        this.consultante.genero = this.genero
        this.consultante.numDocumento = this.numDocumento
        this.consultante.telefono = this.telefono
        this.consultante.direccion = this.direccion
        this.consultante.fechaNacimiento = this.fechaNacimiento
        this.consultante.ciudad = this.ciudad
        this.consultante.email = this.email;
        this.consultante.idEmpresa = this.empresa
    }

    save() {
        this.submitted = true;
        if (this.nombre != "" && this.apellido != "") {
            this.setFrom()
            this.consultatesService.save(this.consultante).subscribe((res) => {
                this.routerExtensions.navigate(['/app/welcome'])
            });
        }
    }

    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        this.fechaNacimiento = args.value
    }

    SeleccionarDocumento() {
        action({
            message: "Seleccione un tipo de documento",
            cancelButtonText: "Cancelar",
            actions: ["Cedula de Ciudadania", "Cedula de extrangeria", "Pasaporte"]
        }).then((result) => {
            if (result != "Cancelar") {
                this.tipoDocumento = result
            }
        });
    }

    SeleccionarEstado() {
        action({
            message: "Seleccione su estado civil",
            cancelButtonText: "Cancelar",
            actions: ["Divorcido", "Casado", "Soltero", "Union libre"]
        }).then((result) => {
            if (result != "Cancelar") {
                this.estadoCivil = result
            }
        });
    }

    mostrarP() {
        if (this.ver) {
            this.ver = false;
        } else {
            this.ver = true;
        }
    }
}