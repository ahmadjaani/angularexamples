import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from '../models/playerModel';
import { CATCH_ERROR_VAR } from "@angular/compiler/src/output/abstract_emitter";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  restUrl: string;
  constructor(private ht: HttpClient) {
    this.restUrl = "http://localhost:3400/player";
  }
  AddPlayer(pObj: Player): Observable<any> {
    const hdrOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
   return  this.ht.post(this.restUrl, JSON.stringify(pObj), hdrOptions);
  }

  ShowAllPlayers(): Observable<any> {
    return this.ht.get(this.restUrl, { responseType: 'json' });
  }

  DeletePlayer(id: number): Observable<any> {
   return this.ht.delete(`${this.restUrl}/${id}`);
  }
}
