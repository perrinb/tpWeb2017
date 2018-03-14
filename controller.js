var editingMode = {rect: 0, line: 1};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    //this.currColour = '#000000';
    this.currentShape = 0;

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
    this.DnD = new DnD(canvas, this);

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
    this.getAttribute = function () {
        this.currColour = document.getElementById('colour').value;
        this.currLineWidth = document.getElementById('spinnerWidth').value;
        if (document.getElementById('butRect').checked) {
            this.currEditingMode = editingMode.rect;
        } else if (document.getElementById('butLine').checked) {
            this.currEditingMode = editingMode.line;
        }
    };
    this.onInteractionStart = function () {
        this.getAttribute();
        if (this.currEditingMode === editingMode.line) {
            this.currentShape = new Line(this.DnD.xStart, this.DnD.yStart,
                this.DnD.xStart, this.DnD.yStart, this.currLineWidth, this.currColour);
        } else if (this.currEditingMode === editingMode.rect) {
            this.currentShape = new Rectangle(this.DnD.xStart, this.DnD.yStart, 0, 0,
                this.currLineWidth, this.currColour);
        }
        this.currentShape.paint(ctx, canvas);
    }.bind(this);

    this.processing = function () {
        if (this.currEditingMode === editingMode.line) {
            this.currentShape = new Line(this.DnD.xStart, this.DnD.yStart,
                this.DnD.xEnd, this.DnD.yEnd, this.currLineWidth, this.currColour)
        } else if (this.currEditingMode === editingMode.rect) {
            var width = this.DnD.xEnd - this.DnD.xStart;
            var height = this.DnD.yEnd - this.DnD.yStart;
            this.currentShape = new Rectangle(this.DnD.xStart, this.DnD.yStart,
                width, height, this.currLineWidth, this.currColour);
        }
    }.bind(this);
    this.onInteractionUpdate = function () {
        this.processing();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx, canvas);
        this.currentShape.paint(ctx, canvas);
    }.bind(this);

    this.onInteractionEnd = function () {
        this.zgeg();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.addShape(this.currentShape);
        drawing.paint(ctx, canvas);
        drawing.updateShapeList(this.currentShape);
        this.currentShape = 0;
    }.bind(this);
}