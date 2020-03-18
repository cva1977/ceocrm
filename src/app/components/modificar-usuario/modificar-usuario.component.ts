
@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit, OnDestroy {
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
    this.modificarForm = this.formBuilder.group(
      {
        rut: new FormControl(' '),
        email: new FormControl({value: 'dummy@dummy.cl'}, [Validators.email, Validators.required]),
        nombres: new FormControl('',[Validators.required]),
        apellido_paterno: new FormControl('',[Validators.required]),
        apellido_materno: new FormControl('',[Validators.required]),
        puesto_real: new FormControl('',[Validators.required]),
        es_ejec: new FormControl(),
        sucursal: ['', Validators.required],
        nivel_acceso: new FormControl('',[Validators.required]),
      });
    this.firestoreservice.getUsuarios_cla(id).subscribe((usuarioDoc: any) => {
          const usuario1 = [];
          usuario1.push({
            rut: usuarioDoc.payload.data().RUT,
            email: usuarioDoc.payload.data().EMAIL,
            nombres: usuarioDoc.payload.data().NOMBRES,
            apellido_paterno: usuarioDoc.payload.data().APELLIDO_PATERNO,
            apellido_materno: usuarioDoc.payload.data().APELLIDO_MATERNO,
            puesto_real: usuarioDoc.payload.data().PUESTO_REAL,
            es_ejec: usuarioDoc.payload.data().ES_EJEC,
            sucursal: usuarioDoc.payload.data().SUCURSAL,
            nivel_acceso: usuarioDoc.payload.data().NIVEL_ACCESO
          });

          this.usuario = usuario1[0];

          if (this.usuario.es_ejec === 1 ) {
            this.Ischecked = true;
          } else {
            this.Ischecked = false;
          }
          this.selected = this.usuario.nivel_acceso;
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

    const data = {
      RUT: f.value.rut,
      EMAIL: f.value.email,
      NOMBRES: f.value.nombres,
      APELLIDO_PATERNO: f.value.apellido_paterno,
      APELLIDO_MATERNO: f.value.apellido_materno,
      PUESTO_REAL: f.value.puesto_real,
      ES_EJEC: (f.value.es_ejec ? 1 : 0),
      SUCURSAL: f.value.sucursal,
      NIVEL_ACCESO: parseInt(f.value.nivel_acceso),
      MARCA_VIGENCIA: 'S'
    };

    this.firestoreservice.updateUsuario(data.EMAIL, data);

    Swal.fire({
      title: 'OK',
      text: 'Usuario ha sido actualizado',
      type: 'success'
    }).then(() => {});

    this.router.navigate([`/admin-roles`]);
  }

  get modForm() {
    return this.modificarForm.controls;
  }

  modelChange($event) {
    /*if ($event) {
      this.usuario.es_ejec = 1;
    } else {
      this.usuario.es_ejec = 0;
    }*/
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
