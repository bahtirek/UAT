import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestCase } from 'src/app/interfaces/test-case.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-test-case-dash',
  templateUrl: './test-case-dash.component.html',
  styleUrls: ['./test-case-dash.component.less']
})
export class TestCaseDashComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private testCaseService: TestCaseService) { }

  ngOnInit(): void {
    this.testCaseService.clearTestCase();
    this.testCaseService.clearTestCase();
  }

  onTestCaseFound(testCase: TestCase){
    this.testCaseService.testCaseDetails = testCase;
    this.router.navigate(['test-case/details'], { skipLocationChange: true });
  }

}
