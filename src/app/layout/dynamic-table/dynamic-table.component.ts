import { Component, OnInit,Input } from '@angular/core';
import { FalconeService } from '../../falcone-service/falcone.service'
@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {

@Input()
headers: any;
@Input()
dataSource: any;
@Input()
tableTitle:any;
  constructor(private falconeService: FalconeService) { }

  ngOnInit(): void {
  }
  
}
