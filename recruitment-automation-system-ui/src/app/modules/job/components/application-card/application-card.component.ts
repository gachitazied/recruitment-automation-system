import {Component, Input, OnInit} from '@angular/core';
import {ApplicationResponse} from "../../../../services/models/application-response";
import {ApplicationService} from "../../../../services/services/application.service";

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent implements OnInit{
  @Input() application: ApplicationResponse = {};



  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  deleteApplication() {
    this.applicationService.deleteApplicationById
    ({
      appId: this.application.id!
    }).subscribe({
      next: () => window.location.reload(),
    })
  }
}
