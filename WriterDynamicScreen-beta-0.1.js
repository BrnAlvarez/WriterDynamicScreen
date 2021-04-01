(function (window, document) {
    let _fx = function () {
        let fnx = {
            write: function (origin, element) {

                if (!origin || typeof origin === "object")
                    return;

                if (!element)
                    return false;
                if (typeof element === "object") {

                    if (!element.timeSpace)
                        element.timeSpace = 60;
                    if (!element.timeBreakLine)
                        element.timeBreakLine = 150;
                    if (!element.timeWriter)
                        element.timeWriter = 50;
                    let timeSpace = element.timeSpace;
                    let timeBreakLine = element.timeBreakLine;
                    let timeWriter = element.timeWriter;
                    let element = element.element;
                    console.log(timeSpace, timeBreakLine, timeWriter, element);
                } else {
                    return;
                }
                if (document.body.contains(document.querySelector(origin))) {

                    if (clean)
                        document.querySelector(element).innerHTML = '';
                    if (document.querySelector(origin).getAttribute('type') == 'file') {
                        let fileInput = document.querySelector(origin);

                        //falta validar que contenga un archivo

                        let filePath = fileInput.value;
                        let allowedExtensions = /(.txt)$/i;
                        if (!allowedExtensions.exec(filePath)) {
                            fileInput.value = '';
                            return false;
                        } else {
                            //Image preview
                            if (fileInput.files && fileInput.files[0]) {

                                let lector = new FileReader();
                                lector.onload = function (e) {
                                    let texto = e.target.result;
                                    texto = texto.toUpperCase();
                                    let timer = 1000;
                                    contieneCallback(texto, timer, function (respuesta) {
                                        for (let i = 0; i < respuesta.length; i++) {
                                            let keyText = respuesta.substr(i, 1);
                                            let numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
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
                        let texto = document.querySelector(origin).value;
                        texto = texto.toUpperCase();
                        let timer = 1000;
                        contieneCallback(texto, timer, function (respuesta) {
                            for (let i = 0; i < respuesta.length; i++) {
                                let keyText = respuesta.substr(i, 1);
                                let numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
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

                    try {
                        // Check for the various File API support.
                        if (window.File && window.FileReader && window.FileList && window.Blob) {
                            // Great success! All the File APIs are supported.
                        } else {
                            console.log('The File APIs are not fully supported in this browser.');
                        }
                        let origin2 = origin;
                        origin2 = origin2.split(/(\/\/)/)[0];
                        origin2 = origin2.split(/(.txt)/);
                        origin2 = origin2[0] + origin2[1];
                        let regex = /^((\/|(\\?))[\w .]+)+\.txt$/i;
                        if (regex.test(origin2)) {
                            let filePath = origin2;
                            let allowedExtensions = /(.txt)$/i;
                            if (!allowedExtensions.exec(filePath)) {

                                //no es un archivo, se debe setear el texto

                            } else {
                                let rawFile;
                                if (window.XMLHttpRequest) {
                                    rawFile = new XMLHttpRequest();
                                } else {
                                    rawFile = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                // origin2 = origin2.replace(" ", "%20");
                                rawFile.open("GET", origin2, true);
                                rawFile.onreadystatechange = function () {
                                    if (rawFile.readyState === 4) {
                                        if (rawFile.status === 200 || rawFile.status == 0) {
                                            let allText = rawFile.responseText;
                                            let texto = allText;
                                            texto = texto.toUpperCase();
                                            let timer = 1000;
                                            contieneCallback(texto, timer, function (respuesta) {
                                                for (let i = 0; i < respuesta.length; i++) {
                                                    let keyText = respuesta.substr(i, 1);
                                                    let numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
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
                                    }
                                }
                                rawFile.send(null);
                                return;
                            }
                        }

                    } catch (error) {
                        console.log(error);
                    }

                    let texto = origin;
                    texto = texto.toUpperCase();
                    let timer = 1000;
                    contieneCallback(texto, timer, function (respuesta) {
                        for (let i = 0; i < respuesta.length; i++) {
                            let keyText = respuesta.substr(i, 1);
                            let numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
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
    let numberOfLineBreaks = (keyText.match(/\n/g) || []).length;
    if (numberOfLineBreaks >= 1) {
        document.querySelector(element).innerHTML = document.querySelector(element).innerHTML + "<br />";
        return;
    }
    document.querySelector(element).innerHTML = document.querySelector(element).innerHTML + keyText;

}