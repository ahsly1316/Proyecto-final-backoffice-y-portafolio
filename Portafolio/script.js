const ITSON_ID = "252262"; 
const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

async function loadProjects() {
    const container = document.getElementById("projects-container");
    container.innerHTML = "<p>Cargando proyectos...</p>";

    try {
        const response = await fetch(`${API_BASE}/publicProjects/${ITSON_ID}`);

        console.log("Status de la respuesta:", response.status); // para depuración

        if (!response.ok) {
            throw new Error(`Error al cargar los proyectos: ${response.status}`);
        }

        const projects = await response.json();
        console.log("Proyectos recibidos:", projects);

        if (projects.length === 0) {
            container.innerHTML = "<p>No hay proyectos para mostrar.</p>";
            return;
        }

        displayProjects(projects);
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
        container.innerHTML = `<p>Error al cargar los proyectos: ${error.message}</p>`;
    }
}

function displayProjects(projects) {
    const container = document.getElementById("projects-container");
    container.innerHTML = ""; 

    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const imgSrc = project.images && project.images.length > 0 
                        ? project.images[0] 
                        : "https://via.placeholder.com/400x200?text=Sin+Imagen";

        projectCard.innerHTML = `
            <img src="${imgSrc}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Tecnologías:</strong> ${project.technologies.join(", ")}</p>
            <a href="${project.repository}" target="_blank">Ver repositorio</a>
        `;

        container.appendChild(projectCard);
    });
}

window.addEventListener("DOMContentLoaded", loadProjects);





