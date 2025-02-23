import { Component, Input, ViewChild, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnChanges {
  @Input() users: IUser[] = [];
  @ViewChild('userContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.renderUsers();
    }
  }

  renderUsers(): void {
    this.container.clear();
    this.users.forEach(user => {
      const componentRef = this.container.createComponent(UserCardComponent);
      componentRef.instance.user = user;
    });
  }
}
