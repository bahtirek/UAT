import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  pageTitle: string = 'Test Case / Dashboard';
  activeNavElement: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.router.routerState.snapshot.url !== '/test-case/details') {
      this.router.navigate(['../settings/product'], { relativeTo: this.route, skipLocationChange: true });
    }
  }

  onNavigationClick(navElement: string){
    this.activeNavElement = navElement
  }

}
