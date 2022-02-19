function openModalDeleteIndicateur(id){
    var modal='<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"><svg @click="toggleModal" class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Voulez-vous vraiment supprimer le processus ?</h3></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button" name="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalDeleteIndicateur('+id+')">Supprimer</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="closeModalDeleteIndicateur()">Annuler</button></div>'

    document.getElementById('modalDeleteBody').innerHTML="";
    document.getElementById('modalDeleteBody').innerHTML=modal;
    document.getElementById('modalDelete').classList.remove("hidden");
}

function closeModalDeleteIndicateur(){
    document.getElementById('modalDelete').classList.add("hidden");
}

function sendModalDeleteIndicateur(idProcessus){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace("/relais/"+response.user.id_user);
            }

        }else if(this.readyState == 4 && this.status == 500){
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace("/relais/"+response.user.id_user);
            }
        }
    };
    xhttp_current.open("GET", '/admin/processus/delete/'+idProcessus);
    xhttp_current.send();
}

function openModalViewIndicateur(idProcessus){

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            // PROCESSUS
            var modal='<div class="flex flex-col w-full"><div class="mt-2 mb-2 flex justify-center text-white underline text-3xl uppercase">processus '+json.processus.nom_processus+'</div><div class="flex justify-center"><div class="flex flex-col">'

            // USER RELAIS
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Pilote : </label><input name="relaisUserName" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_relaisUser.nom_user+'" disabled/></div>'
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">E-mail : </label><input name="relaisUserMail" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_relaisUser.email+'" disabled/></div>'

            // USER RESSOURCE
            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold">Ressource(s) : </label><ul class="ml-2">'
            for (var i = 0; i < json.processus.processus_ressourceUser.length; i++) {
                modal+='<li><input name="ressourceUser'+json.processus.processus_ressourceUser[i].id_user+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_ressourceUser[i].nom_user+'" disabled/></li>'
            }
            modal+='</ul></div>'

            // INDICATEURS
            for (var i = 0; i < json.processus.processus_indicateurs.length; i++) {
                modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Indicateur : </label><input name="indicateur'+json.processus.processus_indicateurs[i].id_indicateur+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_indicateurs[i].indicateur+'" disabled/></div>'
            }
            // OBJECTIFS
            for (var i = 0; i < json.processus.processus_objectifs.length; i++) {
                modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Objectif : </label><input name="objectif'+json.processus.processus_objectifs[i].id_objectif+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_objectifs[i].objectif+'" disabled/></div>'
            }

            // FINALITE
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Finalité : </label><input name="finalite" class="bg-blue-nav text-white " type="text" value="'+json.processus.finalite+'" disabled/></div>'

            // OPPORTUNITES
            for (var i = 0; i < json.processus.processus_opportunites.length; i++) {
                modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Opportunité : </label><input name="objectif'+json.processus.processus_opportunites[i].id_opportunite+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_opportunites[i].opportunite+'" disabled/></div>'
            }

            //FREQUENCE
            modal+='<div class="mt-2 w-max flex flex-row"><label class="text-white font-bold">Fréquence de collecte : </label>'
            for (var i = 0; i < json.frequence.length; i++) {
                if (json.processus.processus_frequences.id_frequence == json.frequence[i].id_frequence) {
                        modal+='<input class=" hidden" type="radio" id="'+json.frequence[i].frequence+'" name="frequence" value="'+json.frequence[i].id_frequence+'" checked disabled><label for="mensuelle" class="ml-4 text-white underline font-bold">'+json.frequence[i].frequence+'</label>'
                }else {
                    modal+='<input class=" hidden" type="radio" id="'+json.frequence[i].frequence+'" name="frequence" value="'+json.frequence[i].id_frequence+'" disabled><label for="mensuelle" class="ml-4 text-white">'+json.frequence[i].frequence+'</label>'
                }
            }
            modal+='</div>'

            // SUIVIS
            modal+='<div class="mt-2 w-full"><div class="flex justify-start"><label class="text-white font-bold">Suivi : </label></div><ul class="list-disc"><div class="grid grid-cols-3 gap-4 w-full">'
            for(var key in json.processus.processus_suivis) {
                if (json.processus.processus_suivis[key] == null) {
                    json.processus.processus_suivis[key]="";
                }
                if (key != "id_suivi" && key != "processus_id") {
                  modal+='<li class="text-white font-bold"><span class="w-full">'+key+' :</span><input class="bg-blue-nav text-white w-full " type="text" name="'+key+'" value="'+json.processus.processus_suivis[key]+'" disabled></li>'
                }
            }

            modal+='</div></ul></div>'
            modal+='</div></div>'
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="openModalUpdateIndicateur('+idProcessus+')" id="btn_update">Mettre à jour</button></div>'
            modal+='</div>'

            document.getElementById('modalViewBody').innerHTML="";
            document.getElementById('modalViewBody').innerHTML=modal;
            document.getElementById('modalView').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/processus/view/'+idProcessus);
    xhttp_current.send();
}

function closeModalViewIndicateur(){
    document.getElementById('modalView').classList.add("hidden");
}

function ajoutIndicateurUpdate(){
    var id=document.getElementById('btnAjoutindicateur').value;

    var modal='<div class="mt-2 w-full flex justify-start" id="indicateur'+id+'"><label class="text-white font-bold w-4/12 flex justify-start">Indicateur : </label><input name="indicateur'+id+'" class="inputModalUpdate bg-blue-nav text-white border w-8/12" type="text" value="" /><button onclick="supprIndicateurUpdate('+id+')" type="button" name="ressourceUser'+id+'"><img class="h-4" src="/images/delete.png" alt=""></button></div>'

    document.getElementById('indicateurSuivant').innerHTML+=modal;
    id++;
    document.getElementById('btnAjoutindicateur').value=id;
}

function supprIndicateurUpdate(id){
    var indicateur = document.getElementById('indicateur'+id);
    indicateur.remove();
}

function openModalUpdateIndicateur(idProcessus){

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal='<div class="flex flex-col w-full">'
            modal+='<div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">Modification des indicateurs</div>'
            modal+='<div class="flex justify-center"><div class="flex flex-col">'

            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-4/12 flex justify-start">Processus : </label><select class="inputModalCreate bg-blue-nav text-white border w-8/12" name="processus">'
            for (var i = 0; i < json.processAll.length; i++) {
                if (json.processAll[i].id_processus == json.processus.id_processus) {
                    modal+='<option value="'+json.processAll[i].id_processus+'" selected>'+json.processAll[i].nom_processus+'</option>'
                }else {
                    modal+='<option value="'+json.processAll[i].id_processus+'">'+json.processAll[i].nom_processus+'</option>'
                }

            }
            modal+='</select>'
            modal+='</div>'

            // INDICATEURS
            for (var i = 0; i < json.processus.processus_indicateurs.length; i++) {
                modal+='<div class="mt-2 w-full flex justify-start" id="indicateur'+i+'"><label class="text-white font-bold w-4/12 flex justify-start">Indicateur : </label><input name="indicateur'+json.processus.processus_indicateurs[i].id_indicateur+'" class="inputModalUpdate bg-blue-nav text-white border w-8/12" type="text" value="'+json.processus.processus_indicateurs[i].indicateur+'" /><button onclick="supprIndicateurUpdate('+i+')" type="button" name="ressourceUser'+i+'"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
                var id = json.processus.processus_indicateurs[i].id_indicateur;
            }
            modal+='<div id="indicateurSuivant"></div>'
            id++;
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutindicateur" value="'+id+'" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutIndicateurUpdate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter un indicateur</div></button></div>'

            modal+='</div></div>'
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalUpdateIndicateur('+idProcessus+')" id="btn_sendData">Valider</button></div>'
            modal+='</div>'

            document.getElementById('modalUpdateBody').innerHTML="";
            document.getElementById('modalUpdateBody').innerHTML=modal;
            document.getElementById('modalUpdate').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/indicateur/update/'+idProcessus);
    xhttp_current.send();

}

function closeModalUpdateIndicateur(){
    document.getElementById('modalUpdate').classList.add("hidden");
}

function sendModalUpdateIndicateur(idProcessus){

    var input = document.getElementsByClassName('inputModalUpdate');
    var table = new Map();

    table.set('idProcessus', idProcessus);
    for (var i = 0; i < input.length; i++) {
        if (input[i].name == 'frequence' && input[i].checked == true) {
            table.set(input[i].name, input[i].value);
        }else if(input[i].name != 'frequence') {
            table.set(input[i].name, input[i].value);
        }
    }
    var json = Object.fromEntries(table);
    var jsonStringify = JSON.stringify(json);

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace("/relais/"+response.user.id_user);
            }

        }else if(this.readyState == 4 && this.status == 500){
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace("/relais/"+response.user.id_user);
            }
        }
    };

    xhttp_current.open("POST", '/admin/indicateur/update/'+idProcessus+'', true);
    xhttp_current.setRequestHeader('Content-Type', 'application/json');
    xhttp_current.send(jsonStringify);
}

function ajoutIndicateurCreate(){
    var id=document.getElementById('btnAjoutIndicateur').value;

    var modal='<div class="mt-2 w-full flex justify-start" id="indicateur'+id+'"><label class="text-white font-bold w-4/12 flex justify-start">Indicateur : </label><input name="indicateur'+id+'" class="inputModalCreate bg-blue-nav text-white border w-8/12" type="text" value="" /><button onclick="supprIndicateurUpdate('+id+')" type="button" name="ressourceUser'+id+'"><img class="h-4" src="/images/delete.png" alt=""></button></div>'

    document.getElementById('indicateurSuivant').innerHTML+=modal;
    id++;
    document.getElementById('btnAjoutIndicateur').value=id;

}

function supprIndicateurCreate(id){
    var indicateur = document.getElementById('indicateur'+id);
    indicateur.remove();
}

function openModalCreateIndicateur(){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);
            users = JSON.stringify(json.users);

            var modal='<div class="flex flex-col w-full">'
            modal+='<div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">Création d\'un indicateur</div>'
            modal+='<div class="flex justify-center"><div class="flex flex-col">'

            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-5/12 flex justify-start">Processus : </label><select class="inputModalCreate bg-blue-nav text-white border w-7/12" name="processus">'
            for (var i = 0; i < json.processus.length; i++) {
                modal+='<option value="'+json.processus[i].id_processus+'">'+json.processus[i].nom_processus+'</option>'
            }
            modal+='</select>'
            modal+='</div>'

            // INDICATEURS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-5/12 flex justify-start">Indicateur : </label><input name="indicateur1" class="inputModalCreate bg-blue-nav text-white border w-7/12" type="text" value="" /></div>'
            modal+='<div id="indicateurSuivant"></div>'
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutIndicateur" value="2" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutIndicateurCreate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter un indicateur</div></button></div>'

            modal+='</div></div>'
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalCreateIndicateur()">Valider</button></div>'
            modal+='</div>'

            document.getElementById('modalCreateBody').innerHTML="";
            document.getElementById('modalCreateBody').innerHTML=modal;
            document.getElementById('modalCreate').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/indicateur/create/');
    xhttp_current.send();
}

function closeModalCreateIndicateur(){
    document.getElementById('modalCreate').classList.add("hidden");
}

function sendModalCreateIndicateur(){

    var input = document.getElementsByClassName('inputModalCreate');
    var table = new Map();

    for (var i = 0; i < input.length; i++) {
        if (input[i].name == 'frequence' && input[i].checked == true) {
            table.set(input[i].name, input[i].value);
        }else if(input[i].name != 'frequence') {
            table.set(input[i].name, input[i].value);
        }
    }
    var json = Object.fromEntries(table);
    var jsonStringify = JSON.stringify(json);

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace("/relais/"+response.user.id_user);
            }

        }else if(this.readyState == 4 && this.status == 500){
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace("/relais/"+response.user.id_user);
            }
        }
    };

    xhttp_current.open("POST", '/admin/indicateur/create/', true);
    xhttp_current.setRequestHeader('Content-Type', 'application/json');
    xhttp_current.send(jsonStringify);
}
