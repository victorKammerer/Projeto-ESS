import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowersComponent } from './followers/followers.component';

const routes: Routes = [
    { path: 'users/:id/followers', component: FollowersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
