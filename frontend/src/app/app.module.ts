import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HistoricListComponent } from './historic-list/historic-list.component';
import { FollowersComponent } from './followers/followers.component';
import { ProfileModule } from './profile/profile.module';
import { FeedComponent } from './feed/feed.component';

import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [AppComponent, HistoricListComponent, NotFoundComponent],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        SharedModule,
        HomeModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ProfileModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
