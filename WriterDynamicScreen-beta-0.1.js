(function (window, document) {
    "use strict";
    var _fx = function () {
        var fnx = {
            write: function (origin, element) {
                var clean = true;
                if (origin === null || typeof origin === 'object')
                    return;

                if (element === null || typeof element === 'undefined')
                    return false;
                if (typeof (element) === 'object') {

                    if (!element.hasOwnProperty('timeSpace'))
                        element.timeSpace = 60;

                    if (!element.hasOwnProperty('timeBreakLine'))
                        element.timeBreakLine = 150;
                    if (!element.hasOwnProperty('timeWriter'))
                        element.timeWriter = 50;
                    var timeSpace = element.timeSpace;
                    var timeBreakLine = element.timeBreakLine;
                    var timeWriter = element.timeWriter;
                    var element = element.element;
                } else {
                    return;
                }
                if (document.body.contains(document.querySelector(origin))) {

                    if (clean)
                        document.querySelector(element).innerHTML = '';
                    if (document.querySelector(origin).getAttribute('type') == 'file') {
                        var fileInput = document.querySelector(origin);

                        //falta validar que contenga un archivo

                        var filePath = fileInput.value;
                        var allowedExtensions = /(.txt)$/i;
                        if (!allowedExtensions.exec(filePath)) {
                            fileInput.value = '';
                            return false;
                        } else {
                            //Image preview
                            if (fileInput.files && fileInput.files[0]) {

                                var lector = new FileReader();
                                lector.onload = function (e) {
                                    var texto = e.target.result;
                                    texto = texto.toUpperCase();
                                    var timer = 1000;
                                    contieneCallback(texto, timer, function (respuesta) {
                                        for (var i = 0; i < respuesta.length; i++) {
                                            var keyText = respuesta.substr(i, 1);
                                            var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
                                            if (keyText == " ")
                                                timer = timer + timeSpace;
                                            else if (numberOfLineBreaks >= 1)
                                                timer = timer + timeBreakLine;
                                            else
                                                timer = timer + timeWriter;
                                            contieneCallback(keyText, timer, function (respuesta2) {
                                                ejecutar(element, respuesta2);
                                            });
                                        }
                                    });


                                }
                                lector.readAsText(fileInput.files[0]);
                            }
                        }
                    } else {
                        var texto = document.querySelector(origin).value;
                        texto = texto.toUpperCase();
                        var timer = 1000;
                        contieneCallback(texto, timer, function (respuesta) {
                            for (var i = 0; i < respuesta.length; i++) {
                                var keyText = respuesta.substr(i, 1);
                                var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
                                if (keyText == " ")
                                    timer = timer + timeSpace;
                                else if (numberOfLineBreaks >= 1)
                                    timer = timer + timeBreakLine;
                                else
                                    timer = timer + timeWriter;
                                contieneCallback(keyText, timer, function (respuesta2) {
                                    ejecutar(element, respuesta2);
                                });
                            }
                        });
                    }
                } else {
                    var texto = origin;
                    texto = texto.toUpperCase();
                    var timer = 1000;
                    contieneCallback(texto, timer, function (respuesta) {
                        for (var i = 0; i < respuesta.length; i++) {
                            var keyText = respuesta.substr(i, 1);
                            var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
                            if (keyText == " ")
                                timer = timer + timeSpace; //time space
                            else if (numberOfLineBreaks >= 1)
                                timer = timer + timeBreakLine; //time breakline
                            else
                                timer = timer + timeWriter; //time letter
                            contieneCallback(keyText, timer, function (respuesta2) {
                                ejecutar(element, respuesta2);
                            });
                        }
                    });
                }

            }
        }
        return fnx;
    }
    if (typeof window._fx === "undefined") {
        window._fx = _fx();
    }
})(window, document);

function contieneCallback(cadena, timer, callBack) {
    setTimeout(function () {
        callBack(cadena);
    }, timer);
}

function ejecutar(element, keyText) {
    var numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
    if (numberOfLineBreaks >= 1) {
        document.querySelector(element).innerHTML = document.querySelector(element).innerHTML + "<br />";
        return;
    }
    document.querySelector(element).innerHTML = document.querySelector(element).innerHTML + "<span>" + keyText + "</span>";

}
