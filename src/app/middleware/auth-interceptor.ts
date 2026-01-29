import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('https://api.geoapify.com')) {
    return next(req);
  }
  const authService = inject(AuthService);
  const token = authService.getAuthToken(); 
  if (!token) {
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};