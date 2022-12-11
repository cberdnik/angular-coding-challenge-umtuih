import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from 'src/app/features/welcome/welcome.component';

@NgModule({
    declarations: [
        WelcomeComponent],
    imports: [
        CommonModule
    ],
    exports: [
        WelcomeComponent
    ]
})
export class WelcomeModule {}
