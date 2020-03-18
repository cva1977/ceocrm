
@Component({
  selector: 'app-oferta-af-aprobprecal',
  templateUrl: './oferta-af-aprobprecal.component.html',
  styleUrls: ['./oferta-af-aprobprecal.component.css']
})
export class OfertaAfAprobprecalComponent implements OnInit {
  @ViewChild('divTestDisplay1', {static: false}) divTestDisplay1: ElementRef;
  @ViewChild('divTestDisplay2', {static: false}) divTestDisplay2: ElementRef;
  @ViewChild('divTestDisplay3', {static: false}) divTestDisplay3: ElementRef;
  @ViewChild('textEmail', {static: false}) textEmail: ElementRef;
  @ViewChild('textFono', {static: false}) textFono: ElementRef;
  @ViewChild('option', {static: false}) option: ElementRef;


  @Input('ofertaAfiliado')ofertaAfiliado;
  @Input('rentaImponible')rentaImponible;
  @Input('mora')mora;
  @Input('moraTotal')moraTotal;
  @Input('moraN')moraN;
  @Input('ofertSeguroAuto')ofertSeguroAuto;
  @Input('gestorCampana')gestorCampana;
  @Input('uf')uf;
  @Input('uf_valor')uf_valor;
  @Input('uf_fecha')uf_fecha;
  public radioOf: any;
  public userPerfil: any;
  public data: any;
  navigationSubscription;
  public id: any;
  public dataComunicacion: any;
  public errorFono: string;
  public errorEmail: string;
  public errorOpcion: string;

  // tslint:disable-next-line: max-line-length
  constructor( public _firestoreservice: FirestoreService, private _route: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.navigationSubscription = this._route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    registerLocaleData( es );
 }


  visibleInput(componente: number) {

    if (componente == 1) {
      this.divTestDisplay1.nativeElement.style.display = 'block';
      this.divTestDisplay2.nativeElement.style.display = 'none';
      this.divTestDisplay3.nativeElement.style.display = 'none';
      this.textFono.nativeElement.value = '';
      this.option.nativeElement.selectedIndex = 0;
      this.errorEmail = '';
      this.errorOpcion = '';
      this.errorFono = '';

    }
    if (componente == 2) {
      this.divTestDisplay1.nativeElement.style.display = 'none';
      this.divTestDisplay2.nativeElement.style.display = 'block';
      this.divTestDisplay3.nativeElement.style.display = 'none';
      this.textEmail.nativeElement.value = '';
      this.option.nativeElement.selectedIndex = 0;
      this.errorEmail = '';
      this.errorOpcion = '';
      this.errorFono = '';
    }
    if (componente == 3) {
      this.divTestDisplay1.nativeElement.style.display = 'none';
      this.divTestDisplay2.nativeElement.style.display = 'none';
      this.divTestDisplay3.nativeElement.style.display = 'block';
      this.textEmail.nativeElement.value = '';
      this.textFono.nativeElement.value = '';
      this.errorEmail = '';
      this.errorOpcion = '';
      this.errorFono = '';
    }
  }

  initialiseInvites() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userPerfil = this.authService.isUserLoggedInPerfil();
  }

  public saveLogCampana() {

    this.divTestDisplay1.nativeElement.style.display = 'none';
    this.divTestDisplay2.nativeElement.style.display = 'none';
    this.divTestDisplay3.nativeElement.style.display = 'none';
    this.textEmail.nativeElement.value = '';
    this.textFono.nativeElement.value = '';
    this.option.nativeElement.selectedIndex = 0;
    this.errorFono = '';
    this.errorEmail = '';
    this.errorOpcion = '';
    this.radioOf = '';

    const time = new Date();

    const mes = '0' + (time.getMonth() + 1).toString();
    const dia = '0' + (time.getDate()).toString();


    this.data = {
      rut_busqueda: parseInt(this.id),
      rut_colaborador: parseInt(this.userPerfil.RUT),
      email: this.userPerfil.EMAIL.toLowerCase(),
      timestamp: parseInt(time.getTime().toString().substr(0, 10)),
      periodo: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)),
      fecha: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
      query: 'afiliado',
      modulo: 'RevisarCampanaAutoFull'

    };

    this._firestoreservice.createLog('cla_scanner_log', this.data);

  }

  clickHrefCardif(form: any){
    const time = new Date();
    const mes = '0' + (time.getMonth() + 1).toString();
    const dia = '0' + (time.getDate()).toString();

    this.dataComunicacion = {
      rut_cliente: parseInt(this.id),
      rut_colaborador: parseInt(this.userPerfil.RUT),
      email_colaborador: this.userPerfil.EMAIL.toLowerCase(),
      timestamp: parseInt(time.getTime().toString().substr(0, 10)),
      periodo: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)),
      fecha: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
      modelo_auto: form.modeloAuto.value,
      patente: form.patente.value,
      form: 'redirigeCardif'
      };

      this._firestoreservice.createLog('cla_scanner_seguir_oferta', this.dataComunicacion);

      window.location.href = "https://auto.bnpparibascardif.cl/ventaonlineweb/?utm_source=ceocrm&utm_medium=sucursales";

    }

  registerForm(form: any) {

const time = new Date();

const mes = '0' + (time.getMonth() + 1).toString();
const dia = '0' + (time.getDate()).toString();

if (form.name == 'formFono' && form.textFono.value != '') {
      this.dataComunicacion = {
        rut_cliente: parseInt(this.id),
        rut_colaborador: parseInt(this.userPerfil.RUT),
        email_colaborador: this.userPerfil.EMAIL.toLowerCase(),
        timestamp: parseInt(time.getTime().toString().substr(0, 10)),
        periodo: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)),
        fecha: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
        fono: form.textFono.value,
        modelo_auto: form.modeloAuto.value,
        patente: form.patente.value,
        nombres: form.nombreAfiliado.value,
        dv_rut_persona: form.dv_rut_persona.value,
        form: 'fono'
        };
      this.errorFono = '<strong><div class="text-success animated fadeIn delay-4s">Guardado Exitosamente</div></strong>';

    } else {
      this.errorFono = '<strong><div class="text-danger animated fadeIn delay-4s">Favor, Ingrese Fono</div></strong>';
    }

if (form.name == 'formEmail' && form.textEmail.value != '') {
      this.dataComunicacion = {
        rut_cliente: parseInt(this.id),
        rut_colaborador: parseInt(this.userPerfil.RUT),
        email_colaborador: this.userPerfil.EMAIL.toLowerCase(),
        timestamp: parseInt(time.getTime().toString().substr(0, 10)),
        periodo: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)),
        fecha: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
        email: form.textEmail.value,
        modelo_auto: form.modeloAuto.value,
        patente: form.patente.value,
        nombres: form.nombreAfiliado.value,
        solo_nombre: (form.nombreAfiliado.value).toString().replace((form.apellido_paternoAfiliado.value).toString() + ' '+ (form.apellido_maternoAfiliado.value).toString(),"").trim(),
        dv_rut_persona: form.dv_rut_persona.value,
        form: 'email'
        };

      this.errorEmail = '<strong><div class="text-success animated fadeIn delay-4s">Guardado Exitosamente</div></strong>';

      } else {
        this.errorEmail = '<strong><div class="text-danger animated fadeIn delay-4s">Favor, Ingrese Email</div></strong>';
      }

if (form.name == 'formOption' && form.option.selectedIndex != 0) {
      this.dataComunicacion = {
        rut_cliente: parseInt(this.id),
        rut_colaborador: parseInt(this.userPerfil.RUT),
        email_colaborador: this.userPerfil.EMAIL.toLowerCase(),
        timestamp: parseInt(time.getTime().toString().substr(0, 10)),
        periodo: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)),
        fecha: parseInt(time.getFullYear() + mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
        opcion: form.option.value,
        modelo_auto: form.modeloAuto.value,
        patente: form.patente.value,
        nombres: form.nombreAfiliado.value,
        dv_rut_persona: form.dv_rut_persona.value,
        form: 'opciones'
        };


      this.errorOpcion = '<strong><div class="text-success animated fadeIn delay-4s">Guardado Exitosamente</div></strong>';

      } else {
        this.errorOpcion = '<strong><div class="text-danger animated fadeIn delay-4s">Favor, Elija una Opción</div></strong>';
      }

this._firestoreservice.createLog('cla_scanner_seguir_oferta', this.dataComunicacion);

  }

}
