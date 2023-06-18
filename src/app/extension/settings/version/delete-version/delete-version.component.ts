import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-delete-version',
  templateUrl: './delete-version.component.html',
  styleUrls: ['./delete-version.component.less']
})
export class DeleteVersionComponent implements OnInit {

  @Input() versionToDelete: number;
  @Output() onVersionDeleted = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private versionService: VersionService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.versionService.deleteVersion(this.versionToDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.onVersionDeleted.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
