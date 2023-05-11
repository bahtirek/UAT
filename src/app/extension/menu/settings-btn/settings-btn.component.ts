import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-settings-btn',
  templateUrl: './settings-btn.component.html',
  styleUrls: ['./settings-btn.component.less']
})
export class SettingsBtnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    this.router.navigateByUrl('/', {skipLocationChange: true});
  }

}
