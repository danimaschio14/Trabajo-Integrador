import { AvatarModule } from "primeng/avatar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ButtonModule } from "primeng/button";
import { NgModule } from "@angular/core";
import { RippleModule } from "primeng/ripple";
import { RouterLink } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";
import { StyleClassModule } from "primeng/styleclass";

@NgModule({
    imports: [
        ButtonModule,
        RouterLink,
        SidebarModule,
        RippleModule,
        AvatarModule,
        StyleClassModule
    ],
    exports: [
        ButtonModule,
        RouterLink,
        SidebarModule,
        RippleModule,
        AvatarModule,
        StyleClassModule
    ],
    providers: []
})
export class ImportsHeader { }