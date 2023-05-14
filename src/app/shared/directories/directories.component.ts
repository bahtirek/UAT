import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Directory } from 'src/app/interfaces/directory.interface';
import { DirectoryService } from './directory.service';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.component.html',
  styleUrls: ['./directories.component.less']
})
export class DirectoriesComponent implements OnInit {

  directories: Directory[];

  constructor(private directoryService: DirectoryService) { }

  @Input() folderType: string;

  ngOnInit(): void {
    this.directoryService.directoriesSource.subscribe({
      next: (response) => {
        this.directories = response;
      }
    })
    this.directoryService.setDirectories()
  }
}
