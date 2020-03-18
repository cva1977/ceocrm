@Component({
  selector: 'app-buscar-afiliado',
  templateUrl: './buscar-afiliado.component.html',
  styleUrls: ['./buscar-afiliado.component.css']
})
export class BuscarAfiliadoComponent implements OnInit,OnDestroy {
  public ofertaCredito: any =[];
  public ofertaAhorro: any =[];
  public ofertaBeneficios: any =[];
  public ofertaAprobPrecal: any =[];
  public ofertaSeguros: any =[];
  public afiliados: any =[];
  public mora: any=[];
  public bss: any =[];
  public data: any;
  public moraTotal: number;
  public moraN: number;
  navigationSubscription;
  public userPerfil: any;
  public ofertSeguroAuto: any =[];
  public gestorCampana: any =[];
  public uf: any =[];
  public uf_valor: any =[];
  public uf_fecha: any =[];
  user: any;
  constructor(public _firestoreservice: FirestoreService,private _route: Router,
              private route:ActivatedRoute,  private authService: AuthService, private http: HttpClient) {

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
    let fechaString = time.getFullYear()+'-'+ mes.substring(mes.length, mes.length - 2)  +'-'+ dia.substring(dia.length, dia.length - 2);

    this.data={
      "rut_busqueda": parseInt(id),
      "rut_colaborador":parseInt(this.userPerfil.RUT),
      "email":this.userPerfil.EMAIL.toLowerCase(),
      "timestamp":parseInt(time.getTime().toString().substr(0,10)),
      "periodo": parseInt(time.getFullYear()+ mes.substring(mes.length, mes.length - 2)),
      "fecha":parseInt(time.getFullYear()+ mes.substring(mes.length, mes.length - 2)  + dia.substring(dia.length, dia.length - 2)) ,
      "query":"afiliado",
      "modulo":"BuscarAfiliadoComponent"

    };
    this._firestoreservice.createLog('cla_scanner_log',this.data);


    this._firestoreservice.getAfiliado_cla(id).subscribe((afiliado:any)=>{
      this.afiliados=[];
      this.afiliados.push({
        id: afiliado.payload.id,
        data: afiliado.payload.data()
      });

  });

    this._firestoreservice.getMora_cla(id.toString()).subscribe((moras:any)=>{
  this.mora=[];
  this.moraTotal=0;
  this.moraN=0;

  moras.forEach((oferta : any)=>{
    this.mora.push({
      id: oferta.payload.doc.id,
      data: oferta.payload.doc.data()
    });
    this.moraTotal  =  this.moraTotal + parseInt(oferta.payload.doc.data().MORA_OP);
    this.moraN++;
  });
});

/***************NUEVOS SERVICIOS */
this._firestoreservice.getAfiliados_cla_ofertas_aprobados(id.toString()).subscribe((aprob:any)=>{
  this.ofertaAprobPrecal=[];

  aprob.forEach((oferta : any)=>{
    this.ofertaAprobPrecal.push({
      id: oferta.payload.doc.id,
      data: oferta.payload.doc.data()
    });
  });
});

this._firestoreservice.getAfiliados_cla_ofertas_efi(id.toString()).subscribe((aprob:any)=>{
  this.ofertaCredito=[];

  aprob.forEach((oferta : any)=>{
    this.ofertaCredito.push({
      id: oferta.payload.doc.id,
      data: oferta.payload.doc.data()
    });
  });
});


    this._firestoreservice.getAfiliados_cla_ofertas(id,'Ahorro').subscribe((bssSnapShot:any)=>{

      this.ofertaAhorro=[];
      bssSnapShot.forEach((oferta : any)=>{
        this.ofertaAhorro.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });
    });
  });


    this._firestoreservice.getAfiliados_cla_ofertas(id,'Beneficios').subscribe((bssSnapShot:any)=>{

      this.ofertaBeneficios=[];
      bssSnapShot.forEach((oferta : any)=>{


        this.ofertaBeneficios.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });

    });


  }
    );



    this._firestoreservice.getAfiliados_cla_ofertas(id,'Seguros').subscribe((bssSnapShot:any)=>{
      this.ofertaSeguros=[];
      bssSnapShot.forEach((oferta : any)=>{
        this.ofertaSeguros.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });
    });
    }
    );




    this._firestoreservice.getCampanaSeguroAuto(id.toString()).subscribe((segAuto:any)=>{
      this.ofertSeguroAuto=[];
      let correoPersona: string;
      this.gestorCampana=[];


      segAuto.forEach((oferta : any)=>{
        this.ofertSeguroAuto.push({
          id: oferta.payload.doc.id,
          data: oferta.payload.doc.data()
        });
        correoPersona  =  oferta.payload.doc.data().CORREO_PERSONA;
      });

      this._firestoreservice.getGestorCampana(correoPersona).subscribe((campanaAuto:any)=>{
        campanaAuto.forEach((campana : any)=>{
          this.gestorCampana.push({
            id: campana.payload.doc.id,
            data: campana.payload.doc.data()
          });

      });

      }
      );
    });



    this._firestoreservice.getUf(fechaString).subscribe((ufSnap:any)=>{
      ufSnap.forEach((uf : any)=>{
        this.uf_valor =parseFloat(uf.payload.doc.data().UF);
        this.uf_fecha =uf.payload.doc.data().FECHA;
      });
    });
  // Making the HTTP Request
  // tslint:disable-next-line: align

 /* this.http
  .get('https://mindicador.cl/api')
  .subscribe(data => {
    // Read the result field from the JSON response.
    this.uf = data;

  });*/


  }

  ngOnInit() {


  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
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


}
