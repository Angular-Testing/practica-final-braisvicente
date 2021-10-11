import { Component } from '@angular/core';

@Component({
  selector: 'ab-root',
  template: `
    <header>
      <nav role="navigation">
        <h1>
          <a [routerLink]="['/']">{{ title }}</a>
        </h1>
        <ul>
          <li>
            <a [routerLink]="['/search']">🔎 Search</a>
          </li>
          <li>
            <a [routerLink]="['/favorites']">🤍 Favorites</a>
          </li>
        </ul>
      </nav>
      <h1 role="banner">Angular application example for lift off 🚀</h1>
    </header>
    <main>
      <router-outlet> </router-outlet>
    </main>
    <footer>
      <p>
        Developed only for training purposes by
        <span>
          <a href="https://twitter.com/albertobasalo" target="_blank">Alberto Basalo</a> at
          <a href="https://github.com/angularbuilders" target="_blank">🅰👷‍♂️ Angular.Builders</a>
        </span>
      </p>
      <small>
        The
        <a href="https://github.com/angularbuilders/angular-booster" target="_blank"
          >👨‍💻 source code</a
        >
        is <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a> licensed
        . The website content is licensed
        <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"
          >CC BY NC SA 4.0</a
        >.
      </small>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  title = '🚀 angular-booster';
}
