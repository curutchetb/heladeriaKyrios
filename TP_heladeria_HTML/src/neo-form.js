import { LitElement, html, css } from 'lit-element';

export class NeoFOrm extends LitElement {

    static get properties() {
        return {
            id: { type: Number },
            nombre: { type: String },
            apellido: { type: String },
            dni: { type: Number },
            telefono: { type: Number }
        };
    }

    static get styles() {
        return css`

        input{
            margin: 5px;
            padding: 5px;
        }

        button{
            font-size: 1.5em;
            padding: 3px;
            color:  rgb(252, 196, 12);
            background-color: #0A243C;
            border: 2px solid rgb(252, 196, 12);
            text-decoration: none;
            text-align: center;
            padding: 5px;
            cursor: pointer;
            margin: 5px;
            margin-left: 50px;
            }
            
            button:hover{
                color: #0A243C;
                background-color:rgb(252, 196, 12);

        `;
    }

    constructor() {
        super();

        this.nombre = "";
        this.apellido = "";
        this.dni = "";
        this.telefono = "";
        this.id = "";
    }

    render() {
        return html`

            <input type="text" value="${this.nombre}" @input="${this.handlerNombre}" placeholder="ingrese nombre" maxlength="45" />
            <br />
            <input type="text" value="${this.apellido}" @input="${this.handlerApellido}" placeholder="ingrese apellido"
                maxlength="45" /> <br />
            <input type="number" value="${this.dni}" @input="${this.handleDni}" placeholder="ingrese DNI"
                onKeyPress="if(this.value.length==9) return false;" /> <br />
            <input type="number" value="${this.telefono}" @input="${this.handleTelefono}" placeholder="ingrese telefono"
                onKeyPress="if(this.value.length==12) return false;" /> <br />
            <button @click="${this.enviar}">Agregar</button>
            
            <br />
            <input type="number" @input="${this.idHandler}" value="${this.id}" placeholder="ingrese id"
                onKeyPress="if(this.value.length==3) return false;" /> <br />
            <button @click="${this.borrar}">Borrar</button>
        
        `;
    }

    idHandler(e) {
        this.id = e.target.value;
    }

    handlerNombre(e) {
        this.nombre = e.target.value;
    }

    handlerApellido(e) {
        this.apellido = e.target.value;
    }

    handleDni(e) {
        this.dni = e.target.value;
    }

    handleTelefono(e) {
        this.telefono = e.target.value;
    }

    enviar() {

        if (this.nombre == "" || this.nombre == " " || this.apellido == "" || this.apellido == " "
            || this.dni == "" || this.telefono == "") {
            alert("Favor completar todos los campos");
        }
        else {
            if (confirm("Desea agregar al nuevo repartidor?")) {
                var obj = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    dni: this.dni,
                    telefono: this.telefono
                }

                fetch('http://localhost:8080/guardarRepartidor', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
                alert("Repartidor agregado");

            }
            else {
                alert("Repartidor no agregado");
            }
        }
    }



    borrar() {

        if (confirm("desea borrar el id " + this.id + "?")) {
            fetch('http://localhost:8080/borrarRepartidor/' + this.id)
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                })
        } else {
            alert("el objeto no fue borrado");
        }
    }

}
customElements.define('neo-form', NeoFOrm);