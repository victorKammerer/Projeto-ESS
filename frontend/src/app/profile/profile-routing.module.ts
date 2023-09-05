import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './components/test/tests.component'
import { FollowersComponent } from '../followers/followers.component';

const routes: Routes = [
    {path: 'users/:id',component: TestsComponent},
    {path: 'users/:id/followers',component: FollowersComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
