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
    let timer = new Timer(0, 18, 0, 1);
    let timerCard = new TimerCard(this.auxIdentifier, "Paella Valenciana", "arroz", timer);
    this.timerMap.set(this.auxIdentifier, timerCard);
  }

  public async openNewTimerModal() {
    let timer = new Timer(0, 0, 0, 1);
    this.auxIdentifier++;
    let timerCard = new TimerCard(this.auxIdentifier, null, "arroz", timer);
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

}
