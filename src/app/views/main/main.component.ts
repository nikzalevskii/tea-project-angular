import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from "rxjs";
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  showPopup:boolean = false;
  timer:Subscription | null = null;
  constructor() { }

  ngOnInit(): void {
    this.accordion();
    this.timer = timer(10000).subscribe(() => {
      this.showPopup = true;
    })

  }

  ngOnDestroy() {
    this.timer?.unsubscribe();
  }

  accordion() {
    //accordion jquery ui
    let icons = {
      header: "ui-icon-caret-1-s",
      activeHeader: "ui-icon-caret-1-n"
    };
    $(function () {
        $("#accordion").accordion({
          collapsible: true,
          active: false,
          icons: icons
        });
      }
    );
  }

}
