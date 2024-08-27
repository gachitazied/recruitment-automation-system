import {Component, OnInit} from '@angular/core';
import {PageResponseJobListingResponse} from "../../../../services/models/page-response-job-listing-response";
import {JobListingService} from "../../../../services/services/job-listing.service";
import {Router} from "@angular/router";
import {JobListingResponse} from "../../../../services/models/job-listing-response";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit{
  jobResponse: PageResponseJobListingResponse = {};
  page = 0;
  size = 4;
  pages: any = [];
  message = '';
  level: 'success' | 'error' = 'success';
  searchTitle: string = '';
  sort: 'newest' | 'oldest' = 'newest';

  constructor(
      private jobService: JobListingService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllJobs();
  }

  private findAllJobs() {
    this.jobService.findAllJobsforCondidate({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (jobs) => {
        this.jobResponse = jobs;
        this.updatePages();
      }
    });
  }

  public searchJobs() {
    this.jobService.searchJobsForCandidate({
      title: this.searchTitle,
      page: this.page,
      size: this.size,
      sort: this.sort
    }).subscribe({
      next: (jobs) => {
        this.jobResponse = jobs;
        this.updatePages();
      }
    });
  }

  public applyFilter(filter: 'newest' | 'oldest') {
    this.sort = filter;
    this.searchJobs();
  }

  private updatePages() {
    this.pages = Array.from({ length: this.jobResponse.totalPages || 0 }, (_, index) => index);
  }

  gotToPage(page: number) {
    this.page = page;
    if (this.searchTitle) {
      this.searchJobs();
    } else {
      this.findAllJobs();
    }
  }

  goToFirstPage() {
    this.page = 0;
    if (this.searchTitle) {
      this.searchJobs();
    } else {
      this.findAllJobs();
    }
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      if (this.searchTitle) {
        this.searchJobs();
      } else {
        this.findAllJobs();
      }
    }
  }

  goToLastPage() {
    this.page = (this.jobResponse.totalPages as number) - 1;
    if (this.searchTitle) {
      this.searchJobs();
    } else {
      this.findAllJobs();
    }
  }

  goToNextPage() {
    if (!this.isLastPage) {
      this.page++;
      if (this.searchTitle) {
        this.searchJobs();
      } else {
        this.findAllJobs();
      }
    }
  }

  get isLastPage() {
    return this.page === (this.jobResponse.totalPages as number) - 1;
  }

  displayJobDetails(job: JobListingResponse) {
    this.router.navigate(['jobs', 'details', job.id]);
  }
}
