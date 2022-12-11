import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent]
})
export class CoreModule {}
