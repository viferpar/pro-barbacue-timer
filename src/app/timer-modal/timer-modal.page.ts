import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';
import { TimerCard } from '../models/timerCard';

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
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Editar'
        }
      ],
      columns: [
        {
          name: 'horas',
          options: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 }
          ]
        },
        {
          name: 'minutos',
          options: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 }
          ]
        },
        {
          name: 'segundos',
          options: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let horas = await picker.getColumn('horas');
      let minutos = await picker.getColumn('minutos');
      let segundos = await picker.getColumn('segundos');
      this.timerCard.timer.hour = horas.options[horas.selectedIndex].value;
      this.timerCard.timer.minute = minutos.options[minutos.selectedIndex].value;
      this.timerCard.timer.second = segundos.options[segundos.selectedIndex].value;
    });
  }


}
