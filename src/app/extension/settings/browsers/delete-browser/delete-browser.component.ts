import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrowserService } from 'src/app/services/browser.service';

@Component({
  selector: 'app-delete-browser',
  templateUrl: './delete-browser.component.html',
  styleUrls: ['./delete-browser.component.less']
})
export class DeleteBrowserComponent implements OnInit {

  @Input() browserToDelete: number;
  @Input() productId: number;
  @Output() onBrowserDeleted = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private browserService: BrowserService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.browserService.deleteBrowser(this.browserToDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.onBrowserDeleted.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
