import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-timer-opts',
  templateUrl: './timer-opts.component.html',
  styleUrls: ['./timer-opts.component.scss'],
})
export class TimerOptsComponent implements OnInit {

  public id: number;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.id = this.navParams.data.id;
  }

  public borrar(){
    this.popoverController.dismiss({id: this.id, action: 'borrar'});
  }

  public editar(){
    this.popoverController.dismiss({id: this.id, action: 'editar'});
  }

}
