import { Component, OnInit, ViewChild} from '@angular/core';
import { CityService } from '../services/city.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {City} from "../models/city";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: any | undefined;
  foundCity!: City;
  displayedColumns = ["Id", "Name", "Url"];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor( private service : CityService) { }

  ngOnInit(): void {
    this.service.getCities(0, 3).subscribe(data => {
      this.cities = data;
    });

  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex;
    let endIndex = event.pageSize;
    if (endIndex > 1000) endIndex = 1000;
    this.cities = this.service.getCities(startIndex, endIndex);
  }

  searchCity(name: string) {
    if (name.length > 1) {
      this.service.findByName(name).subscribe(data => {
        this.foundCity = data;
      });
    }
  }

}
