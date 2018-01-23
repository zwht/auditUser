import {Component, OnInit, Injector} from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.less']
})
export class PrintComponent implements OnInit {

  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;

  constructor() {
    this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
    this.printStyle =
      `
             th, td {
                 color: black !important;
             }
             `;
  }

  ngOnInit() {
  }


  printComplete() {
    this.printBtnBoolean = true;
  }

  beforePrint() {
    this.printBtnBoolean = false;
  }

}
