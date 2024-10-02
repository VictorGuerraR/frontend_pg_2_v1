import { TestBed } from '@angular/core/testing';
import { HerramientasService } from './herramientas.service'; // Asegúrate de que la ruta sea correcta
import { PeticionesHttpsService } from '@servicesTools/tools';
import { Paginacion } from '@interfaces/pagination';

describe('HerramientasService', () => {
  let service: HerramientasService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet', 'httpsPost', 'httpsPatch', 'httpsDelete']);

    TestBed.configureTestingModule({
      providers: [
        HerramientasService,
        { provide: PeticionesHttpsService, useValue: spy }
      ]
    });

    service = TestBed.inject(HerramientasService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerHerramientas is called', async () => {
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

    const response = await service.obtenerHerramientas(params); // Usa await aquí
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/herramientas', params);
  });

  it('should call httpsPost with the correct URL when crearHerramientas is called', async () => {
    const mockHerramienta = { id: 1, nombre: 'Martillo' }; // Ajusta según tu estructura
    peticionesHttpsServMock.httpsPost.and.returnValue(Promise.resolve(mockHerramienta)); // Devuelve una Promise

    const response = await service.crearHerramientas(mockHerramienta); // Usa await aquí
    expect(response).toEqual(mockHerramienta);
    expect(peticionesHttpsServMock.httpsPost).toHaveBeenCalledWith('/herramientas', mockHerramienta);
  });

  it('should call httpsPatch with the correct URL when actualizarHerramientas is called', async () => {
    const mockHerramienta = { id: 1, nombre: 'Martillo Actualizado' }; // Ajusta según tu estructura
    peticionesHttpsServMock.httpsPatch.and.returnValue(Promise.resolve(mockHerramienta)); // Devuelve una Promise

    const response = await service.actualizarHerramientas(mockHerramienta); // Usa await aquí
    expect(response).toEqual(mockHerramienta);
    expect(peticionesHttpsServMock.httpsPatch).toHaveBeenCalledWith('/herramientas', mockHerramienta);
  });

  it('should call httpsDelete with the correct URL when eliminarHerramientas is called', async () => {
    const mockHerramienta = { id: 1 }; // Ajusta según tu estructura
    peticionesHttpsServMock.httpsDelete.and.returnValue(Promise.resolve(mockHerramienta)); // Devuelve una Promise

    const response = await service.eliminarHerramientas(mockHerramienta); // Usa await aquí
    expect(response).toEqual(mockHerramienta);
    expect(peticionesHttpsServMock.httpsDelete).toHaveBeenCalledWith('/herramientas', mockHerramienta);
  });
});
