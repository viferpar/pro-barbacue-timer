import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TimerModalPage } from '../timer-modal/timer-modal.page';
import { TimerCard } from '../models/timerCard';
import { Timer } from '../models/timer';
import { TimerOptsComponent } from '../timer-opts/timer-opts.component';

@Component({
  selector: 'app-cronometros',
  templateUrl: './cronometros.page.html',
  styleUrls: ['./cronometros.page.scss'],
})
export class CronometrosPage implements OnInit {


  public timerMap: Map<number, TimerCard>;
  public auxIdentifier: number = 0;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.timerMap = new Map();
  }

  public async openNewTimerModal() {
    let timer = new Timer(0, 0, 0, 0, 0, 0, 1, 1);
    this.auxIdentifier++;
    let timerCard = new TimerCard(this.auxIdentifier, null, "arroz", timer, null);
    this.openTimerModal(timerCard);
  }

  public async openOptions(ev: any, id: number) {
    const popover = await this.popoverController.create({
      component: TimerOptsComponent,
      componentProps: {
        id: id
      },
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((dismissedData) => {
      if (dismissedData.data !== null) {
        let action = dismissedData.data.action;
        if (action === 'borrar') {
          this.timerMap.delete(dismissedData.data.id);
          this.renameIdentifiers();
        } else if (action === 'editar') {
          this.openTimerModal(this.timerMap.get(id));
        }
      }
    });

    return await popover.present();
  }
  renameIdentifiers() {
    let i = 0;

  }

  private async openTimerModal(timerCard: TimerCard) {

    const timerModal = await this.modalController.create({
      component: TimerModalPage,
      componentProps: {
        timer: timerCard
      }
    });

    timerModal.onDidDismiss().then((dismissedData) => {
      if (dismissedData.data !== null) {
        this.timerMap.set(dismissedData.data.id, dismissedData.data);
      }
    });

    return await timerModal.present();
  }

  public startTimer(id: number) {
    let timerCard: TimerCard = this.timerMap.get(id);
    let date: Date = new Date();
    date.setHours(date.getHours() + timerCard.timer.hour);
    date.setMinutes(date.getMinutes() + timerCard.timer.minute);
    date.setSeconds(date.getSeconds() + timerCard.timer.second);
    let process = setInterval(() => { this.countdownTime(id, date.getTime()); }, 1000);
    timerCard.process = process;
    this.timerMap.set(id, timerCard);

  }

  private countdownTime(id: number, time: number) {

    let timerCard: TimerCard = this.timerMap.get(id);
    let now = new Date().getTime();
    let t = time - now;

    if (t >= 0) {

      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);

      timerCard.timer.hour = hours;
      timerCard.timer.minute = mins;
      timerCard.timer.second = secs;

      this.timerMap.set(id, timerCard);

    } else {
      clearInterval(timerCard.process);
      timerCard.process = null;
      timerCard.timer.step--;

      if (timerCard.timer.step > 0) {
        timerCard.timer.hour = timerCard.timer.memHour;
        timerCard.timer.minute = timerCard.timer.memMinute;
        timerCard.timer.second = timerCard.timer.memSecond;
        this.startTimer(id);
      }
      this.timerMap.set(id, timerCard);

    }

  }

  public stopTimer(id: number) {
    let timerCard: TimerCard = this.timerMap.get(id);
    clearInterval(timerCard.process);
    timerCard.process = null;
  }

}
