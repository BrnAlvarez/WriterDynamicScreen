# WriterDynamicScreen
Dynamic text-on-screen writer for slow reading.


Call Example:

LOAD FILE
document.querySelector('#file-input').addEventListener('change',
            function1
            , false);
 function function1(e) {
            _fx.write('#file-input', {
                limpiar: true,
                elemento: '#newspaper'
            });
        }            
            
LOAD ON INPUT,TEXTAREA, OTHER            
        document.querySelector('#textoEscrito').addEventListener('blur',
            function2
            , false);
       
function function2(e) {
  _fx.write('#textoEscrito', {
    limpiar: true,
    elemento: '#newspaper'
  });
}
        
RIGHT BD,TEXT, NO DOCUMENT ELEMENT

_fx.write('HELLO !!', {
  limpiar: true,
  elemento: '#newspaper'
});
        
