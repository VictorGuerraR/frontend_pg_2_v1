import { TestBed } from '@angular/core/testing';
import { RegistrosService } from './registros.service'; // Asegúrate de que la ruta sea correcta
import { PeticionesHttpsService } from '@servicesTools/tools';
import { DetalleBienService } from './detalle-bien.service';
import { DetalleServiciosService } from './detalle-servicios.service';
import { Paginacion } from '@interfaces/pagination';

describe('RegistrosService', () => {
  let service: RegistrosService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;
  let detalleBienServMock: jasmine.SpyObj<DetalleBienService>;
  let detalleServiciosServMock: jasmine.SpyObj<DetalleServiciosService>;

  beforeEach(() => {
    const spyPeticiones = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet', 'httpsPost', 'httpsPatch', 'httpsDelete']);
    const spyDetalleBien = jasmine.createSpyObj('DetalleBienService', ['crearDetalleBien', 'eliminarDetalleBien', 'obtenerDetalleBien']);
    const spyDetalleServicios = jasmine.createSpyObj('DetalleServiciosService', ['crearDetalleServicios', 'eliminarDetalleServicios', 'obtenerDetalleServicios']);

    TestBed.configureTestingModule({
      providers: [
        RegistrosService,
        { provide: PeticionesHttpsService, useValue: spyPeticiones },
        { provide: DetalleBienService, useValue: spyDetalleBien },
        { provide: DetalleServiciosService, useValue: spyDetalleServicios },
      ]
    });

    service = TestBed.inject(RegistrosService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
    detalleBienServMock = TestBed.inject(DetalleBienService) as jasmine.SpyObj<DetalleBienService>;
    detalleServiciosServMock = TestBed.inject(DetalleServiciosService) as jasmine.SpyObj<DetalleServiciosService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerRegistrosMaestros is called', async () => {
    const mockResponse: Paginacion<any> = {
      results: [],
      pageInformation: {
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        totalElements: 0,
        totalPages: 0,
      }
    };

    const params = {}; // Agrega parámetros de prueba si es necesario
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse));

    const response = await service.obtenerRegistrosMaestros(params);
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/registros-maestro', params);
  });

  it('should call httpsGet with the correct URL when obtenerEncabezadoMaestro is called', async () => {
    const mockResponse = {}; // Define un mock para el encabezado
    const params = {};
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse));

    const response = await service.obtenerEncabezadoMaestro(params);
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/registros-maestro/encabezado', params);
  });

  it('should call httpsPost with the correct URL when crearRegistrosMaestros is called', async () => {
    const mockRegistro = { id: 1, nombre: 'Registro 1' };
    peticionesHttpsServMock.httpsPost.and.returnValue(Promise.resolve(mockRegistro));

    const response = await service.crearRegistrosMaestros(mockRegistro);
    expect(response).toEqual(mockRegistro);
    expect(peticionesHttpsServMock.httpsPost).toHaveBeenCalledWith('/registros-maestro', mockRegistro);
  });

  it('should call httpsPatch with the correct URL when actualizarRegistrosMaestros is called', async () => {
    const mockRegistro = { id: 1, nombre: 'Registro Actualizado' };
    peticionesHttpsServMock.httpsPatch.and.returnValue(Promise.resolve(mockRegistro));

    const response = await service.actualizarRegistrosMaestros(mockRegistro);
    expect(response).toEqual(mockRegistro);
    expect(peticionesHttpsServMock.httpsPatch).toHaveBeenCalledWith('/registros-maestro', mockRegistro);
  });

  it('should call httpsDelete with the correct URL when eliminarRegistrosMaestros is called', async () => {
    const mockRegistro = { id: 1 };
    peticionesHttpsServMock.httpsDelete.and.returnValue(Promise.resolve(mockRegistro));

    const response = await service.eliminarRegistrosMaestros(mockRegistro);
    expect(response).toEqual(mockRegistro);
    expect(peticionesHttpsServMock.httpsDelete).toHaveBeenCalledWith('/registros-maestro', mockRegistro);
  });
});
