import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '../../../../services/services/user-detail.service'; // Service généré par OpenAPI
import { UserDetailRequest } from '../../../../services/models/user-detail-request';
import { UserDetailResponse } from "../../../../services/models/user-detail-response"; // Modèle pour la réponse

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetail: UserDetailRequest = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  };

  userDetailResponse: UserDetailResponse | null = null; // Utilisez null pour vérifier si les détails sont chargés

  isEditing: boolean = false; // Flag pour alterner entre mode consultation et modification

  constructor(
      private router: Router,
      private userDetailService: UserDetailService
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  saveUserDetail() {
    this.userDetailService.create$Response({
      body: this.userDetail
    }).subscribe({
      next: (response) => {
        console.log('Détails utilisateur ajoutés avec succès !', response);
        this.loadUserDetails();
        this.isEditing = false; // Quitter le mode modification après l'ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout des détails utilisateur', error);
      }
    });
  }

  private loadUserDetails() {
    this.userDetailService.findAllUsers().subscribe({
      next: (response) => {
        console.log('Réponse de l\'API :', response);
        if (response.length > 0) {
          this.userDetailResponse = response[0];
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails utilisateur', error);
      }
    });
  }

  updateUserDetail() {
    if (this.userDetailResponse) {
      this.userDetail = {
        firstName: this.userDetailResponse.firstName || '',
        lastName: this.userDetailResponse.lastName || '',
        phoneNumber: this.userDetailResponse.phoneNumber || '',
        address: this.userDetailResponse.address || ''
      };
      this.isEditing = true;
    }
  }

  saveUpdatedUserDetail() {
    if (this.userDetailResponse) {
      this.userDetailService.update$Response({
        id: this.userDetailResponse.id as number,
        body: this.userDetail
      }).subscribe({
        next: (response) => {
          console.log('Détails utilisateur mis à jour avec succès !', response);
          this.loadUserDetails();
          this.isEditing = false; // Quitter le mode modification après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour des détails utilisateur', error);
        }
      });
    }
  }

  cancelEdit() {
    this.isEditing = false; // Quitter le mode modification sans enregistrer les modifications
  }
}
