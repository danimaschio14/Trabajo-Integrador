import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class EmpleadoService {
    private apiUrl = 'http://localhost:3000'; 
    constructor(private http: HttpClient) {}


  //metodo para agregar un usuario pero no genera el token en la contraseña
  // addUser(user: any):Promise<any>  {
  //   // Realiza una solicitud HTTP POST para agregar el usuario a la base de datos
  //   return this.http.post(`${this.apiUrl}/user`, user).toPromise();
  // }

   //metodo para agregar un usuario y genera el token en la contraseña
  addUser(user: any):Promise<any>  {
    // Realiza una solicitud HTTP POST para agregar el usuario a la base de datos
    return this.http.post(`${this.apiUrl}/auth/register`, user).toPromise();
  }
  
  getAllUsers():Observable<any> {
    // Realiza una solicitud HTTP GET para obtener todos los usuarios
    return this.http.get(`${this.apiUrl}/user`);
  }

  // toggleUserStatus(userId: number): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/user/${userId}/toggle-status`, null);
  // }

  deleteUser(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/user/${idUsuario}`;
     // Realiza una solicitud HTTP DELETE para eliminar un usuario
    return this.http.delete(url);
  }

  getUser(id:number):Observable<any>{
    const url = `${this.apiUrl}/user/${id}`;
    return this.http.get(url);
  }

  editUser(idUsuario: number,user: any): Promise<any> {
    const url = `${this.apiUrl}/user/${idUsuario}`;
     // Realiza una solicitud HTTP PATCH para editar un usuario
    return this.http.patch(url,user).toPromise();
  }


}
