import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class CommonService {

    constructor(private http: HttpClient) { }

    sendRequest(payload: any,targetPath : string): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(environment.SERVER_BASE_URL + targetPath, payload, { headers });
    }

  }