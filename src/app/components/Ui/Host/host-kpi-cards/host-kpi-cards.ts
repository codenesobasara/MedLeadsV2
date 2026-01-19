import { Component } from '@angular/core';
import { Host } from '../../../dashboards/host/host';
import { Observable } from 'rxjs';
import { HostEventAnalytics } from '../../../../interfaces/host-objects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'host-kpi',
  imports: [Host,MatInputModule,
    MatButtonModule,
    MatIconModule,MatFormFieldModule,AsyncPipe, MatSelectModule],
  templateUrl: './host-kpi-cards.html',
  styleUrl: './host-kpi-cards.css',
})
export class HostKpiCards {
 analytics$!:Observable<HostEventAnalytics>
}
