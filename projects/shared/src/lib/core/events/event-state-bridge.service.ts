import { Injectable, inject } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { EventTypes } from './event-types';
import { GlobalStateService } from '../state/global-state.service';
import { UserDto } from '../../api/models/UserDto';

/**
 * Servicio puente entre EventBus y GlobalState
 * Escucha eventos del bus y actualiza el estado global
 * 
 * IMPORTANTE: Solo debe inicializarse en el HOST
 */
@Injectable({
  providedIn: 'root'
})
export class EventStateBridgeService {
  private readonly eventBus = inject(EventBusService);
  private readonly globalState = inject(GlobalStateService);

  /**
   * Inicializar listeners de eventos
   * Llamar esto SOLO en el AppComponent del HOST
   */
  initialize(): void {
    // Escuchar login exitoso
    this.eventBus.on<UserDto>(EventTypes.USER_LOGGED_IN).subscribe(user => {
      console.log('[EventStateBridge] Usuario logueado:', user);
      this.globalState.setUser(user);
    });

    // Escuchar logout
    this.eventBus.on(EventTypes.USER_LOGGED_OUT).subscribe(() => {
      console.log('[EventStateBridge] Usuario deslogueado');
      this.globalState.clearUser();
    });

    console.log('[EventStateBridge] Inicializado correctamente');
  }
}
