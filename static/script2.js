/* ARCHIVO DE JAVASCRIPT (script.js) - VERSIÓN FINAL CORREGIDA
  -------------------------------------------------------------
  Controla toda la interactividad de la página, incluyendo:
  - Navegación entre secciones y menú persistente.
  - Carga de todos los gráficos interactivos.
  - Modales de inicio de sesión, contacto y chat con IA.
  - Llamada a la API de Gemini para el chat.
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Objeto para rastrear qué gráficos ya se han cargado
    const chartsLoaded = {
        summaryBar: false,
        summaryPie: false,
        mapa: false,
        ageRange: false,
        genderPie: false,
        dispersion: false,
        desercionLine: false
    };

    // --- FUNCIONES PARA DIBUJAR GRÁFICOS ---
    function drawSummaryBarChart() {
        if (chartsLoaded.summaryBar) return;
        const data = [{ x: ['2022', '2023', '2024', '2025 (Proy.)'], y: [8.5, 8.1, 7.9, 6.5], type: 'bar', marker: { color: '#3B82F6' } }];
        const layout = { title: 'Tasa de Deserción Escolar (Departamental)', xaxis: { title: 'Año' }, yaxis: { title: 'Porcentaje (%)' } };
        Plotly.newPlot('summary-chart-bar', data, layout, {responsive: true});
        chartsLoaded.summaryBar = true;
    }
    function drawSummaryPieChart() {
        if (chartsLoaded.summaryPie) return;
        const data = [{ labels: ['Área Técnica', 'Ciencias Sociales', 'Ingeniería', 'Salud', 'Artes'], values: [4500, 3200, 2800, 2100, 1500], type: 'pie', hole: .4 }];
        const layout = { title: 'Principales Áreas de Interés Vocacional' };
        Plotly.newPlot('summary-chart-pie', data, layout, {responsive: true});
        chartsLoaded.summaryPie = true;
    }
    function cargarMapaPrincipal() {
        if (chartsLoaded.mapa) return;
        const mapContainer = document.getElementById('mapa-plotly');
        mapContainer.innerHTML = '';
        const datosMunicipios = [
             { Municipio: 'Abrego', NumeroEstudiantes: 8150, Lat: 8.0805, Lon: -73.2201 }, { Municipio: 'Arboledas', NumeroEstudiantes: 3200, Lat: 7.6419, Lon: -72.8016 }, { Municipio: 'Bochalema', NumeroEstudiantes: 2900, Lat: 7.6167, Lon: -72.6500 }, { Municipio: 'Bucarasica', NumeroEstudiantes: 2100, Lat: 7.9667, Lon: -72.9333 }, { Municipio: 'Cachira', NumeroEstudiantes: 4500, Lat: 7.7411, Lon: -73.0533 }, { Municipio: 'Chinacota', NumeroEstudiantes: 6800, Lat: 7.6167, Lon: -72.6000 }, { Municipio: 'Chitaga', NumeroEstudiantes: 4300, Lat: 6.8167, Lon: -72.6667 }, { Municipio: 'Convencion', NumeroEstudiantes: 7200, Lat: 8.4500, Lon: -73.3500 }, { Municipio: 'Cucuta', NumeroEstudiantes: 155200, Lat: 7.8939, Lon: -72.5078 }, { Municipio: 'Cucutilla', NumeroEstudiantes: 3100, Lat: 7.5333, Lon: -72.7667 }, { Municipio: 'Durania', NumeroEstudiantes: 2500, Lat: 7.6833, Lon: -72.7167 }, { Municipio: 'El Carmen', NumeroEstudiantes: 6900, Lat: 8.5333, Lon: -73.4500 }, { Municipio: 'El Tarra', NumeroEstudiantes: 5800, Lat: 8.5833, Lon: -73.1000 }, { Municipio: 'El Zulia', NumeroEstudiantes: 9500, Lat: 7.9333, Lon: -72.6000 }, { Municipio: 'Gramalote', NumeroEstudiantes: 2800, Lat: 7.8833, Lon: -72.8000 }, { Municipio: 'Hacari', NumeroEstudiantes: 4100, Lat: 8.3667, Lon: -73.1333 }, { Municipio: 'Herran', NumeroEstudiantes: 2300, Lat: 7.4667, Lon: -72.5167 }, { Municipio: 'La Esperanza', NumeroEstudiantes: 5100, Lat: 8.2000, Lon: -73.3667 }, { Municipio: 'La Playa', NumeroEstudiantes: 3300, Lat: 8.3000, Lon: -73.2333 }, { Municipio: 'Labateca', NumeroEstudiantes: 2700, Lat: 7.3167, Lon: -72.5000 }, { Municipio: 'Los Patios', NumeroEstudiantes: 28500, Lat: 7.8394, Lon: -72.5058 }, { Municipio: 'Lourdes', NumeroEstudiantes: 1900, Lat: 7.7833, Lon: -72.8167 }, { Municipio: 'Mutiscua', NumeroEstudiantes: 2200, Lat: 7.2667, Lon: -72.7333 }, { Municipio: 'Ocana', NumeroEstudiantes: 42300, Lat: 8.2378, Lon: -73.3538 }, { Municipio: 'Pamplona', NumeroEstudiantes: 25600, Lat: 7.3750, Lon: -72.6470 }, { Municipio: 'Pamplonita', NumeroEstudiantes: 2600, Lat: 7.4333, Lon: -72.6167 }, { Municipio: 'Puerto Santander', NumeroEstudiantes: 4800, Lat: 8.3667, Lon: -72.4000 }, { Municipio: 'Ragonvalia', NumeroEstudiantes: 3100, Lat: 7.2500, Lon: -72.4667 }, { Municipio: 'Salazar', NumeroEstudiantes: 4700, Lat: 7.8000, Lon: -72.8167 }, { Municipio: 'San Calixto', NumeroEstudiantes: 5300, Lat: 8.4000, Lon: -73.2167 }, { Municipio: 'San Cayetano', NumeroEstudiantes: 3900, Lat: 7.9667, Lon: -72.6500 }, { Municipio: 'Santiago', NumeroEstudiantes: 1800, Lat: 7.8833, Lon: -72.7167 }, { Municipio: 'Sardinata', NumeroEstudiantes: 9100, Lat: 8.2719, Lon: -72.7986 }, { Municipio: 'Silos', NumeroEstudiantes: 3400, Lat: 7.1833, Lon: -72.7667 }, { Municipio: 'Teorama', NumeroEstudiantes: 6700, Lat: 8.4667, Lon: -73.2833 }, { Municipio: 'Tibu', NumeroEstudiantes: 15200, Lat: 8.6411, Lon: -72.7344 }, { Municipio: 'Toledo', NumeroEstudiantes: 7800, Lat: 7.0167, Lon: -72.4667 }, { Municipio: 'Villa Caro', NumeroEstudiantes: 2400, Lat: 7.7833, Lon: -72.9333 }, { Municipio: 'Villa del Rosario', NumeroEstudiantes: 35100, Lat: 7.8339, Lon: -72.4742 }
        ];
        const dataForPlotly = [{ type: 'scattermapbox', lat: datosMunicipios.map(item => item.Lat), lon: datosMunicipios.map(item => item.Lon), text: datosMunicipios.map(item => `${item.Municipio}<br>Estudiantes: ${item.NumeroEstudiantes}`), hoverinfo: 'text', marker: { color: datosMunicipios.map(item => item.NumeroEstudiantes), colorscale: 'Viridis', cmin: 0, cmax: 160000, size: datosMunicipios.map(item => Math.sqrt(item.NumeroEstudiantes) / 5 + 5), showscale: true, colorbar: { title: 'N° Estudiantes' } } }];
        const layout = { title: 'Número de Estudiantes por Municipio', mapbox: { style: 'open-street-map', center: { lat: 7.89, lon: -72.9 }, zoom: 7.2 }, margin: { r: 0, t: 40, b: 0, l: 0 } };
        Plotly.newPlot('mapa-plotly', dataForPlotly, layout, {responsive: true});
        chartsLoaded.mapa = true;
    }
    function drawAgeRangeChart() {
        if (chartsLoaded.ageRange) return;
        const data = [{ x: ['6-11', '12-15', '16-18', '18+'], y: [150000, 120000, 95000, 45000], type: 'bar', marker: {color: 'teal'} }];
        const layout = { title: 'Distribución de Estudiantes por Rango de Edad', yaxis: { title: 'Cantidad de Estudiantes' } };
        Plotly.newPlot('age-range-chart', data, layout, {responsive: true});
        chartsLoaded.ageRange = true;
    }
    function drawGenderPieChart() {
        if (chartsLoaded.genderPie) return;
        const data = [{ labels: ['Mujeres', 'Hombres'], values: [195000, 215000], type: 'pie' }];
        const layout = { title: 'Distribución por Género' };
        Plotly.newPlot('gender-pie-chart', data, layout, {responsive: true});
        chartsLoaded.genderPie = true;
    }
    function drawDispersionChart() {
        if (chartsLoaded.dispersion) return;
        const data = [{ x: [10, 25, 15, 30, 20, 40, 50, 35], y: [65, 75, 70, 85, 78, 90, 95, 88], mode: 'markers', type: 'scatter', text: ['Abrego', 'Cúcuta', 'Ocaña', 'Pamplona', 'Tibú', 'Villa del Rosario', 'Los Patios', 'Sardinata'], marker: { size: 12, color: 'purple' } }];
        const layout = { title: 'Inversión vs. Tasa de Aprobación', xaxis: {title: 'Inversión por Estudiante (USD miles)'}, yaxis: {title: 'Tasa de Aprobación (%)'} };
        Plotly.newPlot('dispersion-chart', data, layout, {responsive: true});
        chartsLoaded.dispersion = true;
    }
    function drawDesercionLineChart() {
        if (chartsLoaded.desercionLine) return;
        const data = [{ x: [2020, 2021, 2022, 2023, 2024], y: [9.8, 9.5, 8.5, 8.1, 7.9], type: 'scatter', mode: 'lines+markers', line: {color: 'red'} }];
        const layout = { title: 'Evolución de la Tasa de Deserción Escolar', xaxis: {title: 'Año'}, yaxis: {title: 'Tasa de Deserción (%)'} };
        Plotly.newPlot('desercion-line-chart', data, layout, {responsive: true});
        chartsLoaded.desercionLine = true;
    }

    // --- LÓGICA DE NAVEGACIÓN Y VISUALIZACIÓN ---
    const contentSections = document.querySelectorAll('.content-section');
    const secondaryNav = document.getElementById('secondary-nav');

    const showSection = (sectionId) => {
        let idToShow = sectionId || 'inicio';
        let sectionExists = Array.from(contentSections).some(s => s.id === idToShow);
        if (!sectionExists) idToShow = 'inicio';
        
        contentSections.forEach(section => {
            section.style.display = (section.id === idToShow) ? 'block' : 'none';
        });

        if (idToShow === 'inicio') {
            secondaryNav.classList.add('hidden');
            drawSummaryBarChart();
            drawSummaryPieChart();
        } else {
            secondaryNav.classList.remove('hidden');
        }

        if (idToShow === 'graficas') {
            cargarMapaPrincipal();
            drawAgeRangeChart();
            drawGenderPieChart();
            drawDispersionChart();
            drawDesercionLineChart();
        }
        window.scrollTo(0, 0);
    };
    
    // --- MANEJO DE EVENTOS DE NAVEGACIÓN ---
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            window.location.hash = targetId;
        });
    });

    window.addEventListener('hashchange', () => showSection(window.location.hash.substring(1)));
    showSection(window.location.hash.substring(1));

    // --- LÓGICA DE MODALES ---
    const loginButton = document.getElementById('login-button');
    const closeLoginModalButton = document.getElementById('close-login-modal-button');
    const loginModal = document.getElementById('login-modal');
    const openLoginModal = () => loginModal.classList.remove('hidden');
    const closeLoginModal = () => loginModal.classList.add('hidden');
    loginButton.addEventListener('click', openLoginModal);
    closeLoginModalButton.addEventListener('click', closeLoginModal);
    loginModal.addEventListener('click', function(event) {
        if (event.target === loginModal) closeLoginModal();
    });

    const contactButton = document.getElementById('contact-button');
    const closeContactModalButton = document.getElementById('close-contact-modal-button');
    const contactModal = document.getElementById('contact-modal');
    const openContactModal = () => contactModal.classList.remove('hidden');
    const closeContactModal = () => contactModal.classList.add('hidden');
    contactButton.addEventListener('click', openContactModal);
    closeContactModalButton.addEventListener('click', closeContactModal);
    contactModal.addEventListener('click', function(event) {
        if (event.target === contactModal) closeContactModal();
    });

    // --- LÓGICA PARA EL CHAT CON IA ---
    const aiChatButton = document.getElementById('ai-chat-button');
    const closeAiChatModalButton = document.getElementById('close-ai-chat-modal-button');
    const aiChatModal = document.getElementById('ai-chat-modal');
    const toggleAiChatModal = () => aiChatModal.classList.toggle('hidden');
    aiChatButton.addEventListener('click', toggleAiChatModal);
    closeAiChatModalButton.addEventListener('click', toggleAiChatModal);

    const chatSendButton = document.getElementById('chat-send-button');
    const chatInput = document.getElementById('chat-input');
    const chatMessagesDiv = document.getElementById('chat-messages');
    let chatHistory = [];

    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('mb-2', 'flex');
        
        const messageP = document.createElement('p');
        messageP.classList.add('rounded-lg', 'p-3', 'max-w-xs');

        if (sender === 'user') {
            messageDiv.classList.add('justify-end');
            messageP.classList.add('bg-blue-500', 'text-white');
            messageP.textContent = message;
        } else {
            messageDiv.classList.add('justify-start');
            messageP.classList.add('bg-gray-200', 'text-gray-800');
            messageP.innerHTML = message;
        }
        
        messageDiv.appendChild(messageP);
        chatMessagesDiv.appendChild(messageDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }

    async function handleChatSend() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addMessageToChat('user', userMessage);
        chatInput.value = '';
        chatInput.disabled = true;
        chatSendButton.disabled = true;

        const thinkingDivId = `thinking-${Date.now()}`;
        addMessageToChat('ai', `<div id="${thinkingDivId}" class="thinking"><span>.</span><span>.</span><span>.</span></div>`);

        try {
            chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

            const prompt = `Eres un asistente virtual amigable y servicial para el proyecto EDU-IA Norte, una iniciativa para mejorar la educación en Norte de Santander, Colombia. Tu propósito es responder preguntas sobre el proyecto, la educación en la región, y dar consejos a estudiantes y educadores. Sé conciso y útil. El usuario ha preguntado: "${userMessage}"`;

            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            
            const result = await response.json();
            document.getElementById(thinkingDivId).parentElement.parentElement.remove();

            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                let aiResponse = result.candidates[0].content.parts[0].text;
                chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
                aiResponse = aiResponse.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                addMessageToChat('ai', aiResponse);
            } else {
                throw new Error("Unexpected API response format.");
            }

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            document.getElementById(thinkingDivId).parentElement.parentElement.remove();
            addMessageToChat('ai', 'Lo siento, tuve un problema para conectarme. Por favor, intenta de nuevo.');
        } finally {
            chatInput.disabled = false;
            chatSendButton.disabled = false;
            chatInput.focus();
        }
    }

    chatSendButton.addEventListener('click', handleChatSend);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') handleChatSend();
    });
});
