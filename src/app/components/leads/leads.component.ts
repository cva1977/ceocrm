
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit, OnDestroy {
public notificaciones: any = [];
user: any;
rut: any;
ejecutivos: any;
quien: any;
nivel_acceso: any;
public leadsNuevos: number;
public leadsPendientes: number;
public leadsGestionados: number;
navigationSubscription;

  constructor(public _firestoreservice: FirestoreService, private _route: Router, private _auth: AuthService
    ) {
      this.navigationSubscription = this._route.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
    }

initialiseInvites(){
    this.user = this._auth.isUserLoggedIn();

    this.leadsPendientes = 0;
    this.leadsGestionados = 0;
    this.leadsNuevos=0;

    this._firestoreservice.getUsuarios_cla(this.user.email.toUpperCase()).subscribe(
     (resp: any) => {
         this.rut = resp.payload.data().RUT;
         this.nivel_acceso = resp.payload.data().NIVEL_ACCESO;

     //if (this.rut=13242511) this.rut=9074545;
        if ( this.nivel_acceso == 4 ){

          this._firestoreservice.getmisejecutivos(this.rut).subscribe((ejecutivoSnapShot: any) => {
            this.ejecutivos = [];

            ejecutivoSnapShot.forEach((ejecutivo : any) => {


              this.ejecutivos.push({
                id: ejecutivo.payload.doc.id,
                data: ejecutivo.payload.doc.data()
              });

          });

          this._firestoreservice.getLeadsAll(this.rut).subscribe((notificacionSnapShot: any) => {
            this.notificaciones = [];
            this.leadsPendientes = 0;
    this.leadsGestionados = 0;
    this.leadsNuevos=0;
            notificacionSnapShot.forEach((empresa : any) => {
              this.notificaciones.push({
                id: empresa.payload.doc.id,
                data: empresa.payload.doc.data()
              });

              if (empresa.payload.doc.data().nuevo == 1 && empresa.payload.doc.data().gestionado == 0){
                this.leadsNuevos++;
              }else if (empresa.payload.doc.data().nuevo == 0 && empresa.payload.doc.data().gestionado == 0){
                this.leadsPendientes++;
              }else{
                this.leadsGestionados++;
              }

          });

            });
            });

          }else if ( this.nivel_acceso == 99){
          this._firestoreservice.getLeadsAll().subscribe((notificacionSnapShot: any) => {
            this.notificaciones = [];
            this.leadsPendientes = 0;
            this.leadsGestionados = 0;
            this.leadsNuevos=0;
            notificacionSnapShot.forEach((empresa : any) => {
              this.notificaciones.push({
                id: empresa.payload.doc.id,
                data: empresa.payload.doc.data()
              });
              if (empresa.payload.doc.data().nuevo == 1 && empresa.payload.doc.data().gestionado == 0){
                this.leadsNuevos++;
              }else if (empresa.payload.doc.data().nuevo == 0 && empresa.payload.doc.data().gestionado == 0){
                this.leadsPendientes++;
              }else{
                this.leadsGestionados++;
              }

          });

            });
         }
         else{
         this._firestoreservice.getLeads(this.rut).subscribe((notificacionSnapShot: any) => {
          this.notificaciones = [];
          this.leadsPendientes = 0;
          this.leadsGestionados = 0;
          this.leadsNuevos=0;
          notificacionSnapShot.forEach((empresa : any) => {
            this.notificaciones.push({
              id: empresa.payload.doc.id,
              data: empresa.payload.doc.data()
            });
            if (empresa.payload.doc.data().nuevo == 1 && empresa.payload.doc.data().gestionado == 0){
              this.leadsNuevos++;
            }else if (empresa.payload.doc.data().nuevo == 0 && empresa.payload.doc.data().gestionado == 0){
              this.leadsPendientes++;
            }else{
              this.leadsGestionados++;
            }
        });


          });
        }
       });





   }


  ngOnInit() {

    registerLocaleData( es );
  }
 onLead(id){

  this._route.navigate(['lead', id] , {skipLocationChange:true});
 }

 filterLead(tipoFiltro){
  if ( this.nivel_acceso == 99 ){
  this._firestoreservice.getLeadsByEstadoAll( tipoFiltro).subscribe((notificacionSnapShot: any) => {
    this.notificaciones = [];
    notificacionSnapShot.forEach((empresa : any) => {
      this.notificaciones.push({
        id: empresa.payload.doc.id,
        data: empresa.payload.doc.data()
      });

  });

    });}else if (this.nivel_acceso == 2 || this.nivel_acceso == 3)
    {

      this._firestoreservice.getLeadsByEstadoEjec(this.rut, tipoFiltro).subscribe((notificacionSnapShot: any) => {
        this.notificaciones = [];
        notificacionSnapShot.forEach((empresa : any) => {
          this.notificaciones.push({
            id: empresa.payload.doc.id,
            data: empresa.payload.doc.data()
          });

      });

        });

    }else{

      this._firestoreservice.getLeadsByEstado(this.rut, tipoFiltro).subscribe((notificacionSnapShot: any) => {
        this.notificaciones = [];
        notificacionSnapShot.forEach((empresa : any) => {
          this.notificaciones.push({
            id: empresa.payload.doc.id,
            data: empresa.payload.doc.data()
          });

      });

        })
    }
 }

 onChange(event){
  let dato = event.split('-');

  let data = {
    rut_colaborador: Number(dato[1])
  }

  this._firestoreservice.updateLead(dato[0], data);
  Swal.fire({
    title: 'OK',
    text: 'Reasignado Correctamente',
    type: 'success'
  }).then(function() {

}); ;
 }

 ngOnDestroy() {
  // avoid memory leaks here by cleaning up after ourselves. If we
  // don't then we will continue to run our initialiseInvites()
  // method on every navigationEnd event.
  if (this.navigationSubscription) {
     this.navigationSubscription.unsubscribe();
  }
}

}
