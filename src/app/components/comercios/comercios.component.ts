
@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.css']
})
export class ComerciosComponent implements OnInit {
@Input('comercios')comercios;

  constructor(public _firestoreservice: FirestoreService) {


  }

  ngOnInit() {
  }


}
