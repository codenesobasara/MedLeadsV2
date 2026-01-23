import { Component, inject } from '@angular/core';
import { HostDataService } from '../../../../services/host-data-service';
import { PercentPipe } from '@angular/common';
import { Engagement } from '../../../host/charts/engagement/engagement';


@Component({
  selector: 'vendor-engagement',
  imports: [PercentPipe,Engagement],
  templateUrl: './vendor-engagement.html',
  styleUrl: './vendor-engagement.css',
})
export class VendorEngagement {
private hostService = inject(HostDataService)

 analytics = this.hostService.analytics; 





}

