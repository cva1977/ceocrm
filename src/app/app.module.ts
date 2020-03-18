
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('561602290896109')
  // },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    TwitterComponent,
    ComerciosComponent,
    HomeComponent,
    NavbarComponent,
    EmpresaMainComponent,
    ListaAfiliadosComponent,
    UsoProductosFinancierosComponent,
    EmpresaDemograficoComponent,
    OutputGraphComponent,
    UsoBssComponent,
    CostoFugaComponent,
    BuscarComponent,
    EmpresaComponent,
    EmpresasComponent,
    LoginComponent,
    KpiUnoComponent,
    KpiDosComponent,
    KpiTresComponent,
    KpiCuatroComponent,
    OfertasComponent,
    OfertasUnoComponent,
    OfertasDosComponent,
    OfertasTresComponent,
    HomeRowUnoComponent,
    HomeRowDosComponent,
    HomeRowTresComponent,
    AfiliadoComponent,
    LeftBarComponent,
    EmpresaInfoComponent,
    PpffCreditoComponent,
    PpffSeguroComponent,
    PpffAhorroComponent,
    BuscarAfiliadoComponent,
    OfertaAfSeguroComponent,
    OfertaAfCreditoComponent,
    OfertaAfBeneficiosComponent,
    OfertaAfAprobprecalComponent,
    OfertaAfAhorroComponent,
    AfiliadoDemograficoComponent,
    OfertaAfSeguroAutoComponent,
    LeadComponent,
    LeadsComponent,
    OutformpensionadosComponent,
    SplitPipe,
    MainEmpresaComponent,
    FormReferidosPensionadosComponent,
    ReferidosAutoListaComponent,
    ReferidosSeguroCarComponent,
    AutoReferidoComponent,
    SimuladorBaseComponent,
    LeadsFichaComponent,
    TruncatePipe,
    SimuladorExternoComponent,
    AdminRolesComponent,
    CrearUsuarioComponent,
    ModificarUsuarioComponent,
    IdleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSortModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    NgIdleKeepaliveModule.forRoot(),
    ScrollingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBuebRDmqnoxgKynukBumnmrovAfVx8T9A'
    }),
    AgmJsMarkerClustererModule,
    MatCheckboxModule
  ],
  exports:[MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Cl' },
    AngularFirestore,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
