import path from 'path';
import {
  convertRoute, validateFile, fileMd, readDirectory, readFilesSync, markdownLinks,
} from '../src/path.js';
import { validateLinks } from '../src/file.js';
import {
  mdLinks, statsOfLinks, funcionValidate, statsAndValidate,
} from '../src/mdlinks.js';

import { mdLinksCli } from '../src/cli.js';

const output = [{
  href: 'https://www.laboratoria.la',
  file:
    'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
  text: 'laboratoria',
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.google.com/gr',
  file:
    'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
  text: 'google',
  status: 404,
  statusText: 'Fail',
}];
const output1 = '[laboratoria](https://www.laboratoria.la)[google](https://www.google.com/gr)';
const output2 = [{
  href: 'https://www.laboratoria.la',
  file:
    'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
  text: 'laboratoria',
},
{
  href: 'https://www.google.com/gr',
  file:
    'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md',
  text: 'google',
}];

const output3 = `C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md https://www.laboratoria.la OK200 laboratoria
C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md https://www.google.com/gr Fail404 google`;

const output4 = `C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md https://www.laboratoria.la OK
C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\test\\pruebas\\prueba.md https://www.google.com/gr Fail`;

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
    expect(readFilesSync(path.join(process.cwd(), 'test/pruebas/prueba.md'))).toEqual(output1);
  });
});

describe('markdownLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof markdownLinks).toBe('function');
  });
  it('Debería retornar un array de objetos con tres propiedades: href, path y text', () => {
    expect(markdownLinks('./test/pruebas')).toEqual(output2);
  });
});


describe('validateLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar un array con cinco propiedades:href, path., text, status y statusText', (done) => {
    validateLinks(path.join(process.cwd(), 'test/pruebas/prueba.md'))
      .then((res) => {
        expect(res).toEqual(output);
        done();
      });
  });
});

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Deberia devolver array con los links validados ', (done) => {
    mdLinks((path.join(process.cwd(), 'test/pruebas/prueba.md')), { validate: true })
      .then((res) => {
        expect(res).toEqual(output);
        done();
      });
  });
  it('Deberia devolver un array con los links', () => {
    mdLinks((path.join(process.cwd(), 'test/pruebas/prueba.md')), { validate: false })
      .then((res) => {
        expect(res).toEqual(output2);
      });
  });
});

describe('funcionValidate', () => {
  it('Debería ser una función', () => {
    expect(typeof funcionValidate).toBe('function');
  });
  it('Debería retornar un string de todos los elementos del array', () => {
    expect(funcionValidate(output)).toEqual(output3);
  });
});


describe('statsOfLinks Debería devolver un string de Total  y Unique', () => {
  it('Debería retornar un string', () => {
    expect(statsOfLinks(output)).toBe('Total:2 Unique: 2');
  });
});


describe('statsAndValidate Debería devolver un string de Total  , Unique, Broken', () => {
  it('Debería retornar un string', () => {
    expect(statsAndValidate(output)).toEqual('Total:2 \nUnique: 2 \nBroken: 1');
  });
});

describe('mdLinksCli', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinksCli).toBe('function');
  });

  it('La promesa debería devolver una cadena de enlaces', () => mdLinksCli((path.join(process.cwd(), 'test/pruebas/prueba.md')), { validate: true })
    .then((result) => {
      expect(result).toEqual(output4);
    }));
  it('La promesa debería devolver estadísticas de enlaces', () => mdLinksCli((path.join(process.cwd(), 'test/pruebas/prueba.md')), { stats: true })
    .then((result) => {
      expect(result).toEqual('Total:2 Unique: 2');
    }));
});
