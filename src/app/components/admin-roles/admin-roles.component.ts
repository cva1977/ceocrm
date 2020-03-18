
@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.css']
})
export class AdminRolesComponent implements OnInit {
  displayedColumns: string[] = ['rut','nombre','email','modifica', 'elimina'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(
    public firestoreservice: FirestoreService,
    private router: Router) {

    }

  ngOnInit() {
    this.firestoreservice.getUsuariosAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
  }
  onSubmit(){


  }
  onModificar(id){
    this.router.navigate(['modificar-usuario', id], { skipLocationChange : true});
  }

   onEliminar(id) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro de eliminar el usuario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: 'No, Mantenerlo'
    }).then((result) => {
      if (result.value) {
        this.firestoreservice.deleteUsuario(id.toUpperCase());
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        )
      }
    });

    this.router.navigate([`/admin-roles`]);
   }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
