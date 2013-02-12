
/*************************************************
Radio Grill Project
version: 1.0
Developer: Raúl Moya (www.raul-ce.tk)
*************************************************/

var view = new Main();
view.init();

setInterval(function(){view.actualize();},1000); // aqui cambiar el valor para la repeticion


function Main(){

    this.mXML;
    this.graphI;
    this.actualP;
    this.nextP;

    this.init = function(){
        // lectura de datos
        this.mXML = new ManagerXML("programacion.xml");
        this.mXML.openFile();
        this.actualize();

        // creacion de la interfaz grafica
        this.graphI = new GraphInterface(this.actualP, this.nextP);
        this.graphI.create();
    };

    this.actualize = function(){
        this.mXML.loadPrograms(); // solo si el programa ha acabado
        if(this.actualP !== this.mXML.programA){
            this.actualP = this.mXML.programA;
            this.nextP = this.mXML.programN;

            console.log("Programa actual: " + this.actualP.nameP);
            console.log("Programa siguiente: " + this.nextP.nameP);
        }
    };

};
