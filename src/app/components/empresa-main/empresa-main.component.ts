
@Component({
  selector: 'app-empresa-main',
  templateUrl: './empresa-main.component.html',
  styleUrls: ['./empresa-main.component.css']
})
export class EmpresaMainComponent implements OnInit {
  @Input('empresas')empresas;
  @Input('empresas2')empresas2;
  constructor(public _firestoreservice: FirestoreService) {


  }

  ngOnInit() {
  }

}
