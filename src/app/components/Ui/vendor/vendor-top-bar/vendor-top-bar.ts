import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-vendor-top-bar',
  imports: [    
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatNavList
],
  templateUrl: './vendor-top-bar.html',
  styleUrl: './vendor-top-bar.css',
})
export class VendorTopBar {

}
