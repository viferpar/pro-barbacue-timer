import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimerModalPage } from '../timer-modal/timer-modal.page';
import { TimerCard } from '../models/timerCard';
import { Timer } from '../models/timer';

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

    var timer = new Timer(23, 59, 59, 1);

    var timerCard = new TimerCard(0, "Longaniza", "embutido", timer);

    this.openTimerModal(timerCard)

  }

  private async openTimerModal(timerCard: TimerCard) {

    const timerModal = await this.modalController.create({
      component: TimerModalPage,
      componentProps: {
        timer: timerCard
      }
    });

    timerModal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned.data);
      }
    });

    return await timerModal.present();
  }

}
