import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/authorization/services/token.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {}
}
