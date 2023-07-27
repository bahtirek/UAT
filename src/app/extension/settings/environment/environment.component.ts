import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Environment } from 'src/app/interfaces/environment.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.less']
})
export class EnvironmentComponent implements OnInit {

  environments: Environment[] = []
  createModalOn: boolean;
  environmentToEdit: number;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];
  deleteModalOn: boolean;
  environmentToDelete: number;

  @Input() product: Product;

  constructor(private productService: ProductsService, private environmentService: EnvironmentService) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (!changes.product.firstChange) {
      this.getEnvironments();
    }
  }


  getEnvironments() {
    this.environmentService.getAllEnvironments(this.product.productId).subscribe({
      next: (response) => {
        this.environments = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onAction(event: string, id: number){
    switch (event) {
      case 'edit': this.onEdit(id); break;
      case 'delete': this.onDelete(id); break;
    }
  }

  onDelete(id: number) {
    this.environmentToDelete = id;
    this.toggleDeleteModal();
  }

  onEdit(id: number) {
    this.environmentToEdit = id;
    this.toggleCreateModal()
  }

  onEnvironmentSaved() {
    this.toggleCreateModal();
    this.getEnvironments();
    this.environmentToEdit = null;
  }

  onEnvironmentDeleted() {
    this.toggleDeleteModal();
    this.getEnvironments();
    this.environmentToDelete = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.environmentToEdit = null;
  }

}
