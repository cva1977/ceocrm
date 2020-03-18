

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  @ViewChild('displayForm', {static: false}) displayForm: ElementRef;
  modificarForm;
  submitted = false;
  usuario: any = [];
  Ischecked: boolean;
  allemps: any;
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  emps: any;
  nivelAcceso: any;
  selected: any;
  navigationSubscription;
  searchForm;
  userExist = false;
  lengthRut = false;
  emailUsuerExist: any;
  sufijo: '@cajalosandes.cl';

  constructor(
    private formBuilder: FormBuilder,
    public firestoreservice: FirestoreService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
    }

initialiseInvites() {
    const id = this.route.snapshot.paramMap.get('id');
    this.searchForm = this.formBuilder.group(
      {rut: new FormControl('', [Validators.required, RutValidator.validaRut]),
    });
    this.modificarForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required]),
        nombres: new FormControl('', [Validators.required]),
        apellido_paterno: new FormControl('', [Validators.required]),
        apellido_materno: new FormControl('', [Validators.required]),
        puesto_real: new FormControl('', [Validators.required]),
        es_ejec: new FormControl(''),
        sucursal: ['', Validators.required],
        nivel_acceso: new FormControl('', [Validators.required]),
        sufijo: new FormControl('@cajalosandes.cl', [Validators.required]),
      });

    combineLatest(this.startobs, this.endobs).subscribe((value: any) => {
        this.firestoreservice.searchSucursal(value[0]).subscribe((resp: any) => {
          this.allemps = resp;
        });
    });

    this.nivelAcceso = [
      {acceso: 1, name: 'Afiliado y Empresa'},
      {acceso: 2, name: 'Empresa'},
      {acceso: 3, name: 'Afiliado'},
    ];


  }

  public onSubmit(f: NgForm){
    this.submitted = true;
    if (this.modificarForm.invalid) {
      return;
    }
console.log(f.value.email.toUpperCase() || f.value.sufijo.toUpperCase() );
    const data = {
      RUT: parseInt(this.usuario.rut),
      EMAIL: f.value.email.toUpperCase(),
      NOMBRES: f.value.nombres.toUpperCase(),
      APELLIDO_PATERNO: f.value.apellido_paterno.toUpperCase(),
      APELLIDO_MATERNO: f.value.apellido_materno.toUpperCase(),
      PUESTO_REAL: f.value.puesto_real.toUpperCase(),
      ES_EJEC: (f.value.es_ejec ? 1 : 0),
      SUCURSAL: f.value.sucursal.toUpperCase(),
      NIVEL_ACCESO: parseInt(f.value.nivel_acceso),
      MARCA_VIGENCIA: 'S',
      DV:this.usuario.dv
    };

    //this.firestoreservice.addUsuario(f.value.email.toUpperCase(), data);

    Swal.fire({
      title: 'OK',
      text: 'Usuario ha sido Ingresado',
      type: 'success'
    }).then(() => {});

    this.router.navigate([`/admin-roles`]);
  }

  modelChange($event) {
  }

  onEnter( $event ) {
    let q = $event.source.value;
  }

  search($event) {
    let q = $event.target.value;

    if (q !== '') {
      this.startAt.next(q.toUpperCase());
      this.endAt.next(q.toUpperCase() + '\uf8ff');
    } else {
      this.emps = this.allemps;
    }
  }

  onSubmitRut() {
    this.userExist = false;
    if (this.searchForm.invalid) {
      return;
    }
    const formData = this.searchForm.value;

    let rut = this.searchForm.value.rut;
    let dv = rut.substring(rut.length - 1, rut.length);
    this.lengthRut = (rut.length > 6 ? true : false);

    rut = String(rut).replace('.', '').substring(0, String(rut).replace('.', '').length - 2);
    this.usuario.rut = rut;
    this.usuario.dv = dv;

    this.firestoreservice.getUsuariosByRut(rut).subscribe((users: any) => {
      users.forEach((user: any) => {
        if (user.payload.doc.exists) {
          this.userExist = true;
          this.emailUsuerExist = user.payload.doc.data().EMAIL;
          console.log(this.emailUsuerExist);
          return;
        }
      });
    });
  }


keyPress(event: any) {
  this.modificarForm.reset();
  this.userExist = false;
  this.lengthRut = false;
}

ngOnInit() {

}

 ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
