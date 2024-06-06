import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BaseComponent } from "../base/base.component";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { NgModule } from "@angular/core";
import { PasswordModule } from "primeng/password";
import { RouterLink } from "@angular/router";
import { ToastModule } from "primeng/toast";

@NgModule({
    imports: [ DialogModule, InputTextModule, ButtonModule, PasswordModule,FormsModule,ReactiveFormsModule,NgIf,ToastModule,RouterLink],
    exports: [ DialogModule, InputTextModule, ButtonModule, PasswordModule,FormsModule,ReactiveFormsModule,NgIf,ToastModule,RouterLink],
    providers: []
})
export class ImportsForm {}