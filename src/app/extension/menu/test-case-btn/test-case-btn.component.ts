import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-case-btn',
  templateUrl: './test-case-btn.component.html',
  styleUrls: ['./test-case-btn.component.less']
})
export class TestCaseBtnComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    this.router.navigate(['test-case1/dashboard'], { relativeTo: this.route, skipLocationChange: true });
  }

}
