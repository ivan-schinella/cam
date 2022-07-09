import { Camera } from '../camera';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  
  readData: Array<Camera> = []; 
  successmsg: string = "";

  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  // getdeleteid
  deleteID(id: number) {
    console.log(id, 'deleteid=>>');
    this.service.deleteData(id).subscribe((res) => {
      console.log(res, 'deleteres==>');
      this.successmsg = res.message;
      this.getAllData();
    });
  }

  // getdata
  getAllData() {
    this.service.getAllData().subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res;
    });
  }
}
