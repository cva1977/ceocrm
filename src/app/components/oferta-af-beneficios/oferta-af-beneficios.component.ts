
@Component({
  selector: 'app-oferta-af-beneficios',
  templateUrl: './oferta-af-beneficios.component.html',
  styleUrls: ['./oferta-af-beneficios.component.css']
})
export class OfertaAfBeneficiosComponent implements OnInit {
  @Input('ofertaAfiliado')ofertaAfiliado;
  constructor() { }

  ngOnInit() {
    registerLocaleData( es );
  }

}
