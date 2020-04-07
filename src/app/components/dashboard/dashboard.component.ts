import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pageNumber: number = 0;
  asOnDate: Date = undefined;

  constructor(
    private api: ApiService
  ) { }

  displayItems: any[] = [];
  countriesSummary: any[] = [];
  displayedColumns = ['no', 'country', 'confirmed', 'deaths', 'recovered']
  totalCases: number = 0;
  totalDeaths: number = 0;
  totalRecovered: number = 0;

  ngOnInit(): void {
    if (!this.api.isSummaryLoaded) {
      console.log('The data')
      this.api.getSummary()
        .subscribe(data => {
          this.asOnDate = data.Date;
          let countries = this.removeDuplicateEntries(data.Countries);
          countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
          this.api.countriesSummary = countries;
          this.countriesSummary = countries;
          this.displayItems = this.countriesSummary.slice(0, 10);
          this.api.isSummaryLoaded = true;
          this.api.asOnDate = this.asOnDate;
        })
    } else {
      this.countriesSummary = this.api.countriesSummary;
      this.displayItems = this.countriesSummary.slice(0, 10);
      this.calculateSummary(this.countriesSummary);
      this.asOnDate = this.api.asOnDate;
    }
  }

  getTotal(column: string): number {
    let fieldName = column == 'confirmed' ? 'TotalConfirmed' : column == 'deaths' ? 'TotalDeaths' : 'TotalRecovered';
    return this.countriesSummary.map(c => c[fieldName]).reduce((acc, value) => acc + value, 0);
  }

  pageChange(page) {
    let start = page.pageIndex * page.pageSize;
    this.pageNumber = page.pageIndex;
    this.displayItems = this.countriesSummary.slice(start, start + page.pageSize );
  }

  removeDuplicateEntries(source: any[]): any[] {
    let slugs = [];
    let filteredData = [];
    source.map(t => {
      if(!slugs.includes(t.Slug) && 
        t.Slug !== "" &&
        (t.TotalConfirmed !== 0 || 
        t.TotalDeaths !== 0 ||
        t.TotalRecovered !== 0)) {
        filteredData.push(t);
        slugs.push(t.Slug);
      }
    })
    this.calculateSummary(filteredData);
    return filteredData;
  }

  calculateSummary(source: any[]): void {
    this.totalCases = source.map(d => d.TotalConfirmed).reduce((arr, val) => arr + val, 0);
    this.totalDeaths = source.map(d => d.TotalDeaths).reduce((arr, val) => arr + val, 0);
    this.totalRecovered = source.map(d => d.TotalRecovered).reduce((arr, val) => arr + val, 0);
  }

}
