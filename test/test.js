import { isPathAbsolute, validateFile, readFilesSync } from '../src/path.js';

describe('isPathAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
  it('Debería retornar  true para ruta absoluta', () => {
    expect(isPathAbsolute('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md')).toEqual(true);
  });
  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(isPathAbsolute('./test/pruebas/prueba.md')).toEqual('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md');
  });
});

describe('validateFile', () => {
  it('Debería ser una función', () => {
    expect(typeof validateFile).toBe('function');
  });
  it('Debería   retornar true si el archivo existe', () => {
    expect(validateFile('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md')).toBe(true);
  });
});

describe('readFilesSync', () => {
  it('Debería ser una función', () => {
    expect(readFilesSync).toBe('function');
  });
});
