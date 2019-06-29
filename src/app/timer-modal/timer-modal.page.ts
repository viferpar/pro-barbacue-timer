import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { TimerCard } from '../models/timerCard';

const MAX_HOUR = 23;
const MAX_MINUTE_SECOND = 59;

@Component({
  selector: 'app-timer-modal',
  templateUrl: './timer-modal.page.html',
  styleUrls: ['./timer-modal.page.scss'],
})
export class TimerModalPage implements OnInit {

  timerCard: TimerCard;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private pickerCtrl: PickerController
  ) { }

  ngOnInit() {
    this.timerCard = this.navParams.data.timer;
  }

  async closeModal() {
    this.modalController.dismiss(this.timerCard);
  }

  async showTimePicker() {

    let picker = await this.pickerCtrl.create(this.buildTimerPickerOptions());

    picker.present();   

  }

  private cancelHandler() {
    //Do nothing
  }

  private editHandler(value: any) {    
    this.timerCard.timer.hour = value.horas.value;
    this.timerCard.timer.minute = value.minutos.value;
    this.timerCard.timer.second = value.segundos.value;
  }

  private buildTimerPickerOptions() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          handler: (value: any): void => { this.cancelHandler() }
        },
        {
          text: 'Editar',
          handler: (value: any): void => { this.editHandler(value) }
        }
      ],
      columns: [
        {
          name: 'horas',
          options: this.getTimeOptions(MAX_HOUR)
        },
        {
          name: 'minutos',
          options: this.getTimeOptions(MAX_MINUTE_SECOND)
        },
        {
          name: 'segundos',
          options: this.getTimeOptions(MAX_MINUTE_SECOND)
        }
      ]
    }
    return opts;
  }

  private getTimeOptions(maxValue: number) {

    let hourOpts: PickerColumnOption[] = [];

    for (var i = 0; i <= maxValue; i++) {
      let opt: PickerColumnOption = { text: i.toString().padStart(2, '0'), value: i };
      hourOpts.push(opt);
    }

    return hourOpts;

  }


}
