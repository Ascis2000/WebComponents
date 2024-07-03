
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
		this.addButton.textContent = 'Añadir Ciudad';
		this.removeButton = document.createElement('button');
		this.removeButton.textContent = 'Eliminar Ciudad';

		// Asignar eventos a los botones
		this.addButton.addEventListener('click', () => this.aniadir());
		this.removeButton.addEventListener('click', () => this.eliminar());

		// Añadir botones al contenedor
		this.container.appendChild(this.addButton);
		this.container.appendChild(this.removeButton);
		
		// Selector para añadir/eliminar ciudades
		this.selectCiudades = document.createElement('select');
		this.tags.forEach(ciudad => {
			const option = document.createElement('option');
			option.textContent = ciudad;
			this.selectCiudades.appendChild(option);
		});
		this.container.appendChild(this.selectCiudades);

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
		let nuevaCiudad = this.selectCiudades.value;
		
		if (!this.tags.includes(nuevaCiudad)) {
			this.tags = [...this.tags, nuevaCiudad].sort();
			console.log(nuevaCiudad + 'añadida. Tags actuales: ', this.tags);
			this.renderTags();
		}
	}

	eliminar() {
		let ciudadEliminar = this.selectCiudades.value;
		if (this.tags.includes(ciudadEliminar)) {
			this.tags = this.tags.filter(t => t !== ciudadEliminar);
			console.log(`${ciudadEliminar} eliminado. Tags actuales: `, this.tags);
			this.renderTags();
		} else {
			console.log(`${ciudadEliminar} no se encuentra en los tags.`);
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