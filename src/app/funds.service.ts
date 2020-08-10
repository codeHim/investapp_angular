import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, repeat } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class FundsService {
 
  constructor(private http:HttpClient, private snackBar: MatSnackBar ) { }

  snackConfig : MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }
  form: FormGroup = new FormGroup({
    fund_id: new FormControl(''),
    scheme_code: new FormControl('', Validators.required),
    scheme_name: new FormControl('', Validators.required),
    isin_div_pay_growth: new FormControl('', [Validators.required]),
    isin_div_reinvest: new FormControl('',Validators.required),
    net_asset_value: new FormControl('1',Validators.required),
    repurchase_price: new FormControl('',Validators.required),
    sale_price: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required)
  });


  

  createFund(fund):Observable<any> {
    let result ;
    this.http.post('http://localhost:8000/list/',fund).toPromise().then(data =>{
      console.log(data);
      result = data;
    });
    return result;
    
}

updateFund(fund){
  let result ;
  this.http.patch('http://localhost:8000/change/'+fund.fund_id+'/',fund).toPromise().then(data =>{
    console.log(data);
    result = data;
  });
  return result;

}

deleteFund(fund){
  let result;
  this.http.delete('http://localhost:8000/change/'+fund.fund_id+'/',fund).toPromise().then(data =>{
    result = data;
  });
  return result;
}
  success(message){
    this.snackConfig['panelClass'] = ['notification','success'];
    this.snackBar.open(message,'',this.snackConfig)
  }

  populateEditvalues(row){
    this.form.setValue(row);
  }
}
