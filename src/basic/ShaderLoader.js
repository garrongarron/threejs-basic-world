function readTextFile(vsFile, fsFile, callback ) {

    let vertex = new Promise((ok, fail) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", './src/shaders/vertexShader.glsl', false);

        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    ok(allText)
                }
            }
        }
        rawFile.send()
    })

    let fragment = new Promise((ok, fail) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "./src/shaders/fragmentShader.glsl", false);

        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    ok(allText)
                }
            }
        }
        rawFile.send()
    })

    
    Promise.all([vertex, fragment]).then(shaders => {
        callback(shaders)//[resultado 1, resultado 2]
    });
}
export default readTextFile