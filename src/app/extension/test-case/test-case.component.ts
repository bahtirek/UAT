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

  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.router.navigate(['dashboard'], { relativeTo: this.route, skipLocationChange: true });
  }

}
