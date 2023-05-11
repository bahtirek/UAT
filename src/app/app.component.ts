import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'ez-bug-ext',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  loading = this.loader.isLoading;

  constructor(private loader: LoaderService, private cd: ChangeDetectorRef, private auth: AuthService) { }
  ngOnInit(): void {
    this.auth.getTokenFromLocal()
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
}
