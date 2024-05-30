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

addActivity(activity: any):Promise<any>  {
  return this.http.post(`${this.apiUrl}/activity`, activity).toPromise();
}

updateActivity(id: Number, activity: any):Promise<any>{
  return this.http.patch(`${this.apiUrl}/activity/${id}`, activity).toPromise()
}

updateStatus(id: Number, value: string):Observable<any> {
  // Realiza una solicitud HTTP GET para obtener todas las actividades
  return this.http.patch(`${this.apiUrl}/activity/${id}`,{
    "status" : value
  });
}

getActivity(id:number):Observable<any>{
  const url = `${this.apiUrl}/activity/${id}`;
   // Realiza una solicitud HTTP GET para obtener una actividad
  return this.http.get(url);
}

}
