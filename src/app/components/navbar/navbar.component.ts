@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  stateCtrl = new FormControl();
  public empresas: any =[];
  loggedIn: boolean;
  user: any;
  userPerfil: any;
  responseMessage: string = '';
  responseMessageType: string = '';
  navigationSubscription;
  searchterm: string;
  tipo: any;
  startAt = new Subject();
  endAt = new Subject();
  public myRadio : any;
  public emps:any ;
  public allemps: any;
  totales: number;
  notifica: any;
  value: any;
  ok:any;
  rut:any;
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  ejecutivos: any;
  quien:any;
  nivel_acceso:any;
  notificaciones:any;
  campaign: any;
  constructor(public _firestoreservice: FirestoreService, private _route: Router, private _auth: AuthService) {


    this.navigationSubscription = this._route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });


  }
  initialiseInvites(){
  this.user = this._auth.isUserLoggedIn();

   this._firestoreservice.getUsuarios_cla(this.user.email.toUpperCase()).subscribe(
    (resp:any)=>{
        localStorage.setItem('user_perfil', JSON.stringify(resp.payload.data()));
        this.userPerfil = this._auth.isUserLoggedInPerfil();
        this.rut=resp.payload.data().RUT;
        this.nivel_acceso=resp.payload.data().NIVEL_ACCESO;
        //if (this.rut=13242511) this.rut=13896549;
        if (this.nivel_acceso==4 ){
          this._firestoreservice.getmisejecutivos(this.rut).subscribe((ejecutivoSnapShot:any)=>{
            this.ejecutivos=[];


            ejecutivoSnapShot.forEach((ejecutivo : any)=>{

              this.ejecutivos.push({
                id: ejecutivo.payload.doc.id,
                data: ejecutivo.payload.doc.data()
              });

          });

          this._firestoreservice.getNotificationsCountAll(this.rut).subscribe((total:any)=>{
            this.totales=total.length;

           });


           this._firestoreservice.getNotificationsAll(this.rut).subscribe((bssSnapShot:any)=>{
            this.notifica=[];
            bssSnapShot.forEach((oferta : any)=>{
              this.notifica.push({
                id: oferta.payload.doc.id,
                data: oferta.payload.doc.data()
              });
          });

          }
          );



            });






        }else if( this.nivel_acceso==99){
          this._firestoreservice.getNotificationsCountAll().subscribe((total:any)=>{
            this.totales=total.length;
           });


           this._firestoreservice.getNotificationsAll().subscribe((bssSnapShot:any)=>{
            this.notifica=[];

            bssSnapShot.forEach((oferta : any)=>{
            this._firestoreservice.getCampaign('1').subscribe(
                (dataCampaign: any)=>{
                 this.campaign= dataCampaign.payload.data().nombre

                }

              );

              this.notifica.push({
                id: oferta.payload.doc.id,
                data: oferta.payload.doc.data(),
                lead: this.campaign
              });
          });

            });
         }else{
        this._firestoreservice.getNotificationsCount(this.rut).subscribe((total:any)=>{
          this.totales=total.length;

         });

            this._firestoreservice.getNotifications(this.rut).subscribe((bssSnapShot:any)=>{
                this.notifica=[];
                bssSnapShot.forEach((oferta : any)=>{
                  this.notifica.push({
                    id: oferta.payload.doc.id,
                    data: oferta.payload.doc.data()
                  });
              });

              }
              );
            }
      });

  this.loggedIn=(this.user!=null);

  }



  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
  isUserLoggedInPerfil() {
    return  JSON.parse(localStorage.getItem('user_perfil'));
  }

  clearSearchInput(){
    this.searchInput.nativeElement.value = '';
 }
ngOnInit() {
    this.myRadio = "2";

  combineLatest(this.startobs, this.endobs).subscribe((value:any) => {
    if (this.userPerfil.NIVEL_ACCESO==2){
      this.tipo=2;
    }
    if (this.userPerfil.NIVEL_ACCESO==3){
      this.tipo=3;
    }
    if(this.tipo==2){
      this._firestoreservice.searchEmpresa(value[0]).subscribe((resp:any)=>{
        this.allemps = resp;
      });
    }
    if(this.tipo==3){
      this._firestoreservice.searchAfiliado(value[0]).subscribe((resp:any)=>{
        this.allemps = resp;
      });
    }
  });
}
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  logout(){
    this._auth.logout()
    .then(res => {
      this.user = undefined;
      this.loggedIn=false;
      localStorage.removeItem('user');
      localStorage.removeItem('user_perfil');
      this._route.navigate([`/login`]);

    }, err => {
      this.showMessage("danger", err.message);
    });

  }

  public buscarEmpresa(texto: string){
    if (texto.length==0){
      return;
    }

    this._route.navigate(['buscar',texto], {skipLocationChange:true});


  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  search($event,form: NgForm) {
    let q = $event.target.value;
    let radio =form.value;
    this.tipo=radio.tipo;
    if (q != '') {
      this.startAt.next(q.toUpperCase());
      this.endAt.next(q.toUpperCase() + "\uf8ff");
    }
    else {
      this.emps = this.allemps;
    }
  }

  onEnter($event){
    let q = $event.source.value;
    if (this.userPerfil.NIVEL_ACCESO==2){
      this.tipo=2;
    }
    if (this.userPerfil.NIVEL_ACCESO==3){
      this.tipo=3;
    }


    if (this.tipo==2){
      this._route.navigate(['buscar',q], {skipLocationChange: true});
    }
    if (this.tipo==3){
       this._route.navigate(['buscar_afiliado',q], {skipLocationChange: true});
    }



  }
  showLead(id){

       this._route.navigate(['lead',id], {skipLocationChange: true});

  }


}
