import { ButtonModule } from 'primeng/button';
import { CreateActividadDialog } from '../create-actividad-dialog/create-actividad-dialog.component';
import { DialogRecord } from '../activity-records/activity-record.component';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
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

@NgModule({
    imports: [
        NgIf,
        ToolbarModule,
         ButtonModule, 
         SplitButtonModule, 
         InputTextModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        RouterLink,
        MatIconModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        DialogRecord,
        CreateActividadDialog],
    exports: [        
        NgIf,
        ToolbarModule,
        ButtonModule, 
        SplitButtonModule, 
        InputTextModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        RouterLink,
        MatIconModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        DialogRecord,
        CreateActividadDialog],
    providers: []
})
export class ImportsListTareas{}