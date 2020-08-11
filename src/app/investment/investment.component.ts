import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  dataSource : MatTableDataSource<any>; 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getInvestments();
  }


  getInvestDialog(row){

  }
  
  Columns: string[] = ["invest_id","fundId", "invested_on","units_purchased","total_amount"]
  getInvestments(){
    let result;
    this.http.get('http://localhost:8000/invest/').toPromise().then(data =>{
    result = data;
    this.dataSource = result;
  });
  }

  
}
