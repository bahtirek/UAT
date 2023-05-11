import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, take } from 'rxjs';
import { TestCase } from 'src/app/interfaces/test-case.interface';
import { Title } from 'src/app/interfaces/title.interface';
import { TestCaseService } from 'src/app/services/test-case.service';
import { StepService } from 'src/app/services/test-step.service';

@Component({
  selector: 'app-search-test-case',
  templateUrl: './search-test-case.component.html',
  styleUrls: ['./search-test-case.component.less']
})
export class SearchTestCaseComponent implements OnInit {

  title: string = '';
  submitInProgress: number;
  titles: Title[] = [
    {
      title: 'Title 1',
      id: 1
    },
    {
      title: 'Title 2',
      id: 2
    },
    {
      title: 'Title 3',
      id: 3
    },
    {
      title: 'Title 4',
      id: 4
    },
    {
      title: 'Title 5',
      id: 5
    },
  ];
  testCases: TestCase[];
  testCaseId: number;
  titleSearch = new Subject<string>();
  searchError: string;

  constructor(private testCaseService: TestCaseService) {}

  ngOnInit(): void {
    this.testCaseId = this.testCaseService.testCase?.testCaseId;
  }

  ngAfterViewInit(){
    this.titleSearch.pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(value => {
      this.searchTestCase();
    });
  }

  @Input() stepIndex: number;

  @Output() cancel = new EventEmitter<void>();
  @Output() testCaseEmit = new EventEmitter<TestCase>();

  searchTestCase(){
    this.searchError = '';
    let searchQuery = this.title;
    searchQuery = searchQuery.trim();
    if(searchQuery.length > 2) {
      this.testCaseService.searchTestCase(this.title, 0).subscribe(
        response => {
          console.log(response);
          
          this.testCases = response;
        }
      )
    } else {
      this.testCases = [];
      this.searchError = 'Search query should more than 2 characters';
    }
  }

  onImport(importedTestCase: TestCase){
    if(!this.submitInProgress) {
      this.submitInProgress = importedTestCase.testCaseId;
      this.testCaseEmit.emit(importedTestCase)
    }
  }

  onCancel(){
    this.cancel.emit();
    this.stepIndex = null;
  }

}
