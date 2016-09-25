import { Component, OnInit } from '@angular/core';

import { HomeComponent } from '../shared/components/home';
import { ProfileComponent } from '../shared/components/profile';
import { FriendsComponent } from '../shared/components/friends';
import { StatsComponent } from '../shared/components/stats';
import { ChallengesComponent } from '../shared/components/challenges';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [
    HomeComponent,
    ProfileComponent,
    FriendsComponent,
    ChallengesComponent,
    StatsComponent
  ]
})
export class MainComponent implements OnInit {

  private viewHome: boolean;
  private viewProfile: boolean;
  private viewFriends: boolean;
  private viewStats: boolean;
  private viewChallenges: boolean;

  constructor() { }

  ngOnInit() {
    this.viewHome = true;
    this.viewProfile = false;
    this.viewFriends = false;
    this.viewStats = false;
    this.viewChallenges = false;
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
        viewProfile: false,
        viewFriends: false,
        viewChallenges: false,
        viewStats: false
      },
      "profile": {
        viewHome: false,
        viewProfile: true,
        viewFriends: false,
        viewChallenges: false,
        viewStats: false
      },
      "friends": {
        viewHome: false,
        viewProfile: false,
        viewFriends: true,
        viewChallenges: false,
        viewStats: false
      },
      "challenges": {
        viewHome: false,
        viewProfile: false,
        viewFriends: false,
        viewChallenges: true,
        viewStats: false
      },
      "stats": {
        viewHome: false,
        viewProfile: false,
        viewFriends: false,
        viewChallenges: false,
        viewStats: true
      }
    }

    Object.assign(this, viewStateUpdate[view]);
  }

}
