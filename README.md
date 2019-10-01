# Markdown Links


## Preámbulo

Md-links es una librería que brinda estadísticas sobre los links que se encuentren dentro de todos los archivos .md de una ruta dada.

## Diagrama de flujo

![markdown](https://user-images.githubusercontent.com/51205175/64829464-0a85e780-d592-11e9-83ec-2dd44eab4c03.png)

### Guía de uso e instalación de la librería

## Instalación

Para instalar la librería se debe ejecutar la siguiente línea de comando :

```sh
 npm install Betsycaceres/LIM010-fe-md-links
```


#### API `mdLinks(path, options)`
La función tiene 2 parámetros:

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
  relativa, debe resolverse como relativa al directorio desde donde se invoca
  node - _current working directory_).
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe retornar una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

Carga el módulo vía require:
```sh
 const mdLinks = require("md-links");
```

```js

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:


```sh
ERIK@DESKTOP-4K8ODSB MINGW64 ~/Desktop/LABORATORIA/LIM010-fe-md-links (master)
$ md-links ./test/pruebas --validate
C:\Users\ERIK\Desktop\LABORATORIA\LIM010-fe-md-links\test\pruebas\prueba.md https://www.laboratoria.la OK200 laboratoria
C:\Users\ERIK\Desktop\LABORATORIA\LIM010-fe-md-links\test\pruebas\prueba.md https://www.google.com/gr Fail404 google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
ERIK@DESKTOP-4K8ODSB MINGW64 ~/Desktop/LABORATORIA/LIM010-fe-md-links (master)
$ md-links ./test/pruebas --stats
Total:2
Unique: 2
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh

ERIK@DESKTOP-4K8ODSB MINGW64 ~/Desktop/LABORATORIA/LIM010-fe-md-links (master)
$ md-links ./test/pruebas --stats --validate
Total:2
Unique: 2
Broken: 1
```
 Si  ingresamos  una ruta   inválida el output (salida) será fail:

```sh
ERIK@DESKTOP-4K8ODSB MINGW64 ~/Desktop/LABORATORIA/LIM010-fe-md-links (master)
$ md-links
fail
```

## Objetivos de aprendizaje

### Javascript
- [ ] Uso de callbacks
- [ ] Consumo de Promesas
- [ ] Creacion de Promesas
- [ ] Modulos de Js
- [ ] Recursión

### Node
- [ ] Sistema de archivos
- [ ] package.json
- [ ] crear modules
- [ ] Instalar y usar modules
- [ ] npm scripts
- [ ] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [ ] Testeo de tus funciones
- [ ] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [ ] Mocks manuales
- [ ] Testeo para multiples Sistemas Operativos

### Git y Github
- [ ] Organización en Github

### Buenas prácticas de desarrollo
- [ ] Modularización
- [ ] Nomenclatura / Semántica
- [ ] Linting


