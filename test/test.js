
import {
  convertRoute, validateFile, fileMd, readDirectory,
} from '../src/path.js';

describe('convertRoute', () => {
  it('Debería ser una función', () => {
    expect(typeof convertRoute).toBe('function');
  });
  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(convertRoute('./test/pruebas/prueba.md')).toEqual('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md');
  });
  it('Debería retornar  una ruta absoluta', () => {
    expect(convertRoute('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md')).toBe('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md');
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

describe('fileMd', () => {
  it('Debería ser una función', () => {
    expect(typeof fileMd).toBe('function');
  });
  it('Debería   retornar true si el archivo ', () => {
    expect(fileMd('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md')).toBe(true);
  });
});


describe('readDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('Debería retornar un array con archivos .md', () => {
    expect(readDirectory('./test/pruebas')).toEqual(['C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\archivo.md',
      'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
      'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba2\\prueba2.md']);
  });
});

// describe('readFilesSync', () => {
//   it('Debería ser una función', () => {
//     expect(typeof readFilesSync).toBe('function');
//   });
// });
