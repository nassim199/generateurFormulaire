var champs,plus,modif,nouveauModif,genForm=$('#genForm'),legend,legendInput,legendModif,cross;
var i,k,j,l,m;
var selected=[true],newChamp=[true];
legend=document.getElementById('legend');
legendInput=document.getElementById('legendInput');
legendModif=document.getElementById('legendModif');

function insertAfter(newElement, afterElement) {
    var parent = afterElement.parentNode;
	
    if (parent.lastElementChild === afterElement) { // Si le dernier élément est le même que l'élément après lequel on veut insérer, il suffit de faire appendChild()
        parent.appendChild(newElement);
    } else { // Dans le cas contraire, on fait un insertBefore() sur l'élément suivant
        parent.insertBefore(newElement, afterElement.nextElementSibling);
    }
}
function NouveauModif() {
	var nouveau ;
	nouveau = document.createElement('div');
	nouveau.classList.add('modif');
	nouveau.innerHTML='\n					<div class="champs">\n						<p>Question 1 : </p>\n						<label><input type="radio" name="default">	Option 1</label>\n					</div>\n					<div class="plus-show">\n						<img src="../icons/plus-solid.svg" class="plus"> <br><br>\n					</div>\n					<div class="cross-show">\n						<img src="../icons/times-circle-solid.svg" class="cross">\n					</div>'
	return nouveau;
}
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
			genForm.show(400);
			for (j = 0; j < l; j++) {
				if (this!==champs[j] ){
					champs[j].classList.remove('selected');
					champs[j].nextElementSibling.style.display='none';
					champs[j].nextElementSibling.nextElementSibling.style.display='none';
					selected[j]=false;
				} else selected[j]=true;
			}
		});
	}
};
function displaySelected() {
		champs=document.querySelectorAll('.champs');
		for (j = 0; j < champs.length; j++) {
			if (selected[j] ){
			champs[j].classList.add('selected');
			champs[j].nextElementSibling.style.display='block';		
			champs[j].nextElementSibling.nextElementSibling.style.display='block';		
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
	for (var i = 0; i < cross.length; i++) {
		cross[i].addEventListener('click',function(){
			this.parentNode.parentNode.remove();
			selected.shift();
			for (j = 0; j < selected.length; j++) {
				selected[j]=false;
			}
			genForm.hide(400);
			displaySelected();
			selectable();
		});
	}
}
displaySelected();
selectable();
addDelete();
addChamp(newChamp);
document.getElementById('warning').addEventListener('click',function(){
	for ( i = 0; i < selected.length; i++) {
		selected[i]=false;
	}
	displaySelected();
	genForm.hide(400);
});
document.getElementById('danger').addEventListener('click',function(){
	modif=document.querySelectorAll('.modif');
	i=0;
	while(!selected[i]) i++;
	modif[i].remove();
	selected.shift();
	for (i = 0; i < selected.length; i++) {
		selected[i]=false;
	}
	genForm.hide(400);
	displaySelected();
	selectable();
});
document.getElementById('info').addEventListener('click',function(){
	
});
legend.addEventListener('click',function(){
	legendInput.value=legend.innerHTML;
	legendModif.style.display='block';
	legendInput.select();
});
document.getElementById('save').addEventListener('click',function(e){
	e.preventDefault();
	legend.innerHTML=legendInput.value;
	legendModif.style.display='none';
});
document.getElementById('cancel').addEventListener('click',function(e){
	e.preventDefault();
	legendModif.style.display='none';
});