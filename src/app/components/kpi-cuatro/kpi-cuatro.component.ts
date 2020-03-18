
@Component({
  selector: 'app-kpi-cuatro',
  templateUrl: './kpi-cuatro.component.html',
  styleUrls: ['./kpi-cuatro.component.css']
})
export class KpiCuatroComponent implements OnInit {
  @Input('empresas')empresas;
  constructor() { }

  ngOnInit() {
  }

}
