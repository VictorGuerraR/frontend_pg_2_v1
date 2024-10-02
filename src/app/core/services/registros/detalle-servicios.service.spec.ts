import { TestBed } from '@angular/core/testing';
import { DetalleServiciosService } from './detalle-servicios.service'; // Asegúrate de que la ruta sea correcta
import { PeticionesHttpsService } from '@servicesTools/tools';

describe('DetalleServiciosService', () => {
  let service: DetalleServiciosService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;

  beforeEach(() => {
    const spyPeticiones = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet', 'httpsPost', 'httpsDelete']);

    TestBed.configureTestingModule({
      providers: [
        DetalleServiciosService,
        { provide: PeticionesHttpsService, useValue: spyPeticiones },
      ]
    });

    service = TestBed.inject(DetalleServiciosService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerDetalleServicios is called', async () => {
    const mockResponse = {}; // Define un mock para la respuesta
    const params = {}; // Agrega parámetros de prueba si es necesario
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse));

    const response = await service.obtenerDetalleServicios(params);
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/registros-maestro/servicio', params);
  });

  it('should call httpsPost with the correct URL when crearDetalleServicios is called', async () => {
    const mockServicio = { id: 1, nombre: 'Servicio' };
    peticionesHttpsServMock.httpsPost.and.returnValue(Promise.resolve(mockServicio));

    const response = await service.crearDetalleServicios(mockServicio);
    expect(response).toEqual(mockServicio);
    expect(peticionesHttpsServMock.httpsPost).toHaveBeenCalledWith('/registros-maestro/servicio', mockServicio);
  });

  it('should call httpsDelete with the correct URL when eliminarDetalleServicios is called', async () => {
    const mockServicio = { id: 1 };
    peticionesHttpsServMock.httpsDelete.and.returnValue(Promise.resolve(mockServicio));

    const response = await service.eliminarDetalleServicios(mockServicio);
    expect(response).toEqual(mockServicio);
    expect(peticionesHttpsServMock.httpsDelete).toHaveBeenCalledWith('/registros-maestro/servicio', mockServicio);
  });
});
