import { Component } from '@angular/core';
import {PageResponseApplicationResponse} from "../../../../services/models/page-response-application-response";
import {ApplicationService} from "../../../../services/services/application.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent {
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
    this.applicationService.findAllApplication({
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
