import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobListingService } from '../../../../services/services/job-listing.service';
import { PageResponseJobListingResponse } from '../../../../services/models/page-response-job-listing-response';
import { JobListingRequest } from '../../../../services/models/job-listing-request';

@Component({
  selector: 'app-update-jobs-bord',
  templateUrl: './update-jobs-bord.component.html',
  styleUrls: ['./update-jobs-bord.component.css']
})
export class UpdateJobsBordComponent implements OnInit {
  jobForm: FormGroup;
  jobId: number | null = null;
  errorMsg: Array<string> = [];

  constructor(
      private fb: FormBuilder,
      private jobService: JobListingService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    this.jobForm = this.fb.group({
      title: [''],
      description: [''],
      location: [''],
      department: [''],
      requirements: [''],
      postedDate: [''],
      closingDate: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = +params.get('id')!;
      if (this.jobId) {
        this.loadJobDetails();
      }
    });
  }

  loadJobDetails() {
 this.route.paramMap.subscribe(params => {
   this.jobId = +params.get('id')!;
 })
    if (this.jobId) {
      this.jobService.findJobsById({jobId: this.jobId}).subscribe({
        next: (response: PageResponseJobListingResponse) => {

          this.jobForm.patchValue(response);
        },
        error: (err) => {
          console.error('Error loading job details:', err);

        }
      });
    }
  }

  updateJob() {
    if (this.jobId && this.jobForm.valid) {
      const updatedJob: JobListingRequest = this.jobForm.value;
      this.jobService.updateJobListingById({jobId: this.jobId, body: updatedJob}).subscribe({
        next: () => {
          this.router.navigate(['jobsBord']);
        },
        error: (err) => {
          console.error('Error updating job listing:', err);

        }
      });
    }
  }
}
