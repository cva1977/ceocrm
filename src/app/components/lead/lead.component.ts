
const datePipe = new DatePipe('es-Cl');
@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements  OnInit, OnDestroy {
  @ViewChild('divRequiredSelect', {static: false}) divRequiredSelect: ElementRef;

public lead:any =[];
public estados:any=[];
public contexto:any=[];
navigationSubscription;
rut: any =[];
user: any;
public requiredOpcion: string;

constructor(private formBuilder: FormBuilder, public _firestoreservice: FirestoreService,private _route: Router,
  private route:ActivatedRoute,  private authService: AuthService) {
  this.navigationSubscription = this._route.events.subscribe((e: any) => {
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      this.initialiseInvites();
    }
  });
 }

initialiseInvites() {
    const id= this.route.snapshot.params.id;
    let data={
      nuevo : 0
    };
    this.user = this.authService.isUserLoggedIn();
    this._firestoreservice.getUsuarios_cla(this.user.email.toUpperCase()).subscribe(
      (resp:any)=>{
          if (this.rut=resp.payload.data().NIVEL_ACCESO == 3){
            this._firestoreservice.updateLeadNuevo(id,data);
          }
        });



    if(id !== 'nuevo'){
        this._firestoreservice.getEstados().subscribe((estadosSnapShot:any)=>{
          this.estados=[];
          estadosSnapShot.forEach((estado : any)=>{
            this.estados.push({
              id: estado.payload.doc.id,
              data: estado.payload.doc.data()
            });
          });
        });

        let lead1 = [];
        this._firestoreservice.getLead(id).subscribe((resp: any)=>{

         lead1.push({
          id: id,
          fecha: resp.payload.data().fecha,
          rut: resp.payload.data().rut,
          nombre: resp.payload.data().nombre,
          phone_number: resp.payload.data().phone_number,
          comuna: resp.payload.data().comuna,
          email: resp.payload.data().email,
          id_estado: resp.payload.data().id_estado,
          observaciones: resp.payload.data().observaciones,
          form_id: resp.payload.data().form_id,
          created_time: datePipe.transform(resp.payload.data().created_time.toDate().toString(), 'short'),
          id_solicitud:  resp.payload.data().id,
          timestamp:  resp.payload.data().timestamp


        });
        this.lead= lead1[0];
        if(typeof this.lead.form_id == 'undefined'){
          return;
        }
        this._firestoreservice.getContexto(this.lead.form_id).subscribe((estadosSnapShot:any)=>{
          this.contexto=[];
          estadosSnapShot.forEach((ctx : any)=>{
            this.contexto.push({
              id: ctx.payload.doc.id,
              data: ctx.payload.doc.data()
            });
          });
        });
        });
    }
  }


public guardar(form: NgForm){


  Swal.fire({
    title: 'Espera',
    text:'Actualizando InformaciÃ³n',
    type: 'info',
    allowOutsideClick: false
    });
    Swal.showLoading();

  if(form.controls.id.value!==''){
    this.user = this.authService.isUserLoggedIn();
    this._firestoreservice.getUsuarios_cla(this.user.email.toUpperCase()).subscribe((resp:any)=>{this.rut=resp.payload.data().RUT;});

    let data={
      id_estado : form.controls.id_estado.value,
      email : form.controls.email.value,
      nombre : form.controls.nombre.value,
      phone_number : form.controls.phone_number.value,
      rut : form.controls.rut.value,
      observaciones: form.controls.observaciones.value,
      nuevo:0,
      gestionado:1,
      rut_gestion: this.rut
    };

    this._firestoreservice.updateLead(form.controls.id.value, data);
    Swal.fire({
      title: 'OK',
      text:'Se ActualizÃ³ correctamente',
      type: 'success'
    }).then(function() {

    });
  }



}

onChange(deviceValue){
    this.divRequiredSelect.nativeElement.style.display = 'none';
}

ngOnInit(){
}
ngOnDestroy():void {
  // avoid memory leaks here by cleaning up after ourselves. If we
  // don't then we will continue to run our initialiseInvites()
  // method on every navigationEnd event.
  if (this.navigationSubscription) {
     this.navigationSubscription.unsubscribe();
  }
}

}
