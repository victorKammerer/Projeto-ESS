import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
    @Input() rating: number = 0; // Default rating is 0
  
    starClass(index: number): string {
      // Calculate the class based on the index and rating value
      if (index <= Math.floor(this.rating)) {
        return 'yellow'; // Apply the yellow class for rated stars
      } else {
        return 'white'; // Apply the white class for unrated stars
      }
    }
}