import { UserDto } from '../../api/models/UserDto';

/**
 * Tipos de eventos disponibles en el EventBus
 */
export const EventTypes = {
  // Eventos de autenticación
  USER_LOGGED_IN: 'user.logged_in',
  USER_LOGGED_OUT: 'user.logged_out',
  
  // Puedes agregar más eventos aquí
  // NAVIGATION_CHANGE: 'navigation.change',
  // NOTIFICATION_SHOW: 'notification.show',
} as const;

/**
 * Payloads tipados para cada evento
 */
export interface EventPayloads {
  [EventTypes.USER_LOGGED_IN]: UserDto;
  [EventTypes.USER_LOGGED_OUT]: void;
}

/**
 * Helper type para obtener el payload de un evento
 */
export type EventPayload<T extends keyof EventPayloads> = EventPayloads[T];
