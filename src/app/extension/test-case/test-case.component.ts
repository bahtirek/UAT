import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.less']
})
export class TestCaseComponent implements OnInit {

  private sub = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      map(event => event as NavigationStart),  // appease typescript
      filter(event => event.url.includes('/test-case') )
    )
    .subscribe(
      event => this.setBreadcrumb(event)
    );

  pageTitle: string = 'Test Case / Dashboard';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate(['dashboard'], { relativeTo: this.route, skipLocationChange: true });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setBreadcrumb(event: NavigationStart): void {
    let url = event.url.replace('-', ' ').substring(1).split('/');
    if(url.length > 1) {
      this.pageTitle = `${url[0]} / ${url[url.length-1]}`
    } else {
      this.pageTitle = `${url[0]} / Dashboard`;
      this.router.navigate(['dashboard'], { relativeTo: this.route, skipLocationChange: true });
    }
  }

}
