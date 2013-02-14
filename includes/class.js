
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
    
    this.copy = function(obj){
        this.idP = obj.idP;
        this.nameP = obj.nameP;
        this.author = obj.author;
        this.image = obj.image;
        this.typeP = obj.typeP;
        this.hourI = obj.hourI;
        this.hourE = obj.hourE;
        this.facebook = obj.facebook;
        this.twitter = obj.twitter;
        this.soundcloud = obj.soundcloud;
        this.youtube = obj.youtube;
        this.globalhouse = obj.globalhouse;
        this.descriptionP = obj.descriptionP;
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
        if(this.hour < 10) {this.sHour = "0"+new String(this.hour);}
        else {this.sHour = this.hour;}

        if(this.minutes < 10) {this.sHour += "0"+new String(this.minutes);}
        else {this.sHour = this.sHour+new String(this.minutes);}

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
                
                if(horaE==="0000"){horaE="2400";}

                if(horaI <= this.dateUTC.sHour && this.dateUTC.sHour < horaE){

                    // llamar al objeto para meter los datos si son distintos
                    if(this.programA.idP !== today[i*2+1].textContent) {

                        var program2 = this.programs.getElementsByTagName(today[i*2+1].textContent);

                        var _idP = today[i*2+1].textContent;
                        var _nameP = program2[0].childNodes[1].textContent;
                        var _author = program2[0].childNodes[3].textContent;
                        var _image = program2[0].childNodes[5].textContent;
                        var _typeP = program2[0].childNodes[7].textContent;
                        var _hourI = horaI;
                        var _hourE = n[1];
                        var _facebook = program2[0].childNodes[9].textContent;
                        var _twitter = program2[0].childNodes[11].textContent;
                        var _soundcloud = program2[0].childNodes[13].textContent;
                        var _youtube = program2[0].childNodes[15].textContent;
                        var _globalhouse = program2[0].childNodes[17].textContent;
                        var _descriptionP = program2[0].childNodes[19].textContent;
                        this.programA.programDates(_idP, _nameP, _author, _image, _typeP, _hourI, _hourE, _facebook, _twitter, _soundcloud, _youtube, _globalhouse, _descriptionP);

                        if( (i+1)*2+1 < today.length ){
                            var program2 = this.programs.getElementsByTagName(today[(i+1)*2+1].textContent);

                            _idP = today[(i+1)*2+1].textContent;
                            horaIE = today[(i+1)*2+1].attributes[0].nodeValue;
                            n = horaIE.split("-");
                            horaI = n[0];
                            horaE = n[1];
                                                       
                        } else {
                            var program2 = this.programs.getElementsByTagName(tomorrow[1].textContent);

                            _idP = tomorrow[1].textContent;
                            horaIE = tomorrow[1].attributes[0].nodeValue;
                            n = horaIE.split("-");
                            horaI = n[0];
                            horaE = n[1];
                            
                        }
                        _nameP = program2[0].childNodes[1].textContent;
                        _author = program2[0].childNodes[3].textContent;
                        _image = program2[0].childNodes[5].textContent;
                        _typeP = program2[0].childNodes[7].textContent;
                        _hourI = horaI;
                        _hourE = horaE;
                        _facebook = program2[0].childNodes[9].textContent;
                        _twitter = program2[0].childNodes[11].textContent;
                        _soundcloud = program2[0].childNodes[13].textContent;
                        _youtube = program2[0].childNodes[15].textContent;
                        _globalhouse = program2[0].childNodes[17].textContent;
                        _descriptionP = program2[0].childNodes[19].textContent;
                        
                        this.programN.programDates(_idP, _nameP, _author, _image, _typeP, _hourI, _hourE, _facebook, _twitter, _soundcloud, _youtube, _globalhouse, _descriptionP);
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
*************************************************/
function GraphInterface(){
    this.actualP;
    this.nextP;
    
    this.init = function(_actualP, _nextP){
        this.actualP = _actualP;
        this.nextP = _nextP;
        
        document.write('<link href="includes/style.css" rel="stylesheet" media="screen">');
    };

    this.create = function(){
        
        var obj=document.getElementById('radio-grill');
        
        // crear la parte morada de arriba
        var name=document.createTextNode(this.actualP.nameP);
        var elemento=document.createElement('div');
        var elementoS=document.createElement('span');
        elemento.id="divActual";
        elementoS.appendChild(name);
        elemento.appendChild(elementoS);
        obj.appendChild(elemento);
        
        
        if(this.actualP.typeP === "audio"){
            this.createAudio();
        }else if(this.actualP.typeP === "video"){
            this.createVideo();
        }
        
        // crear la parte morada de next
        var name2=document.createTextNode(this.nextP.nameP+" ("+this.nextP.hourI+"-"+this.nextP.hourE+")");
        var elemento2=document.createElement('div');
        var elemento2S=document.createElement('span');
        elemento2.id="divNext";
        elemento2S.appendChild(name2);
        elemento2.appendChild(elemento2S);
        obj.appendChild(elemento2);
        
    };
    
    this.createVideo = function(){
        var reproductor = '<object width="580" height="230" id="lsplayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="http://cdn.livestream.com/grid/LSPlayer.swf?channel=gstvs&amp;color=0xe7e7e7&amp;autoPlay=true&amp;mute=false&amp;iconColorOver=0x888888&amp;iconColor=0x777777"></param><param name="allowScriptAccess" value="always"></param><param name="allowFullScreen" value="true"></param><embed name="lsplayer" wmode="transparent" src="http://cdn.livestream.com/grid/LSPlayer.swf?channel=gstvs&amp;color=0xe7e7e7&amp;autoPlay=true&amp;mute=false&amp;iconColorOver=0x888888&amp;iconColor=0x777777" width="580" height="230" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash"></embed></object>';
        var info = document.createElement('div');
        info.id="divInfo";
        info.innerHTML = reproductor;

        document.getElementById('radio-grill').appendChild(info);
    };
    
    this.createAudio = function(){
                
        var present=document.createTextNode("Presenta: "+this.actualP.author);
        var elemento2=document.createElement('div');
        elemento2.id="present";
        elemento2.appendChild(present);
        
        var hora=document.createTextNode("Time show: "+this.actualP.hourI+"-"+this.actualP.hourE);
        var elemento7=document.createElement('div');
        elemento7.appendChild(hora);
        
        
        var elemento6=document.createElement('div');
        elemento6.id="divNetwork";
        
        var net=document.createTextNode("Síguelo en / Follow in");
        var elemento8=document.createElement('div');
        elemento8.appendChild(net);
        elemento6.appendChild(elemento8);
        
        if(this.actualP.facebook !== "none"){var face=document.createElement("a"); face.href=this.actualP.facebook;var image=document.createElement('img'); image.src="extra/facebook.png"; face.appendChild(image); elemento6.appendChild(face);}
        if(this.actualP.twitter !== "none"){var face=document.createElement("a"); face.href=this.actualP.twitter;var image=document.createElement('img'); image.src="extra/twitter.png"; face.appendChild(image); elemento6.appendChild(face);}
        if(this.actualP.soundcloud !== "none"){var face=document.createElement("a"); face.href=this.actualP.soundcloud;var image=document.createElement('img'); image.src="extra/soundcloud.png"; face.appendChild(image); elemento6.appendChild(face);}

        var description=document.createTextNode("Info: "+this.actualP.descriptionP);
        var elemento3=document.createElement('div');
        elemento3.appendChild(description);
        
        var elemento5=document.createElement('div');
        elemento5.id="autorInfo";
        elemento5.appendChild(elemento2);
        elemento5.appendChild(elemento7);
        elemento5.appendChild(elemento6);
        elemento5.appendChild(elemento3);
        
        var reproductor='<embed quality="high" flashvars="type=mp3&amp;file=http://67.212.179.138:7082/;stream.nsv&amp;autostart=true&amp;backcolor=0x#FFFFFF&amp;frontcolor=0x1D0051&amp;lightcolor=0x1D0051&amp;screencolor=0x1D0051" type="application/x-shockwave-flash" height="20" src="http://globalhouse.es/player.swf" id="streambaby" style="margin: 0;" width="250" name="streambaby">';
        var elemento4=document.createElement('div');
        elemento4.id="repImg";
        var image=document.createElement('img');
        image.src="images/"+this.actualP.image;
        elemento4.appendChild(image);
        elemento4.innerHTML = elemento4.innerHTML + reproductor;
        
        // crear el contenedor
        var info = document.createElement('div');
        info.id="divInfo";
        
        info.appendChild(elemento4); //imagen y reproductor
        info.appendChild(elemento5); //autor redes info 
        
        document.getElementById('radio-grill').appendChild(info);

    };

    this.remove = function(){
        var obj=document.getElementById('radio-grill');
        
        while(obj.hasChildNodes()){
            obj.removeChild(obj.lastChild);
        }
    };

    this.actualize = function(_actualP, _nextP){
        this.actualP = _actualP;
        this.nextP = _nextP;
        this.remove();
        this.create();
    };
}


/*************************************************
*************************************************/