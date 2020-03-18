
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marcador: Marcador[]= [];
  colaborador: Colaborador[]= [];
  public regiones:any=[];
  public comercio:any=[];
  public empresas: any =[];
  userPerfil: any;
  user: any;
  codigoSucursal: any;
  lat=-33.4372;
  lng=-70.6506;
  constructor(public _firestoreservice: FirestoreService, private authService: AuthService,private _route: Router,
    private route:ActivatedRoute) {


    this._firestoreservice.getSucursales().subscribe( (mapaSnapShot)=>{

      mapaSnapShot.forEach((mapaData: any)=>{


        this.marcador.push(new Marcador(mapaData.payload.doc.data().latitud, mapaData.payload.doc.data().longitud,
         mapaData.payload.doc.data().sucursal,mapaData.payload.doc.data().direccion,mapaData.payload.doc.data().estado_sucursal));

     })

  });
    this._firestoreservice.getRegiones().subscribe((regionesSnapShot:any)=>{
      this.regiones=[];
      regionesSnapShot.forEach((region : any)=>{
        this.regiones.push({
          id: region.payload.doc.id,
          data: region.payload.doc.data()
        });
    });
  }
    );




    this.user = this.authService.isUserLoggedIn();

    this._firestoreservice.getUsuarios_cla(this.user.email).subscribe((resp:any)=>{
      if (resp){
        if (resp.payload.data().ES_EJEC==0){
          this.logoutUser();
          this._route.navigate([`/login`]);
          return;
        }else{
          this._route.navigate([`/home`]);
        }
      }
     });

    this._firestoreservice.getUsuarios_cla(this.user.email.toUpperCase()).subscribe(
      (resp: any) => {
        this.codigoSucursal = resp.payload.data().CODIGO_SUCURSAL;
      });



   }

  ngOnInit() {



  }
  logoutUser() {
    this.authService.logout()
      .then(res => {

        //this.userDetails = undefined;
      //  this.userPerfil= undefined;
        localStorage.removeItem('user');
        localStorage.removeItem('user_perfil');

      }, err => {
        //this.showMessage("danger", err.message);
      });
  }
  public seleccionaRegion(region: any){
    this._firestoreservice.getCentrar(region.value).subscribe((regionesSnapShot:any)=>{

      regionesSnapShot.forEach((region : any)=>{
        this.lat=region.payload.doc.data().latitud;
        this.lng=region.payload.doc.data().longitud;

    });
    this._firestoreservice.getComercios(region.value).subscribe((comercioSnapShot:any)=>{
      this.comercio=[];
      comercioSnapShot.forEach((comercio : any)=>{
        this.comercio.push({
          id: comercio.payload.doc.id,
          data: comercio.payload.doc.data()
        });
    });

    }
    );
});
 }

}
