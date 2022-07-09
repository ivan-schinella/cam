import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

interface Standalone {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute
  ) {}

  flags_centralina: Standalone[] = [
    { value: true, viewValue: 'Camera non connessa ad allarme'},
    { value: false, viewValue: 'Camera connessa ad allarme'},
  ]

  flag_standaloneControl = new FormControl('');

  errormsg: string = '';
  successmsg: string = '';
  getparamid: any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');

    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res) => {
        console.log(res, 'getsingledata==>');
        this.userForm.patchValue({
          token: res.token,
          gruppo_telegram: res.gruppo_telegram,
          server_mqtt: res.server_mqtt,
          Soglia_lux: res.Soglia_lux,
          id_videocamera: res.id_videocamera,
          topic_allarme: res.topic_allarme,
          topic_videocamere: res.topic_videocamere,
          risoluzione: res.risoluzione,
          qualita: res.qualita,
          profilo: res.profilo,
          bitrate: res.bitrate,
          secondi_rec: res.secondi_rec,
          indirizzo_live: res.indirizzo_live,
          flag_debug: res.flag_debug,
          flag_notifiche: res.flag_notifiche,
          flag_centralina: res.flag_centralina,
          nome_camera: res.nome_camera,
          durata_allarme: res.durata_allarme,
        });
      });
    }
  }

  userForm = new FormGroup({
    token: new FormControl('', Validators.required),
    gruppo_telegram: new FormControl('', Validators.required),
    server_mqtt: new FormControl('', Validators.required),
    Soglia_lux: new FormControl('', Validators.required),
    id_videocamera: new FormControl('', Validators.required),
    topic_allarme: new FormControl('', Validators.required),
    topic_videocamere: new FormControl('', Validators.required),
    risoluzione: new FormControl('', Validators.required),
    qualita: new FormControl('', Validators.required),
    profilo: new FormControl('', Validators.required),
    bitrate: new FormControl('', Validators.required),
    secondi_rec: new FormControl('', Validators.required),
    indirizzo_live: new FormControl('', Validators.required),
    flag_debug: new FormControl('', Validators.required),
    flag_notifiche: new FormControl('', Validators.required),
    // flag_centralina: new FormControl('', Validators.required),
    flag_centralina: this.flag_standaloneControl,
    nome_camera: new FormControl('', Validators.required),
    durata_allarme: new FormControl('', Validators.required),
  });

  // createnewuser
  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.reset();
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'All fields are required';
    }
  }

  // updatedata
  userUpdate() {
    console.log(this.userForm.value, 'updatedform');
    if (this.userForm.valid) {
      this.service
        .updateData(this.userForm.value, this.getparamid)
        .subscribe((res) => {
          console.log(res, 'resupdated');
          this.successmsg = res.message;
        });
    } else {
      this.errormsg = 'all fields is required';
    }
  }
}
