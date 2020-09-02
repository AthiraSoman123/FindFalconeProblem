import { Component, OnInit,ViewChild } from '@angular/core';
import { FalconeService } from '../falcone-service/falcone.service';
import { SelectedDestination } from '../model/selectDestination';
import { Planet } from '../model/planets';
import { Vehicle } from '../model/vehicle';
import { FindFalconeRequest } from '../model/findFalconeRequest';
import { FalconeStateService }  from '../falcone-service/falcone-state';
import { Router } from "@angular/router";
@Component({
  selector: 'app-finding-falcone',
  templateUrl: './finding-falcone.component.html',
  styleUrls: ['./finding-falcone.component.css']
})
export class FindingFalconeComponent implements OnInit {
  planetList: any;
  vehicleList: any;
  destinations: any;
  planets: Planet[];

  token: any;
  availablePlanets: Planet[];
  selectedDestinations: SelectedDestination[] = [];
  vehicles: Vehicle[];
  timeTaken = 0;
  headerList = ["name", "distance"];
  vehicleColumList = ["name", "max_distance", "total_no", "speed"]
  planetTableTitle = 'Planets';
  vehicleTableTitle = 'Vehicles';
  constructor(private falconeService: FalconeService, private falconeStateService: FalconeStateService,private router:Router) { }

  ngOnInit(): void {
    this.destinations = ['destination 1', 'destination 2', 'destination 3', 'destination 4']
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }
  getPlanets() {
    this.falconeService.getPlanets().subscribe((res) => {
      this.planets = [...res];
      this.availablePlanets = [...res];
    });
  }
  getVehicles() {
    this.falconeService.getVehicles().subscribe((res) => {
      this.vehicles = res;
    });
  }
  getToken(): void {
    this.falconeService.getToken().subscribe(token => {
      this.token = token.token;
      sessionStorage.setItem('token', this.token);
    });
  }
  selectedDestination(selectedDestination: SelectedDestination): void {
    this.maintainSelectedDestinations(selectedDestination);
    this.maintainAvailablePlanets(selectedDestination);
    this.maintainVehicles(selectedDestination);
    this.timeTaken = this.calculateTimeTaken();
  }

  private maintainSelectedDestinations(
    selectedDestination: SelectedDestination
  ): void {
    if (
      this.selectedDestinations.find(
        s => s.destinationNumber == selectedDestination.destinationNumber
      )
    ) {
      // delete the selectedDestination if it is already in the list
      this.selectedDestinations = this.selectedDestinations.filter(
        s => s.destinationNumber !== selectedDestination.destinationNumber
      );
    }
    // add
    this.selectedDestinations = [
      ...this.selectedDestinations,
      selectedDestination
    ];
    console.log(`this.selectedDestinations = `, this.selectedDestinations);
  }

  private maintainAvailablePlanets(
    selectedDestination: SelectedDestination
  ): void {
    // If a planet has been selected, remove it from the list if available planets
    this.availablePlanets = this.availablePlanets.filter(
      planet => planet.name !== selectedDestination.planetName
    );
  }

  private maintainVehicles(selectedDestination: SelectedDestination): void {
    // If a vehicle has been selected, reduce it's available count
    const vehicleName: string = selectedDestination.vehicleName;
    for (let vehicle of this.vehicles) {
      if (vehicle.name === vehicleName && vehicle.total_no > 0) {
        vehicle.total_no--;
      }
    }
  }

  private calculateTimeTaken(): number {
    let timeTaken: number = 0;

    for (let destination of this.selectedDestinations) {
      let planet = this.planets.find(pl => pl.name === destination.planetName);
      let vehicle = this.vehicles.find(
        ve => ve.name === destination.vehicleName
      );
      timeTaken += planet.distance / vehicle.speed;
    }

    return timeTaken;
  }

  find(): void {
    let request: FindFalconeRequest = new FindFalconeRequest();
    let planet_names = new Array<string>();
    let vehicle_names = new Array<string>();

    for (let destination of this.selectedDestinations) {
      planet_names.push(destination.planetName);
      vehicle_names.push(destination.vehicleName);
    }

    request.token = this.token;
    request.planet_names = [...planet_names];
    request.vehicle_names = [...vehicle_names];

    this.falconeStateService.setFindFalconeRequest(request);
    this.falconeStateService.setTimeTaken(this.calculateTimeTaken());
    this.router.navigate(["/result"]);
  }
}


