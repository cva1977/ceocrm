import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  searchValue: string = "";
  results: any;
  constructor(private firestore: AngularFirestore) {


   }

   firequery(start, end) {

    return this.firestore.collection('cla_scanner_empresa', ref => ref.limit(4).orderBy('RAZON_SOCIAL_EMPRESA').startAt(start).endAt(end)).valueChanges();
  }
  firequery_rut(Rutempresa) {
    return this.firestore.collection('cla_scanner_empresa',ref=>ref.limit(4).orderBy('RUT_EMPRESA','asc').where('RUT_EMPRESA','>=',Number(Rutempresa))).valueChanges();
  }

  firequery_rut2_test(Rutempresa) {
    return this.firestore.collection('cla_scanner_empresa',ref=>ref.limit(4).orderBy('RUT_EMPRESA','asc').where('RUT_EMPRESA','>=',Number(Rutempresa))).valueChanges();
  }
  public getallempresas() {
    return this.firestore.collection('cla_scanner_empresa', ref => ref.orderBy('RAZON_SOCIAL_EMPRESA')).valueChanges();
  }

public searchEmpresa(search:string){

  return this.firestore.
  collection('cla_scanner_emp', ref=>ref.limit(5).where('KEYWORDS','array-contains', search.toUpperCase()).orderBy('RAZON_SOCIAL_EMPRESA')).valueChanges();
}
public searchComuna(search:string){

  return this.firestore.
  collection('cla_scanner_comuna', ref=>ref.limit(5).where('KEYWORDS','array-contains', search.toUpperCase()).orderBy('nombre')).valueChanges();
}

public searchSucursal(search:string){

  return this.firestore.
  collection('cla_scanner_sucursales', ref=>ref.limit(5).where('KEYWORDS','array-contains', search.toUpperCase()).orderBy('SUCURSAL')).valueChanges();
}

public searchAfiliado(search:string){

  return this.firestore.
  collection('cla_scanner_datos_afiliados', ref=>ref.limit(5).where('KEYWORDS','array-contains', search.toUpperCase()).orderBy('NOMBRES')).valueChanges();
}


  public getSucursales(){
    return this.firestore.collection('sucursales').snapshotChanges();

  }

  public getColaboradores(){
    return this.firestore.collection('colaboradores').snapshotChanges();

  }

  public getEstados(){
    return this.firestore.collection('estados').snapshotChanges();

  }
  public getRegiones(){
    return this.firestore.collection('regiones',ref=>ref.orderBy('id_region','asc')).snapshotChanges();

  }

  public getPost(){
    return this.firestore.collection('twitter_post',ref=>ref.orderBy('created_at','desc')).snapshotChanges();

  }

  public getContexto(formid: string){
    return this.firestore.collection('forms', ref=>ref.where('id_form','==',formid)).snapshotChanges();

  }
  public getCentrar(regionid: string){
    return this.firestore.collection('regiones', ref=>ref.where('id_region','==',regionid)).snapshotChanges();

  }

  public getUf(Fecha: string){
    return this.firestore.collection('cla_scanner_uf', ref=>ref.where('FECHA','==',Fecha)).snapshotChanges();

  }

  public getTwitter(){
    return this.firestore.collection('twitter_post', ref=>ref.orderBy('created_at','desc')).snapshotChanges();

  }

  public getComercios(regionid: number){
    return this.firestore.collection('comercios', ref=>ref.where('id_region','==',regionid).orderBy('estado')).snapshotChanges();

  }
  //Obtiene un gato
  public getLead(documentId: string) {
    return this.firestore.collection('cla_scanner_leads').doc(documentId).snapshotChanges();
  }

  public updateLead(documentId: string, data: any) {
    return this.firestore.collection('cla_scanner_leads').doc(documentId).update(data);
  }
  public updateLeadNuevo(documentId: string, data: any) {

    return this.firestore.collection('cla_scanner_leads').doc(documentId).update(data);
  }

  public updateUsuario(documentId: string, data: any) {

    return this.firestore.collection('cla_scanner_usuarios').doc(documentId).update(data);
  }

  public addUsuario(documentId: string, data: any) {

    return this.firestore.collection('cla_scanner_usuarios').doc(documentId).set(data);
  }

  public deleteUsuario(documentId: string) {

    return this.firestore.collection('cla_scanner_usuarios').doc(documentId).delete();
  }

  public getEmpresa(Rutempresa: string) {

    return this.firestore.collection('scan_empresas',ref=>ref.where('RutEmpresa','==',Number(Rutempresa))).snapshotChanges();


  }

  public getProducto(Rutempresa: string, categoria: number) {
    return this.firestore.collection('scanner_ofertas',ref=>ref.where('RutEmpresa','==',Number(Rutempresa)).where('categoria','==',categoria)).snapshotChanges();
  }


  public getBeneficios(Rutempresa: string) {

    return this.firestore.collection('BSS_SCANNER',ref=>ref.where('RutEmpresa','==',Number(Rutempresa))).snapshotChanges();
  }
  public getEmpresa2(Rutempresa: string) {
    return this.firestore.collection('scanner_empresas',ref=>ref.where('RutEmpresa','==',Number(Rutempresa))).snapshotChanges();
  }

  public getEmpresa_cla(Rutempresa: string) {
    return this.firestore.collection('cla_scanner_emp').doc(Rutempresa).snapshotChanges();
  }



   getUsuarios_cla(id: string) {
      return  this.firestore.collection('cla_scanner_usuarios').doc(id.toUpperCase()).snapshotChanges();
  }

  getUsuariosByRut(rutUsuario: string) {
    console.log(rutUsuario);
    return this.firestore.collection('cla_scanner_usuarios',ref=>ref.where('RUT','==',Number(rutUsuario))).snapshotChanges();
}

  getUsuariosAll() {
    return  this.firestore.collection('cla_scanner_usuarios',ref=>ref.orderBy('RUT','asc')).valueChanges({ idField: 'propertyId' });
}

  public getEmpresa_cla_credito(Rutempresa: string) {
    return this.firestore.collection('cla_scanner_credito_detalle',ref=>ref.where('RUT_EMPRESA','==',Number(Rutempresa))).snapshotChanges();
  }

  public getEmpresa_cla_ahorro(Rutempresa: string) {
    return this.firestore.collection('cla_scanner_ahorro_detalle',ref=>ref.where('RUT_EMPRESA','==',Number(Rutempresa))).snapshotChanges();
  }

  public getEmpresas() {
    return this.firestore.collection('scanner_empresa').snapshotChanges();
  }
  public getEmpresas_cla(offset: any, batch: any) {
    return this.firestore
      .collection('cla_scanner_empresa', ref =>
        ref
          .orderBy('RAZON_SOCIAL_EMPRESA')
          .startAfter(offset)
          .limit(batch)
      );

  }

  public getEmpresas_cla_beneficios(Rutempresa: string) {
    return this.firestore.collection('cla_scanner_beneficios', ref=>ref.where('RUT_EMPRESA','==',Number(Rutempresa)).orderBy('ORDEN')).snapshotChanges();

  }

  public getEmpresas_cla_oferta(Rutempresa: string,Categoria:string) {
    return this.firestore.collection('cla_scanner_ofertas', ref=>ref.where('RUT_EMPRESA','==',Number(Rutempresa)).where('CATEGORIA','==',Categoria)).snapshotChanges();

  }


  public getAfiliados_cla_ofertas(Rutpersona: string, categoria: string) {
    return this.firestore.collection('cla_scanner_ofertas_af',ref=>ref.where('RUT_PERSONA','==',Number(Rutpersona)).where('CATEGORIA','==',categoria)).snapshotChanges();

  }


  public getAfiliado_cla(Rutpersona: string) {
    return this.firestore.collection('cla_scanner_datos_afiliados').doc(Rutpersona).snapshotChanges();
  }

  public getMora_cla(Rutpersona: string) {
    return this.firestore.collection('cla_scanner_mora',ref=>ref.where('RUT_CLIENTE','==',Number(Rutpersona)).orderBy('MORA_OP','desc')).snapshotChanges();

  }

  public getCampanaSeguroAuto(Rutpersona: string) {
    return this.firestore.collection('cla_scanner_campana_auto_total',ref=>ref.where('RUT_PERSONA','==',Number(Rutpersona)).where('PREDETERMINADO','==',1)).snapshotChanges();
  }

  public getCampanaSeguroAutoRef(rutPersona: string) {
    return this.firestore.collection(
      'cla_scanner_campana_auto_total', ref => ref.where(
        'RUT_PERSONA', '==', Number(rutPersona)).orderBy('PREDETERMINADO', 'desc')).snapshotChanges();
  }

  public getGestorCampana(EmailPersona: string) {
    return this.firestore.collection('cla_scanner_gestor_campana', ref=>ref.where('CORREO_PERSONA','==',EmailPersona).orderBy('ORDEN')).snapshotChanges();

  }

  /***********NUEVOS SERVICIOS */
  public getAfiliados_cla_ofertas_aprobados(Rutpersona: string) {
    return this.firestore.collection('cla_scanner_oferta_aprobado_af',ref =>ref.where('RUT_PERSONA','==',Number(Rutpersona))).snapshotChanges();

  }

  public getAfiliados_cla_ofertas_efi(Rutpersona: string) {
    return this.firestore.collection('cla_scanner_oferta_efi_af',ref =>ref.where('RUT_PERSONA','==',Number(Rutpersona))).snapshotChanges();

  }

/*** NUEVOS SERVICIOS */
public createLog(coleccion:string,data: any) {
  return this.firestore.collection(coleccion).add(data);
}

public createPensionado(data: any) {
  return this.firestore.collection('cla_scanner_leads').add(data);
}


public getNotifications(rut: number) {
  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_colaborador','==',rut).where('nuevo','==',1).orderBy('created_time','desc')).snapshotChanges();

}

public getNotificationsCount(rut: number) {
  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_colaborador','==',rut).where('nuevo','==',1)).snapshotChanges();

}

public getLeads(rut: number){
  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_colaborador','==',rut).orderBy('created_time','desc')).snapshotChanges();

}

public getBrands() {
  return this.firestore.collection('cla_scanner_marca_auto', ref => ref.orderBy('MARCA')).valueChanges()
}

public getNotificationsAll(quien?: []) {
  var valores=[];
  if (quien){

  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',1).where('rut_agente','==',quien).orderBy('created_time','desc')).snapshotChanges();
  }else{
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',1).orderBy('created_time','desc')).snapshotChanges();

  }
}

public getNotificationsCountAll(quien?: []) {
  var valores=[];
  if (quien){

  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',1).where('rut_agente','==',quien)).snapshotChanges();
  }else{
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',1)).snapshotChanges();

  }
}




public getLeadsAll(quien?: []){
  var valores=[];

  if (quien){

  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_agente','==',quien).orderBy('created_time','desc')).snapshotChanges();
}else{
  return this.firestore.collection('cla_scanner_leads', ref=>ref.orderBy('created_time','desc')).snapshotChanges();


}

}

public getLeadsAll2(quien?: []){
  var valores=[];

  if (quien){

  return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_agente','==',quien).orderBy('created_time','desc')).valueChanges({ idField: 'propertyId' });
}else{
  return this.firestore.collection('cla_scanner_leads', ref=>ref.orderBy('created_time','desc')).valueChanges({ idField: 'propertyId' });

}

}

public getLeadsByEstado(rut:Number, estado:string){
  if(estado == 'nuevo'){
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_agente','==',rut).where('nuevo','==',1).where('gestionado','==',0).orderBy('created_time','desc')).snapshotChanges();
  }else if(estado == 'pendiente'){
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_agente','==',rut).where('nuevo','==',0).where('gestionado','==',0).orderBy('created_time','desc')).snapshotChanges();
  }else{
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_agente','==',rut).where('nuevo','==',0).where('gestionado','==',1).orderBy('created_time','desc')).snapshotChanges();
  }
}

public getLeadsByEstadoEjec(rut:Number, estado:string){
  if(estado == 'nuevo'){
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_colaborador','==',rut).where('nuevo','==',1).where('gestionado','==',0)).snapshotChanges();
  }else if(estado == 'pendiente'){
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_colaborador','==',rut).where('nuevo','==',0).where('gestionado','==',0)).snapshotChanges();
  }else{
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('rut_colaborador','==',rut).where('nuevo','==',0).where('gestionado','==',1)).snapshotChanges();
  }
}

public getLeadsByEstadoAll(estado:string){
  if(estado == 'nuevo'){
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',1).where('gestionado','==',0)).snapshotChanges();
  }else if(estado == 'pendiente'){
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',0).where('gestionado','==',0)).snapshotChanges();
  }else{
    return this.firestore.collection('cla_scanner_leads', ref=>ref.where('nuevo','==',0).where('gestionado','==',1)).snapshotChanges();
  }
}

public getmisejecutivos(rut:Number){
  return this.firestore.collection('cla_scanner_usuarios', ref=>ref.where('RUT_AGENTE','==',rut).where('ES_EJEC','==',1)).snapshotChanges();

}

public getCampaign(id:string){
  return this.firestore.collection('campaigns').doc(id).snapshotChanges();
}

/****SERVICIOS: REFERIDOS AUTO */
public getReferidosAutoAll(rutColaborador:Number){
    return this.firestore.collection('cla_scanner_referidos_auto', ref=>ref.where('rut_colaborador','==',rutColaborador).orderBy('timeStamp','desc')).snapshotChanges();

}

public createReferidoAuto(data: any) {
  return this.firestore.collection('cla_scanner_referidos_auto').add(data);
}
public getCarPatentRefered(patent: string) {
  return this.firestore.collection('cla_scanner_referidos_auto', ref => ref.where('patente', '==', patent)).snapshotChanges();
}
// SIMULADOR
public createSimulation(data: any){
  return this.firestore.collection('cla_credito_simulado_test').add(data)
}

public getSocialCreditData(mount: number, payments: number, ispensionado: number) {
  return this.firestore.collection(
    'cla_scanner_tasa_credito', ref => ref.where(
      'CUOTA', '==', payments).where('RANGO', '==', mount).where(
        'TIPO', '==', ispensionado)).snapshotChanges();
}
}
