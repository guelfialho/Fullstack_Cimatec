import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authorization/services/authentication.service';
import { MessagesService } from '../messages/messages.service';
import { PoPageLogin } from '@po-ui/ng-templates';
import { TokenService } from '../authorization/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  public isLoading: boolean;
  public logo: string;
  public secondaryLogo: string;
  private subs = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router,
    private messageService: MessagesService
  ) {
    this.logo = `../../assets/ford.png`;
    this.secondaryLogo = `../../assets/ford.png`;
  }

  ngOnInit(): void {
    this.tokenService.removeToken();
    this.isLoading = false;
  }

  onloginSubmit(formData: PoPageLogin): void {
    this.email = formData.login;
    this.password = formData.password;
    this.login();
  }

  login() {
    this.authService.authenticate(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['home']);
      },
      (error) => {
        this.messageService.showMessageError('Email ou senha incorretos');
        console.log(error);
      }
    );
  }
}
