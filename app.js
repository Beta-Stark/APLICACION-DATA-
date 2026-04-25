import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const firebaseConfig = { /* TU CONFIGURACION DE FIREBASE */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Navegación
window.navTo = (id) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
};

// Guardar Tarea
window.saveTask = async () => {
    const title = document.getElementById('task-title').value;
    const cat = document.getElementById('task-cat').value;
    await addDoc(collection(db, "tasks"), { title, cat, status: "pendiente", date: new Date() });
    alert("Tarea Guardada");
};

// Integración Gemini
window.askGemini = async () => {
    const task = document.getElementById('task-title').value;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=TU_API_KEY_GEMINI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `Dame un consejo de productividad para esta tarea: ${task}` }] }] })
    });
    const data = await response.json();
    document.getElementById('ai-response').innerText = data.candidates[0].content.parts[0].text;
};

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => console.log('SW Registrado'));
}
