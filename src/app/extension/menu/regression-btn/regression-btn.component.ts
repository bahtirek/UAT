import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regression-btn',
  templateUrl: './regression-btn.component.html',
  styleUrls: ['./regression-btn.component.less']
})
export class RegressionBtnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    this.router.navigateByUrl('/', {skipLocationChange: true});
  }

}
