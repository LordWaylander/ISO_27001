function openModalDeletePlanAction(id){
    var modal='<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"><svg @click="toggleModal" class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Voulez-vous vraiment supprimer le plan d\'action ?</h3></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button" name="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onclick="sendModalDeletePlanAction('+id+')">Supprimer</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="closeModalDeletePlanAction()">Annuler</button></div>'

    document.getElementById('modalDeleteBody').innerHTML="";
    document.getElementById('modalDeleteBody').innerHTML=modal;
    document.getElementById('modalDelete').classList.remove("hidden");
}

function closeModalDeletePlanAction(){
    document.getElementById('modalDelete').classList.add("hidden");
}

function sendModalDeletePlanAction(idPlanAction){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);
            if (json.user.role_id == 1) {
                window.location.replace('/admin/plansAction/index/'+json.idProcessus);
            }else if (json.user.role_id == 2) {
                window.location.replace('/relais/'+json.user.id_user+'/plansAction/index/'+json.idProcessus);
            }
        }else if(this.status == 500){
            json=JSON.parse(this.responseText);
            if (json.user.role_id == 1) {
                window.location.replace('/admin/plansAction/index/'+json.idProcessus);
            }else if (json.user.role_id == 2) {
                window.location.replace('/relais/'+json.user.id_user+'/plansAction/index/'+json.idProcessus);
            }
        }
    };
    xhttp_current.open("GET", '/admin/plansAction/delete/'+idPlanAction);
    xhttp_current.send();
}

function openModalViewPlanAction(idPlanAction){

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var date = json.plansAction.date_debut;
            var dateTable = date.split('-');
            date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
            json.plansAction.date_debut = date;
            var date = json.plansAction.date_fin;
            var dateTable = date.split('-');
            date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
            json.plansAction.date_fin = date;

            var modal ='<div class="flex flex-col w-full"><div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">ACTION</div>'
            modal+='<div class="flex justify-center"><div class="flex flex-col">'

            // RELAIS USER
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Déclencheur : </label><input name="relaisUserName" class="bg-blue-nav text-white " type="text" value="'+json.plansAction.planActions_processus.processus_relaisUser.nom_user+'" disabled/></div>'

            // ASSIGNATION USER
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Assignation : </label><input name="relaisUserName" class="bg-blue-nav text-white " type="text" value="'+json.plansAction.planActions_assignationUser.nom_user+'" disabled/></div>'

            // ACTION
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Action : </label><input name="action" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.action+'" disabled/></div>'

            // DESCRIPTION
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Description : </label><input name="description" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.description+'" disabled/></div>'

            // ETAT
            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold mr-2">Etat : </label>'
            if (json.plansAction.etat == 0) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-0" type="text" value="Rien - 0%" disabled/>'
            }else if (json.plansAction.etat == 25) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-25" type="text" value="Action programée - 25%" disabled/>'
            }else if (json.plansAction.etat == 50) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-50" type="text" value="Action en cours - 50%" disabled/>'
            }else if (json.plansAction.etat == 75) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-75" type="text" value="Action terminée - 75%" disabled/>'
            }else if (json.plansAction.etat == 100) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-100" type="text" value="Action validée - 100%" disabled/>'
            }
            modal+='</div>'

            // DATE
            modal+='<div class="w-full"><div class="mt-2 w-max"><p class="text-white font-bold">Planifiée : </p></div><div class="flex justify-start w-full"><div class="flex flex-col w-full ml-10"><p class="text-white flex justify-start w-full"><span class="font-bold">1. Date de début :</span><input type="text" name="date_debut" class="ml-2 bg-blue-nav text-white" value="'+json.plansAction.date_debut+'" disabled></p><p class="text-white flex justify-start w-full"><span class="font-bold">2. Date de fin : </span><input type="text" name="date_fin" class="ml-2 bg-blue-nav text-white" value="'+json.plansAction.date_fin+'" disabled/></p></div></div></div>'

            // ANALYSE
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Analyse : </label><input name="analyse_cause" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.analyse_cause+'" disabled/></div>'

            // TRAITEMENT
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Traitement : </label><input name="traitement_curatif" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.traitement_curatif+'" disabled/></div>'

            // COMMENTAIRE
            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Commentaire : </label><input name="commentaire" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.commentaire+'" disabled/></div>'

            modal+='</div></div>'

            //BTN VALIDER
            modal+='<div id="btnUpdate" class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onclick="openModalUpdatePlanAction('+json.plansAction.id_planAction+')">Modifier</button></div></div>'

            document.getElementById('modalViewBody').innerHTML="";
            document.getElementById('modalViewBody').innerHTML=modal;
            document.getElementById('modalView').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/plansAction/view/'+idPlanAction);
    xhttp_current.send();
}

function closeModalViewPlanAction(){
    document.getElementById('modalView').classList.add("hidden");
}

function openModalUpdatePlanAction(idPlanAction){

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var date = json.plansAction.date_debut;
            var dateTable = date.split('-');
            date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
            json.plansAction.date_debut = date;
            var date = json.plansAction.date_fin;
            var dateTable = date.split('-');
            date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
            json.plansAction.date_fin = date;

            var modal ='<div class="flex flex-col w-full"><div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">Modification du plan d\'action</div>'

            // USER RELAIS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Déclencheur : </label><select class="inputModalUpdate bg-blue-nav text-white border w-9/12" name="relais">'
            for (var i = 0; i < json.users.length; i++) {
                if (json.users[i].id_user == json.plansAction.planActions_processus.processus_relaisUser.id_user) {
                    modal+='<option value="'+json.users[i].id_user+'" selected>'+json.users[i].nom_user+'</option>'
                }else {
                    modal+='<option value="'+json.users[i].id_user+'">'+json.users[i].nom_user+'</option>'
                }

            }
            modal+='</select></div>'

            // USER ASSIGNATION
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Assignation : </label><select class="inputModalUpdate bg-blue-nav text-white border w-9/12" name="assignation">'
            for (var i = 0; i < json.users.length; i++) {
                if (json.users[i].id_user == json.plansAction.planActions_assignationUser.id_user) {
                    modal+='<option value="'+json.users[i].id_user+'" selected>'+json.users[i].nom_user+'</option>'
                }else {
                    modal+='<option value="'+json.users[i].id_user+'">'+json.users[i].nom_user+'</option>'
                }
            }
            modal+='</select></div>'

            //ACTION
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Action : </label><input name="action" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.plansAction.action+'" required/></div>'

            // DESCRIPTION
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Description : </label><input name="description" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.plansAction.description+'" required/></div>'

            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Etat : </label><select class="inputModalUpdate bg-blue-nav border w-9/12" name="etat">'

            // ETAT
            // NORMALEMENT CHAQUE OPTION EST SENSE AVOIR UNE COULEUR DIFFÉRENTE
            // (CF CLASS="color-etat-X") D'OU LES ELSE IF, MAIS IL EN VEUX PAS
            if (json.plansAction.etat == 0) {
                modal+='<option value="0" class="color-etat-0" selected>Rien - 0%</option><option value="25" class="color-etat-25">Action programée - 25%</option><option value="50" class="color-etat-50">Action en cours - 50%</option><option value="75" class="color-etat-75">Action terminée - 75%</option><option value="100" class="color-etat-100">Action validée - 100%</option>'
            }else if (json.plansAction.etat == 25) {
                modal+='<option value="0" class="color-etat-0">Rien - 0%</option><option value="25" class="color-etat-25" selected>Action programée - 25%</option><option value="50" class="color-etat-50">Action en cours - 50%</option><option value="75" class="color-etat-75">Action terminée - 75%</option><option value="100" class="color-etat-100">Action validée - 100%</option>'
            }else if (json.plansAction.etat == 50) {
                modal+='<option value="0" class="color-etat-0">Rien - 0%</option><option value="25" class="color-etat-25">Action programée - 25%</option><option value="50" class="color-etat-50" selected>Action en cours - 50%</option><option value="75" class="color-etat-75">Action terminée - 75%</option><option value="100" class="color-etat-100">Action validée - 100%</option>'
            }else if (json.plansAction.etat == 75) {
                modal+='<option value="0" class="color-etat-0">Rien - 0%</option><option value="25" class="color-etat-25">Action programée - 25%</option><option value="50" class="color-etat-50">Action en cours - 50%</option><option value="75" class="color-etat-75" selected>Action terminée - 75%</option><option value="100" class="color-etat-100">Action validée - 100%</option>'
            }else if (json.plansAction.etat == 100) {
                modal+='<option value="0" class="color-etat-0">Rien - 0%</option><option value="25" class="color-etat-25">Action programée - 25%</option><option value="50" class="color-etat-50">Action en cours - 50%</option><option value="75" class="color-etat-75">Action terminée - 75%</option><option value="100" class="color-etat-100" selected>Action validée - 100%</option>'
            }
            modal+='</select></div>'

            // DATE
            modal+='<div class="w-full"><div class="w-full flex justify-start"><p class="text-white font-bold">Planifiée : </p></div><div class="flex justify-start w-full"><div class="flex flex-col w-full"><p class="text-white flex justify-start w-full"><span class="font-bold w-4/12 flex justify-start">1. Date de début :</span><input type="text" name="date_debut" class="inputModalUpdate bg-blue-nav text-white border w-8/12" value="'+json.plansAction.date_debut+'"></p><p class="text-white flex justify-start w-full"><span class="font-bold w-4/12 flex justify-start">2. Date de fin : </span><input type="text" name="date_fin" class="inputModalUpdate bg-blue-nav text-white border w-8/12" value="'+json.plansAction.date_fin+'"></p></div></div></div>'

            // ANALYSE
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Analyse : </label><input name="analyse_cause" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.plansAction.analyse_cause+'" required/></div>'

            // TRAITEMENT
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Traitement : </label><input name="traitement_curatif" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.plansAction.traitement_curatif+'"/></div>'

            // COMMENTAIRE
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12 flex justify-start">Commentaire : </label><input name="commentaire" class="inputModalUpdate bg-blue-nav text-white border w-9/12" type="text" value="'+json.plansAction.commentaire+'"/></div>'

            // PROCESSUS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-4/12 flex justify-start">Processus rataché : </label><select class="inputModalUpdate bg-blue-nav text-white border w-8/12" name="processus">'
            for (var i = 0; i < json.processus.length; i++) {
                if (json.processus[i].id_processus == json.plansAction.planActions_processus.id_processus) {
                    modal+='<option value="'+json.processus[i].id_processus+'" selected>'+json.processus[i].nom_processus+'</option>'
                }else {
                    modal+='<option value="'+json.processus[i].id_processus+'">'+json.processus[i].nom_processus+'</option>'
                }
            }
            modal+='</select></div>'

            // BTN SEND
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onclick="sendModalUpdatePlanAction('+json.plansAction.id_planAction+')">Valider</button></div></div>'

            document.getElementById('modalUpdateBody').innerHTML="";
            document.getElementById('modalUpdateBody').innerHTML=modal;
            document.getElementById('modalUpdate').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/plansAction/update/'+idPlanAction);
    xhttp_current.send();

}

function closeModalUpdatePlanAction(){
    document.getElementById('modalUpdate').classList.add("hidden");
}

function sendModalUpdatePlanAction(idPlanAction){

    var input = document.getElementsByClassName('inputModalUpdate');
    var table = new Map();

    table.set('idPlanAction', idPlanAction);
    for (var i = 0; i < input.length; i++) {
        table.set(input[i].name, input[i].value);
    }
    var json = Object.fromEntries(table);
    var jsonStringify = JSON.stringify(json);

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);
            if (json.user.role_id == 1) {
                window.location.replace('/admin/plansAction/index/'+json.idProcessus);
            }else if (json.user.role_id == 2) {
                window.location.replace('/relais/'+json.user.id_user+'/plansAction/index/'+json.idProcessus);
            }
        }else if(this.status == 500){
            json=JSON.parse(this.responseText);
            if (json.user.role_id == 1) {
                window.location.replace('/admin/plansAction/index/'+json.idProcessus);
            }else if (json.user.role_id == 2) {
                window.location.replace('/relais/'+json.user.id_user+'/plansAction/index/'+json.idProcessus);
            }
        }
    };

    xhttp_current.open("POST", '/admin/plansAction/update/'+idPlanAction+'', true);
    xhttp_current.setRequestHeader('Content-Type', 'application/json');
    xhttp_current.send(jsonStringify);
}

function openModalCreatePlanAction(){
    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var modal ='<div class="flex flex-col w-full"><div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">Créer un plan d\'action</div>'

            // USER RELAIS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Déclencheur : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="relais">'
            for (var i = 0; i < json.users.length; i++) {
                modal+='<option value="'+json.users[i].id_user+'">'+json.users[i].nom_user+'</option>'
            }
            modal+='</select></div>'

            // USER ASSIGNATION
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Assignation : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="assignation">'
            for (var i = 0; i < json.users.length; i++) {
                modal+='<option value="'+json.users[i].id_user+'">'+json.users[i].nom_user+'</option>'
            }
            modal+='</select></div>'

            // PROCESSUS
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Processus rataché : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="processus">'
            for (var i = 0; i < json.processus.length; i++) {
                modal+='<option value="'+json.processus[i].id_processus+'">'+json.processus[i].nom_processus+'</option>'
            }
            modal+='</select></div>'

            // DESCRIPTION
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Description : </label><input name="description" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" required/></div>'

            // ANALYSE
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Analyse : </label><input name="analyse_cause" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" required/></div>'

            //TRAITEMENT
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Traitement : </label><input name="traitement_curatif" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value=""/></div>'

            // ACTION
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Action : </label><input name="action" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" required/></div>'

            //COMMENTAIRE
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Commentaire : </label><input name="commentaire" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value=""/></div>'

            //DATE
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Date de début (DD/MM/YYYY) : </label><input name="date_debut" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" required/></div>'

            //DATE
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Date de fin (DD/MM/YYYY) : </label><input name="date_fin" class="inputModalCreate bg-blue-nav text-white border w-9/12" type="text" value="" required/></div>'

            //ETAT
            modal+='<div class="mt-2 w-full flex justify-start"><label class="text-white font-bold w-3/12">Etat : </label><select class="inputModalCreate bg-blue-nav text-white border w-9/12" name="etat"><option value="0">0%</option><option value="25">25%</option><option value="50">50%</option><option value="75">75%</option><option value="100">100%</option></select></div>'

            // BTN SEND
            modal+='<div class="bg-blue-nav px-4 py-3 flex justify-center"><button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onclick="sendModalCreatePlanAction()">Valider</button></div></div>'

            document.getElementById('modalCreateBody').innerHTML="";
            document.getElementById('modalCreateBody').innerHTML=modal;
            document.getElementById('modalCreate').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/plansAction/create/');
    xhttp_current.send();
}

function closeModalCreatePlanAction(){
    document.getElementById('modalCreate').classList.add("hidden");
}

function sendModalCreatePlanAction(){
    let aujourdhui = new Date();
    var input = document.getElementsByClassName('inputModalCreate');
    var table = new Map();

    for (var i = 0; i < input.length; i++) {
        table.set(input[i].name, input[i].value);
    }
    var json = Object.fromEntries(table);
    var jsonStringify = JSON.stringify(json);

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);
            if (json.user.role_id == 1) {
                window.location.replace('/admin/plansAction/index/'+json.idProcessus);
            }else if (json.user.role_id == 2) {
                window.location.replace('/relais/'+json.user.id_user+'/plansAction/index/'+json.idProcessus);
            }
        }else if(this.status == 500){
            json=JSON.parse(this.responseText);
            if (json.user.role_id == 1) {
                window.location.replace('/admin/plansAction/index/'+json.idProcessus);
            }else if (json.user.role_id == 2) {
                window.location.replace('/relais/'+json.user.id_user+'/plansAction/index/'+json.idProcessus);
            }
        }
    };

    xhttp_current.open("POST", '/admin/plansAction/create/', true);
    xhttp_current.setRequestHeader('Content-Type', 'application/json');
    xhttp_current.send(jsonStringify);
}

function openModalViewPlanActionUser(idPlanAction){

    const xhttp_current = new XMLHttpRequest();
    xhttp_current.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json=JSON.parse(this.responseText);

            var date = json.plansAction.date_debut;
            var dateTable = date.split('-');
            date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
            json.plansAction.date_debut = date;
            var date = json.plansAction.date_fin;
            var dateTable = date.split('-');
            date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
            json.plansAction.date_fin = date;

            var modal ='<div class="flex flex-col w-full"><div class="mt-2 mb-2 flex justify-center text-white underline text-3xl">ACTION</div>'

            modal+='<div class="flex justify-center"><div class="flex flex-col">'

            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Déclencheur : </label><input name="relaisUserName" class="bg-blue-nav text-white " type="text" value="'+json.plansAction.planActions_processus.processus_relaisUser.nom_user+'" disabled/></div>'

            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Assignation : </label><input name="relaisUserName" class="bg-blue-nav text-white " type="text" value="'+json.plansAction.planActions_assignationUser.nom_user+'" disabled/></div>'


            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Action : </label><input name="action" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.action+'" disabled/></div>'


            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Description : </label><input name="description" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.description+'" disabled/></div>'

            modal+='<div class="mt-2 w-max flex justify-start"><label class="text-white font-bold mr-2">Etat : </label>'
            if (json.plansAction.etat == 0) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-0" type="text" value="Rien - 0%" disabled/>'
            }else if (json.plansAction.etat == 25) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-25" type="text" value="Action programée - 25%" disabled/>'
            }else if (json.plansAction.etat == 50) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-50" type="text" value="Action en cours - 50%" disabled/>'
            }else if (json.plansAction.etat == 75) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-75" type="text" value="Action terminée - 75%" disabled/>'
            }else if (json.plansAction.etat == 100) {
                modal+='<input name="description" class=" bg-blue-nav color-etat-100" type="text" value="Action validée - 100%" disabled/>'
            }
            modal+='</div>'

            modal+='<div class="w-full"><div class="mt-2 w-max"><p class="text-white font-bold">Planifiée : </p></div><div class="flex justify-start w-full"><div class="flex flex-col w-full ml-10"><p class="text-white flex justify-start w-full"><span class="font-bold">1. Date de début :</span><input type="text" name="date_debut" class="ml-2 bg-blue-nav text-white" value="'+json.plansAction.date_debut+'" disabled></p><p class="text-white flex justify-start w-full"><span class="font-bold">2. Date de fin : </span><input type="text" name="date_fin" class="ml-2 bg-blue-nav text-white" value="'+json.plansAction.date_fin+'" disabled/></p></div></div></div>'

            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Analyse : </label><input name="analyse_cause" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.analyse_cause+'" disabled/></div>'

            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Traitement : </label><input name="traitement_curatif" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.traitement_curatif+'" disabled/></div>'

            modal+='<div class="mt-2 w-max"><label class="text-white font-bold">Commentaire : </label><input name="commentaire" class="bg-blue-nav text-white" type="text" value="'+json.plansAction.commentaire+'" disabled/></div>'

            modal+='</div></div></div>'

            document.getElementById('modalViewBody').innerHTML="";
            document.getElementById('modalViewBody').innerHTML=modal;
            document.getElementById('modalView').classList.remove("hidden");
        }
    };
    xhttp_current.open("GET", '/admin/plansAction/view/'+idPlanAction);
    xhttp_current.send();
}
