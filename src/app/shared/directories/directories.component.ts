import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Directory } from 'src/app/interfaces/directory.interface';
import { DirectoryService } from './directory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.component.html',
  styleUrls: ['./directories.component.less']
})
export class DirectoriesComponent implements OnInit {

  directories: Directory[];
  project: Directory;
  projectToEdit: Directory;
  isModalOn: boolean;

  constructor(private directoryService: DirectoryService, private router: Router) { }

  @Input() folderType: string;

  ngOnInit(): void {
    this.directoryService.directoriesSource.subscribe({
      next: (response) => {
        this.directories = response;
      }
    })
    this.directoryService.setDirectories()
  }

  onCreateCancel(){
    this.toggleAddDirectoryModal();
  }

  onCaseDirectoryEdit(){
    this.projectToEdit = {...this.project};
    this.toggleAddDirectoryModal();
  }

  onProjectSaved(){
    this.toggleAddDirectoryModal();
  }

  toggleAddDirectoryModal(){
    this.isModalOn = !this.isModalOn;
  }

  newProject(){
    this.toggleAddDirectoryModal();
  }

}
