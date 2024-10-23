// Importa el compilador de operaciones
import Interpreter from './Interprete.js';
const formulario = document.getElementById('compiler-form');

// Escucha el eo de envío del formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que el formulario se recargue

  // Obtiene la expresión ingresada por el usuario
  const inputExpression = document.getElementById('expression').value;

  try {
    // Inicia el intérprete con la expresión ingresada
    const interpreter = new Interpreter(inputExpression);
    const result = interpreter.interpret();

    // Muestra el resultado en el área designada
    document.getElementById('result').innerHTML = `<p class="text-green-700 font-semibold">Resultado: ${result}</p>`;
  } catch (error) {
    // Muestra el mensaje de error en caso de que ocurra
    document.getElementById('result').innerHTML = `<p class="text-red-700 font-semibold">Error: ${error.message}</p>`;
  }
});
