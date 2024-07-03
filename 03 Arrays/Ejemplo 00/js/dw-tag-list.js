
class DwTagList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' }); // Crear Shadow DOM

		// Creamos el array
		this.tags = ['Albacete', 'Almeria', 'Badajoz', 'Cuenca', 'Granada'];

		// Crear contenedor para los tags y botones
		this.container = document.createElement('div');

		// Crear botones
		this.addButton = document.createElement('button');
		this.addButton.textContent = 'Añadir Asturias';
		this.removeButton = document.createElement('button');
		this.removeButton.textContent = 'Eliminar Asturias';

		// Asignar eventos a los botones
		this.addButton.addEventListener('click', () => this.aniadir());
		this.removeButton.addEventListener('click', () => this.eliminar('Asturias'));

		// Añadir botones al contenedor
		this.container.appendChild(this.addButton);
		this.container.appendChild(this.removeButton);

		// Crear contenedor para los tags
		this.tagContainer = document.createElement('div');
		this.container.appendChild(this.tagContainer);

		// Añadir estilos al Shadow DOM
		const style = document.createElement('style');
		style.textContent = `
			:host {
				display: block;
			}
			ul {
				list-style-type: none;
				padding: 0;
			}
			li {
				background: #f3f3f3;
				margin: 5px 0;
				padding: 5px;
				border-radius: 4px;
			}
			button {
				margin: 5px;
			}
		`;
		
		// CON shadowRoot
		this.shadowRoot.appendChild(style);

		// Añadir contenedor al Shadow DOM
		this.shadowRoot.appendChild(this.container);
		
		// SIN shadowRoot
		//this.container.appendChild(style);
		
		// Añadir contenedor al BODY
		//document.body.appendChild(this.container);
		
		// Renderizar los tags iniciales
		this.renderTags();
	}

	aniadir() {
		if (!this.tags.includes('Asturias')) {
			this.tags = [...this.tags, 'Asturias'].sort();
			console.log('Asturias añadida. Tags actuales: ', this.tags);
			this.renderTags();
		}
	}

	eliminar(tag) {
		if (this.tags.includes(tag)) {
			this.tags = this.tags.filter(t => t !== tag);
			console.log(`${tag} eliminado. Tags actuales: `, this.tags);
			this.renderTags();
		} else {
			console.log(`${tag} no se encuentra en los tags.`);
		}
	}

	renderTags() {
		this.tagContainer.innerHTML = this.tags.length === 0
			? '<p>No tenemos tags que mostrar</p>'
			: `
				<ul>
					${this.tags.map(tag => `<li>${tag}</li>`).join('')}
				</ul>
			`;
	}
}

customElements.define('dw-tag-list', DwTagList);