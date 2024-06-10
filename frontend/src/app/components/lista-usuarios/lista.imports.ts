import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateUserdDialog } from '../create-user-dialog/create-user-dialog.component';

@NgModule({
    imports: [NgIf, MatTableModule, MatPaginatorModule,
        MatSortModule, MatIconModule, 
        RouterLink, MatTooltipModule, ToolbarModule, 
        ButtonModule, SplitButtonModule, InputTextModule, MatFormFieldModule, MatInputModule,CreateUserdDialog],
    exports: [NgIf, MatTableModule, MatPaginatorModule,
        MatSortModule, MatIconModule, RouterLink, MatTooltipModule, ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule, MatFormFieldModule, MatInputModule,CreateUserdDialog],
    providers: []
})
export class ImportsList{}