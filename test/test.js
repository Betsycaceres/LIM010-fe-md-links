import path from 'path';
import {
  convertRoute, validateFile, fileMd, readDirectory, readFilesSync, markdownLinks, validateLinks,
} from '../src/path.js';

describe('convertRoute', () => {
  it('Debería ser una función', () => {
    expect(typeof convertRoute).toBe('function');
  });
  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(convertRoute('./test/pruebas/prueba.md')).toEqual(path.join(process.cwd(), 'test/pruebas/prueba.md'));
  });
  it('Debería retornar  una ruta absoluta', () => {
    expect(convertRoute(path.join(process.cwd(), 'test/pruebas/prueba.md'))).toBe(path.join(process.cwd(), 'test/pruebas/prueba.md'));
  });
});

describe('validateFile', () => {
  it('Debería ser una función', () => {
    expect(typeof validateFile).toBe('function');
  });
  it('Debería   retornar true si el archivo existe', () => {
    expect(validateFile(path.join(process.cwd(), 'test/pruebas/prueba.md'))).toBe(true);
  });
});

describe('fileMd', () => {
  it('Debería ser una función', () => {
    expect(typeof fileMd).toBe('function');
  });
  it('Debería   retornar true si es un archivo .md ', () => {
    expect(fileMd(path.join(process.cwd(), 'test/pruebas/prueba.md'))).toBe(true);
  });
});

describe('readDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('Debería retornar un array  con la ruta de los archivos .md', () => {
    expect(readDirectory(path.join(process.cwd(), 'test/pruebas'))).toEqual([path.join(process.cwd(), 'test/pruebas/archivo.md'), path.join(process.cwd(), 'test/pruebas/prueba.md'), path.join(process.cwd(), 'test/pruebas/prueba2/prueba2.md')]);
  });
});

describe('readFilesSync', () => {
  it('Debería ser una función', () => {
    expect(typeof readFilesSync).toBe('function');
  });
  it('Debería leer el contenido del archivo .md', () => {
    expect(readFilesSync(path.join(process.cwd(), 'test/pruebas/prueba.md'))).toBe('[laboratoria](https://www.laboratoria.la)[google](https://www.google.com)');
  });
});

describe('markdownLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof markdownLinks).toBe('function');
  });
  it('Debería retornar un array de objetos con tres propiedades: href, path y text', () => {
    expect(markdownLinks('./test/pruebas')).toEqual([
      {
        href: 'https://www.laboratoria.la',
        path: path.join(process.cwd(), 'test/pruebas/prueba.md'),
        text: 'laboratoria',
      },
      {
        href: 'https://www.google.com',
        path: path.join(process.cwd(), 'test/pruebas/prueba.md'),
        text: 'google',
      }]);
  });
});


describe('validateLinkss', () => {
  it('Debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar un array con cinco propiedades:href, path., text, status y statusText', (done) => {
    validateLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))
      .then((res) => {
        expect(res).toEqual([{
          href: 'https://www.laboratoria.la',
          path: path.join(process.cwd(), 'test/pruebas/prueba.md'),
          text: 'laboratoria',
          status: 200,
          statusText: 'OK',
        },
        {
          href: 'https://www.google.com',
          path: path.join(process.cwd(), 'test/pruebas/prueba.md'),
          text: 'google',
          status: 200,
          statusText: 'OK',
        }]);
        done();
      });
  });
});
