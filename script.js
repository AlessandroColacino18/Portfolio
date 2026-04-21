let typingTimer;
let bioTypingTimer;

function naviga(pageId, event) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.nav-btn');

    window.scrollTo({top: 0, behavior: 'smooth'});
    
    // Chiudi tutti i visori quando cambi pagina
    document.querySelectorAll('.project-viewer').forEach(v => {
        v.classList.add('hidden-viewer');
    });

    pages.forEach(p => p.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));

    const currentPage = document.getElementById(pageId);
    currentPage.classList.add('active');
    if(event) event.currentTarget.classList.add('active');

    if (pageId === 'chi-sono') {
        const bioImg = document.getElementById('bio-img-anim');
        const bioText = "Accesso autorizzato. Analisi profilo... Benvenuto nel mio portfolio. Io sono Alessandro Colacino e frequento il quarto anno dell'istituto tecnico del Blaise Pascal, ho scelto questa scuola perché mi piacciono molto i videogiochi e sogno un giorno di poterli programmare.";
        const bioElement = document.getElementById('bio-text-anim');
        
        bioImg.classList.remove('run-scan');
        void bioImg.offsetWidth; 
        bioImg.classList.add('run-scan');
        typeEffect(bioElement, bioText, 40, 'bio'); 
    }
}

async function apriProgetto(sezione, titolo, img, desc) {
    const viewer = document.getElementById(sezione + '-viewer');
    const vTitle = document.getElementById(sezione + '-title');
    const vImg = document.getElementById(sezione + '-img');
    const vDesc = document.getElementById(sezione + '-desc');

    // Mostra il visore
    viewer.classList.remove('hidden-viewer');
    
    // Reset animazioni
    vImg.classList.remove('run-scan');
    vTitle.innerHTML = "_";
    vDesc.innerHTML = "";
    
    setTimeout(async () => {
        vImg.src = img;
        void vImg.offsetWidth;
        vImg.classList.add('run-scan');
        
        // Scrolla verso il basso per mostrare il contenuto apparso
        viewer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        await typeEffect(vTitle, "> " + titolo, 40);
        await typeEffect(vDesc, desc, 40);
    }, 100);
}

function typeEffect(element, text, speed = 50, mode = 'project') {
    let i = 0;
    element.innerHTML = "";
    if (mode === 'bio') clearInterval(bioTypingTimer);
    else clearInterval(typingTimer);
    
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                resolve();
            }
        }, speed);
        if (mode === 'bio') bioTypingTimer = timer;
        else typingTimer = timer;
    });
}

window.onload = () => { naviga('home'); };
