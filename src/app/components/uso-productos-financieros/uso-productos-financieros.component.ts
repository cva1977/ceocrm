
@Component({
  selector: 'app-uso-productos-financieros',
  templateUrl: './uso-productos-financieros.component.html',
  styleUrls: ['./uso-productos-financieros.component.css']
})

export class UsoProductosFinancierosComponent implements OnInit {
  @Input('empresas')empresas;
  @Input('usoCredito')usoCredito;
  @Input('usoAhorro')usoAhorro;

  constructor() {


  }

  ngOnInit() {
    registerLocaleData( es );
  }

}
