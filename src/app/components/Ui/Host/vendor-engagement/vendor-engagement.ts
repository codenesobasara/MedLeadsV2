import { Component, inject } from '@angular/core';
import { HostDataService } from '../../../../services/host-data-service';
import { PercentPipe } from '@angular/common';
@Component({
  selector: 'vendor-engagement',
  imports: [PercentPipe],
  templateUrl: './vendor-engagement.html',
  styleUrl: './vendor-engagement.css',
})
export class VendorEngagement {
private hostService = inject(HostDataService)

 analytics = this.hostService.analytics; 

}
