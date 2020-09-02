import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FalconeService } from "../falcone-service/falcone.service";
import { FalconeStateService } from "../falcone-service/falcone-state";

import { FindFalconeRequest } from "../model/findFalconeRequest";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  responseStatus: string;
  responsePlanetName: string;
  responseError: string;
  timeTaken: number;

  constructor(
    private falconeService: FalconeService,
    private router: Router,
    private falconeStateService: FalconeStateService
  ) {}

  ngOnInit() {
    this.findFalcone();
    this.timeTaken = this.falconeStateService.getTimeTaken();
  }

  findFalcone(): void {
    const request: FindFalconeRequest = this.falconeStateService.getFindFalconeRequest();
    this.falconeService.findFalcone(request).subscribe(response => {
      this.responseStatus = response.status ? response.status : "";
      this.responsePlanetName = response.planet_name
        ? response.planet_name
        : "";
      this.responseError = response.error ? response.error : "";
    });
  }

  home(): void {
    this.router.navigate(["finding-falcone"]);
  }
}

