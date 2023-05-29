import { Component, OnInit } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.less']
})
export class StepListComponent implements OnInit {

  constructor(private executionService: ExecutionService) { }

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
    this.executionService.nextStepSource.subscribe({
      next: (response) => {
        this.switchStep(response + 1)
      }
    })
  }


  switchStep(index: number){
    const step = this.steps[index];
    if(step.status == null) {
      step.index = index;
      this.executionService.activeStepSource.next(step)
    } else {
      this.switchStep(step.index + 1)
    }
  }

}
