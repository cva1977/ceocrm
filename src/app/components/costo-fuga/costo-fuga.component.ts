
@Component({
  selector: 'app-costo-fuga',
  templateUrl: './costo-fuga.component.html',
  styleUrls: ['./costo-fuga.component.css']
})
export class CostoFugaComponent implements OnInit {
  @Input('empresas')empresas;
  constructor() { }

  ngOnInit() {
  }

}
