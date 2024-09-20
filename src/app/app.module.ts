import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { taskBoardReducer } from './store/task-board.reducer';
import { TaskBoardEffects } from './store/task-board.effects';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './task-modal/task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    TaskBoardComponent,
    TaskListComponent,
    TaskCardComponent,
    TaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ taskBoard: taskBoardReducer }),
    EffectsModule.forRoot([TaskBoardEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
