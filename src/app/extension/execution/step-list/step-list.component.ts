import { Component, OnInit } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.less']
})
export class StepListComponent implements OnInit {

  constructor() { }

  steps: TestStep[] = [
    {
      testStepId: 0,
      description: '1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      expected: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      status: null
    },
    {
      testStepId: 1,
      description: '2Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      expected: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      status: null
    },
    {
      testStepId: 2,
      description: '3Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      expected: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      status: null
    },
    {
      testStepId: 3,
      description: '4Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      expected: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, recusandae cupiditate quia vitae quisquam excepturi iusto molestiae exercitationem voluptates provident nobis',
      status: null
    }
  ]

  ngOnInit(): void {
  }

}
