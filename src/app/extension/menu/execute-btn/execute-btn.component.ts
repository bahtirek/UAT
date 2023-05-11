import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-execute-btn',
  templateUrl: './execute-btn.component.html',
  styleUrls: ['./execute-btn.component.less']
})
export class ExecuteBtnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    this.router.navigateByUrl('/', {skipLocationChange: true});
  }
}
