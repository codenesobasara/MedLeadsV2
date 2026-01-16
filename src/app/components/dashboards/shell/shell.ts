import { Component } from '@angular/core';
import { State } from '../../../services/state';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HostSideBar } from '../../Ui/Host/host-side-bar/host-side-bar';
import { HostTopBar } from '../../Ui/Host/host-top-bar/host-top-bar';
import { Host } from '../host/host';


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
  constructor(private state:State){}

userRole = ""
sidebar:any
topbar:any
content:any

ngOnInit(){
  this.state.user$.subscribe(user =>{
    this.userRole = user.role
    if(this.userRole === "host"){
    this.sidebar = HostSideBar;
    this.topbar = HostTopBar;
    this.content = Host;
    }
  })

}
}
