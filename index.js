     document.addEventListener('DOMContentLoaded', function() {

        // --- Lógica para el desplazamiento suave con las flechas ---
        document.querySelectorAll('a.scroll-down').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Prevenir el salto brusco del ancla

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // --- Lógica para los pines del mapa ---
        document.getElementById('pin-canada').addEventListener('mouseenter', () => mostrarDeuda('canada'));
        document.getElementById('pin-brasil').addEventListener('mouseenter', () => mostrarDeuda('brasil'));
        document.getElementById('pin-espana').addEventListener('mouseenter', () => mostrarDeuda('espana'));
        document.getElementById('pin-qatar').addEventListener('mouseenter', () => mostrarDeuda('qatar'));
        document.querySelectorAll('.pin').forEach(p => p.addEventListener('mouseleave', limpiarInfo));

        // El resto de la lógica de la página se ejecuta después de que todo ha cargado

        // Lógica del Mapa de la Deuda
        function mostrarDeuda(pais) {
            const info = document.getElementById('info-pais');
            let texto = "";
            let colorFondo = "";
            let colorTexto = "white";

            switch(pais) {
                case 'brasil':
                    texto = "🇧🇷 Brasil: SUPERÁVIT ECOLÓGICO (Verde). Gracias a su inmensa biodiversidad amazónica.";
                    colorFondo = "rgba(76, 209, 55, 0.4)";
                    break;
                case 'canada':
                    texto = "🇨🇦 Canadá: SUPERÁVIT ECOLÓGICO (Verde). Gran extensión de bosques y baja densidad.";
                    colorFondo = "rgba(76, 209, 55, 0.4)";
                    break;
                case 'espana':
                    texto = "🇪🇸 España: DÉFICIT ECOLÓGICO (Rojo). Importación masiva de recursos y consumo.";
                    colorFondo = "rgba(232, 65, 24, 0.4)";
                    break;
                case 'qatar':
                    texto = "🇶🇦 Qatar: DÉFICIT EXTREMO (Rojo Oscuro). Altísimo consumo energético per cápita.";
                    colorFondo = "rgba(194, 54, 22, 0.6)";
                    break;
            }

            info.style.backgroundColor = colorFondo;
            info.style.color = colorTexto;
            info.innerText = texto;
        }

        function limpiarInfo() {
            const info = document.getElementById('info-pais');
            info.style.backgroundColor = "rgba(0,0,0,0.3)";
            info.style.color = "white";
            info.innerText = "Pasa el ratón por los puntos del mapa...";
        }

        // Lógica del Espejo Eco (Cuestionario secuencial)
        const preguntas = document.querySelectorAll('.cuestionario .pregunta');
        const calculoContainer = document.getElementById('calculo-container');
        const navContainer = document.querySelector('.navegacion-cuestionario');
        const btnAnterior = document.getElementById('btn-anterior');
        const btnSiguiente = document.getElementById('btn-siguiente');
        const btnCalcular = document.getElementById('btn-calcular');
        const resultadoDiv = document.getElementById('resultado-planetas');
        let currentQuestionIndex = 0;

        function showQuestion(index) {
            preguntas.forEach((pregunta, i) => {
                pregunta.classList.toggle('active', i === index);
            });
            btnAnterior.disabled = index === 0;
            btnSiguiente.textContent = index === preguntas.length - 1 ? 'Finalizar' : 'Siguiente';
        }

        btnSiguiente.addEventListener('click', () => {
            const currentQuestion = preguntas[currentQuestionIndex];
            const isAnswered = currentQuestion.querySelector('input[type="radio"]:checked');

            if (!isAnswered) {
                alert('Por favor, selecciona una respuesta para continuar.');
                return;
            }

            if (currentQuestionIndex < preguntas.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                // Última pregunta, mostrar botón de calcular
                navContainer.style.display = 'none';
                calculoContainer.style.display = 'block';
                setTimeout(() => { calculoContainer.style.opacity = '1'; }, 50);
            }
        });

        btnAnterior.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
            }
        });

        // Iniciar cuestionario
        showQuestion(currentQuestionIndex);

        function calcularHuella() {
            // Empezamos con una base de 0.5 planetas (necesidades básicas).
            let planetas = 0.5;
            
            // Recorremos todas las preguntas y sumamos el valor de la respuesta seleccionada
            for (let i = 1; i <= preguntas.length; i++) {
                const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
                if (respuesta) { // Comprobación de seguridad
                    planetas += parseFloat(respuesta.value);
                }
            }

            resultadoDiv.innerHTML = `Necesitaríamos <span style="font-size: 3rem; color: var(--danger);">${planetas.toFixed(1)}</span> Tierras si todos vivieran como tú.`;
        }
        btnCalcular.addEventListener('click', calcularHuella);

        // Lógica de Retos
        function mostrarRetos() {
            const lista = document.getElementById('lista-retos');
            lista.style.display = 'block';
            lista.scrollIntoView({ behavior: 'smooth' });
        }
        
        document.getElementById('btn-ver-reto').addEventListener('click', mostrarRetos);

        // Animación de entrada para la gráfica
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.grafico-balanza').forEach(el => observer.observe(el));
    });
