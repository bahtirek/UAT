import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {

  pageTitle: string = 'Test Case / Dashboard';

  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.router.navigate(['create'], { relativeTo: this.route, skipLocationChange: true });
  }

}
