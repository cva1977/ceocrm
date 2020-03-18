
@Component({
  selector: 'app-ppff-seguro',
  templateUrl: './ppff-seguro.component.html',
  styleUrls: ['./ppff-seguro.component.css']
})
export class PpffSeguroComponent implements OnInit {
  @Input('empresas')empresas;
  constructor() { }

  ngOnInit() {
    registerLocaleData( es );
  }

}
