import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.less']
})
export class ExtensionComponent implements OnInit, AfterContentChecked {

  loading = this.loader.isLoading;

  constructor(private router: Router, private route: ActivatedRoute, private loader: LoaderService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.router.navigate(['settings'], { relativeTo: this.route, skipLocationChange: true });
  }

  ngAfterContentChecked(): void {
    //this.cd.detectChanges();
  }
}
