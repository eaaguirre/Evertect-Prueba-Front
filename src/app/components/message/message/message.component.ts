import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor(private toastr: ToastrService){}

  showToastSuccesfull(message:string) {
    this.toastr.success(message, 'Éxito', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }

  showToastFailed(message:string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }
  showToastInfo(message:string) {
    this.toastr.info(message, 'Info', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }

}
