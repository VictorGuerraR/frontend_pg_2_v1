import { TestBed } from '@angular/core/testing';
import { DetalleBienService } from './detalle-bien.service'; // Asegúrate de que la ruta sea correcta
import { PeticionesHttpsService } from '@servicesTools/tools';

describe('DetalleBienService', () => {
  let service: DetalleBienService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;

  beforeEach(() => {
    const spyPeticiones = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet', 'httpsPost', 'httpsDelete']);

    TestBed.configureTestingModule({
      providers: [
        DetalleBienService,
        { provide: PeticionesHttpsService, useValue: spyPeticiones },
      ]
    });

    service = TestBed.inject(DetalleBienService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerDetalleBien is called', async () => {
    const mockResponse = {}; // Define un mock para la respuesta
    const params = {}; // Agrega parámetros de prueba si es necesario
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse));

    const response = await service.obtenerDetalleBien(params);
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/registros-maestro/bien', params);
  });

  it('should call httpsPost with the correct URL when crearDetalleBien is called', async () => {
    const mockDetalleBien = { id: 1, nombre: 'Detalle Bien' };
    peticionesHttpsServMock.httpsPost.and.returnValue(Promise.resolve(mockDetalleBien));

    const response = await service.crearDetalleBien(mockDetalleBien);
    expect(response).toEqual(mockDetalleBien);
    expect(peticionesHttpsServMock.httpsPost).toHaveBeenCalledWith('/registros-maestro/bien', mockDetalleBien);
  });

  it('should call httpsDelete with the correct URL when eliminarDetalleBien is called', async () => {
    const mockDetalleBien = { id: 1 };
    peticionesHttpsServMock.httpsDelete.and.returnValue(Promise.resolve(mockDetalleBien));

    const response = await service.eliminarDetalleBien(mockDetalleBien);
    expect(response).toEqual(mockDetalleBien);
    expect(peticionesHttpsServMock.httpsDelete).toHaveBeenCalledWith('/registros-maestro/bien', mockDetalleBien);
  });
});
