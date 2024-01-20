import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const normalUserGuard: CanActivateFn = (route, state) => {
  
  //logic
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkLoginAndNormalUser().pipe(map(value => {
    if(value) {
      return true;
    } else{
      router.navigate(['/login']);
      return false;
    }
  }))
  //return true;
};
