import {Component, OnInit} from '@angular/core';
import {PageResponseApplicationResponse} from "../../../../services/models/page-response-application-response";
import {JobListingService} from "../../../../services/services/job-listing.service";
import {Router} from "@angular/router";
import {ApplicationService} from "../../../../services/services/application.service";

@Component({
  selector: 'app-application-list-bord',
  templateUrl: './application-list-bord.component.html',
  styleUrls: ['./application-list-bord.component.css']
})
export class ApplicationListBordComponent implements OnInit {
  ApplicationResponse: PageResponseApplicationResponse  = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
      private applicationService: ApplicationService,
      private router: Router
  ) {
  }

  private findAllApplications() {
    this.applicationService.findAllApplicationforRecruiter({
      page: this.page,
      size: this.size
    }).subscribe({
      next:(applications)=> {
        this.ApplicationResponse = applications;
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllApplications();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllApplications();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllApplications();
  }

  goToLastPage() {
    this.page = this.ApplicationResponse.totalPages as number - 1;
    this.findAllApplications();
  }

  goToNextPage() {
    this.page++;
    this.findAllApplications();
  }

  get isLastPage() {
    return this.page === this.ApplicationResponse.totalPages as number - 1;
  }

  ngOnInit(): void {
    this.findAllApplications();
  }

}
