import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: '**', redirectTo: '' },
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}


