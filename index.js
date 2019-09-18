console.log('Hola');

const fs = require('fs');
const route = 'C:\\Users\\ERIK\\Desktop\\LABORATORIA\\LIM010-fe-md-links\\mylib\\test\\pruebas\\prueba.md';


const validateFile = (nameFile) => {
    fs.stat(nameFile, (err, data) => {
        if (err)
            console.log('no existe' + err);
        else
            console.log(data);
        console.log(data.isFile());
    });
}

validateFile(route);


// const readFilesSync = () => {
//     let data = fs.readFileSync(route, 'utf8');
//     console.log(data);
//     console.log('finalizaado');
//     return data;
// };
// readFilesSync();