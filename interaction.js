// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.xStart = 0;
    this.xEnd = 0;
    this.yStart = 0;
    this.yEnd = 0;
    var pressed = false;

    // Developper les 3 fonctions gérant les événements
    this.push = function (evt) {
        var position = getMousePosition(canvas, evt);
        this.xStart = this.xEnd = position.x;
        this.yStart = this.yEnd = position.y;
        pressed = true;
        interactor.onInteractionStart(this);
    }.bind(this);

    this.move = function (evt) {
        if (pressed) {
            var position = getMousePosition(canvas, evt);
            this.xEnd = position.x;
            this.yEnd = position.y;
            interactor.onInteractionUpdate(this);
        }
    }.bind(this);

    this.release = function () {
        if (pressed) {
            pressed = false;
            interactor.onInteractionEnd(this);
        }
    }.bind(this);

    // Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.push, false);
    canvas.addEventListener('mousemove', this.move, false);
    canvas.addEventListener('mouseup', this.release, false);


    // Place le point de l'événement evt relativement à la position du canvas.
    function getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}