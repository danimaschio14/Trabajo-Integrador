import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class RecordService {
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) {}

getRecords(id: Number):Promise<any> {
        // Realiza una solicitud HTTP GET para obtener el record
        return this.http.get(`${this.apiUrl}/record/${id}/DESC`).toPromise();
}
}
