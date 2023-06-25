import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.inteface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-dash',
  templateUrl: './users-dash.component.html',
  styleUrls: ['./users-dash.component.less']
})
export class UsersDashComponent implements OnInit {

  users: User[] = []
  createModalOn: boolean;
  userToEdit: number;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onUserSaved() {
    this.toggleCreateModal();
    this.userToEdit = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.userToEdit = null;
  }

  goToDetails(id: number) {
    this.usersService.userId = id;
    this.router.navigate(['details'], { relativeTo: this.route, skipLocationChange: true });
  }
}
