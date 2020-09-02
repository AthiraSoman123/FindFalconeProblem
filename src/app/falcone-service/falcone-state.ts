import { Injectable } from "@angular/core";

import { FindFalconeRequest } from "../model/findFalconeRequest";

@Injectable({
  providedIn: "root"
})
export class FalconeStateService {
  private findFalconeRequest: FindFalconeRequest;
  private timeTaken: number;

  setFindFalconeRequest(findFalconeRequest: FindFalconeRequest): void {
    this.findFalconeRequest = findFalconeRequest;
  }

  getFindFalconeRequest(): FindFalconeRequest {
    return this.findFalconeRequest;
  }

  setTimeTaken(timeTaken: number): void {
    this.timeTaken = timeTaken;
  }

  getTimeTaken(): number {
    return this.timeTaken;
  }
}
