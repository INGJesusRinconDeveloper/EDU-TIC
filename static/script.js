// script.js - Controlador del Dashboard EDU-TIC

document.addEventListener("DOMContentLoaded", function () {
    const chartsLoaded = {
        dashboard: false,
        mapa: false,
        ageRange: false,
        genderPie: false,
        dispersion: false,
        desercionLine: false,
        summaryBar: false,
        summaryPie: false,
        infraestructura: false,
        etnias: false,
        conectividad: false,
        inversionDocente: false
    };

    // --- FUNCIONES DEL DASHBOARD (SECCIÓN INICIO) ---
    function actualizarKPIs() {

        let totalEstudiantes = 0;
        let totalHombres = 0;
        let totalMujeres = 0;
        let totalAprobados = 0;
        const elementoNumero = document.getElementById("kpi-elementoNumero");
        const cantidadHombres = document.getElementById("kpi-cantidadHombres");
        const cantidadMujeres = document.getElementById("kpi-cantidadMujeres");
        const cantidadAprobados = document.getElementById("kpi-Aprobados");
        const incrementoEstudiantes = 1000; // Cantidad a incrementar en cada paso
        const incrementoHombres = 1000; // Cantidad a incrementar en cada paso
        const incrementoMujeres = 1000; // Cantidad a incrementar en cada paso
        const incrementoAprobados = 2; // Tasa de aprobación promedio
        const tiempoEntreIncrementosEstudiantes = 10; // Milisegundos entre cada incremento
        const tiempoEntreIncrementosHombres = 20; // Milisegundos entre cada incremento
        const tiempoEntreIncrementosMujeres = 20; // Milisegundos entre cada incremento
        const tiempoEntreIncrementoAprobados = 100; // Milisegundos entre cada incremento de tasa de aprobación
        let intervaloTotalEstudiantes = null;
        let intervaloTotalHombres = null;
        let intervaloTotalMujeres = null;
        let intervaloTotalAprobados = null;

  function iniciarContadorTotalEstudiantes() {
    if (intervaloTotalEstudiantes) return; // Evita múltiples intervalos
    intervaloTotalEstudiantes = setInterval(function() {
      totalEstudiantes += incrementoEstudiantes;
      elementoNumero.textContent = totalEstudiantes;
      if (totalEstudiantes >= 410000) {
        clearInterval(intervaloTotalEstudiantes);
      }
    }, tiempoEntreIncrementosEstudiantes);
  }
  function iniciarContadorTotalHombres() {
    if (intervaloTotalHombres) return; // Evita múltiples intervalos
    intervaloTotalHombres = setInterval(function() {
      totalHombres += incrementoHombres;
      cantidadHombres.textContent = totalHombres + ' Hombres';
      if (totalHombres >= 215000) {
        clearInterval(intervaloTotalHombres);
      }
    }, tiempoEntreIncrementosHombres);
  }
  function iniciarContadorTotalMujeres() {
    if (intervaloTotalMujeres) return; // Evita múltiples intervalos
    intervaloTotalMujeres = setInterval(function() {
      totalMujeres += incrementoMujeres;
      cantidadMujeres.textContent = totalMujeres + ' Mujeres';
      if (totalMujeres >= 195000) {
        clearInterval(intervaloTotalMujeres);
      }
    }, tiempoEntreIncrementosMujeres);
  }
  function iniciarContadorTotalAprobados() {
    if (intervaloTotalAprobados) return; // Evita múltiples intervalos
    intervaloTotalAprobados = setInterval(function() {
      totalAprobados += incrementoAprobados;
      cantidadAprobados.textContent = totalAprobados + ' %';
      if (totalAprobados >= 82) {
        clearInterval(intervaloTotalAprobados);
      }
    }, tiempoEntreIncrementoAprobados);
  }
  
  // Usar IntersectionObserver para detectar cuando el elemento es visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        iniciarContadorTotalEstudiantes();
        iniciarContadorTotalHombres();
        iniciarContadorTotalMujeres();
        iniciarContadorTotalAprobados();
        obs.disconnect(); // Solo iniciar una vez
      }
    });
  });
  observer.observe(elementoNumero);
    }

    function drawDashboardChart() {
        if (chartsLoaded.dashboard) return;
        // Esta función está desactivada porque se usa Power BI en el HTML.
    }

    // --- FUNCIONES DE GRÁFICOS (SECCIÓN ANÁLISIS TERRITORIAL) ---
    function cargarGraficosDeAnalisis() {
        if (!chartsLoaded.mapa) drawMapa();
        if (!chartsLoaded.ageRange) drawAgeRange();
        if (!chartsLoaded.genderPie) drawGenderPie();
        if (!chartsLoaded.dispersion) drawDispersion();
        if (!chartsLoaded.desercionLine) drawDesercionLine();
        if (!chartsLoaded.summaryBar) drawSummaryBarChart();
        if (!chartsLoaded.summaryPie) drawSummaryPieChart();
        if (!chartsLoaded.infraestructura) drawInfraestructura();
        if (!chartsLoaded.etnias) drawEtniasPie();
        if (!chartsLoaded.conectividad) drawConectividadChart();
        if (!chartsLoaded.inversionDocente) drawInversionDocenteChart();
    }
    
    function drawMapa() {
        if (chartsLoaded.mapa) return;
        const datosMunicipios = [ { Municipio: 'Abrego', NumeroEstudiantes: 8150, Lat: 8.0805, Lon: -73.2201 }, { Municipio: 'Arboledas', NumeroEstudiantes: 3200, Lat: 7.6419, Lon: -72.8016 }, { Municipio: 'Bochalema', NumeroEstudiantes: 2900, Lat: 7.6167, Lon: -72.6500 }, { Municipio: 'Bucarasica', NumeroEstudiantes: 2100, Lat: 7.9667, Lon: -72.9333 }, { Municipio: 'Cachira', NumeroEstudiantes: 4500, Lat: 7.7411, Lon: -73.0533 }, { Municipio: 'Chinacota', NumeroEstudiantes: 6800, Lat: 7.6167, Lon: -72.6000 }, { Municipio: 'Chitaga', NumeroEstudiantes: 4300, Lat: 6.8167, Lon: -72.6667 }, { Municipio: 'Convencion', NumeroEstudiantes: 7200, Lat: 8.4500, Lon: -73.3500 }, { Municipio: 'Cucuta', NumeroEstudiantes: 155200, Lat: 7.8939, Lon: -72.5078 }, { Municipio: 'Cucutilla', NumeroEstudiantes: 3100, Lat: 7.5333, Lon: -72.7667 }, { Municipio: 'Durania', NumeroEstudiantes: 2500, Lat: 7.6833, Lon: -72.7167 }, { Municipio: 'El Carmen', NumeroEstudiantes: 6900, Lat: 8.5333, Lon: -73.4500 }, { Municipio: 'El Tarra', NumeroEstudiantes: 5800, Lat: 8.5833, Lon: -73.1000 }, { Municipio: 'El Zulia', NumeroEstudiantes: 9500, Lat: 7.9333, Lon: -72.6000 }, { Municipio: 'Gramalote', NumeroEstudiantes: 2800, Lat: 7.8833, Lon: -72.8000 }, { Municipio: 'Hacari', NumeroEstudiantes: 4100, Lat: 8.3667, Lon: -73.1333 }, { Municipio: 'Herran', NumeroEstudiantes: 2300, Lat: 7.4667, Lon: -72.5167 }, { Municipio: 'La Esperanza', NumeroEstudiantes: 5100, Lat: 8.2000, Lon: -73.3667 }, { Municipio: 'La Playa', NumeroEstudiantes: 3300, Lat: 8.3000, Lon: -73.2333 }, { Municipio: 'Labateca', NumeroEstudiantes: 2700, Lat: 7.3167, Lon: -72.5000 }, { Municipio: 'Los Patios', NumeroEstudiantes: 28500, Lat: 7.8394, Lon: -72.5058 }, { Municipio: 'Lourdes', NumeroEstudiantes: 1900, Lat: 7.7833, Lon: -72.8167 }, { Municipio: 'Mutiscua', NumeroEstudiantes: 2200, Lat: 7.2667, Lon: -72.7333 }, { Municipio: 'Ocana', NumeroEstudiantes: 42300, Lat: 8.2378, Lon: -73.3538 }, { Municipio: 'Pamplona', NumeroEstudiantes: 25600, Lat: 7.3750, Lon: -72.6470 }, { Municipio: 'Pamplonita', NumeroEstudiantes: 2600, Lat: 7.4333, Lon: -72.6167 }, { Municipio: 'Puerto Santander', NumeroEstudiantes: 4800, Lat: 8.3667, Lon: -72.4000 }, { Municipio: 'Ragonvalia', NumeroEstudiantes: 3100, Lat: 7.2500, Lon: -72.4667 }, { Municipio: 'Salazar', NumeroEstudiantes: 4700, Lat: 7.8000, Lon: -72.8167 }, { Municipio: 'San Calixto', NumeroEstudiantes: 5300, Lat: 8.4000, Lon: -73.2167 }, { Municipio: 'San Cayetano', NumeroEstudiantes: 3900, Lat: 7.9667, Lon: -72.6500 }, { Municipio: 'Santiago', NumeroEstudiantes: 1800, Lat: 7.8833, Lon: -72.7167 }, { Municipio: 'Sardinata', NumeroEstudiantes: 9100, Lat: 8.2719, Lon: -72.7986 }, { Municipio: 'Silos', NumeroEstudiantes: 3400, Lat: 7.1833, Lon: -72.7667 }, { Municipio: 'Teorama', NumeroEstudiantes: 6700, Lat: 8.4667, Lon: -73.2833 }, { Municipio: 'Tibu', NumeroEstudiantes: 15200, Lat: 8.6411, Lon: -72.7344 }, { Municipio: 'Toledo', NumeroEstudiantes: 7800, Lat: 7.0167, Lon: -72.4667 }, { Municipio: 'Villa Caro', NumeroEstudiantes: 2400, Lat: 7.7833, Lon: -72.9333 }, { Municipio: 'Villa del Rosario', NumeroEstudiantes: 35100, Lat: 7.8339, Lon: -72.4742 } ];
        const data = [{ type: 'scattermapbox', lat: datosMunicipios.map(item => item.Lat), lon: datosMunicipios.map(item => item.Lon), text: datosMunicipios.map(item => `${item.Municipio}<br>Estudiantes: ${item.NumeroEstudiantes}`), hoverinfo: 'text', marker: { color: datosMunicipios.map(item => item.NumeroEstudiantes), colorscale: 'Viridis', size: datosMunicipios.map(item => Math.sqrt(item.NumeroEstudiantes) / 5 + 5), showscale: true, colorbar: { title: 'N° Estudiantes' } } }];
        const layout = { title: 'Estudiantes por Municipio', mapbox: { style: 'open-street-map', center: { lat: 7.89, lon: -72.9 }, zoom: 7.2 }, margin: { t: 40, b: 0, l: 0, r: 0 } };
        Plotly.newPlot("mapa-plotly", data, layout, {responsive: true});
        chartsLoaded.mapa = true;
    }
    function drawAgeRange() {
        if (chartsLoaded.ageRange) return;
        const data = [{ x: ['6-11', '12-15', '16-18', '18+'], y: [150000, 120000, 95000, 45000], type: 'bar', marker: { color: 'teal' } }];
        const layout = { title: 'Distribución por Rango de Edad' };
        Plotly.newPlot("age-range-chart", data, layout, {responsive: true});
        chartsLoaded.ageRange = true;
    }
    function drawGenderPie() {
        if (chartsLoaded.genderPie) return;
        const data = [{ labels: ['Mujeres', 'Hombres'], values: [195000, 215000], type: 'pie' }];
        const layout = { title: 'Distribución por Género' };
        Plotly.newPlot("gender-pie-chart", data, layout, {responsive: true});
        chartsLoaded.genderPie = true;
    }
    function drawDispersion() {
        if (chartsLoaded.dispersion) return;
        const data = [{ x: [10, 20, 30, 40], y: [65, 75, 85, 95], mode: 'markers', type: 'scatter', marker: { size: 12, color: 'purple' } }];
        const layout = { title: 'Inversión vs. Aprobación', xaxis: { title: 'Inversión por Estudiante (USD miles)' }, yaxis: { title: 'Tasa de Aprobación (%)' } };
        Plotly.newPlot("dispersion-chart", data, layout, {responsive: true});
        chartsLoaded.dispersion = true;
    }
    function drawDesercionLine() {
        if (chartsLoaded.desercionLine) return;
        const data = [{ x: [2020, 2021, 2022, 2023, 2024], y: [9.8, 9.5, 8.5, 8.1, 7.9], type: 'scatter', mode: 'lines+markers', line: { color: 'red' } }];
        const layout = { title: 'Evolución Tasa de Deserción Escolar' };
        Plotly.newPlot("desercion-line-chart", data, layout, {responsive: true});
        chartsLoaded.desercionLine = true;
    }
    function drawSummaryBarChart() {
        if (chartsLoaded.summaryBar) return;
        Plotly.newPlot('summary-chart-bar', [{ x: ['2022', '2023', '2024', '2025 (Proy.)'], y: [8.5, 8.1, 7.9, 6.5], type: 'bar', marker: { color: '#3B82F6' } }], { title: 'Tasa de Deserción Escolar (Departamental)' });
        chartsLoaded.summaryBar = true;
    }
    function drawSummaryPieChart() {
        if (chartsLoaded.summaryPie) return;
        Plotly.newPlot('summary-chart-pie', [{ labels: ['Área Técnica', 'Ciencias Sociales', 'Ingeniería', 'Salud', 'Artes'], values: [4500, 3200, 2800, 2100, 1500], type: 'pie', hole: 0.4 }], { title: 'Áreas de Interés Vocacional' });
        chartsLoaded.summaryPie = true;
    }
    function drawInfraestructura() {
        if (chartsLoaded.infraestructura) return;
        const data = [{ x: ['Buena', 'Regular', 'Mala'], y: [1200, 2500, 800], type: 'bar', marker: { color: '#10B981' } }];
        const layout = { title: 'Estado de la Infraestructura Escolar' };
        Plotly.newPlot("infraestructura-chart", data, layout, {responsive: true});
        chartsLoaded.infraestructura = true;
    }
    function drawEtniasPie() {
        if (chartsLoaded.etnias) return;
        const data = [{ labels: ['Mestizos', 'Afrodescendientes', 'Indígenas (Barí, U\'wa)', 'Otros'], values: [350000, 25000, 15000, 20000], type: 'pie' }];
        const layout = { title: 'Distribución por Grupo Étnico' };
        Plotly.newPlot("etnias-pie-chart", data, layout, {responsive: true});
        chartsLoaded.etnias = true;
    }
    function drawConectividadChart() {
        if (chartsLoaded.conectividad) return;
        const data = [{ x: ['Urbana', 'Rural'], y: [85, 35], type: 'bar', marker: { color: '#8B5CF6' } }];
        const layout = { title: 'Conectividad a Internet en Escuelas (%)', yaxis: { range: [0, 100] } };
        Plotly.newPlot("conectividad-chart", data, layout, {responsive: true});
        chartsLoaded.conectividad = true;
    }
    function drawInversionDocenteChart() {
        if (chartsLoaded.inversionDocente) return;
        const data = [{
            x: [500, 800, 1200, 700, 1500],
            y: [20, 35, 50, 30, 60],
            mode: 'markers',
            marker: {
                size: [75, 82, 90, 80, 95],
                color: [75, 82, 90, 80, 95],
                colorscale: 'Plasma',
                showscale: true,
                colorbar: { title: 'Aprobación (%)' }
            },
            text: ['Tibú', 'Ocaña', 'Pamplona', 'Sardinata', 'Cúcuta']
        }];
        const layout = { title: 'Inversión, Docentes y Tasa de Aprobación', xaxis: { title: 'Inversión (USD miles)' }, yaxis: { title: 'Número de Docentes' } };
        Plotly.newPlot("inversion-docente-chart", data, layout, {responsive: true});
        chartsLoaded.inversionDocente = true;
    }

    // --- LÓGICA DE NAVEGACIÓN ---
    function showSection(sectionId) {
        const secciones = document.querySelectorAll(".content-section");
        secciones.forEach(sec => sec.style.display = 'none');
        const target = document.getElementById(sectionId);
        if (target) target.style.display = 'block';

        const secondaryNav = document.getElementById('secondary-nav');
        if (sectionId === "inicio") {
            secondaryNav.classList.add('hidden');
            actualizarKPIs();
            // Ya no se llama a drawDashboardChart() porque se usa Power BI
        } else {
            secondaryNav.classList.remove('hidden');
        }
        
        if (sectionId === "graficas") {
            cargarGraficosDeAnalisis();
        }
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            window.location.hash = sectionId;
        });
    });
    
    window.addEventListener('hashchange', () => showSection(window.location.hash.substring(1)));
    showSection(window.location.hash.substring(1) || "inicio");

    // --- LÓGICA DE MODALES (RESTAURADA) ---
    const loginButton = document.getElementById('login-button');
    const closeLoginModalButton = document.getElementById('close-login-modal-button');
    const loginModal = document.getElementById('login-modal');
    if (loginButton && loginModal && closeLoginModalButton) {
        const openLoginModal = () => loginModal.classList.remove('hidden');
        const closeLoginModal = () => loginModal.classList.add('hidden');
        loginButton.addEventListener('click', openLoginModal);
        closeLoginModalButton.addEventListener('click', closeLoginModal);
        loginModal.addEventListener('click', function(event) {
            if (event.target === loginModal) closeLoginModal();
        });
    }

    const contactButton = document.getElementById('contact-button');
    const closeContactModalButton = document.getElementById('close-contact-modal-button');
    const contactModal = document.getElementById('contact-modal');
    if (contactButton && contactModal && closeContactModalButton) {
        const openContactModal = () => contactModal.classList.remove('hidden');
        const closeContactModal = () => contactModal.classList.add('hidden');
        contactButton.addEventListener('click', openContactModal);
        closeContactModalButton.addEventListener('click', closeContactModal);
        contactModal.addEventListener('click', function(event) {
            if (event.target === contactModal) closeContactModal();
        });
    }

    // --- LÓGICA PARA EL CHAT CON IA (RESTAURADA) ---
    const aiChatButton = document.getElementById('ai-chat-button');
    const closeAiChatModalButton = document.getElementById('close-ai-chat-modal-button');
    const aiChatModal = document.getElementById('ai-chat-modal');
    if(aiChatButton && aiChatModal && closeAiChatModalButton) {
        const toggleAiChatModal = () => aiChatModal.classList.toggle('hidden');
        aiChatButton.addEventListener('click', toggleAiChatModal);
        closeAiChatModalButton.addEventListener('click', toggleAiChatModal);
    }

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
        chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
        chatInput.value = '';
        chatInput.disabled = true;
        chatSendButton.disabled = true;

        const thinkingDivId = `thinking-${Date.now()}`;
        addMessageToChat('ai', `<div id="${thinkingDivId}" class="thinking"><span>.</span><span>.</span><span>.</span></div>`);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: chatHistory })
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
            console.error("Error calling backend chat API:", error);
            document.getElementById(thinkingDivId).parentElement.parentElement.remove();
            addMessageToChat('ai', 'Lo siento, tuve un problema para conectarme con el servidor. Por favor, intenta de nuevo.');
        } finally {
            chatInput.disabled = false;
            chatSendButton.disabled = false;
            chatInput.focus();
        }
    }
    
    if(chatSendButton && chatInput){
        chatSendButton.addEventListener('click', handleChatSend);
        chatInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') handleChatSend();
        });
    }
});