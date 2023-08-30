import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MessagesService } from '../services/messages.service';

export const blockPageGuard: CanActivateFn = () => {
  const messagesService = inject(MessagesService);
  return messagesService.isActive;
};
