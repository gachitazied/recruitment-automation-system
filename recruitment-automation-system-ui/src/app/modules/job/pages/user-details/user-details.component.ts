import { Component, OnInit } from '@angular/core';
import {UserDetailResponse} from "../../../../services/models/user-detail-response";
import {User} from "../../../../services/models/user";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {UserDetailRequest} from "../../../../services/models/user-detail-request";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetail: UserDetailResponse = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  };

  constructor(
    private userService: UserService,
    private authService: AuthenticationService // Injectez le service d'authentification
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId(); // Obtenez l'ID utilisateur depuis le service
    if (id !== null) {
      this.loadUserDetails(id);
    } else {
      console.error('User ID not found');

    }
  }

  loadUserDetails(id: number): void {
    this.userService.findUserById(id).subscribe(data => {
      this.userDetail = data;
    });
  }

  onSubmit(): void {
    const id = this.userDetail.id;
    const updateRequest: UserDetailRequest= {
     id: this.userDetail.id,
     user: this.userDetail.user,
     firstName: this.userDetail.firstName,
     lastName: this.userDetail.lastName,
     phoneNumber: this.userDetail.phoneNumber,
     address: this.userDetail.address
    };

    this.userService.updateUserDetail(id, updateRequest).subscribe(() => {
      console.log('User details updated successfully');
    });
  }

  onDelete(): void {
    const id = this.userDetail.id;

    this.userService.deleteUserDetail(id).subscribe(() => {
      console.log('User details deleted successfully');
      // Rediriger ou mettre à jour l'UI après suppression
    });
  }
}
