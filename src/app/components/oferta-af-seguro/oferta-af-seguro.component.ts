
@Component({
  selector: 'app-oferta-af-seguro',
  templateUrl: './oferta-af-seguro.component.html',
  styleUrls: ['./oferta-af-seguro.component.css']
})
export class OfertaAfSeguroComponent implements OnInit {
  @Input('ofertaAfiliado')ofertaAfiliado;
  constructor() { }

  ngOnInit() {
    registerLocaleData( es );
  }

}
