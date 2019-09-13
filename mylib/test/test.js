
import{convertAbsolutePath,readPath} from '../lib/path.js';

describe('convertAbsolutePath', () => {
 it('debería ser una función', () => {
   expect(typeof convertAbsolutePath).toEqual('function');
 });
 it('debería convertir a ruta absoluta', () => {
   expect(convertAbsolutePath('./mylib/test/pruebas/prueba.md')).toEqual('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\mylib\\test\\pruebas\\prueba.md');
 });
});

describe('readPath', () => {
 it('debería retornar true si la ruta es absoluta', () => {
   expect(readPath('C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\mylib\\test\\pruebas\\prueba.md')).toEqual(true);
 });
 it('debería  retornar false si la ruta es relativa', () => {
   expect(readPath('./mylib/test/pruebas/prueba.md')).toEqual(false);
 });
});