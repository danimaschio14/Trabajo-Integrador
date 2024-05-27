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
        // Realiza una solicitud HTTP GET para obtener todas las actividades
        return this.http.get(`${this.apiUrl}/activity`);
}
updateStatus(id: Number, value: string):Observable<any> {
  // Realiza una solicitud HTTP GET para obtener todas las actividades
  return this.http.patch(`${this.apiUrl}/activity/${id}`,{
    "status" : value
  });
}
}
