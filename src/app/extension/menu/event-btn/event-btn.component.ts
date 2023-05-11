import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-event-btn',
  templateUrl: './event-btn.component.html',
  styleUrls: ['./event-btn.component.less']
})
export class EventBtnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    this.router.navigateByUrl('/', {skipLocationChange: true});
  }

}
