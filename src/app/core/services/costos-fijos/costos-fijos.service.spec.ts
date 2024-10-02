import { TestBed } from '@angular/core/testing';
import { CostosFijosService } from './costos-fijos.service'; // Asegúrate de que la ruta sea correcta
import { PeticionesHttpsService } from '@servicesTools/tools';
import { Paginacion } from '@interfaces/pagination';

describe('CostosFijosService', () => {
  let service: CostosFijosService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet', 'httpsPost', 'httpsPatch', 'httpsDelete']);

    TestBed.configureTestingModule({
      providers: [
        CostosFijosService,
        { provide: PeticionesHttpsService, useValue: spy }
      ]
    });

    service = TestBed.inject(CostosFijosService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerCostosFijos is called', async () => {
    const mockResponse: Paginacion<any> = { 
      results: [], // Aquí puedes agregar los objetos que necesites en tu respuesta
      pageInformation: {
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        totalElements: 0,
        totalPages: 0,
      }
    };
    
    const params = {}; // Agrega parámetros de prueba si es necesario
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse)); // Devuelve una Promise

    const response = await service.obtenerCostosFijos(params); // Usa await aquí
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/costos-fijos', params);
  });

  it('should call httpsPost with the correct URL when crearCostosFijos is called', async () => {
    const mockCostoFijo = { id: 1, nombre: 'Costo Fijo 1' }; // Ajusta según tu estructura
    peticionesHttpsServMock.httpsPost.and.returnValue(Promise.resolve(mockCostoFijo)); // Devuelve una Promise

    const response = await service.crearCostosFijos(mockCostoFijo); // Usa await aquí
    expect(response).toEqual(mockCostoFijo);
    expect(peticionesHttpsServMock.httpsPost).toHaveBeenCalledWith('/costos-fijos', mockCostoFijo);
  });

  it('should call httpsPatch with the correct URL when actualizarCostosFijos is called', async () => {
    const mockCostoFijo = { id: 1, nombre: 'Costo Fijo Actualizado' }; // Ajusta según tu estructura
    peticionesHttpsServMock.httpsPatch.and.returnValue(Promise.resolve(mockCostoFijo)); // Devuelve una Promise

    const response = await service.actualizarCostosFijos(mockCostoFijo); // Usa await aquí
    expect(response).toEqual(mockCostoFijo);
    expect(peticionesHttpsServMock.httpsPatch).toHaveBeenCalledWith('/costos-fijos', mockCostoFijo);
  });

  it('should call httpsDelete with the correct URL when eliminarCostoFijos is called', async () => {
    const mockCostoFijo = { id: 1 }; // Ajusta según tu estructura
    peticionesHttpsServMock.httpsDelete.and.returnValue(Promise.resolve(mockCostoFijo)); // Devuelve una Promise

    const response = await service.eliminarCostoFijos(mockCostoFijo); // Usa await aquí
    expect(response).toEqual(mockCostoFijo);
    expect(peticionesHttpsServMock.httpsDelete).toHaveBeenCalledWith('/costos-fijos', mockCostoFijo);
  });
});
