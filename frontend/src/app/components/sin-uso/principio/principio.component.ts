import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { OldFooterComponent } from '../old-footer/old-footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-principio',
  standalone: true,
  imports: [HeaderComponent, OldFooterComponent, ToastModule],
  templateUrl: './principio.component.html',
  // styleUrl: './base.component.scss'
})
export class PrincipioComponent {

}
