import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApplicationService } from "../../../../services/services/application.service"; // Importez le service généré
import { JobListingService } from "../../../../services/services/job-listing.service"; // Importez le service généré

@Component({
  selector: 'app-static-application',
  templateUrl: './static-application.component.html',
  styleUrls: ['./static-application.component.css']
})
export class StaticApplicationComponent implements OnInit {
  chartApplications: any;
  chartJobs: any;

  constructor(
      private applicationService: ApplicationService,
      private jobService: JobListingService
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables); // Register Chart.js components
    this.loadCharts();
  }

  loadCharts(): void {
    this.loadApplicationsChart();
    this.loadJobsChart();
  }

  loadApplicationsChart(): void {
    this.applicationService.getStatusStats().subscribe(data => {
      this.createApplicationsChart(data);
    });
  }

  createApplicationsChart(data: any): void {
    if (this.chartApplications) {
      this.chartApplications.destroy();
    }

    this.chartApplications = new Chart('chartApplications', {
      type: 'pie', // Change to 'doughnut' if you prefer a doughnut chart
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Application Status',
          data: Object.values(data),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14 // Font size for legend labels
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                let label = tooltipItem.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += tooltipItem.raw;
                return label;
              }
            }
          },
          title: {
            display: true,
            text: 'Application Status Overview', // Title of the chart
            font: {
              size: 16 // Font size for the title
            },
            padding: {
              bottom: 10 // Space below the title
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        }
      }
    });
  }

  loadJobsChart(): void {
    this.jobService.getJobStatisticsByDate().subscribe(data => {
      this.createJobsChart(data);
    });
  }

  createJobsChart(data: any): void {
    if (this.chartJobs) {
      this.chartJobs.destroy();
    }

    this.chartJobs = new Chart('chartJobs', {
      type: 'bar', // Change to 'line' if you prefer a line chart
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Number of Jobs Posted',
          data: Object.values(data),
          backgroundColor: '#36A2EB',
          borderColor: '#36A2EB',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                let label = tooltipItem.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += tooltipItem.raw;
                return label;
              }
            }
          },
          title: {
            display: true,
            text: 'Job Posting Statistics',
            font: {
              size: 16
            },
            padding: {
              bottom: 10
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        }
      }
    });
  }
}
