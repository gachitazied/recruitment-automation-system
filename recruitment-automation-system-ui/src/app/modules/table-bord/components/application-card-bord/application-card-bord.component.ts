import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationResponse } from '../../../../services/models/application-response';
import { ApplicationService } from '../../../../services/services/application.service';

@Component({
  selector: 'app-application-card-bord',
  templateUrl: './application-card-bord.component.html',
  styleUrls: ['./application-card-bord.component.css']
})
export class ApplicationCardBordComponent implements OnInit {
  @Input() application: ApplicationResponse = {};



  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  updateStatus(status: string): void {
    if (this.application.id !== undefined) {
      this.applicationService.updateCandidateStatus(
          {
            appId: this.application.id,
            body: status
          }
      ).subscribe(
          () => {
            console.log('Status updated successfully');
            this.application.status = status;
          },
          (error) => {
            console.error('Error updating status:', error);
          }
      );
    } else {
      console.error('Application ID is undefined');
    }
  }


}
