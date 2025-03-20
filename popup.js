document.getElementById("generateReply").addEventListener("click", async () => {
    const emailContent = document.getElementById("emailContent").value;
    const responseDiv = document.getElementById("response");

    if (!emailContent.trim()) {
        responseDiv.innerText = "Veuillez coller un email avant de générer une réponse.";
        return;
    }

    responseDiv.innerText = "Génération en cours...";

    // Webhook Make
    const WEBHOOK_URL = "https://hook.us1.make.com/lqxid8x0qb9r5lni4sifqbnh8v95w6gh";

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailContent: emailContent })
        });

        const data = await response.json();

        if (data.response) {
            responseDiv.innerText = "Réponse générée : " + data.response;
        } else {
            responseDiv.innerText = "Erreur : aucune réponse reçue.";
        }
    } catch (error) {
        responseDiv.innerText = "Erreur lors de la génération.";
        console.error(error);
    }
});