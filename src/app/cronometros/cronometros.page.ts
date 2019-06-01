import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimerModalPage } from '../timer-modal/timer-modal.page';
import { TimerCard } from '../models/timerCard';
import { Timer } from '../models/timer';
import { CronometrosConstants } from '../common/cronometros-constants';

@Component({
  selector: 'app-cronometros',
  templateUrl: './cronometros.page.html',
  styleUrls: ['./cronometros.page.scss'],
})
export class CronometrosPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public async openNewTimerModal() {

    var timer = new Timer(0, 0, 0, CronometrosConstants.CARA_UNO);

    var timerCard = new TimerCard(0, 'longaniza', 'embutido', timer);

    this.openTimerModal(timerCard)

  }

  private async openTimerModal(timerCard: TimerCard) {
    const timerModal = await this.modalController.create({
      component: TimerModalPage,
      componentProps: {
        timer: timerCard
      }
    });

    return await timerModal.present();
  }

}
