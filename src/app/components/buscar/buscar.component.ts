
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy {
  public usoPPFF: any =[];
  public usoCredito: any =[];
  public usoAhorro: any =[];
  public usoBBSS: any =[];
  public usoOferta: any =[];
  public usoOferta2: any =[];
  public usoOferta3: any =[];
  public empresas: any =[];
  public bss: any =[];
  public userPerfil: any;
  public data: any;
  navigationSubscription;
  user: any;
  constructor(public _firestoreservice: FirestoreService,private _route: Router,
    private route:ActivatedRoute,  private authService: AuthService) {


      this.user = this.authService.isUserLoggedIn();

      this._firestoreservice.getUsuarios_cla(this.user.email).subscribe((resp:any)=>{
        if (resp){
          if (resp.payload.data().ES_EJEC==0){
            this.logoutUser();
            this._route.navigate([`/login`]);
            return;
          }
        }
       });
    this.navigationSubscription = this._route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
   }

   initialiseInvites() {
    const id= this.route.snapshot.paramMap.get('id');
    this.userPerfil = this.authService.isUserLoggedInPerfil();
    let time = new Date();

    let mes='0'+ (time.getMonth()+1).toString();
    let dia='0'+ (time.getDate()).toString();

    this.data={
      "rut_busqueda": parseInt(id),
      "rut_colaborador":parseInt(this.userPerfil.RUT),
      "email":this.userPerfil.EMAIL.toLowerCase(),
      "timestamp":parseInt(time.getTime().toString().substr(0,10)),
      "periodo": parseInt(time.getFullYear()+ mes.substring(mes.length, mes.length - 2)),
      "fecha":parseInt(time.getFullYear()+ mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
      "query":"empresa",
      "modulo":"BuscarComponent"

    };
   this._firestoreservice.createLog('cla_scanner_log',this.data);


    this._firestoreservice.getEmpresa_cla(id).subscribe((empresa:any)=>{
      this.empresas=[];
       this.empresas.push({
        id: empresa.payload.id,
        data: empresa.payload.data()
      })

  });


  this._firestoreservice.getEmpresa_cla_credito(id).subscribe((creditoSnapShot:any)=>{
    this.usoCredito=[];

    creditoSnapShot.forEach((empresa : any)=>{
      this.usoCredito.push({
        id: empresa.payload.doc.id,
        data: empresa.payload.doc.data()
      });

  });
});

this._firestoreservice.getEmpresa_cla_ahorro(id).subscribe((ahorroSnapShot:any)=>{
  this.usoAhorro=[];

  ahorroSnapShot.forEach((empresa : any)=>{
    this.usoAhorro.push({
      id: empresa.payload.doc.id,
      data: empresa.payload.doc.data()
    });

});
});

    this._firestoreservice.getEmpresas_cla_beneficios(id).subscribe((bssSnapShot:any)=>{

      this.usoBBSS=[];
      bssSnapShot.forEach((bss : any)=>{


        this.usoBBSS.push({
          id: bss.payload.doc.id,
          data: bss.payload.doc.data()
        });
    });

  }
    );
    this._firestoreservice.getEmpresas_cla_oferta(id,'Crédito').subscribe((bssSnapShot:any)=>{

      this.usoOferta=[];
      bssSnapShot.forEach((oferta : any)=>{


        this.usoOferta.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });

    });


  }
    );

    this._firestoreservice.getEmpresas_cla_oferta(id,'Ahorro').subscribe((bssSnapShot:any)=>{

      this.usoOferta2=[];
      bssSnapShot.forEach((oferta : any)=>{


        this.usoOferta2.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });

    });


  }
    );


    this._firestoreservice.getEmpresas_cla_oferta(id,'Beneficios').subscribe((bssSnapShot:any)=>{

      this.usoOferta3=[];
      bssSnapShot.forEach((oferta : any)=>{


        this.usoOferta3.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });

    });


  }
    );

  }

  ngOnInit(){

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
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}



