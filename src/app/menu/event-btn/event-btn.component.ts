import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from 'src/app/services/active-btn.service';
import { SelectService } from 'src/app/services/select.service';
import { SelectedElementsService } from 'src/app/services/selected-elements.service';

@Component({
  selector: 'app-event-btn',
  templateUrl: './event-btn.component.html',
  styleUrls: ['./event-btn.component.less']
})
export class EventBtnComponent implements OnInit {

  constructor(private activeBtnService: ActiveBtnService, private onClick: SelectService, private selectedElemnstService: SelectedElementsService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-event-button";

  ngOnInit(): void {
    this.activeBtnService.activeBtnSubject.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
        if(this.activeBtn != this.currentBtn) this.isActive = false;
      }
    )
  }

  onMenuBtnClick () {
    this.activeBtnUpdate();
  }

  activeBtnUpdate(){
    this.onClick.onDeselect(true);
    if(this.isActive) {
      this.isActive = false;
      this.activeBtnService.activeBtnSubject.next('');
    } else {
      this.isActive = true;
      this.activeBtnService.activeBtnSubject.next(this.currentBtn);
    }
  }

}
