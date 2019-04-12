var champs,plus,modif,nouveauModif;
var i,k,j,l,m;
var selected=[true],newChamp=[true];

function insertAfter(newElement, afterElement) {
    var parent = afterElement.parentNode;
	
    if (parent.lastChild === afterElement) { // Si le dernier élément est le même que l'élément après lequel on veut insérer, il suffit de faire appendChild()
        parent.appendChild(newElement);
    } else { // Dans le cas contraire, on fait un insertBefore() sur l'élément suivant
        parent.insertBefore(newElement, afterElement.nextSibling);
    }
}
function NouveauModif() {
	var nouveau ;
	nouveau = document.createElement('div');
	nouveau.classList.add('modif');
	nouveau.innerHTML='					<div class="champs">\n						<p>Question 1 : </p>\n						<input type="radio" name="default" id="default">	<label for="default">Option 1</label>\n					</div>\n					<div class="plus-show">\n						<img src="../icons/plus-solid.svg" class="plus"> <br><br>\n					</div>'
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
			for (j = 0; j < l; j++) {
				if (this!==champs[j] ){
					champs[j].classList.remove('selected');
					champs[j].nextElementSibling.style.display='none';
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
			} else {
				champs[j].classList.remove('selected');
				champs[j].nextElementSibling.style.display='none';
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
				insertAfter(nouveauModif,this.parentNode);
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
				displaySelected();
			});
		}
	}
}
displaySelected();
addChamp(newChamp);
