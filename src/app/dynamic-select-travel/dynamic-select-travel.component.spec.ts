import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicSelectTravelComponent } from './dynamic-select-travel.component';
import { SelectedDestination} from '../model/selectDestination';

describe('DynamicSelectTravelComponent', () => {
  let component: DynamicSelectTravelComponent;
  let fixture: ComponentFixture<DynamicSelectTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicSelectTravelComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSelectTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should emit a new selected destination", () => {
    spyOn(component.selectedDestination, "emit").and.callThrough();

    const selectedDest = new SelectedDestination(1, "Donlon", "Space pod");
    component.emitSelectedDestination(selectedDest);

    expect(component.selectedDestination.emit).toHaveBeenCalledWith(
      selectedDest
    );
  });
});
