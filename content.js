// Fonction pour ajouter le bouton "Répondre avec IA"
function addAIReplyButton() {
    // Vérifie si le bouton existe déjà
    if (document.querySelector("#ai-reply-button")) return;

    // Trouve la barre contenant le bouton "Envoyer"
    const sendButton = document.querySelector("div[role='button'][aria-label*='Envoyer']");

    if (sendButton) {
        // Crée le bouton IA
        const aiButton = document.createElement("button");
        aiButton.id = "ai-reply-button";
        aiButton.innerText = "Répondre avec IA";
        aiButton.style.padding = "8px 10px";
        aiButton.style.marginLeft = "10px";
        aiButton.style.backgroundColor = "#4285F4";
        aiButton.style.color = "white";
        aiButton.style.border = "none";
        aiButton.style.cursor = "pointer";
        aiButton.style.borderRadius = "5px";
        aiButton.style.fontSize = "14px";

        // Ajoute l'événement au clic pour générer une réponse IA
        aiButton.addEventListener("click", generateAIReply);

        // Ajoute le bouton juste à côté du bouton "Envoyer"
        sendButton.parentNode.appendChild(aiButton);
    }
}

async function generateAIReply() {
    // Récupérer le texte de l'email sélectionné
    const emailBody = document.querySelector(".Am.Al.editable").innerText;

    if (!emailBody) {
        alert("Impossible de récupérer le contenu du mail.");
        return;
    }

    // URL du webhook Make
    const WEBHOOK_URL = "https://hook.us1.make.com/lqxid8x0qb9r5lni4sifqbnh8v95w6gh";

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailContent: emailBody })
        });

        const data = await response.json();

        if (data.response) {
            // Insérer la réponse dans la boîte de réponse Gmail
            const replyBox = document.querySelector(".Am.Al.editable");
            if (replyBox) {
                replyBox.innerText = data.response;
            } else {
                alert("Zone de réponse introuvable.");
            }
        } else {
            alert("Erreur : aucune réponse reçue.");
        }
    } catch (error) {
        alert("Erreur lors de l'envoi au webhook Make.");
        console.error(error);
    }
}

// Observer Gmail pour ajouter le bouton dès que l'interface est prête
const observer = new MutationObserver(() => {
    addAIReplyButton();
});
observer.observe(document.body, { childList: true, subtree: true });

// Ajouter immédiatement le bouton si Gmail est déjà chargé
addAIReplyButton();