import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { MessagesModule } from '../messages/messages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  imports: [
    CommonModule,
    PoModule,
    MessagesModule,
    ReactiveFormsModule,
    AuthorizationModule,
  ],
  exports: [
    PoModule,
    MessagesModule,
    ReactiveFormsModule,
    AuthorizationModule,
    FormsModule,
  ],
})
export class SharedModule {}
