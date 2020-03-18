@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  public usoPPFF: any =[];
  public usoCredito: any =[];
  public usoAhorro: any =[];

  public usoBBSS: any =[];
  public usoOferta: any =[];
  public usoOferta2: any =[];
  public usoOferta3: any =[];
  public empresas: any =[];
  public bss: any =[];
  user: any;
  constructor(public _firestoreservice: FirestoreService, private route:ActivatedRoute,private _route: Router, private authService: AuthService) {
    const id= this.route.snapshot.paramMap.get('id');




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

this._firestoreservice.getEmpresa_cla_ahorro(id).subscribe((creditoSnapShot:any)=>{
  this.usoAhorro=[];

  creditoSnapShot.forEach((empresa : any)=>{
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

 }


