import { Component, OnInit,ViewChild } from '@angular/core';
import { FundsService } from '../funds.service'
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatefundComponent } from '../createfund/createfund.component';
import { InvestmentComponent } from '../investment/investment.component';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})


export class FundsComponent implements OnInit {

  elements;
  dataSource : MatTableDataSource<any>; 
  investFlag : boolean = false;
  calculateFlag : boolean = false;
  currentFundValue : any;
  row : any;
  @ViewChild(MatSort,{static: false}) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private http:Http,private dialog: MatDialog,private service : FundsService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getFundsList();
    
    }
    ngAfterViewInit (){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    getFundsList(){
      this.http.get('http://localhost:8000/list/').subscribe(data => {
          let result  = data['_body']
          this.elements = JSON.parse(result);
          this.dataSource.data = this.elements;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'date': return new Date(item.date);
              default: return item[property];
            }
          };
          return this.elements;
        });

    }

    
    Columns: string[] = ['fund_id', 'scheme_code', 'scheme_name', 'isin_div_pay_growth','isin_div_reinvest','net_asset_value','repurchase_price','sale_price','date','actions'];

  



  filterValue(value: String){
    this.dataSource.filter = value.trim().toLowerCase();
  }
  
  createDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(CreatefundComponent,dialogConfig);
  }

  update(row){
    this.service.populateEditvalues(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(CreatefundComponent,dialogConfig);

  }

  onDelete(row){
    this.service.deleteFund(row);
    let message = "Record Deleted Successfully";
    this.service.success(message);
    this.getFundsList();

  }

  investListDialog(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    this.dialog.open(InvestmentComponent,dialogConfig);
  }

  investFundDialog(row){
    this.row = row;
    this.calculateFlag = false;
    this.investFlag = true;
  }

  makeInvestments(amount){
    let fund = this.row;
    let amnt = amount;
    let units = amount / this.row.net_asset_value;
    let obj = {
      "fundId": this.row.fund_id,
      "total_amount": amnt,
      "units_purchased" : units,
    }
    let result;
    this.http.post('http://localhost:8000/invest/',obj).toPromise().then(data =>{
    result = data;
    console.log("Invested---->",result);
  });
    let message = "Invested Successfully";
    this.service.success(message);
    this.investFlag = false;
  }

  calculateFundValue(fund){
    console.log("Fund--->",fund);
    this.http.post('http://localhost:8000/calculate/',fund).toPromise().then(data =>{
    console.log(data);
    this.currentFundValue = data['_body']
  });
  this.investFlag = false;
  this.calculateFlag = true;
  }

}
