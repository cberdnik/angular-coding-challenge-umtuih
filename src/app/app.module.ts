import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { AppComponent } from 'src/app/app.component';
import { CoreModule } from 'src/app/core/core.module';
import { WelcomeModule } from 'src/app/features/welcome/welcome.module';
import { TodosModule } from 'src/app/features/todos/todos.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        CoreModule,
        WelcomeModule,
        TodosModule,
        NgxsModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})
export class AppModule {}
