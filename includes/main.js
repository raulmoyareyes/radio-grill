/*************************************************
Radio Grill Project
version: 1.0
Developer: Raúl Moya (www.raul-ce.tk)
*************************************************/

function recursive(){
	view.actualize();
	setTimeout(recursive,1000); // aqui cambiar el valor para la repeticion
};


function Main(){

	this.mXML;
	this.graphI;
	this.actualP;
	this.nextP;
	
	this.init = function(){
		// lectura de datos
		this.mXML = new ManagerXML("programacion.xml");
		this.mXML.openFile();
		this.mXML.loadDates();
		this.actualP = this.mXML.programA;
		this.nextP = this.mXML.programN;

		// creacion de la interfaz grafica
		this.graphI = GraphInterface(this.actualP, this.nextP);

		recursive();
	};

	this.actualize = function(){
		this.mXML.loadDates(); // solo si el programa ha acabado
		this.actualP = this.mXML.programA;
		this.nextP = this.mXML.programN;
	}

};
