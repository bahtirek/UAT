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
      name: 'Devices',
      action: 'devices',
      display: true
    },
    {
      name: 'Browsers',
      action: 'browsers',
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
  projectToDelete: number;
  deleteModalOn: boolean;
  detailsModalOn: any;

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

  onProjectDeleted() {
    this.toggleDeleteModal();
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

  onDelete(projectId: number) {
    this.projectToDelete = projectId;
    this.toggleDeleteModal();
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
  }

  toggleDetailsModal(){
    this.detailsModalOn = !this.detailsModalOn
  }

  onEdit(projectId: number) {
    this.projectToEdit = projectId;
    this.toggleCreateModal()
  }

  onDetails(item: string){
    console.log(item);
    this.toggleDetailsModal()
  }

  onAction(event: string, projectId: number){
    switch (event) {
      case 'edit': this.onEdit(projectId); break;
      case 'delete': this.onDelete(projectId); break;
      case 'environments': this.onDetails('environments'); break;
      case 'devices': this.onDetails('devices'); break;
      case 'browsers': this.onDetails('browsers'); break;
    }
  }
}
