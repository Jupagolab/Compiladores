class Lexer {
    // Constructor recibe el código de entrada como una cadena
    constructor(input) {
        this.input = input; // Código fuente a analizar
        this.position = 0; // Posición actual en la cadena de entrada
        this.currentChar = input[this.position]; // Caracter actual en la posición
    }

    // Avanza al siguiente caracter
    advance() {
        this.position++;
        this.currentChar = this.position < this.input.length ? this.input[this.position] : null;
    }

    // Ignora los espacios en blanco
    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    // Extrae un número completo del código fuente
    getNumber() {
        let result = '';
        let hasDecimalPoint = false;  // Para rastrear si ya se encontró un punto decimal

        while (this.currentChar !== null && (/\d/.test(this.currentChar) || this.currentChar === '.')) {
            if (this.currentChar === '.') {
                if (hasDecimalPoint) {
                    throw new Error('Número no válido con múltiples puntos decimales');
                }
                hasDecimalPoint = true;  // Marcar que se ha encontrado el punto decimal
            }
            result += this.currentChar;  // Agregar el dígito o el punto decimal a la cadena del número
            this.advance();
        }

        // Si el número tiene un punto decimal, convertir a float; de lo contrario, a entero
        return { type: 'NUMBER', value: hasDecimalPoint ? parseFloat(result) : parseInt(result, 10) };
    }

    // Obtiene el siguiente token del código fuente
    getNextToken() {
        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace(); // Ignora espacios en blanco
                continue;
            }

            if (/\d/.test(this.currentChar)) {
                return this.getNumber(); // Si es un número, retorna el token de número
            }

            // Detecta operadores y asigna el token correspondiente
            if (this.currentChar === '+') {
                this.advance();
                return { type: 'PLUS', value: '+' };
            }

            if (this.currentChar === '-') {
                this.advance();
                return { type: 'MINUS', value: '-' };
            }

            if (this.currentChar === '*') {
                this.advance();
                return { type: 'MUL', value: '*' };
            }

            if (this.currentChar === '/') {
                this.advance();
                return { type: 'DIV', value: '/' };
            }

            // Agregamos soporte para paréntesis de apertura y cierre
            if (this.currentChar === '(') {
                this.advance();
                return { type: 'LPAREN', value: '(' };
            }

            if (this.currentChar === ')') {
                this.advance();
                return { type: 'RPAREN', value: ')' };
            }

            if (this.currentChar === '=') {
                this.advance();
                return { type: 'ASSIGN', value: '=' };
            }

            // Si encuentra un caracter inesperado, lanza un error
            throw new Error(`Caracter inesperado: ${this.currentChar}`);
        }

        // Si no quedan caracteres, retorna el token EOF (fin de archivo)
        return { type: 'EOF', value: null };
    }
}

module.exports = Lexer;