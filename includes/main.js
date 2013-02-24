/*************************************************
Radio Grill Project
version: 1.0
Developer: Raúl Moya (www.raul-ce.tk)
*************************************************/

var view = new Main();
view.init();
setInterval(function(){view.actualize();},1000);

function Main(){

    this.mXML;
    this.graphI = new GraphInterface();
    this.actualP = new Program();
    this.nextP = new Program();

    this.init = function(){
        // lectura de datos
        this.mXML = new ManagerXML("radio-grill/programacion.xml");
        this.mXML.openFile();
        
        this.actualP.copy(this.mXML.programA);
        this.nextP.copy(this.mXML.programN);

        // creacion de la interfaz grafica
        this.graphI.init(this.actualP, this.nextP);
        this.graphI.create();
        
    };

    this.actualize = function(){

        this.mXML.loadPrograms(); // solo si el programa ha acabado
        if(this.actualP.idP !== this.mXML.programA.idP){
            this.actualP.copy(this.mXML.programA);
            this.nextP.copy(this.mXML.programN);
            this.graphI.actualize(this.actualP, this.nextP);
        }
    };

};
