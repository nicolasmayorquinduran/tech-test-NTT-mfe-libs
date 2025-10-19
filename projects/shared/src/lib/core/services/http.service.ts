import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { API_CONFIG, ApiConfig } from '../config/environment.config';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: any;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_CONFIG);

  /**
   * Construye la URL completa usando la baseUrl de la configuración
   */
  private buildUrl(endpoint: string): string {
    // Si el endpoint ya es una URL completa, retornarla tal cual
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    
    // Construir URL con baseUrl de configuración
    const baseUrl = this.apiConfig.baseUrl.replace(/\/$/, ''); // Remover trailing slash
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${path}`;
  }

  /**
   * Realiza una petición GET
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.get<T>(url, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición POST
   */
  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.post<T>(url, body, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición PUT
   */
  put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.put<T>(url, body, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición PATCH
   */
  patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.patch<T>(url, body, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /**
   * Realiza una petición DELETE
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.delete<T>(url, options).pipe(
      timeout(this.apiConfig.timeout || 30000),
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error en la petición';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente o de red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
    }
    
    console.error('HTTP Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
