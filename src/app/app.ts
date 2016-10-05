import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

@Component({
  selector: 'app',
  template: `
  <p>Hello Angular Universal App</p>
  <router-outlet></router-outlet>
  `
})
export class App {

}

interface Author {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'home',
  template: `
    <p>
      Home component
    </p>
    <p *ngIf="author">
      Author: {{author.firstName}} {{author.lastName}}
    </p>
  `
})
export class Home implements OnInit, OnDestroy  {
  author: Author;
  authorSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) {}
  
  ngOnInit() {
    this.authorSub = this.apollo.watchQuery({
      query: gql`
        query getAuthor {
          author {
            firstName
            lastName
          }
        }
      `
    }).subscribe(({ data }) => {
      this.author = data.author;
    });
  }

  ngOnDestroy() {
    this.authorSub.unsubscribe();
  }
}
