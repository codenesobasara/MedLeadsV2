import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-team-mangement',
imports: [CommonModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatTooltipModule],
  templateUrl: './team-mangement.html',
  styleUrl: './team-mangement.css',
})
export class TeamMangement {

}
