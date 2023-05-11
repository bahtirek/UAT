import { Component, Input, OnInit } from '@angular/core';
import { TestCase } from 'src/app/interfaces/test-case.interface';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.less']
})
export class TestCaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() testCase: TestCase;

}
