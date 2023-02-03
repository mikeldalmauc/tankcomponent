
var modelo;


function init(){
    // Primer modelo volumen inicial de los contendores
    modelo = {
        flow:[], // Holds all the data0
        index: 0, // next volume change position on array
        cont1:{
            vol:300
        },
        cont2:{
            vol:500
        }
    };

    fetch("bidones.json")
    .then((response) => response.json())
    .then((response) => {
        modelo.flow = response.flow;
        
        // Primera vista
        view();
    });
}


function view(){
    
    let cont1 = document.getElementById("cont1");
    
    const topBase = 1280; // when vol is 0 bar at lowest, bar goes up (decreasing up to 0) while vol increases

    cont1.style.top= (topBase - modelo.cont1.vol) + "px";
    cont1.style.height=modelo.cont1.vol + "px";

    //Auto update
    // This is an automatic update of the model, we simulate a stream of fluid
    // we read the next entry from an array of differences and the volume is updated
    // accordingly.
    // So the machine does not go too fast and slow down events i introduce a timeOut
    setTimeout(() => {
        update("volume");
      }, "1000")
}


function update(action){

    if(action == "volume"){
        const change = modelo.flow[modelo.index];
        modelo.index = modelo.index + 1;
        
        modelo.cont1.vol = modelo.cont1.vol + change.water;
    }
    
    view();
}