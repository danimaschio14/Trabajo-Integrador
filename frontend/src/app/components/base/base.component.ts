import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { OldFooterComponent } from '../sin-uso/old-footer/old-footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderComponent, OldFooterComponent, ToastModule, FooterComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {}
