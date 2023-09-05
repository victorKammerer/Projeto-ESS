import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-components',
  templateUrl: './test-components.component.html',
  styleUrls: ['./test-components.component.scss']
})
export class TestComponentsComponent {
  constructor(
    private readonly router: Router
  ) {}

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }
}
