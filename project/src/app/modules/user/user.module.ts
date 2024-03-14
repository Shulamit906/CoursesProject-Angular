
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./user.service";
import { LogoutComponent } from "./logout/logout.component";
import { MatInputModule } from '@angular/material/input'


@NgModule({
    declarations: [RegisterComponent, LoginComponent,LogoutComponent],
    imports: [CommonModule, BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule,MatInputModule],
    providers: [UserService],
    exports: [RegisterComponent,LoginComponent,LogoutComponent]
})

export class UserModule {
}
