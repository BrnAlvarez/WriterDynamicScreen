<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="container">
        <input type='file' id='archivo' />
        <div id='paper'></div>
        <div id='paper2'></div>
    </div>
    <script src='WriterDynamicScreen-beta-0.1.js'></script>
    <script>
        document.querySelector('#archivo').addEventListener('change',
            exec, false);

        function exec() {
            _fx.write('#archivo', {
                element: '#paper',
                limpiar: true,
                timeWriter: 1,
                timeSpace: 1,
                timeBreakLine: 1
            });
        }
        _fx.write('Soneto XVII.txt', {
            element: '#paper2',
            limpiar: true
        })
    </script>

</body>

</html>