import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserService } from '../../user/services/user';

/**
 * Guard que protege rutas verificando si el usuario está autenticado
 */
export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  if (userService.user() !== undefined) {
    return true;
  }
  
  // Redirigir al login si no está autenticado
  return router.createUrlTree(['/login']);
};
