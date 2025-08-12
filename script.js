//Récupérer éléments HTML
const tacheInput = document.getElementById('tacheInput');
const ajouterTacheBtn = document.getElementById('ajouterTacheBtn');
const tachesList = document.getElementById('tachesList');

function ajouterTache() {
    const tacheText = tacheInput.value.trim();

    if (tacheText === "") {
        alert("Veuillez entrer une tâche !");
        return;
    }

    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-white p-2 rounded shadow";

    // Conteneur texte
    const span = document.createElement('span');
    span.textContent = tacheText;
    span.className = "flex-grow cursor-pointer";

    // Bouton modifier
    const editBtn = document.createElement('button');
    editBtn.textContent = "✏️";
    editBtn.className = "ml-2 text-blue-500 hover:text-blue-700";

    // Bouton supprimer
    const supprimerBtn = document.createElement('button');
    supprimerBtn.textContent = "❌";
    supprimerBtn.className = "ml-2 text-red-500 hover:text-red-700";

    // Ajouter éléments à li
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(supprimerBtn);

    // Ajouter li à la liste
    tachesList.appendChild(li);

    // Vider le champ texte
    tacheInput.value = "";

    // Marquer comme fait au clic sur le texte
    span.addEventListener('click', () => {
        li.classList.toggle('line-through');
        li.classList.toggle('bg-green-100');
        li.classList.toggle('text-gray-500');
    });

    // Supprimer tâche
    supprimerBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
    };

    // Modifier tâche
    editBtn.onclick = (e) => {
        e.stopPropagation();

        // Créer input pour modifier
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = span.textContent;
        inputEdit.className = "flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500";

        // Remplacer span par input
        li.replaceChild(inputEdit, span);
        inputEdit.focus();

        // Fonction pour valider la modification
        function validerModification() {
            const nouvelleTache = inputEdit.value.trim();
            if (nouvelleTache === "") {
                alert("La tâche ne peut pas être vide !");
                inputEdit.focus();
                return;
            }
            span.textContent = nouvelleTache;
            li.replaceChild(span, inputEdit);
        }

        // Validation au "Enter"
        inputEdit.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                validerModification();
            }
        });

        // Validation au blur (perte de focus)
        inputEdit.addEventListener('blur', validerModification);
    };
}


//Quand on clique sur le bouton
ajouterTacheBtn.addEventListener('click', ajouterTache);

//Quand on appuie sur entrée
tacheInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        ajouterTache();
    }
});

const telechargerBtn = document.getElementById('telechargerBtn');

telechargerBtn.addEventListener('click', () => {
    // Récupérer toutes les tâches (le texte uniquement)
    const taches = [];
    tachesList.querySelectorAll('li span').forEach(span => {
        taches.push(span.textContent);
    });

    if (taches.length === 0) {
        alert("Ta liste est vide !");
        return;
    }

    // Construire le contenu texte
    const contenu = Array.from(tachesList.querySelectorAll('li')).map((li, i) => {
        const texte = li.querySelector('span').textContent;
        const estFaite = li.classList.contains('line-through');
        const prefix = estFaite ? '[X]' : '[ ]';
        return `${i + 1}. ${prefix} ${texte}`;
    }).join('\n');

    // Créer un blob de type texte
    const blob = new Blob([contenu], { type: 'text/plain' });

    // Créer une URL pour le blob
    const url = URL.createObjectURL(blob);

    // Créer un lien temporaire pour télécharger
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo-list.txt';

    // Simuler le clic pour lancer le téléchargement
    a.click();

    // Nettoyer l'URL
    URL.revokeObjectURL(url);
});

