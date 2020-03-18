
const routes: Routes = [
{path: 'simulador', component: SimuladorBaseComponent, canActivate:[AuthGuard]},
{path: 'simulador_ext', component: SimuladorExternoComponent},
{path: 'empresa/:id', component: EmpresaComponent, canActivate:[AuthGuard]},
{path: 'empresas', component: EmpresasComponent, canActivate:[AuthGuard]},
{path: 'main-empresa', component: MainEmpresaComponent, canActivate:[AuthGuard]},
{path: 'referidos-pensionados', component: FormReferidosPensionadosComponent, canActivate:[AuthGuard]},
{path: 'referidos-auto-lista', component: ReferidosAutoListaComponent, canActivate:[AuthGuard]},
{path: 'referidos-seguro-auto', component: ReferidosSeguroCarComponent, canActivate: [AuthGuard]},
{path: 'pensionados', component: OutformpensionadosComponent},
{path: 'lead/:id', component: LeadComponent, canActivate:[AuthGuard], runGuardsAndResolvers: 'always'},
{path: 'leads', component: LeadsComponent, canActivate:[AuthGuard]},
{path: 'leads-ficha', component: LeadsFichaComponent, canActivate:[AuthGuard]},
{path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
{path: 'buscar/:id', component: BuscarComponent, canActivate:[AuthGuard], runGuardsAndResolvers: 'always'},
{path: 'buscar_afiliado/:id', component: BuscarAfiliadoComponent, canActivate:[AuthGuard], runGuardsAndResolvers: 'always'},
{path: 'login', component: LoginComponent},
{path: 'admin-roles', component: AdminRolesComponent, canActivate:[AuthGuard]},
{path: 'modificar-usuario/:id', component: ModificarUsuarioComponent, canActivate:[AuthGuard], runGuardsAndResolvers: 'always'},
{path: 'crear-usuario', component: CrearUsuarioComponent, canActivate:[AuthGuard]},
{path:'**', pathMatch:'full', redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true,onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
