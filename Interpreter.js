const Lexer = require('./Lexer');
const Parser = require('./Parser');
const SemanticAnalyzer = require('./SemanticAnalyzer');

// Clase principal que orquesta todo el proceso
class Interpreter {
    constructor(input) {
        this.lexer = new Lexer(input); // Inicializa el lexer con el código de entrada
        this.parser = new Parser(this.lexer); // Inicializa el parser con el lexer
        this.semanticAnalyzer = new SemanticAnalyzer(); // Inicializa el analizador semántico
    }

    // Función principal que ejecuta todo el proceso
    interpret() {
        const tree = this.parser.parse(); // Obtiene el árbol de sintaxis abstracta (AST)
        return this.semanticAnalyzer.visit(tree); // Visita el AST y evalúa la expresión
    }
}

module.exports = Interpreter;