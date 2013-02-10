
/***********************************************
Radio Grill Project
version: 1.0
Developer: Raúl Moya (www.raul-ce.tk)
*************************************************/


/*************************************************
Clase programa
*************************************************/
function Program(){

    this.idP;
    this.nameP;
    this.author;
    this.image;
    this.typeP;
    this.hourI;
    this.hourE;
    this.facebook;
    this.twitter;
    this.soundcloud;
    this.youtube;
    this.globalhouse;
    this.descriptionP;

    this.programDates = function(_idP, _nameP, _author, _image, _typeP, _hourI, _hourE, _facebook, _twitter, _soundcloud, _youtube, _globalhouse, _descriptionP){
        this.idP = _idP;
        this.nameP = _nameP;
        this.author = _author;
        this.image = _image;
        this.typeP = _typeP;
        this.hourI = _hourI;
        this.hourE = _hourE;
        this.facebook = _facebook;
        this.twitter = _twitter;
        this.soundcloud = _soundcloud;
        this.youtube = _youtube;
        this.globalhouse = _globalhouse;
        this.descriptionP = _descriptionP;
    };

}

function DateUTC1 (){
    this.hour;
    this.minutes;
    this.dayW;

    this.sHour;
    this.sDayW;

    this.actualize = function(){
        var today = new Date(); //en utc +1
        this.dayW = today.getUTCDay(); //dia de la semana 0-6
        this.hour = today.getUTCHours(); //hora 0-23
        this.minutes = today.getUTCMinutes(); // minutos 0-59

        if (this.hour+1 === 24) {
            this.hour = 0;
            if (this.dayW+1 === 7){
                    this.dayW = 0;
            } else {
                    this.dayW += 1;
            }
        } else {
            this.hour += 1;
        }

        this.dateString();
    };

    this.dateString = function(){
        if(this.hour < 10) {this.sHour = "0"+this.hour;}
        else {this.sHour = this.hour;}

        if(this.minutes < 10) {this.sHour += "0"+this.minutes;}
        else {this.sHour += this.minutes;}

        switch(this.dayW){
            case 0:
                    this.sDayW = "sunday";
            break;
            case 1: 
                    this.sDayW = "monday";
            break;
            case 2: 
                    this.sDayW = "tuesday";
            break;
            case 3: 
                    this.sDayW = "wednesday";
            break;
            case 4: 
                    this.sDayW = "thursday";
            break;
            case 5: 
                    this.sDayW = "friday";
            break;
            case 6: 
                    this.sDayW = "saturday";
            break;

        }
    };
}


/*************************************************
Clase para tratar el xml
@param {documen} _fileXML fichero XML
*************************************************/
function ManagerXML(_fileXML){
    this.file = _fileXML;
    this.programs = undefined;
    this.dateUTC = new DateUTC1();
    this.programA = new Program();
    this.programN = new Program();

    this.openFile = function() {
        var xhttp;
        try {
            if (window.XMLHttpRequest){
                    xhttp=new XMLHttpRequest();
            } else { // IE 5 / 6
                    xhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhttp.open("GET","programacion.xml",false);
            xhttp.send();
            this.programs = xhttp.responseXML;

            this.loadPrograms(); // cargar programas

        } catch (e) {
            console.log("Se produjo un error abriendo el fichero");
        }
    };

    // carga todos los programas y los devuelve
    this.loadPrograms = function(){
        try {
            var program = this.programs.getElementsByTagName("week");
            program = program[0].childNodes;
            this.dateUTC.actualize();

            var today = program[this.dateUTC.dayW*2+1].childNodes;
            var tomorrow;
            if(this.dateUTC.dayW+1 === 7){ // controlar que no se acabe la semana
                tomorrow = program[1].childNodes; 
            } else {
                tomorrow = program[(this.dateUTC.dayW+1)*2+1].childNodes; 
            }

            // cargando el programa actual y el siguiente
            for(var i=0; i<(today.length-1)/2; i++){

                var horaIE = today[i*2+1].attributes[0].nodeValue;
                var n = horaIE.split("-");
                var horaI = n[0];
                var horaE = n[1];

                if(horaI <= this.dateUTC.sHour && this.dateUTC.sHour < horaE){

                    // llamar al objeto para meter los datos si son distintos
                    if(this.programA.idP !== today[i*2+1].textContent) {

                        console.log("Actualizar"); ////////

                        var _idP = today[i*2+1].textContent;
                        var _nameP;
                        var _author;
                        var _image;
                        var _typeP;
                        var _hourI = horaI;
                        var _hourE = horaE;
                        var _facebook;
                        var _twitter;
                        var _soundcloud;
                        var _youtube;
                        var _globalhouse;
                        var _descriptionP;
                        this.programA.programDates(_idP, _nameP, _author, _image, _typeP, _hourI, _hourE, _facebook, _twitter, _soundcloud, _youtube, _globalhouse, _descriptionP);

                        if( (i+1)*2+1 < today.length ){
                            console.log("Programa siguiente: " + today[(i+1)*2+1].textContent);

                            // cargar la hora de inicio y fin
                            // llamar al objeto para meter los datos si son distintos
                        } else {
                            console.log("Programa siguiente: " + tomorrow[1].textContent);
                            // cargar la hora de inicio y fin
                            // llamar al objeto para meter los datos si son distintos
                        }
                    }


                    i = (today.length-1)/2;
                }
            }

        } 
        catch(e) {
                console.log("Se produjo un error en la carga de los datos");
        }    

    };

}


/*************************************************
Clase para interfaz grafica
    @param {program} _actualP programa actual
    @param {program} _nextP programa siguiente
*************************************************/
function GraphInterface(_actualP, _nextP){
    this.actualP = _actualP;
    this.nextP = _nextP;

    this.create = function(){

    };

    this.remove = function(){

    };

    this.actualize = function(){

    };


// 	function crearTabla() 
// {
//         var tr;
//         var td;
//         var tabla;
//         var l=0;
//         ev= CargarXMLEventos();
//         auxUnEven=ev.pop();
// 		tabla=document.getElementById("datos");
//         while (auxUnEven!=undefined)
//         {
//             tr=tabla.insertRow(l);
//             //creamos las columnas de la tabla 
//             td=tr.insertCell(0);
// 			td.innerHTML=auxUnEven.fecha;
//             td=tr.insertCell(1);
// 			td.innerHTML=auxUnEven.hora;
//             td=tr.insertCell(2);
// 			td.innerHTML=auxUnEven.comentario;           
//             l++;
//             auxUnEven=ev.pop();
//         }
//         if (l==0)
//         {
//             tabla=document.getElementById("datos");
//             tr=tabla.insertRow(l);
//             td=tr.insertCell(0);
//             td.innerHTML=" No Hay Eventos ";
//         }

// }
}


/*************************************************
*************************************************/