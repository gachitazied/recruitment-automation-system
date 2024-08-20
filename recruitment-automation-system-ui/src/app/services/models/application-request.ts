/* tslint:disable */
/* eslint-disable */
import { JobListing } from '../models/job-listing';
export interface ApplicationRequest {
  applicationDate?: string;
  candidateEmail?: string;
  candidateName?: string;
  coverLetter?: string;
  id?: number;
  jobListing?: JobListing;
  jobListingId?: JobListing;
  resumeUrl?: string;
  status?: string;
}
