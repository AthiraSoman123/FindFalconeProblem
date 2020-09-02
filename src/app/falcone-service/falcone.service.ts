import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiUrls } from '../api-urls';
import { FalconeErrorHandlerService } from './falcone-error-handler/falcone-error-handler.service';
import {FindFalconeRequest} from '../model/findFalconeRequest'
@Injectable({
  providedIn: 'root'
})
export class FalconeService {

  constructor(private http: HttpClient, private falconeErrorHandlerService: FalconeErrorHandlerService) { }
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json"
    })
  };
  getPlanets(): Observable<any> {
    return this.http.get<any[]>(ApiUrls.planetDetails).pipe(
      retry(1),
      catchError(this.falconeErrorHandlerService.handleError)
    );
  }
  getVehicles(): Observable<any> {
    return this.http.get<any[]>(ApiUrls.vehicleDetails).pipe(
      retry(1),
      catchError(this.falconeErrorHandlerService.handleError)
    );
  }
  
  getToken(): Observable<any> {
    return this.http.post<string>(ApiUrls.getToken, "", this.httpOptions).pipe(
      //tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.falconeErrorHandlerService.handleError)
    );
  }
  findFalcone(findFalconeRequest: FindFalconeRequest): Observable<any> {
    console.log("findFalconeRequest in api = ", findFalconeRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    };

    return this.http
      .post<string>(ApiUrls.findFalcone, findFalconeRequest, httpOptions)
      .pipe(catchError(this.falconeErrorHandlerService.handleError));
  }
}
