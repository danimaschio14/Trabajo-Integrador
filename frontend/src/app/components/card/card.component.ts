import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RolesEnum } from '../../enums/roles.enum';

        
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    standalone: true,
    imports: [CardModule, ButtonModule,NgIf]
})
export class CardComponent {
constructor(private authService: AuthService) { } 
admin: boolean = this.authService.hasRole(RolesEnum.ADMIN);
employee: boolean = this.authService.hasRole(RolesEnum.EMPLOYEE);
}