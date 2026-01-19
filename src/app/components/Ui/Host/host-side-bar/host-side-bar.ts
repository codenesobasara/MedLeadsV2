import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-host-side-bar',
  imports: [    
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatNavList
],
  templateUrl: './host-side-bar.html',
  styleUrl: './host-side-bar.css',
})
export class HostSideBar {

}
