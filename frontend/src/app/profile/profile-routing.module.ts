import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component'
import { FollowersComponent } from '../followers/followers.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
    {path: 'users/:id',component: UserComponent},
    {path: 'users/:id/followers',component: FollowersComponent},
    {path: 'users/:id/edit', component: PostComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
