function openModalDeleteProcessus(id){
    var modal='<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"><svg @click="toggleModal" class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Voulez-vous vraiment supprimer le processus ?</h3></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button" name="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalDeleteProcessus('+id+')">Supprimer</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="closeModalDeleteProcessus()">Annuler</button></div>'

    document.getElementById('modalDeleteBody').innerHTML="";
    document.getElementById('modalDeleteBody').innerHTML=modal;
    document.getElementById('modalDelete').classList.remove("hidden");
}

function closeModalDeleteProcessus(){
    document.getElementById('modalDelete').classList.add("hidden");
}

function sendModalDeleteProcessus(idProcessus){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace('/relais/'+response.user.id_user+'/processus');
            }

        }else if(this.readyState == 4 && this.status == 500){
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace('/relais/'+response.user.id_user+'/processus');
            }
        }
    };
    xhttp_current.open("GET", '/admin/processus/delete/'+idProcessus);
    xhttp_current.send();
}

function openModalViewProcessus(idProcessus){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            //NOM PROCESSUS
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

            // INDICATEUR
            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold">Indicateur(s) : </label><ol class="list-decimal ml-5 text-white">'
            for (var i = 0; i < json.processus.processus_indicateurs.length; i++) {
                modal+='<li><input name="indicateur'+json.processus.processus_indicateurs[i].id_indicateur+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_indicateurs[i].indicateur+'" disabled/></li>'
            }
            modal+='</li></ol></div>'

            // OBJECTIF
            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold">Objectif(s) chiffré(s) : </label><ol class="list-decimal ml-5 text-white">'
            for (var i = 0; i < json.processus.processus_objectifs.length; i++) {
                modal+='<li><input name="objectif'+json.processus.processus_objectifs[i].id_objectif+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_objectifs[i].objectif+'" disabled/></li>'
            }
            modal+='</li></ol></div>'

            modal+='</div></div>'
            // BTN SEND
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="openModalUpdateProcessus('+idProcessus+')" id="btn_update">Modifier</button></div>'
            modal+='</div>'

            document.getElementById('modalViewBody').innerHTML="";
            document.getElementById('modalViewBody').innerHTML=modal;
            document.getElementById('modalView').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/processus/view/'+idProcessus);
    xhttp_current.send();
}

function closeModalViewProcessus(){
    document.getElementById('modalView').classList.add("hidden");
}

// Au début je voulais transmettre le tableau des users
// obtenus depuis la fonction d'ouverture de modal (update ou create)
// sauf que je sais pas pourquoi, il refusait de le prendre
// même avec JSON.stringify il en voulais pas, j'ai laissé tomber
// et je suis partis sur une requete AJAX
function ajoutRessourceUpdate(){
    var id=document.getElementById('btnAjoutRessource').value;
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal='<div class="mt-2 w-full flex justify-start" id="ressourceUser'+id+'"><label class="text-white font-bold w-3/12">Ressource : </label><select class="inputModalUpdate bg-blue-nav text-white border w-9/12" name="ressourceUser'+id+'">'
            for (var j = 0; j < json.users.length; j++) {
                modal+='<option value="'+json.users[j].id_user+'">'+json.users[j].nom_user+'</option>'
            }
            modal+='</select>'
            modal+='<button onclick="supprRessourceCreate('+id+')" type="button" name="ressourceUser'+id+'"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
            document.getElementById('ressourceSuivante').innerHTML+=modal;
            id++;
            document.getElementById('btnAjoutRessource').value=id;
        }
    };
    xhttp_current.open("GET", '/admin/listingUsers/');
    xhttp_current.send();
}

function supprRessourceUpdate(id){
    var user = document.getElementById('ressourceUser'+id);
    user.remove();
}

function ajoutObjectifUpdate(){
    var id=document.getElementById('btnAjoutObjectif').value;
    console.log(id);

    var modal='<div class="mt-2 w-full flex" id="objectif'+id+'"><div class="w-max"><label class="text-white font-bold">Objectif : </label><input name="objectif'+id+'" class="inputModalUpdate bg-blue-nav text-white border" type="text" value=""/></div><div class="w-max"><label class="text-white font-bold w-3/12 ml-4">Risque : </label><select class="inputModalUpdate bg-blue-nav text-white border" name="risqueObjectif'+id+'"><option value="1" selected>faible</option><option value="2" selected>moyen</option><option value="3" selected>fort</option></select></div><button onclick="supprObjectifUpdate('+id+')" type="button"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
    document.getElementById('objectifSuivant').innerHTML+=modal;
    id++;
    document.getElementById('btnAjoutObjectif').value=id
}

function supprObjectifUpdate(id){
    console.log(id);
    var objectif = document.getElementById('objectif'+id);
    objectif.remove();
}

function ajoutOpportuniteUpdate(){
    var id=document.getElementById('btnAjoutOpportunite').value;
    console.log(id);

    var modal='<div class="mt-2 w-full flex" id="opportunite'+id+'"><div class="w-max"><label class="text-white font-bold">Opportunité : </label><input name="opportunite'+id+'" class="inputModalUpdate bg-blue-nav text-white border" type="text" value=""/></div><div class="w-max"><label class="text-white font-bold w-3/12 ml-2">Risque : </label><select class="inputModalUpdate bg-blue-nav text-white border" name="risqueOpportunite'+id+'"><option value="1" selected>faible</option><option value="2" selected>moyen</option><option value="3" selected>fort</option></select></div><button onclick="supprOpportuniteUpdate('+id+')" type="button"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
    document.getElementById('opportuniteSuivante').innerHTML+=modal;
    id++;
    document.getElementById('btnAjoutOpportunite').value=id
}

function supprOpportuniteUpdate(id){
    console.log(id);
    var opportunite = document.getElementById('opportunite'+id);
    opportunite.remove();
}

function openModalUpdateProcessus(idProcessus){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal='<div class="flex flex-col w-full">'
            modal+='<div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">Modification du processus</div>'
            modal+='<div class="flex justify-center"><div class="flex flex-col">'

            // NOM PROCESSUS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Processus : </label><input name="nom_processus" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.processus.nom_processus+'" /></div>'

            // RELAIS USER
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Pilote : </label><select class="inputModalUpdate bg-blue-nav text-white border w-9/12" name="relais">'
            for (var i = 0; i < json.users.length; i++) {
                if (json.users[i].id_user == json.processus.processus_relaisUser.id_user) {
                    modal+='<option value="'+json.users[i].id_user+'" selected>'+json.users[i].nom_user+'</option>'
                }else {
                    modal+='<option value="'+json.users[i].id_user+'">'+json.users[i].nom_user+'</option>'
                }
            }
            modal+='</select>'
            modal+='</div>'

            // RESSOURCE USER
            for (var i = 0; i < json.processus.processus_ressourceUser.length; i++) {
                modal+='<div class="mt-2 w-full flex justify-start" id="ressourceUser'+i+'"><label class="text-white font-bold w-3/12">Ressource : </label><select class="inputModalUpdate bg-blue-nav text-white border w-9/12" name="ressourceUser'+json.processus.processus_ressourceUser[i].id_user+'">'
                for (var j = 0; j < json.users.length; j++) {
                    if (json.users[j].id_user == json.processus.processus_ressourceUser[i].id_user) {
                        modal+='<option value="'+json.users[j].id_user+'" selected>'+json.users[j].nom_user+'</option>'
                    }else {
                        modal+='<option value="'+json.users[j].id_user+'">'+json.users[j].nom_user+'</option>'
                    }
                    var id = json.users[j].id_user;
                }
                modal+='</select>'
                modal+='<button onclick="supprRessourceUpdate('+i+')" type="button" name="ressourceUser'+i+'"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
            }
            modal+='<div id="ressourceSuivante"></div>'
            id++;
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutRessource" value="'+id+'" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutRessourceUpdate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter une ressource</div></button></div>'

            // INDICATEURS
            for (var i = 0; i < json.processus.processus_indicateurs.length; i++) {
                modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Indicateur : </label><input name="indicateur'+json.processus.processus_indicateurs[i].id_indicateur+'" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.processus.processus_indicateurs[i].indicateur+'" /></div>'
                var id = json.processus.processus_indicateurs[i].id_indicateur;
            }
            modal+='<div id="indicateurSuivant"></div>'
            id++;
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutindicateur" value="'+id+'" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutIndicateurUpdate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter un indicateur</div></button></div>'

            // OBJECTIFS
            for (var i = 0; i < json.processus.processus_objectifs.length; i++) {
                modal+='<div class="mt-2 w-full flex" id="objectif'+json.processus.processus_objectifs[i].id_objectif+'">'
                modal+='<div class="w-max"><label class="text-white font-bold">Objectif : </label><input name="objectif'+json.processus.processus_objectifs[i].id_objectif+'" class="inputModalUpdate bg-blue-nav text-white border" type="text" value="'+json.processus.processus_objectifs[i].objectif+'"/></div>'
                modal+='<div class="w-max"><label class="text-white font-bold w-3/12 ml-4">Risque : </label><select class="inputModalUpdate bg-blue-nav text-white border" name="risqueObjectif'+json.processus.processus_objectifs[i].id_objectif+'">'
                for (var j = 0; j < json.risques.length; j++) {
                    if (json.risques[j].id_risque == json.processus.processus_objectifs[i].risque_id) {
                        modal+='<option value="'+json.risques[j].id_risque+'" selected>'+json.risques[j].risque+'</option>'
                    }else {
                        modal+='<option value="'+json.risques[j].id_risque+'">'+json.risques[j].risque+'</option>'
                    }
                }
                modal+='</select></div>'
                modal+='<button onclick="supprObjectifUpdate('+json.processus.processus_objectifs[i].id_objectif+')" type="button"><img class="h-4" src="/images/delete.png" alt=""></button>'
                modal+='</div>'
                var id = json.processus.processus_objectifs[i].id_objectif;
            }
            modal+='<div id="objectifSuivant"></div>'
            id++;
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutObjectif" value="'+id+'" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutObjectifUpdate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter un objectif</div></button></div>'

            // FINALITES
            modal+='<div class="mt-2 w-full flex justify-start">'
            modal+='<label class="text-white font-bold w-3/12">Finalité : </label><input name="finalite" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.processus.finalite+'" />'
            modal+='</div>'

            // OPPORTUNITES
            for (var i = 0; i < json.processus.processus_opportunites.length; i++) {
                modal+='<div class="mt-2 w-full flex" id="opportunite'+json.processus.processus_opportunites[i].id_opportunite+'">'
                modal+='<div class="w-max"><label class="text-white font-bold">Opportunité : </label><input name="opportunite'+json.processus.processus_opportunites[i].id_opportunite+'" class="inputModalUpdate bg-blue-nav text-white border" type="text" value="'+json.processus.processus_opportunites[i].opportunite+'" /></div>'
                modal+='<div class="w-max"><label class="text-white font-bold w-3/12 ml-2">Risque : </label><select class="inputModalUpdate bg-blue-nav text-white border" name="risqueOpportunite'+json.processus.processus_opportunites[i].id_opportunite+'">'
                for (var j = 0; j < json.risques.length; j++) {
                    if (json.risques[j].id_risque == json.processus.processus_opportunites[i].risque_id) {
                        modal+='<option value="'+json.risques[j].id_risque+'" selected>'+json.risques[j].risque+'</option>'
                    }else {
                        modal+='<option value="'+json.risques[j].id_risque+'">'+json.risques[j].risque+'</option>'
                    }
                }
                modal+='</select></div>'
                modal+='<button onclick="supprOpportuniteUpdate('+json.processus.processus_opportunites[i].id_opportunite+')" type="button"><img class="h-4" src="/images/delete.png" alt=""></button>'
                modal+='</div>'
                var id = json.processus.processus_opportunites[i].id_opportunite;
            }
            modal+='<div id="opportuniteSuivante"></div>'
            id++;
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutOpportunite" value="'+id+'" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutOpportuniteUpdate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter une opportunite</div></button></div>'

            // FREQUENCE
            modal+='<div class="mt-2 w-max flex flex-row"><label class="text-white font-bold">Fréquence de collecte : </label>'
            for (var i = 0; i < json.frequence.length; i++) {
                if (json.processus.processus_frequences.id_frequence == json.frequence[i].id_frequence) {
                        modal+='<input class="inputModalUpdate ml-4 " type="radio" id="'+json.frequence[i].frequence+'" name="frequence" value="'+json.frequence[i].id_frequence+'" checked ><label for="mensuelle" class="text-white underline font-bold">'+json.frequence[i].frequence+'</label>'
                }else {
                    modal+='<input class="inputModalUpdate ml-4 " type="radio" id="'+json.frequence[i].frequence+'" name="frequence" value="'+json.frequence[i].id_frequence+'" ><label for="mensuelle" class="text-white">'+json.frequence[i].frequence+'</label>'
                }
            }
            modal+='</div>'
            modal+='</div></div>'
            // BTN VALIDER
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalUpdateProcessus('+idProcessus+')" id="btn_sendData">Valider</button></div>'
            modal+='</div>'

            document.getElementById('modalUpdateBody').innerHTML="";
            document.getElementById('modalUpdateBody').innerHTML=modal;
            document.getElementById('modalUpdate').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/processus/update/'+idProcessus);
    xhttp_current.send();
}

function closeModalUpdateProcessus(){
    document.getElementById('modalUpdate').classList.add("hidden");
}

function sendModalUpdateProcessus(idProcessus){

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
                window.location.replace('/relais/'+response.user.id_user+'/processus');
            }

        }else if(this.readyState == 4 && this.status == 500){
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace('/relais/'+response.user.id_user+'/processus');
            }
        }
    };

    xhttp_current.open("POST", '/admin/processus/update/'+idProcessus+'', true);
    xhttp_current.setRequestHeader('Content-Type', 'application/json');
    xhttp_current.send(jsonStringify);
}

function ajoutRessourceCreate(idRessource){
    var id=document.getElementById('btnAjoutRessource').value;

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal='<div class="mt-2 w-full flex justify-start" id="ressourceUser'+id+'"><label class="text-white font-bold w-3/12">Ressource : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="ressourceUser'+id+'">'
            for (var j = 0; j < json.users.length; j++) {
                modal+='<option value="'+json.users[j].id_user+'">'+json.users[j].nom_user+'</option>'
            }
            modal+='</select>'
            modal+='<button onclick="supprRessourceCreate('+id+')" type="button" name="ressourceUser'+id+'"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
            document.getElementById('ressourceSuivante').innerHTML+=modal;
            id++;
            document.getElementById('btnAjoutRessource').value=id;
        }
    };
    xhttp_current.open("GET", '/admin/listingUsers/');
    xhttp_current.send();
}

function supprRessourceCreate(id){
    var user = document.getElementById('ressourceUser'+id);
    user.remove();
}

function ajoutObjectifCreate(){
    var id=document.getElementById('btnAjoutObjectif').value;

    var modal='<div class="mt-2 w-full flex" id="objectif'+id+'"><div class="w-max"><label class="text-white font-bold">Objectif : </label><input name="objectif'+id+'" class="inputModalCreate bg-blue-nav text-white border" type="text" value=""/></div><div class="w-max"><label class="text-white font-bold w-3/12 ml-4">Risque : </label><select class="inputModalCreate bg-blue-nav text-white border" name="risqueObjectif'+id+'"><option value="1" selected>faible</option><option value="2" selected>moyen</option><option value="3" selected>fort</option></select></div><button onclick="supprObjectifCreate('+id+')" type="button"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
    document.getElementById('objectifSuivant').innerHTML+=modal;
    id++;
    document.getElementById('btnAjoutObjectif').value=id
}

function supprObjectifCreate(id){
    var objectif = document.getElementById('objectif'+id);
    objectif.remove();
}

function ajoutOpportuniteCreate(){
    var id=document.getElementById('btnAjoutOpportunite').value;

    var modal='<div class="mt-2 w-full flex" id="opportunite'+id+'"><div class="w-max"><label class="text-white font-bold">Opportunité : </label><input name="opportunite'+id+'" class="inputModalCreate bg-blue-nav text-white border" type="text" value=""/></div><div class="w-max"><label class="text-white font-bold w-3/12 ml-2">Risque : </label><select class="inputModalCreate bg-blue-nav text-white border" name="risqueOpportunite'+id+'"><option value="1" selected>faible</option><option value="2" selected>moyen</option><option value="3" selected>fort</option></select></div><button onclick="supprOpportuniteCreate('+id+')" type="button"><img class="h-4" src="/images/delete.png" alt=""></button></div>'
    document.getElementById('opportuniteSuivante').innerHTML+=modal;
    id++;
    document.getElementById('btnAjoutOpportunite').value=id
}

function supprOpportuniteCreate(id){
    var opportunite = document.getElementById('opportunite'+id);
    opportunite.remove();
}

function openModalCreateProcessus(idProcessus){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal='<div class="flex flex-col w-full">'
            modal+='<div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">Création du processus</div>'
            modal+='<div class="flex justify-center"><div class="flex flex-col">'
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Processus : </label><input name="nom_processus" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" /></div>'

            // RELAIS USER
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Pilote : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="relais">'
            for (var i = 0; i < json.users.length; i++) {
                modal+='<option value="'+json.users[i].id_user+'">'+json.users[i].nom_user+'</option>'
            }
            modal+='</select>'
            modal+='</div>'

            // RESSOURCE USER
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Ressource : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="ressourceUser1">'
            for (var j = 0; j < json.users.length; j++) {
                modal+='<option value="'+json.users[j].id_user+'">'+json.users[j].nom_user+'</option>'
            }
            modal+='</select>'
            modal+='</div>'
            modal+='<div id="ressourceSuivante"></div>'
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutRessource" value="2" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutRessourceCreate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter une ressource</div></button></div>'

            // INDICATEURS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Indicateur : </label><input name="indicateur1" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" /></div>'
            modal+='<div id="indicateurSuivant"></div>'
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutIndicateur" value="2" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutIndicateurCreate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter un indicateur</div></button></div>'

            // OBJECTIFS
            modal+='<div class="mt-2 w-full flex" id="objectif1">'
            modal+='<div class="w-max"><label class="text-white font-bold">Objectif : </label><input name="objectif1" class="inputModalCreate bg-blue-nav text-white border" type="text" value=""/></div>'
            modal+='<div class="w-max"><label class="text-white font-bold w-3/12 ml-4">Risque : </label><select class="inputModalCreate bg-blue-nav text-white border" name="risqueObjectif1">'
            for (var j = 0; j < json.risques.length; j++) {
                modal+='<option value="'+json.risques[j].id_risque+'">'+json.risques[j].risque+'</option>'
            }
            modal+='</select></div>'
            modal+='</div>'
            modal+='<div id="objectifSuivant"></div>'
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutObjectif" value="2" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutObjectifCreate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter un objectif</div></button></div>'

            // FINALITES
            modal+='<div class="mt-2 w-full flex justify-start">'
            modal+='<label class="text-white font-bold w-3/12 flex justify-start">Finalité : </label><input name="finalite" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" />'
            modal+='</div>'

            // OPPORTUNITES
            modal+='<div class="mt-2 w-full flex" id="opportunite1">'
            modal+='<div class="w-max"><label class="text-white font-bold">Opportunité : </label><input name="opportunite1" class="inputModalCreate bg-blue-nav text-white border" type="text" value="" /></div>'
            modal+='<div class="w-max"><label class="text-white font-bold w-3/12 ml-2">Risque : </label><select class="inputModalCreate bg-blue-nav text-white border" name="risqueOpportunite1">'
            for (var j = 0; j < json.risques.length; j++) {
                modal+='<option value="'+json.risques[j].id_risque+'">'+json.risques[j].risque+'</option>'
            }
            modal+='</select></div>'
            modal+='</div>'
            modal+='<div id="opportuniteSuivante"></div>'
            modal+='<div class="mt-2 w-full flex justify-center"><button id="btnAjoutOpportunite" value="2" type="button" name="button" class="w-max text-white border p-1" onclick="ajoutOpportuniteCreate()"><div class="flex flex-row items-center"><img class="mr-3 w-4" src="/images/plusWhite.png" alt="ajout">Ajouter une opportunite</div></button></div>'

            // FREQUENCE
            modal+='<div class="mt-2 w-full flex flex-row"><label class="text-white font-bold">Fréquence de collecte : </label>'
            for (var i = 0; i < json.frequence.length; i++) {
                modal+='<input class="inputModalCreate ml-4" type="radio" id="'+json.frequence[i].frequence+'" name="frequence" value="'+json.frequence[i].id_frequence+'" ><label for="mensuelle" class="text-white">'+json.frequence[i].frequence+'</label>'
            }
            modal+='</div>'
            modal+='</div></div>'
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalCreateProcessus()">Valider</button></div>'
            modal+='</div>'

            document.getElementById('modalCreateBody').innerHTML="";
            document.getElementById('modalCreateBody').innerHTML=modal;
            document.getElementById('modalCreate').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/processus/create/');
    xhttp_current.send();
}

function closeModalCreateProcessus(){
    document.getElementById('modalCreate').classList.add("hidden");
}

function sendModalCreateProcessus(){

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
                window.location.replace('/relais/'+response.user.id_user+'/processus');
            }

        }else if(this.readyState == 4 && this.status == 500){
            var response = JSON.parse(this.responseText);
            if (response.user.role_id == 1) {
                window.location.replace("/admin");
            }else if (response.user.role_id == 2) {
                window.location.replace('/relais/'+response.user.id_user+'/processus');
            }
        }
    };

    xhttp_current.open("POST", '/admin/processus/create/', true);
    xhttp_current.setRequestHeader('Content-Type', 'application/json');
    xhttp_current.send(jsonStringify);
}

function openModalViewProcessusUser(idProcessus){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal='<div class="flex flex-col w-full"><div class="mt-2 mb-2 flex justify-center text-white underline text-3xl uppercase">processus '+json.processus.nom_processus+'</div><div class="flex justify-center"><div class="flex flex-col">'

            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Pilote : </label><input name="relaisUserName" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_relaisUser.nom_user+'" disabled/></div>'
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">E-mail : </label><input name="relaisUserMail" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_relaisUser.email+'" disabled/></div>'

            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold">Ressource(s) : </label><ul class="ml-2">'
            for (var i = 0; i < json.processus.processus_ressourceUser.length; i++) {
                modal+='<li><input name="ressourceUser'+json.processus.processus_ressourceUser[i].id_user+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_ressourceUser[i].nom_user+'" disabled/></li>'
            }
            modal+='</ul></div>'

            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold">Indicateur(s) : </label><ol class="list-decimal ml-5 text-white">'
            for (var i = 0; i < json.processus.processus_indicateurs.length; i++) {
                modal+='<li><input name="indicateur'+json.processus.processus_indicateurs[i].id_indicateur+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_indicateurs[i].indicateur+'" disabled/></li>'
            }
            modal+='</li></ol></div>'

            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold">Objectif(s) chiffré(s) : </label><ol class="list-decimal ml-5 text-white">'
            for (var i = 0; i < json.processus.processus_objectifs.length; i++) {
                modal+='<li><input name="objectif'+json.processus.processus_objectifs[i].id_objectif+'" class="bg-blue-nav text-white " type="text" value="'+json.processus.processus_objectifs[i].objectif+'" disabled/></li>'
            }
            modal+='</li></ol></div>'

            modal+='</div></div>'
            modal+='</div>'

            document.getElementById('modalViewBody').innerHTML="";
            document.getElementById('modalViewBody').innerHTML=modal;
            document.getElementById('modalView').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/processus/view/'+idProcessus);
    xhttp_current.send();
}
