import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TimerCard } from '../models/timerCard';

@Component({
  selector: 'app-timer-modal',
  templateUrl: './timer-modal.page.html',
  styleUrls: ['./timer-modal.page.scss'],
})
export class TimerModalPage implements OnInit {

  timerCard:TimerCard;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.timerCard = this.navParams.data.timer;
  }

  async closeModal() {
    this.modalController.dismiss(this.timerCard);
  }
  

}
