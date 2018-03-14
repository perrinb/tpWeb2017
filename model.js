// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.formes = [];
    this.addShape = function (shape) {
        this.formes.push(shape);
    }.bind(this);
    this.removeShape = function (id) {
        this.formes.splice(id, 1);
    }.bind(this);
}

function Shape(thickness, color) {
    this.color = color;
    this.thickness = thickness;
}

function Rectangle(x1, y1, width, height, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.width = width;
    this.height = height;
}

function Line(x1, y1, x2, y2, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}