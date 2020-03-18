
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Input('regiones') regiones;
  @Input('marcadores') marcadores;
  @Input('colaboradores') colaboradores;
  @Input('lat') lat;
  @Input('lng') lng;

  public comercios:any=[];

  icon = {
    url: 'assets/images/company.png',
    scaledSize: {
      width: 20,
      height: 20
    }
}
icon_disabled = {
  url: 'assets/images/company_disabled.png',
  scaledSize: {
    width: 20,
    height: 20
  }
}
  constructor(public _firestoreservice: FirestoreService) {
    //const nuevoMarcador= new Marcador(-33.4372,-70.6506);
    //this.marcadores.push(nuevoMarcador);

   }

  ngOnInit() {




  }


}
