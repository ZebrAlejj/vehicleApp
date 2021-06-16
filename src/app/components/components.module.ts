import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        NavbarComponent,
        ListComponent,
        FormComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        NavbarComponent,
        ListComponent,
        FormComponent
    ],
    providers: [],
})
export class ComponentsModule {}