
@Component({
  selector: 'app-leads-ficha',
  templateUrl: './leads-ficha.component.html',
  styleUrls: ['./leads-ficha.component.css']
})
export class LeadsFichaComponent implements AfterViewInit {

  displayedColumns: string[] = ['status','fecha','rut','nombre','variable','asignado','tool'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
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
    , private dialog: MatDialog) {
      this.navigationSubscription = this._route.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });

  }

  ngAfterViewInit(){
    this._firestoreservice.getLeadsAll2().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

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
            var {nuevo} = empresa.payload.data()
            var {gestionado} = empresa.payload.data()
            if (nuevo == 1 && gestionado == 0){
              this.leadsNuevos++;
            }else if (nuevo == 0 && gestionado == 0){
              this.leadsPendientes++;
            }else{
              this.leadsGestionados++;
            }
        });


          });
        }
       });





   }


  onLead(id){

    this._route.navigate(['lead', id]);
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
