  import { Component, OnInit } from '@angular/core';
  import { CarouselModule } from 'primeng/carousel';
  import { ButtonModule } from 'primeng/button';
  import { TagModule } from 'primeng/tag';
import { RolesEnum } from '../../enums/roles.enum';
import { AuthService } from '../../services/auth.service';
  
  
interface Img { 
   image: any
} 
  @Component({
      selector: 'app-carousel',
      templateUrl: './carrusel.component.html',
      styleUrl: './carrusel.component.scss',
      standalone: true,
      imports: [CarouselModule, ButtonModule, TagModule],
  })

export class CarouselComponent { 
    imgAdmin: Img[] = [];
    imgEmployee: Img[] = []; 
   
    constructor(private authService: AuthService) { } 
    admin: boolean = this.authService.hasRole(RolesEnum.ADMIN);
    employee: boolean = this.authService.hasRole(RolesEnum.EMPLOYEE);
    ngOnInit() { 
        this.imgAdmin = [ 
            { 
                image: 'assets/img/banner1.png'
            }, 
            { 
                image: 'assets/img/banner2.png', 
            }, 
            { 
                image: 'assets/img/banner3.png'
            }, 
        ];
        this.imgEmployee = [ 
            { 
                image: 'assets/img/banner1.png'
            }, 
            { 
                image: 'assets/img/banner2.png', 
            }, 
            { 
                image: 'assets/img/banner3.png'
            }, 
        ];  
    } 
}
  