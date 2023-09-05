import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowersComponent } from './followers/followers.component';
import { UserComponent } from './profile/components/test/user.component';

const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
