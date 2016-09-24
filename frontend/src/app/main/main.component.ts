import { Component, OnInit } from '@angular/core';

import { HomeComponent } from '../shared/components/home';
import { ProfileComponent } from '../shared/components/profile';


@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [
    HomeComponent,
    ProfileComponent
  ]
})
export class MainComponent implements OnInit {

  private viewHome: boolean;
  private viewProfile: boolean;

  constructor() { }

  ngOnInit() {
    this.viewHome = true;
    this.viewProfile = false;
  }

  /**
   * Switches the view.
   *
   * @param view Can be one of: ["home", "profile"]
   */
  private switchView(view: string) {

    /**
     * Reflects the view state update changes.
     */
    const viewStateUpdate = {
      "home": {
        viewHome: true,
        viewProfile: false
      },
      "profile": {
        viewHome: false,
        viewProfile: true
      }
    }

    Object.assign(this, viewStateUpdate[view]);
  }

}
