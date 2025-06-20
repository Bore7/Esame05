// Aspetto che l'intera pagina sia caricata
window.addEventListener("DOMContentLoaded", () => {
  // Ottengo il riferimento al form HTML
  const form = document.getElementById("registrationForm") as HTMLFormElement;

  // ✅ INTERFACCIA che rappresenta un utente registrato
  interface Utente {
    nome: string;
    cognome: string;
    email: string;
    codiceFiscale: string;
    sesso: string;
    residenza: {
      citta: string;
      indirizzo: string;
    };
    password: string;
  }

  // Funzione per validare il Codice Fiscale
  function isValidCodiceFiscale(cf: string): boolean {
    const regex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
    return regex.test(cf);
  }

  // Funzione per validare la password
  function isValidPassword(password: string): boolean {
    // Almeno 8 caratteri, una maiuscola, una minuscola, un numero e un simbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  }

  // Mostra un messaggio di errore per un campo input
  function setError(input: HTMLInputElement | HTMLSelectElement, message: string) {
    input.classList.add("is-invalid");
    let feedback = input.nextElementSibling as HTMLElement;

    // Se non esiste il blocco di errore, lo creo
    if (!feedback || !feedback.classList.contains("invalid-feedback")) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      input.parentNode?.appendChild(feedback);
    }

    feedback.textContent = message;
  }

  // Rimuove l'errore da un campo
  function clearError(input: HTMLInputElement | HTMLSelectElement) {
    input.classList.remove("is-invalid");
    const feedback = input.nextElementSibling as HTMLElement;
    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.textContent = "";
    }
  }

  // Listener per la sottomissione del form
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita l'invio se ci sono errori

    let isValid = true; // Flag per verificare se tutti i campi sono validi

    // Lista degli input da validare (obbligatori)
    const requiredFields = [
      "nome",
      "cognome",
      "email",
      "codiceFiscale",
      "citta",
      "indirizzo",
      "password",
      "confermaPassword",
    ];

    // Controllo che ogni campo obbligatorio sia riempito
    for (const fieldId of requiredFields) {
      const input = document.getElementById(fieldId) as HTMLInputElement;
      if (!input.value.trim()) {
        setError(input, "Questo campo è obbligatorio");
        isValid = false;
      } else {
        clearError(input);
      }
    }

    // Validazione specifica email
    const emailInput = document.getElementById("email") as HTMLInputElement;
    if (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      setError(emailInput, "Email non valida");
      isValid = false;
    }

    // Validazione Codice Fiscale
    const cfInput = document.getElementById("codiceFiscale") as HTMLInputElement;
    if (cfInput.value && !isValidCodiceFiscale(cfInput.value)) {
      setError(cfInput, "Codice Fiscale non valido");
      isValid = false;
    }

    // Validazione Password
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (passwordInput.value && !isValidPassword(passwordInput.value)) {
      setError(passwordInput, "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un simbolo");
      isValid = false;
    }

    // Verifica che la password e la conferma coincidano
    const confirmPasswordInput = document.getElementById("confermaPassword") as HTMLInputElement;
    if (passwordInput.value !== confirmPasswordInput.value) {
      setError(confirmPasswordInput, "Le password non coincidono");
      isValid = false;
    }

    // Validazione radio button "sesso"
    const sessoInputs = document.querySelectorAll('input[name="sesso"]') as NodeListOf<HTMLInputElement>;
    const sessoValid = Array.from(sessoInputs).some((input) => input.checked);

    if (!sessoValid) {
      const sessoContainer = sessoInputs[0].closest("fieldset") as HTMLElement;
      let feedback = sessoContainer.querySelector(".invalid-feedback") as HTMLElement;

      if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback d-block mt-2";
        sessoContainer.appendChild(feedback);
      }

      feedback.textContent = "Seleziona un'opzione";
      isValid = false;
    } else {
      // Rimuove eventuale errore se il sesso è selezionato
      const feedback = document.querySelector('fieldset .invalid-feedback') as HTMLElement;
      if (feedback) feedback.remove();
    }

    // ✅ Tutti i campi sono validi → costruisco l'oggetto utente
    if (isValid) {
      const utente: Utente = {
        nome: (document.getElementById("nome") as HTMLInputElement).value.trim(),
        cognome: (document.getElementById("cognome") as HTMLInputElement).value.trim(),
        email: (document.getElementById("email") as HTMLInputElement).value.trim(),
        codiceFiscale: (document.getElementById("codiceFiscale") as HTMLInputElement).value.trim(),
        sesso: (document.querySelector('input[name="sesso"]:checked') as HTMLInputElement).value,
        residenza: {
          citta: (document.getElementById("citta") as HTMLInputElement).value.trim(),
          indirizzo: (document.getElementById("indirizzo") as HTMLInputElement).value.trim(),
        },
        password: passwordInput.value
      };

      // ✅ Simulo l'invio al server (es. via fetch, qui solo console)
      console.log("Dati utente da inviare al server:", utente);

      alert("Registrazione avvenuta con successo!");
      form.reset(); // Reset del form
    }
  });
});