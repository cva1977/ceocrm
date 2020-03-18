
@Component({
  selector: 'app-referidos-auto-lista',
  templateUrl: './referidos-auto-lista.component.html',
  styleUrls: ['./referidos-auto-lista.component.css']
})
export class ReferidosAutoListaComponent implements OnInit {
  public misReferidos: any = [];
  user: any;
  rut: any;
  navigationSubscription;
  constructor(public _firestoreservice: FirestoreService, private _route: Router, private _auth: AuthService) {
    this.navigationSubscription = this._route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

initialiseInvites() {
  this.user = this._auth.isUserLoggedIn();

  this._firestoreservice.getUsuarios_cla(this.user.email.toUpperCase()).subscribe(
    (resp: any) => {
      this.rut = resp.payload.data().RUT;
      this._firestoreservice.getReferidosAutoAll(this.rut).subscribe((referidoSnapShot: any) => {
        this.misReferidos = [];
        referidoSnapShot.forEach((referidos: any) => {
          this.misReferidos.push({
            id: referidos.payload.doc.id,
            data: referidos.payload.doc.data()
          });
        });
      });
    });
}

ngOnInit() {
  registerLocaleData( es );
}

}
