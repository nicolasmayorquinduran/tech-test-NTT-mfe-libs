import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginDto } from '../../api/models/LoginDto';
import { LoginResponseDto } from '../../api/models/LoginResponseDto';
import { UserService } from '../../user/services/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly apiUrl = 'http://localhost:3001'; // URL de tu API NestJS

  /**
   * Realiza el login y persiste los datos del usuario
   */
  login(credentials: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true // Importante para cookies HttpOnly
    }).pipe(
      tap(response => {
        if (response.ok && response.user) {
          this.userService.setUserData(response.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Cierra sesión y limpia los datos del usuario
   */
  logout(): void {
    this.userService.clearUser();
    // Aquí podrías hacer una llamada HTTP para invalidar el token en el backend
    // this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe();
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.userService.user() !== undefined;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error en el login';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
