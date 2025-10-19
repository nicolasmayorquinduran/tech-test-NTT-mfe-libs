/*
 * Public API Surface of shared
 */

// HTTP service - Servicio transversal para peticiones HTTP
export * from './lib/core/services/http.service';

// Configuration tokens - Tokens de inyección para configuración
export * from './lib/core/config/environment.config';

// Module Federation types & helpers - Tipos y helpers para MFE
export * from './lib/core/config/mfe.config';

// EventBus - Sistema de eventos para comunicación entre MFEs
export * from './lib/core/events/event-bus.service';
export * from './lib/core/events/event-types';
export * from './lib/core/events/event-state-bridge.service';

// Global State - Estado global compartido
export * from './lib/core/state/global-state.service';

// API models - Solo tipos/interfaces de respuesta de la API
export * from './lib/api/models/UserDto';
export * from './lib/api/models/LoginDto';
export * from './lib/api/models/LoginResponseDto';
export * from './lib/api/models/LogoutResponseDto';
