import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from 'src/app/features/welcome/welcome.component';
import { TodosPageComponent } from 'src/app/features/todos/pages/todos/todos-page.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'todos', component: TodosPageComponent },
      { path: '**', redirectTo: '' },
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: []
})
export class AppRoutingModule {}


