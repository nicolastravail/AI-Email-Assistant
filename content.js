function addAIReplyButton() {
    // Vérifier si le bouton est déjà ajouté
    if (document.querySelector("#ai-reply-button")) return;

    // Sélectionner la barre d'actions des emails
    const toolbar = document.querySelector(".G-atb");

    if (toolbar) {
        // Créer le bouton
        const button = document.createElement("button");
        button.id = "ai-reply-button";
        button.innerText = "Répondre avec IA";
        button.style.padding = "10px";
        button.style.marginLeft = "10px";
        button.style.backgroundColor = "#4285F4";
        button.style.color = "white";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";

        // Ajouter l'événement au clic
        button.addEventListener("click", generateAIReply);

        // Ajouter le bouton à la barre d'outils
        toolbar.appendChild(button);
    }
}

// Fonction qui génère la réponse avec l'IA (placeholder pour le moment)
function generateAIReply() {
    alert("L'IA est en train de générer une réponse...");
    // Ici, on pourra appeler une API pour générer une réponse
}

// Observer les changements dans l'interface pour réinsérer le bouton si besoin
const observer = new MutationObserver(() => {
    addAIReplyButton();
});

observer.observe(document.body, { childList: true, subtree: true });

// Ajouter le bouton au chargement de la page
addAIReplyButton();