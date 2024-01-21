import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const adminUserGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkLoginAndAdminUser().pipe(map(value=>{
    if(value) return true;
    else{
      router.navigate(['/user']);
      return false;
    }
  }));

};
