// Define las interfaces para los métodos de estrategia
export interface Estrategia {
  creacion: (value: any) => Promise<unknown>;
  eliminacion: (value: any) => Promise<unknown>;
  obtener: (value: any) => Promise<unknown>;
}

// Define la interfaz para el objeto strategies
export interface Estrategias {
  [key: string]: Estrategia;
  bienes: Estrategia;
  servicios: Estrategia;
}