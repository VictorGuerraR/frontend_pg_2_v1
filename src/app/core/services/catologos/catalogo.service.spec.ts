import { TestBed } from '@angular/core/testing';
import { CatalogosService } from './catalogos.service';
import { PeticionesHttpsService } from '@servicesTools/tools';

describe('CatalogosService', () => {
  let service: CatalogosService;
  let peticionesHttpsServMock: jasmine.SpyObj<PeticionesHttpsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PeticionesHttpsService', ['httpsGet']);

    TestBed.configureTestingModule({
      providers: [
        CatalogosService,
        { provide: PeticionesHttpsService, useValue: spy }
      ]
    });

    service = TestBed.inject(CatalogosService);
    peticionesHttpsServMock = TestBed.inject(PeticionesHttpsService) as jasmine.SpyObj<PeticionesHttpsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpsGet with the correct URL when obtenerUsuarios is called', async () => {
    const mockResponse = [{ id: 1, name: 'John Doe' }];
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse)); // Cambia a Promise

    const response = await service.obtenerUsuarios(); // Usa await aquí
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/catalogo/usuarios');
  });

  it('should call httpsGet with the correct URL when obtenerHerramientas is called', async () => {
    const mockResponse = [{ id: 1, name: 'Hammer' }];
    peticionesHttpsServMock.httpsGet.and.returnValue(Promise.resolve(mockResponse)); // Cambia a Promise

    const response = await service.obtenerHerramientas(); // Usa await aquí
    expect(response).toEqual(mockResponse);
    expect(peticionesHttpsServMock.httpsGet).toHaveBeenCalledWith('/catalogo/herramientas');
  });

  // Repite para los demás métodos...
});
