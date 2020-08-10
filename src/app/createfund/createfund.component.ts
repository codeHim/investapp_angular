import { Component, OnInit } from '@angular/core';
import { FundsService } from '../funds.service';
import { MatDialogRef } from '@angular/material/dialog';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-createfund',
  templateUrl: './createfund.component.html',
  styleUrls: ['./createfund.component.css']
})

  
export class CreatefundComponent implements OnInit {

  constructor(private service:FundsService,private dialogRef: MatDialogRef<CreatefundComponent>) { }

  ngOnInit(): void {
  }

    onSubmit(){
      if(this.service.form.valid){
       let message = '';
       let val = this.service.form.get('date').value;
        val = formatDate(val,'yyyy-MM-dd','en');
        this.service.form.controls['date'].setValue(val);
        console.log("check----->",this.service.form.value);

      if(!this.service.form.get('fund_id').value){
       this.service.createFund(this.service.form.value);
       message = "Record Created Successfully";
       
      }
      else{
        this.service.updateFund(this.service.form.value);
        message = "Record Updated Successfully";
      }
      
       this.service.success(message);
       this.onClose();

      }
    }
    onClose(){
      this.service.form.reset();
      this.dialogRef.close();
    }

    onClear(){
      this.service.form.reset();
    }


}
