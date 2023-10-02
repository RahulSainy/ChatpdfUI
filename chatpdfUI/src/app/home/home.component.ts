import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private router: Router) {}

  navigateToHome(selectedOption: string) {
    // Navigate to the home component with the selected option as a route parameter
    this.router.navigate(['/customize'], { queryParams: { option: selectedOption } });
  }
}
