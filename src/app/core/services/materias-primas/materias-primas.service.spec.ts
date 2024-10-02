import { TestBed } from '@angular/core/testing';
import { MateriasPrimasService } from './materias-primas.service'; // Asegúrate de que la ruta sea correcta
import { PeticionesHttpsService } from '@servicesTools/tools';
import { Paginacion } from '@interfaces/pagination';

describe('MateriasPrimasService', () => {
  let service: MateriasPrimasService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet', 'httpsPost', 'httpsPatch', 'httpsDelete']);

    TestBed.configureTestingModule({
      providers: [
        MateriasPrimasService,
        { provide: PeticionesHttpsService, useValue: spy }
      ]
    });

    service = TestBed.inject(MateriasPrimasService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerMateriasPrimas is called', async () => {
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

    const response = await service.obtenerMateriasPrimas(params);
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/materias-primas', params);
  });

  it('should call httpsPost with the correct URL when crearMateriasPrimas is called', async () => {
    const mockMateriaPrima = { id: 1, nombre: 'Materia Prima 1' };
    peticionesHttpsServMock.httpsPost.and.returnValue(Promise.resolve(mockMateriaPrima));

    const response = await service.crearMateriasPrimas(mockMateriaPrima);
    expect(response).toEqual(mockMateriaPrima);
    expect(peticionesHttpsServMock.httpsPost).toHaveBeenCalledWith('/materias-primas', mockMateriaPrima);
  });

  it('should call httpsPatch with the correct URL when actualizarMateriasPrimas is called', async () => {
    const mockMateriaPrima = { id: 1, nombre: 'Materia Prima Actualizada' };
    peticionesHttpsServMock.httpsPatch.and.returnValue(Promise.resolve(mockMateriaPrima));

    const response = await service.actualizarMateriasPrimas(mockMateriaPrima);
    expect(response).toEqual(mockMateriaPrima);
    expect(peticionesHttpsServMock.httpsPatch).toHaveBeenCalledWith('/materias-primas', mockMateriaPrima);
  });

  it('should call httpsDelete with the correct URL when eliminarMateriasPrimas is called', async () => {
    const mockMateriaPrima = { id: 1 };
    peticionesHttpsServMock.httpsDelete.and.returnValue(Promise.resolve(mockMateriaPrima));

    const response = await service.eliminarMateriasPrimas(mockMateriaPrima);
    expect(response).toEqual(mockMateriaPrima);
    expect(peticionesHttpsServMock.httpsDelete).toHaveBeenCalledWith('/materias-primas', mockMateriaPrima);
  });
});
