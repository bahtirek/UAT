import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.less']
})
export class DeleteProjectComponent implements OnInit {

  @Input() projectToDelete: number;
  @Output() onProductDeleted = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.projectService.deleteProject(this.projectToDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.onProductDeleted.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
