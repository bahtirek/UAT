import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestCase } from 'src/app/interfaces/test-case.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.less']
})
export class TestCaseComponent implements OnInit {

  constructor(private router: Router, private testCaseService: TestCaseService) { }

  ngOnInit(): void {
  }

  @Input() folderType: string;
  @Input() testCase: TestCase;
  @Input() directoryId: number;

  testCaseDetails(){
    this.testCaseService.directory = {directoryId: this.directoryId}
    this.testCaseService.testCaseDetails = this.testCase;
    this.router.navigate(['test-case/details'], { skipLocationChange: true });
  }

}
