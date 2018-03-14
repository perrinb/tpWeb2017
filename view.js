// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Shape.prototype.paint = function (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
};

Rectangle.prototype.paint = function (ctx) {
    //Manager Color
    Shape.prototype.paint.call(this, ctx);
    ctx.rect(this.x1, this.y1, this.width, this.height);
    ctx.stroke();
};

Line.prototype.paint = function (ctx) {
    //Manager Color
    Shape.prototype.paint.call(this, ctx);
    //ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
};

Drawing.prototype.paint = function (ctx) {
    //set the canvas' background color to grey
    ctx.fillStyle = '#d7d7d7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.formes.forEach(function (tabDraw) {
        tabDraw.paint(ctx);
    });
};

Drawing.prototype.updateShapeList = function () {
    var shapeList = document.getElementById('shapeList');
    var li = document.createElement('li');
    var button = document.createElement('button');
    var span = document.createElement('span');

    li.setAttribute('class', 'list-group-item');
    button.setAttribute('class', 'btn btn-default');
    span.setAttribute('class', 'glyphicon glyphicon-remove-sign');

    var id = this.formes.length - 1;
    li.setAttribute('id', 'shape_' + id);
    button.setAttribute('id', 'button_' + id);
    button.setAttribute('onClick', 'drawing.deleteShape(' + id + ')');
    var shape = this.formes[id];
    button.appendChild(span);
    li.appendChild(button);

    if (shape instanceof Rectangle)
        li.appendChild(document.createTextNode(' Rectangle (' + (shape.x1) + ',' + (shape.y1) + ',' + (shape.width) + ',' + (shape.height) + ')'));
    else if (shape instanceof Line)
        li.appendChild(document.createTextNode(' Line (' + (shape.x1) + ',' + (shape.y1) + ',' + (shape.x2) + ',' + (shape.y2) + ')'));

    shapeList.appendChild(li);
};