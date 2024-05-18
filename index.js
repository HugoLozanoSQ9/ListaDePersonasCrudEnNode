const fs = require('node:fs')

const dbFile = 'data.json'

function crearData() {

    //se valida si existe el archivo
    const fileExists = fs.existsSync(dbFile)

    //si no existe el archivo dbFile entonces lo crea y le añade el objeto koders con valor de una lista vacía
    if (!fileExists) {
        fs.writeFileSync(dbFile, JSON.stringify({ koders: [] }))
    }

}


function getData() {
    //Se crea una variable igualada a los datos del archivo 
    const content = fs.readFileSync(dbFile, 'utf-8')
    //como resultado retornamos la lista que trae el objeto koders
    return JSON.parse(content).koders
}

function updateData(data) {
    //el objeto creado con la nueva info y parseado a string 
    const newData = JSON.stringify({ koders: data })
    //Re escribiendo el archivo ya con las actualizaciones
    fs.writeFileSync(dbFile, newData)
}

function add(koder){
    //Llamamos la lista con getData() 
    const data = getData()
    //añadimos a la lista el koder (argumento) ingresado por el usuario 
    data.push(koder)
    //actualizamos la lista con la data actual 
    updateData(data)

}

function rm(koder) {
    // Leer archivo
    const data = getData()

    // Convertir todos los koders a minúsculas
    let dataMin = data.map(koder => koder.toLowerCase());

    dataMin.reverse()

    //ubicar el index donde se encuentra el koder
    let indexKoder = dataMin.indexOf(koder.toLowerCase())
    
    //se procede a eliminar el koder
    data.splice(indexKoder, 1)

    //actualizar el archivo (con el elemento de la lista eliminado)
    updateData(data)
}

function ls() {
    //leer archivo
    const data = getData()
    //si data no tiene un tamaño válido entonces
    if (!data.length) {
        //imprime: '[empty]'
        console.log('[EMPTY]')
        //se finaliza el programa con 0 (no se tuvo errores )
        process.exit(0)
    }
    //por cada koder dentro de la lista de koders
    data.forEach((koder, i) => {
        //vamos a imprimir el indice del koder y el koder
        console.log(`${i} - ${koder}`)
    })


}

function reset(){
    //se hace update con una lista vacía 
    updateData([])
}

function main() {

    const command = process.argv[2]
    const arg = process.argv[3]

    crearData()

    if (command == 'ls') {
        ls()
    }else if (command == 'add') {
        if (!arg) {
            console.error('Koder name no was added!')
            process.exit(1)
        } else {
            add(arg)
            console.log(`Koder added ${ls()}`)
        }
    } else if (command == 'rm') {

        if (!arg) {
            console.error('koder name to delete is necesary, but if you want delete all koders you have to type reset')
            process.exit(1)
        }

        rm(arg)

        console.log(`Name removed ${ls()}`)

    } else if (command == 'reset') {
        reset()
        console.log('Base de datos en blanco :D!')
    } else {
        console.error('Invalid command: ', command)
        process.exit(1)
    }
}
main()