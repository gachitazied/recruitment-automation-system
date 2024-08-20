/* tslint:disable */
/* eslint-disable */
import { JobListing } from '../models/job-listing';
export interface ApplicationResponse {
  applicationDate?: string;
  candidateEmail?: string;
  candidateName?: string;
  coverLetter?: string;
  id?: number;
  jobListing?: JobListing;
  resumeUrl?: string;
  status?: string;
}
