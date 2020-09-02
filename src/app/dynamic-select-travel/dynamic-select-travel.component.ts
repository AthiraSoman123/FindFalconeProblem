import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Planet } from '../model/planets';
import { Vehicle } from '../model/vehicle'
import { SelectedDestination } from '../model/selectDestination';
import { FormControlName, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'dynamic-select-travel',
  templateUrl: './dynamic-select-travel.component.html',
  styleUrls: ['./dynamic-select-travel.component.css']
})
export class DynamicSelectTravelComponent implements OnInit {
  @Input()
  destinationNumber: number;

  @Input()
  planets: Planet[];

  @Input()
  vehicles: Vehicle[];

  @Output()
  selectedDestination = new EventEmitter<SelectedDestination>();

  selectTravelForm: FormGroup;
  selectedPlanetName: string;
  selectedPlanetLocation = "assets/QuestionMark.PNG"
  selectedVehicleLocation = "assets/QuestionMark.PNG"
  selectedDestinations: string[];
  displaySelectedVehicleErrorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.selectTravelForm = this.formBuilder.group({
      planet: [""],
      vehicle: [""],
      selectedPlanetName: [""]
    });
  }
  processDestination(event): void {
    if (!this.validateVehicle(event)) {
      return;
    }

    const selectedDest = new SelectedDestination(
      this.destinationNumber,
      this.selectTravelForm.value.planet,
      this.selectTravelForm.value.vehicle
    );
    this.selectedPlanetName = this.selectTravelForm.value.planet;
    this.selectTravelForm.patchValue({
      selectedPlanetName: this.selectedPlanetName
    });
    this.loadVehicleImage();
    this.emitSelectedDestination(selectedDest);
  }

  emitSelectedDestination(selectedDest: SelectedDestination): void {
    this.selectedDestination.emit(selectedDest);
  }
  loadPlanetImage() {
    let rootLocation = "assets/Planets/";
    let extension = '.png'
    if (this.selectTravelForm.value.planet) {
      this.selectedPlanetLocation = rootLocation + this.selectTravelForm.value.planet + extension;
      this.selectTravelForm.get('selectedPlanetName').setValue(this.selectTravelForm.value.planet)
    }
  }
  loadVehicleImage() {
    if (this.selectTravelForm.value.vehicle) {
    let rootLocation = "assets/Available Vehicles/";
    let extension = '.JPG'
    this.selectedVehicleLocation = rootLocation + this.selectTravelForm.value.vehicle + extension;
    }
  }


  validateVehicle(event): boolean {
    this.displaySelectedVehicleErrorMessage = false;

    const selectedVehicleName = this.selectTravelForm.value.vehicle;
    const selectedVehicle: Vehicle = this.vehicles.find(
      v => v.name === selectedVehicleName
    );

    if (selectedVehicle.total_no === 0) {
      alert('All vehicles of this type have been selected, please choose another vehicle.')
      return false;
    }
    if (selectedVehicle.total_no === 1) {
    }

    return true;
  }
}

