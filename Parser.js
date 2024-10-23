class Parser {
    // Constructor recibe el lexer
    constructor(lexer) {
        this.lexer = lexer; // Lexer para obtener los tokens
        this.currentToken = lexer.getNextToken(); // Primer token del código fuente
    }

    // Avanza al siguiente token si el tipo es el esperado
    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            // Si el token actual coincide con el tipo esperado, avanza al siguiente
            this.currentToken = this.lexer.getNextToken();
        } else {
            // Si no coincide, lanza un error de sintaxis
            throw new Error(`Error de sintaxis: Se esperaba ${tokenType}, pero se encontró ${this.currentToken.type}`);
        }
    }

    // Función que maneja los factores (números)
    factor() {
        const token = this.currentToken; // Toma el token actual

        if (token.type === 'NUMBER') {
            this.eat('NUMBER'); // Si es un número, avanza al siguiente token
            return { type: 'NUMBER', value: token.value }; // Retorna un nodo con el tipo y valor
        }

        // Si encontramos un paréntesis de apertura, procesamos lo que está dentro de los paréntesis
        if (token.type === 'LPAREN') {
            this.eat('LPAREN');  // Consumimos el '('
            const node = this.expr();  // Evaluamos la expresión dentro de los paréntesis
            this.eat('RPAREN');  // Consumimos el ')'
            return node;  // Retornamos el nodo resultante de la expresión
        }

        throw new Error(`Error de sintaxis: Token inesperado ${token.type}`);
    }

    // Función que maneja la multiplicación y división
    term() {
        let node = this.factor(); // Obtiene un factor (número)

        // Mientras el token actual sea de multiplicación o división
        while (['MUL', 'DIV'].includes(this.currentToken.type)) {
            const token = this.currentToken; // Guarda el token actual
            if (token.type === 'MUL') {
                this.eat('MUL'); // Avanza si es multiplicación
            } else if (token.type === 'DIV') {
                this.eat('DIV'); // Avanza si es división
            }
            // Crea un nodo para la operación actual (multiplicación/división)
            node = { type: token.type, left: node, right: this.factor() };
        }

        return node; // Retorna el nodo de la expresión
    }

    // Función que maneja la suma y resta
    expr() {
        let node = this.term(); // Obtiene un término (multiplicación/división o número)

        // Mientras el token actual sea de suma o resta
        while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
            const token = this.currentToken; // Guarda el token actual
            if (token.type === 'PLUS') {
                this.eat('PLUS'); // Avanza si es suma
            } else if (token.type === 'MINUS') {
                this.eat('MINUS'); // Avanza si es resta
            }
            // Crea un nodo para la operación actual (suma/resta)
            node = { type: token.type, left: node, right: this.term() };
        }

        // Retorna el nodo de la expresión completa
        return node;
    }

    // Inicia el proceso de análisis sintáctico
    parse() {
        return this.expr(); // Comienza por evaluar una expresión completa
    }
}

module.exports = Parser;
