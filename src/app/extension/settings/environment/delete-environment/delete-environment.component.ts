import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-delete-environment',
  templateUrl: './delete-environment.component.html',
  styleUrls: ['./delete-environment.component.less']
})
export class DeleteEnvironmentComponent implements OnInit {

  @Input() environmentToDelete: number;
  @Output() onEnvironmentDeleted = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.environmentService.deleteEnvironment(this.environmentToDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.onEnvironmentDeleted.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
