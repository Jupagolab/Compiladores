class SemanticAnalyzer {
    // Función que recorre el AST (árbol de sintaxis abstracta)
    visit(node) {
        // Si el nodo es un número, retorna su valor
        if (node.type === 'NUMBER') {
            return node.value;
        }

        // Si el nodo es una suma, visita los nodos izquierdo y derecho, y los suma
        if (node.type === 'PLUS') {
            return this.visit(node.left) + this.visit(node.right);
        }

        // Si el nodo es una resta, visita los nodos izquierdo y derecho, y los resta
        if (node.type === 'MINUS') {
            return this.visit(node.left) - this.visit(node.right);
        }

        // Si el nodo es una multiplicación, visita los nodos izquierdo y derecho, y los multiplica
        if (node.type === 'MUL') {
            return this.visit(node.left) * this.visit(node.right);
        }

        // Si el nodo es una división, visita los nodos izquierdo y derecho, y los divide
        if (node.type === 'DIV') {
            return this.visit(node.left) / this.visit(node.right);
        }

        // Si el tipo de nodo no es reconocido, lanza un error
        throw new Error(`Error semántico: tipo de nodo desconocido ${node.type}`);
    }
}

module.exports = SemanticAnalyzer;
