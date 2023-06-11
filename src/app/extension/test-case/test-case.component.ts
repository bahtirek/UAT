import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.less']
})
export class TestCaseComponent implements OnInit {

  pageTitle: string = 'Test Case / Dashboard';
  navigationEvent: NavigationStart

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.router.routerState.snapshot.url !== '/test-case/details') {
      this.router.navigate(['../test-case/dashboard'], { relativeTo: this.route, skipLocationChange: true });
    }
  }

}
