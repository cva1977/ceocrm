
@Component({
  selector: 'app-oferta-af-seguro-auto',
  templateUrl: './oferta-af-seguro-auto.component.html',
  styleUrls: ['./oferta-af-seguro-auto.component.css']
})
export class OfertaAfSeguroAutoComponent implements OnInit {
  @Input('ofertaAfiliado')ofertaAfiliado;
  constructor() { }

  ngOnInit() {
    registerLocaleData( es );
  }

}
