import { Injectable, signal, computed } from '@angular/core';
import { UserDto } from '../../api/models/UserDto';

/**
 * Servicio de estado global compartido entre Host y Remotes
 * Usa Signals para reactividad automática
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  /**
   * Usuario actual autenticado
   */
  private _user = signal<UserDto | null>(null);
  readonly user = this._user.asReadonly();

  /**
   * Indica si hay un usuario autenticado
   */
  readonly isAuthenticated = computed(() => this._user() !== null);

  /**
   * Nombre del usuario actual
   */
  readonly userName = computed(() => this._user()?.name ?? '');

  /**
   * Establecer el usuario actual
   */
  setUser(user: UserDto | null): void {
    this._user.set(user);
  }

  /**
   * Limpiar el usuario (logout)
   */
  clearUser(): void {
    this._user.set(null);
  }

  /**
   * Actualizar parcialmente el usuario
   */
  updateUser(updates: Partial<UserDto>): void {
    const currentUser = this._user();
    if (currentUser) {
      this._user.set({ ...currentUser, ...updates });
    }
  }
}
