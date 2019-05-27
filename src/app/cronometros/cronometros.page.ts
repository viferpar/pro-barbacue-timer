import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimerModalPage } from '../timer-modal/timer-modal.page';

@Component({
  selector: 'app-cronometros',
  templateUrl: './cronometros.page.html',
  styleUrls: ['./cronometros.page.scss'],
})
export class CronometrosPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async newTimerModal() {
    const timerModal = await this.modalController.create({
      component: TimerModalPage
    });

    return await timerModal.present();
  }

}
