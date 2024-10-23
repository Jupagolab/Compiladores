const Interpreter = require('./Interpreter');

// Código de entrada para probar el compilador
// Este comentario se va a eliminar, esta primera constante input es por donde entra por ahora la operacion, debes cambiarla y que entre por un input de html.
const input = '3.23554 + 5 * (10 - 2) / 2.5';  // Puedes cambiar esta entrada por la que desees probar
const interpreter = new Interpreter(input); // Inicializa el intérprete con el código de entrada

try {
    // Intenta interpretar el código
    const result = interpreter.interpret();
    // Imprime el resultado de la interpretación
    // Este comentario se va a eliminar, por este console.log se imprime el resultado en consola, no es necesario de eliminar verdaderamente, solo hay que agregarle para que imprima en el html.
    console.log(`Resultado: ${result}`);
} catch (error) {
    // Si ocurre un error, lo imprime en la consola
    // Este comentario se va a eliminar, por este console.log se imprime el mensaje de error si tiene un termino que no conoce el compilador en consola, no es necesario de eliminar verdaderamente, solo hay que agregarle para que imprima en el html.
    console.error(error.message);
}
