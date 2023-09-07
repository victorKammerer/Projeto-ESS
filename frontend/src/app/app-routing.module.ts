import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowersComponent } from './followers/followers.component';

import { UserComponent } from './profile/components/test/user.component';
import { FeedComponent } from './feed/feed.component';
import { EditComponent } from './profile/components/edit/edit.component';

import { HistoricListComponent } from './historic-list/historic-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FindComponent } from './find/find.component';


const routes: Routes = [
    {path: 'users/:id', component: UserComponent,children: [
        { path: '', component: FeedComponent },
        { path: 'edit', component: EditComponent },
    ]},
    {path: 'users/:id/followers',component: FollowersComponent},
    {path: 'search',component: FindComponent},
    { path: 'users/:userId/historic', component: HistoricListComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
