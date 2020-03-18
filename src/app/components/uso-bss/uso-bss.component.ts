
@Component({
  selector: 'app-uso-bss',
  templateUrl: './uso-bss.component.html',
  styleUrls: ['./uso-bss.component.css']
})
export class UsoBssComponent implements OnInit {
  @Input('usoBBSS')usoBBSS;

  constructor() {


  }

  ngOnInit() {
    registerLocaleData( es );
  }

}
