
//declaration de variables et initialisation

genForm=$('#genForm');
var selected=[true],newChamp=[true],type=[2];
genFormM=document.getElementById('genForm');
conf=genFormM.firstElementChild.lastElementChild;
legend=document.getElementById('legend');
legendInput=document.getElementById('legendInput');
legendModif=document.getElementById('legendModif');
selectChamp=document.getElementById('selectChamp');

function insertAfter(newElement, afterElement) {
    var parent = afterElement.parentNode;
	
    if (parent.lastElementChild === afterElement) { // Si le dernier élément est le même que l'élément après lequel on veut insérer, il suffit de faire appendChild()
        parent.appendChild(newElement);
    } else { // Dans le cas contraire, on fait un insertBefore() sur l'élément suivant
        parent.insertBefore(newElement, afterElement.nextElementSibling);
    }
}

function suppression(T,p) {
	if (p<T.length-1) {
		for (var q = p; q!=0 ; q--) {
			T[q]=T[q-1];
		}
		T.shift();
	} else T.pop();
}
function insertion(T,x,p) {
	if (p==0) {
		T.unshift(x);
	} else {
		T.push(T[T.length-1]);
		for (var q = T.length - 2; q > p; q--) {
			T[q]=T[q-1];
		}
		T[p]=x;
	}
}
//Modification de la legende
function addEdit(){
	edit=document.createElement('img');
	edit.src='../icons/edit-solid.svg';
	edit.id='edit';
	legend.parentNode.insertBefore(edit,legend);
	edit.addEventListener('click',function(){
		edit.remove();
		legendInput.value=legend.innerHTML;
		legendModif.style.display='block';
		legendInput.select();
	});
}

addEdit();

legend.addEventListener('click',function(){
	edit.remove();
	legendInput.value=legend.innerHTML;
	legendModif.style.display='block';
	legendInput.select();
});

document.getElementById('save').addEventListener('click',function(e){
	e.preventDefault();
	addEdit();
	legend.innerHTML=legendInput.value;
	legendModif.style.display='none';
});

document.getElementById('cancel').addEventListener('click',function(e){
	e.preventDefault();
	legendModif.style.display='none';
	addEdit();
});

//manipulation des champs

function NouveauModif() {
	var nouveau ;
	nouveau = document.createElement('div');
	nouveau.classList.add('modif');
	nouveau.innerHTML='\n					<div class="champs">\n						<p>Question 1 : </p>\n						<label><input type="radio" name="default">	Option 1</label>\n					</div>\n					<div class="plus-show">\n						<img src="../icons/plus-solid.svg" class="plus"> <br><br>\n					</div>\n					<div class="cross-show">\n						<img src="../icons/times-circle-solid.svg" class="cross">\n					</div>'
	return nouveau;
};

function selectable() {
	//rend les champs selectable
	champs=document.querySelectorAll('.champs');
	l = champs.length;
	for (var i = 0; i < l ; i++) {
		//pour chaque champ on ajoute une fonction a l'evenement click
		champs[i].addEventListener('click',function(){
			this.classList.add('selected');
			this.nextElementSibling.style.display='block';
			this.nextElementSibling.nextElementSibling.style.display='block';			
			for (j = 0; j < l; j++) {
				if (this!==champs[j] ){
					champs[j].classList.remove('selected');
					champs[j].nextElementSibling.style.display='none';
					champs[j].nextElementSibling.nextElementSibling.style.display='none';
					if (selected[j]) genForm.hide();					
					selected[j]=false;
				} else {
					selected[j]=true;
					selectChamp.selectedIndex=type[j];
					viderGenForm();
					modificationForm(type[j]);
				}
			}
			genForm.show(400);
		});
	}
};

function displaySelected() {
		champs=document.querySelectorAll('.champs');
		genForm.hide();
		for (j = 0; j < champs.length; j++) {
			if (selected[j] ){
			champs[j].classList.add('selected');
			champs[j].nextElementSibling.style.display='block';		
			champs[j].nextElementSibling.nextElementSibling.style.display='block';	
			modificationForm(type[j]);
			genForm.show(400);
			selectChamp.selectedIndex=type[j];	
			} else {
				champs[j].classList.remove('selected');
				champs[j].nextElementSibling.style.display='none';
				champs[j].nextElementSibling.nextElementSibling.style.display='none';
			}
		}
};

function addChamp(newChamp) {
	plus=document.querySelectorAll('.plus');
	modif=document.querySelectorAll('.modif');
	l=plus.length;
	for (var i = 0; i < l; i++) {
		if (newChamp[i]){
			newChamp[i]=false;
			plus[i].addEventListener('click',function(){
				nouveauModif=NouveauModif();
				insertAfter(nouveauModif,this.parentNode.parentNode);
				plus=document.querySelectorAll('.plus');
				m=plus.length;
				newChamp.push(false);
				selected.push(false);
				insertion(type,2,i);
				radio();
				j=0;
				while(this!=plus[j]) j++;
				selected[j]=false;
				j++;
				newChamp[j]=true;
				selected[j]=true;
				selectable();
				addChamp(newChamp);
				addDelete();
				displaySelected();
			});
		}
	}
}

function addDelete(){
	cross=document.querySelectorAll('.cross');
	l=cross.length;
	for (var i = 0; i < l; i++) {
		cross[i].addEventListener('click',function(){
			var crossNow=document.querySelectorAll('.cross');
			if(crossNow.length!=1){
				this.parentNode.parentNode.remove();
				selected.shift();
				newChamp.shift();
				for (j = 0; j < selected.length; j++) {
					selected[j]=false;
				}
				genForm.hide(400);
				displaySelected();
				selectable();
		} 
		});
	}
}
document.getElementById('warning').addEventListener('click',function(){
	for ( i = 0; i < selected.length; i++) {
		selected[i]=false;
	}
	displaySelected();
	genForm.hide(400);
});

displaySelected();
selectable();
addDelete();
addChamp(newChamp);


//modifiation formulaire


function viderGenForm(){
	formGen=genFormM.firstElementChild;
	formEvent=formGen.lastElementChild;
	lastFormChild=formEvent.lastElementChild;
	toRemove=formEvent.firstElementChild;
	while(toRemove){
		nextRemove=toRemove.nextElementSibling;
		toRemove.remove();
		toRemove=nextRemove;
	}
};
textLabel=document.createElement('div');
textLabel.classList.add('row');
textLabel.classList.add('form-group');
textLabel.innerHTML='				  <label class="col-4 col-form-label" for="textinput">label text :</label>\n				  <div class="col-8">\n				  <input id="textinput" name="textinput" type="text" class="form-control">\n				  </div>'
function modifForm(){
	selectChamp.addEventListener('change',function(){
		viderGenForm();
		a=this.selectedIndex;
		modificationForm(a);
	});
};
modifForm();
document.getElementById('info').addEventListener('click',function(){
			c=selectChamp.selectedIndex;
			b=0;
			while(!selected[b]) b++;
			type[b]=c;
			switch(c) {
				case 0:
					name=document.getElementById('textinput').value;
					if(document.getElementById('placeHolder'))placeH=document.getElementById('placeHolder').value;
					else placeH=null;
					champs[b].classList.add('form-group');
					champs[b].classList.add('row');
					champs[b].innerHTML='  <label class="col-2 col-form-label" for="'+name+'">'+name+' '+((name)?':':'')+'</label>  \n  <div class="col-8">\n  <input id="'+name+'" name="'+name+'" type="text" '+((placeH)?'placeholder="'+placeH+'"':'')+' class="form-control input-md">\n  <span class="help-block">'+document.getElementById('help').value+'</span>  \n  </div>'	
					p=selectType.selectedIndex;
					if (p!=0) {
						inputType=champs[b].firstElementChild.nextElementSibling.firstElementChild;
						if (p==1)
							inputType.type='password';
						else if (p==2)
							inputType.type='date';
						else if (p==3)
							inputType.type='heure';
						else if (p==4)
							inputType.type='range';
					}
				break;
				case 1 : 
					name=document.getElementById('textinput').value;
					def=document.getElementById('defaultText').value;
					champs[b].classList.add('form-group');
					champs[b].classList.remove('form-horizontal');
					champs[b].innerHTML='	<label class="col-form-label" for="'+name+'">'+name+' '+((name)?':':'')+'</label>\n 	<textarea id="'+name+'" class="form-control">'+def+'</textarea>';
				break;
				case 2:
					question=document.createElement('p');
					question.innerHTML=document.getElementById('question').value;
					champs[b].innerHTML='';
					champs[b].appendChild(question);
					optionInput=document.querySelectorAll('.option');
					name=document.getElementById('name').value;
					for (var i = 0; i < optionInput.length; i++) {
						label=document.createElement('label');
						label.innerHTML='<input type="radio" name='+name+'>  '+optionInput[i].lastElementChild.firstElementChild.value;
						champs[b].appendChild(label);
					}
				break;
				case 3 :
					question=document.createElement('p');
					question.innerHTML=document.getElementById('question').value;
					champs[b].innerHTML='';
					champs[b].appendChild(question);
					optionInput=document.querySelectorAll('.option');
					for (var i = 0; i < optionInput.length; i++) {
						label=document.createElement('label');
						label.innerHTML='<input type="checkbox" name='+optionInput[i].lastElementChild.firstElementChild.value+'>  '+optionInput[i].firstElementChild.nextElementSibling.firstElementChild.value;
						champs[b].appendChild(label);
					}
				break;
				case 4 :
					question=document.createElement('p');
					question.innerHTML=document.getElementById('question').value;
					sel=document.createElement('select');
					sel.classList.add('form-control');
					champs[b].innerHTML='';
					champs[b].appendChild(question);
					champs[b].appendChild(sel);
					optionInput=document.querySelectorAll('.option');
					for (var i = 0; i < optionInput.length; i++) {
						option=document.createElement('option');
						option.innerHTML='<option>'+optionInput[i].lastElementChild.firstElementChild.value+'</option>';
						sel.appendChild(option);
					}
				break;
			}

});

function radio(){
	conf.innerHTML='<div class="form-group row"><label for="question" class="col-form-label col-4">Question :</label><div class="col-8"><input type="text" name="question" id="question" class="form-control"></div></div><div class="form-group row"><label for="name" class="col-form-label col-4">Name :</label><div class="col-8"><input type="text" name="name" id="name" class="form-control"></div></div><br><img src="../icons/angle-left-solid.svg" id="left"><img src="../icons/angle-left-clair.svg" id="leftClair"><img src="../icons/minus-solid.svg" id="minus"><img src="../icons/minus-clair.svg" id="minusClair"><img src="../icons/angle-right-solid.svg" id="right"><img src="../icons/plus-solid-black.svg" id="plusBlack"><br/><div class="form-group option row"><label for="option1" class="col-form-label col-4">Option 01 :</label><div class=" col-8"><input type="text" name="option1" id="option1" class="form-control"></div></div>'
	right=document.getElementById('right');
	plusBlack=document.getElementById('plusBlack');
	left=document.getElementById('left');
	leftClair=document.getElementById('leftClair');
	minus=document.getElementById('minus');
	minusClair=document.getElementById('minusClair');
	right.style.display='none';
	minus.style.display='none';
	left.style.display='none';
	navigationOption(true);
}
radio();
function navigationOption(x){
	if(x){
	plusBlack.addEventListener('click',function(){
		optionInput=document.querySelectorAll('.option');
		l=optionInput.length;
		newOption=document.createElement('div');
		newOption.classList.add('form-group');
		newOption.classList.add('row');
		newOption.classList.add('option');
		newOption.innerHTML='<label for="Option'+(l+1)+'" class="col-form-label col-4">Option 0'+(l+1)+' :</label><div class=" col-8"><input type="text" name="Option'+(l+1)+'" id="Option'+(l+1)+'" class="form-control"></div>';
		insertAfter(newOption,optionInput[l-1]);
		optionInput[l-1].style.display='none';
		if (l==1) {
			minusClair.style.display='none';
			minus.style.display='inline';
			leftClair.style.display='none';
			left.style.display='inline';
		}
		newOption.lastElementChild.firstElementChild.select();
		selectable();
	});
	}
	minus.addEventListener('click',function(){
		optionInput=document.querySelectorAll('.option');
		l=optionInput.length;
		optionInput[l-1].remove();
		optionInput[l-2].style.display='';
		optionInput[l-2].lastElementChild.firstElementChild.select();
		if(l==2){
			minusClair.style.display='inline';
			minus.style.display='none';	
			leftClair.style.display='inline';
			left.style.display='none';	
		}
		selectable();
	});
	right.addEventListener('click',function(){
		optionInput=document.querySelectorAll('.option');
		l=0;
		while(optionInput[l].style.display=='none') l++;
		optionInput[l].style.display='none';
		optionInput[l+1].style.display='';
		optionInput[l+1].lastElementChild.firstElementChild.select();
		left.style.display='inline';
		leftClair.style.display='none';
		if (l==optionInput.length-2) {
			right.style.display='none';
			plusBlack.style.display='inline';
			minusClair.style.display='none';
			minus.style.display='inline';
		}
	});
	left.addEventListener('click',function(){
		optionInput=document.querySelectorAll('.option');
		l=0;
		while(optionInput[l].style.display=='none') l++;
		optionInput[l].style.display='none';
		optionInput[l-1].style.display='';
		optionInput[l-1].lastElementChild.firstElementChild.select();
		if (l==1) {
			left.style.display='none';
			leftClair.style.display='inline';
		}
		if (l==optionInput.length-1) {
			right.style.display='inline';
			plusBlack.style.display='none';
		}
		minusClair.style.display='inline';
		minus.style.display='none';	
	});
}
function checkboxName(optionCheck) {
	input=optionCheck.firstElementChild.nextElementSibling.firstElementChild
	input.addEventListener('change',function(){
		optionCheck.lastElementChild.firstElementChild.value=input.value;
	});
}
function viderType(){
	toRemove=types.nextElementSibling;
	while(toRemove){
		nextRemove=toRemove.nextElementSibling;
		toRemove.remove();
		toRemove=nextRemove;
	}
};
function inputType(){
	viderType();
	textLabel=document.createElement('div');
	textLabel.classList.add('row');
	textLabel.classList.add('form-group');
	textLabel.innerHTML='				  <label class="col-4 col-form-label" for="textinput">label text :</label>\n				  <div class="col-8">\n				  <input id="textinput" name="textinput" type="text" class="form-control">\n				  </div>'
	place=document.createElement('div');
	place.classList.add('row');
	place.classList.add('form-group');
	place.innerHTML='				  <label class="col-4 col-form-label" for="placeHolder">place holder :</label>\n				  <div class="col-8">\n				  <input id="placeHolder" name="placeHolder" type="text" class="form-control">\n				  </div>'
	help=document.createElement('div');
	help.classList.add('row');
	help.classList.add('form-group');
	help.innerHTML='				  <label class="col-4 col-form-label" for="help">Help :</label>\n				  <div class="col-8">\n				  <input id="help" name="help" type="text" class="form-control">\n				  </div>'
	conf.appendChild(textLabel);
	p=selectType.selectedIndex;
	if (p===0 || p===1) conf.appendChild(place);
	conf.appendChild(help);
}
function modificationForm(a) {
		switch (a) {
			case  0 ://input
				types=document.createElement('div');
				types.classList.add('row');
				types.classList.add('form-group');
				typeLabel=document.createElement('label');
				typeLabel.innerHTML='Type :';
				typeLabel.for='type';
				typeLabel.classList.add('col-form-label');
				typeLabel.classList.add('col-4');
				types.appendChild(typeLabel);
				selectType=document.createElement('select');
				selectType.id='Type';
				selectType.classList.add('col-7');
				selectType.classList.add('form-control');
				typeS=['text','password','date','heure','range'];
				for (var p = 0; p < typeS.length; p++) {
					optionType=document.createElement('option');
					optionType.innerHTML=typeS[p];
					selectType.appendChild(optionType);
				}
				types.appendChild(selectType);
				conf.appendChild(types);
				inputType();
				types.addEventListener('change',function(){
					inputType();
				});
			break;
			case  1 ://text area
				defaultText=document.createElement('div');
				defaultText.classList.add('row');
				defaultText.classList.add('form-group');
				defaultText.innerHTML='				  <label class="col-4 col-form-label" for="defaultText">default text :</label>\n				  <div class="col-8">\n				  <input id="defaultText" name="defaultText" type="text" class="form-control">\n				  </div>'
				textLabel=document.createElement('div');
				textLabel.classList.add('row');
				textLabel.classList.add('form-group');
				textLabel.innerHTML='				  <label class="col-4 col-form-label" for="textinput">label text :</label>\n				  <div class="col-8">\n				  <input id="textinput" name="textinput" type="text" class="form-control">\n				  </div>'
				conf.appendChild(textLabel);
				conf.appendChild(defaultText);
			break;
			case  2 ://radio
				radio();
			break;
			case  3 ://checkbox
				conf.innerHTML='<div class="form-group row"><label for="question" class="col-form-label col-4">Question :</label><div class="col-8"><input type="text" name="question" id="question" class="form-control"></div></div><br><img src="../icons/angle-left-solid.svg" id="left"><img src="../icons/angle-left-clair.svg" id="leftClair"><img src="../icons/minus-solid.svg" id="minus"><img src="../icons/minus-clair.svg" id="minusClair"><img src="../icons/angle-right-solid.svg" id="right"><img src="../icons/plus-solid-black.svg" id="plusBlack"><div class="form-group option row"><label for="option1" class="col-form-label col-4">Option 01 :</label><div class=" col-8"><input type="text" name="option1" id="option1" class="form-control"></div><label for="name1" class="col-form-label col-4">Name 01 :</label><div class=" col-8"><input type="text" name="name1" id="name1" class="form-control" placeholder="par defaut: le nom de l\'option"></div></div>';
				checkboxName(document.querySelector('.option'));
				right=document.getElementById('right');
				plusBlack=document.getElementById('plusBlack');
				left=document.getElementById('left');
				leftClair=document.getElementById('leftClair');
				minus=document.getElementById('minus');
				minusClair=document.getElementById('minusClair');
				right.style.display='none';
				minus.style.display='none';
				left.style.display='none';
				navigationOption(false);
				plusBlack.addEventListener('click',function(){
					optionInput=document.querySelectorAll('.option');
					l=optionInput.length;
					newOption=document.createElement('div');
					newOption.classList.add('form-group');
					newOption.classList.add('row');
					newOption.classList.add('option');
					newOption.innerHTML='<label for="Option'+(l+1)+'" class="col-form-label col-4">Option 0'+(l+1)+' :</label><div class=" col-8"><input type="text" name="Option'+(l+1)+'" id="Option'+(l+1)+'" class="form-control"></div><label for="Name'+(l+1)+'" class="col-form-label col-4">Name 0'+(l+1)+' :</label><div class=" col-8"><input type="text" name="Name'+(l+1)+'" id="Name'+(l+1)+'" class="form-control" placeholder="par defaut: le nom de l\'option"></div>';
					insertAfter(newOption,optionInput[l-1]);
					checkboxName(newOption);
					optionInput[l-1].style.display='none';
					if (l==1) {
						minusClair.style.display='none';
						minus.style.display='inline';
						leftClair.style.display='none';
						left.style.display='inline';
					}
					newOption.firstElementChild.nextElementSibling.firstElementChild.select();
					selectable();					
				});
			break;
			case  4 ://select
				conf.innerHTML='<div class="form-group row"><label for="question" class="col-form-label col-4">Question :</label><div class="col-8"><input type="text" name="question" id="question" class="form-control"></div></div><br><img src="../icons/angle-left-solid.svg" id="left"><img src="../icons/angle-left-clair.svg" id="leftClair"><img src="../icons/minus-solid.svg" id="minus"><img src="../icons/minus-clair.svg" id="minusClair"><img src="../icons/angle-right-solid.svg" id="right"><img src="../icons/plus-solid-black.svg" id="plusBlack"><div class="form-group option row"><label for="option1" class="col-form-label col-4">Option 01 :</label><div class=" col-8"><input type="text" name="option1" id="option1" class="form-control"></div></div>';
				right=document.getElementById('right');
				plusBlack=document.getElementById('plusBlack');
				left=document.getElementById('left');
				leftClair=document.getElementById('leftClair');
				minus=document.getElementById('minus');
				minusClair=document.getElementById('minusClair');
				right.style.display='none';
				minus.style.display='none';
				left.style.display='none';
				navigationOption(true);
			break;
			case  6 ://button

			break;
		}

}
function selectInformation(a) {
	switch(a) {
		case 0 :

		break;
		case 0 :

		break;
		case 0 :

		break;
		case 0 :

		break;
		case 0 :

		break;
	}
}