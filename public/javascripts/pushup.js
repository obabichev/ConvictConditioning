$(document).ready(function () {
    var ctx = document.getElementById("chart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            label: 'Scatter Dataset',
            datasets: [{
                label: 'Scatter Dataset',
                data: graph
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

    var selectExercise = document.getElementById('select-exercise');

    selectExercise.addEventListener("change", () => {
        console.log("Exercise changed by " + selectExercise.value + " " + typeof selectExercise.value);
        let setsExercise = document.getElementById('sets-exercise');
        console.log("NEW input for " + JSON.stringify(selectExercise.value));
        while (setsExercise.hasChildNodes()) {
            setsExercise.removeChild(setsExercise.firstChild);
        }
        for (let i = 0; i < exercises[selectExercise.value - 1].sets; i++) {
            let inputField = document.createElement("INPUT");
            inputField.setAttribute('type', 'number');
            inputField.setAttribute('name', 'rep');
            setsExercise.appendChild(inputField);
        }
    });

    for (let i in exercises) {
        var opt = document.createElement('option');
        opt.innerHTML = exercises[i].level + '. ' + exercises[i].title;
        opt.value = exercises[i].level;
        selectExercise.appendChild(opt);
    }
});