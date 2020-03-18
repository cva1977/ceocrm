
@Component({
  selector: 'app-referidos-seguro-car',
  templateUrl: './referidos-seguro-car.component.html',
  styleUrls: ['./referidos-seguro-car.component.css']
})

export class ReferidosSeguroCarComponent implements OnInit {
  searchForm;
  contactForm;
  sinAutoForm;
  afiliado = null;
  submitted = false;
  isContactFormInValid = {emailFormat: false, emailRequired: false};
  isAfiliado = true;
  ofertSeguroAuto = [];
  dummyMarcas = [];
  valorUf: any;
  uf_fecha: any;
  indice: any;
  referidoForm;


  constructor(
    private formBuilder: FormBuilder,
    public firestoreservice: FirestoreService,
    public authService: AuthService,
    private _router: Router
    ) {
    this.searchForm = this.formBuilder.group({rut: ''});
  }

  ngOnInit() {
    this.sinAutoForm = this.formBuilder.group(
      {
        marca: new FormControl('', [Validators.required]),
        modelo_auto: new FormControl('', [Validators.required]),
        anio: new FormControl(2005, [Validators.required, Validators.min(2005)]),
        patente: new FormControl('', [Validators.required]),
        FONO_MOVIL: '',
        correo_elect_persona: new FormControl('dummy@mail.com', [Validators.required, Validators.email]),
        nombre_referido: new FormControl({disabled: true}, Validators.required),
        fecha_nacimiento_persona: new FormControl({disabled: true}, Validators.required),
      });

    const time = new Date();
    const mes = '0' + (time.getMonth() + 1).toString();
    const dia = '0' + (time.getDate()).toString();
    const fechaString = time.getFullYear() + '-' + mes.substring(mes.length, mes.length - 2)  +'-'+ dia.substring(dia.length, dia.length - 2);


    this.firestoreservice.getUf(fechaString).subscribe((ufSnap: any) => {
        ufSnap.forEach((uf: any) => {
          this.valorUf = parseFloat(uf.payload.doc.data().UF);
          this.uf_fecha = uf.payload.doc.data().FECHA;
        });
      });
    this.getBrands();
  }


  get sinAForm() {
    return this.sinAutoForm.controls;
  }

  onSubmitRut() {
    const formData = this.searchForm.value;
    const rut = formData.rut;
    this.afiliado = null;
    this.isAfiliado = true;
    if (rut === '') {
      return;
    }
    this.getAfiliado_cla(rut);
  }

  onSubmitSinAuto() {
    this.submitted = true;
    if (this.sinAutoForm.invalid) {
      return;
    }
    const payload = this.preparePayload(this.sinAutoForm.value);
    const user = this.authService.isUserLoggedIn();
    this.firestoreservice.getUsuarios_cla(user.email.toUpperCase()).subscribe(
        (resp: any) => {
            payload.nombre_colaborador = resp.payload.data().NOMBRES;
            payload.rut_colaborador = resp.payload.data().RUT;
            this.firestoreservice.createReferidoAuto(payload);
          });
    Swal.fire({
            title: 'OK',
            text: 'Hemos Ingresado tu Referido',
            type: 'success'
          }).then(() => {});
    this._router.navigate([`/referidos-auto-lista`]);
  }


  preparePayload(payload) {
    const date = new Date();
    payload.create_time = date;
    payload.timeStamp = parseInt(date.getTime().toString().substring(0, 10));
    payload.rut_referido = parseInt(this.afiliado.id);
    payload.dv_referido = this.afiliado.data.DV_RUT_PERSONA;
    payload.nuevo = 1;
    payload.nombre_referido = this.afiliado.data.NOMBRES;
    payload.fecha_nacimiento_persona = this.afiliado.data.FECHA_NACIMIENTO_PERSONA;
    payload.predeterminado = 0;
    // STRING
    payload.patente = payload.patente.toUpperCase();
    payload.modelo_auto = payload.marca + '-' + payload.modelo_auto.toUpperCase();
    payload.correo_elect_persona = payload.correo_elect_persona.toLowerCase();
    return payload;
  }

  getAfiliado_cla(rut: any) {
    this.afiliado = null;
    this.firestoreservice.getAfiliado_cla(rut).subscribe(
      (afiliadoDoc: any) => {
        if (!afiliadoDoc.payload.exists) {
          this.isAfiliado = false;
          this.ofertSeguroAuto = [];
          return;
        }
        this.afiliado = {
                id: afiliadoDoc.payload.id,
                data: afiliadoDoc.payload.data()
              };
        this.sinAutoForm.controls.nombre_referido.setValue(this.afiliado.data.NOMBRES);
        this.sinAutoForm.controls.fecha_nacimiento_persona.setValue(this.afiliado.data.FECHA_NACIMIENTO_PERSONA);
        this.sinAutoForm.controls.FONO_MOVIL.setValue(this.afiliado.data.FONO_MOVIL);
        this.sinAutoForm.controls.correo_elect_persona.setValue(this.afiliado.data.CORREO_ELECT_PERSONA);
        this.contactForm = this.formBuilder.group({
                nombre_referido: new FormControl({value: this.afiliado.data.NOMBRES, disabled: true}, Validators.required),
                fecha_nacimiento_persona: new FormControl({value: this.afiliado.data.FECHA_NACIMIENTO_PERSONA}, Validators.required),
                FONO_MOVIL: this.afiliado.data.FONO_MOVIL,
                correo_elect: new FormControl(this.afiliado.data.CORREO_ELECT_PERSONA,
                  [Validators.required, Validators.email]),
              });

        this.getCampanaSeguro(this.afiliado.id);

      }
      );
  }


  getCampanaSeguro(rut) {
    this.ofertSeguroAuto = [];
    this.firestoreservice.getCampanaSeguroAutoRef(rut).subscribe((segAuto: any) => {
      segAuto.forEach((oferta: any) => {
        this.ofertSeguroAuto.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });
      });
  });
  }
  getBrands() {
    this.dummyMarcas = [];
    this.firestoreservice.getBrands().subscribe(
      (brands: any) => {
        brands.forEach((brand: any) => {
          this.dummyMarcas.push(brand.MARCA);
        });
      });
  }

  onMailStatusEmmiter(e) {
    this.isContactFormInValid = e;
  }
  onWrongMailFocus() {
    window.scrollTo(0, 0);
  }
}
