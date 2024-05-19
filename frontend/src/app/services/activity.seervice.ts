import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class ActivityService {
    private apiUrl = 'http://localhost:3000'; 
    constructor(private http: HttpClient) {}



getAllActivity():Observable<any> {
        // Realiza una solicitud HTTP GET para obtener todos los usuarios
        return this.http.get(`${this.apiUrl}/activity/activities`);
}
  



}
