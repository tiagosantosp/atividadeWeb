function buildCalculateImc() {
    var heightElem = document.querySelector('#altura');
    var weightElem = document.querySelector('#peso');
    console.log(heightElem);
    console.log(weightElem);

    return async function() {
        var height = heightElem.value;
        var weight = weightElem.value;
        try{
            let url = 'http://localhost:8080/imc/calculate';
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({ "height": height, "weight":  weight }));
            setTimeout(()=> {
                let res = JSON.parse(xhr.response)
                document.querySelector('#imc').innerHTML = res.imc.toFixed(2)
            },1000) 

        }catch(e){
            alert(e)
        }
    }
}

function doCalculateImc(height, weight) {
    var imc = (weight / (height ** 2));
    document
        .querySelector('#imc')
        .innerHTML = translateImcToText(imc);
}

// Magreza, quando o resultado é menor que 18,5 kg/m2;
// Normal, quando o resultado está entre 18,5 e 24,9 kg/m2;
// Sobrepeso, quando o resultado está entre 24,9 e 30 kg/m2;
// Obesidade, quando o resultado é maior que 30 kg/m2;
function translateImcToText(imc) {
    if (imc < 18.5) return "Magreza";
    if (imc < 24.9) return "Normal";
    if (imc < 30) return "Sobrepeso";

    return "Obesidade";
}

window.onload = function(evt) {
    console.log(evt);

    var btn = document.querySelector('#main-action');
    btn.addEventListener('click', buildCalculateImc());
}
