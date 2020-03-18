
@Component({
  selector: 'app-ppff-ahorro',
  templateUrl: './ppff-ahorro.component.html',
  styleUrls: ['./ppff-ahorro.component.css']
})
export class PpffAhorroComponent implements OnInit {
  @Input('empresas')empresas;
  @Input('usoAhorro')usoAhorro;
  constructor() { }

  ngOnInit() {
    registerLocaleData( es );
  }

}
