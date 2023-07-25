import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Directory } from 'src/app/interfaces/directory.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';

import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less']
})
export class ProjectsComponent implements OnInit {

  projects: Directory[] = [];
  project: Directory;
  createModalOn: boolean;
  projectToEdit: number;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Versions',
      action: 'versions',
      display: true
    },
    {
      name: 'Environments',
      action: 'environments',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onProjectSaved() {
    this.toggleCreateModal();
    this.getAllProjects();
    this.projectToEdit = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.projectToEdit = null;
  }
}
