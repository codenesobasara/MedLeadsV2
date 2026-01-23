import { Component,effect,inject } from '@angular/core';
import { State } from '../../../services/state';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HostSideBar } from '../../Ui/Host/host-side-bar/host-side-bar';
import { HostTopBar } from '../../Ui/Host/host-top-bar/host-top-bar';
import { Host } from '../host/host';
import { VendorTopBar } from '../../Ui/vendor/vendor-top-bar/vendor-top-bar';
import { VendorSideBar } from '../../Ui/vendor/vendor-side-bar/vendor-side-bar';
import { Vendor } from '../vendor/vendor';


@Component({
  selector: 'shell',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  private state = inject(State);

  sidebar: any;
  topbar: any;
  content: any;

  constructor() {
    effect(() => {
      const user = this.state.user();
      if (!user || user.role === 'none') return;
      console.log(`THE USER ROLE IS ${user.role}`);
      if (user.role === 'host') {
        this.sidebar = HostSideBar;
        this.topbar = HostTopBar;
        this.content = Host;
      }
      if(user.role === 'vendor'){
        this.sidebar =VendorSideBar;
        this.topbar = VendorTopBar;
        this.content = Vendor;
      }
    });
  }
}