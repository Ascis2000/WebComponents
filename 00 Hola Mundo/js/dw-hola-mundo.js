
class DwHolamundo extends HTMLElement {
	constructor() {
		super();
		//this.textContent = 'Hola mundo!!!'
	}
	
	// Con este método, se ejecutará el código
	// cuando los elementos se hayan insertado en el DOM
	connectedCallback() {
        this.textContent = 'Hola mundo!!!';
    }
}
customElements.define('dw-holamundo', DwHolamundo);