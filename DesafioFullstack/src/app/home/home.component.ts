import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../authorization/models/user';
import { TokenService } from '../authorization/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public logo: string;
  public title: string;
  public menu!: Array<PoMenuItem>;
  public user!: User;
  public profileActions: Array<PoToolbarAction> = [];
  public profile: PoToolbarProfile = {
    avatar: '',
    title: '',
  };
  private subs = new Subscription();

  public name!: string;

  constructor(private router: Router, private tokenService: TokenService) {
    this.title = environment.name;
    this.logo = `../../${environment.imagesPath}/ford.png`;
  }

  ngOnInit() {
    this.setHomeInfo();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private logout(): void {
    this.router.navigate(['login']);
  }

  private setHomeInfo(): void {
    this.profileActions.push({
      label: 'Logout',
      action: () => this.logout(),
    });
    this.menu = this.getMenus();
  }

  private getMenus(): Array<PoMenuItem> {
    const menu: Array<PoMenuItem> = [
      {
        label: 'Home',
        link: '/home/welcome',
      },
      {
        label: 'Dashboard',
        link: '/home/dashboard',
      },
    ];
    return menu;
  }
}
