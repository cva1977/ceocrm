
@Component({
  selector: 'app-oferta-af-ahorro',
  templateUrl: './oferta-af-ahorro.component.html',
  styleUrls: ['./oferta-af-ahorro.component.css']
})
export class OfertaAfAhorroComponent implements OnInit {
  @Input('ofertaAfiliado')ofertaAfiliado;
  constructor() { }

  ngOnInit() {
    registerLocaleData( es );
  }

}
