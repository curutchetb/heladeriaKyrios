import { LitElement, html, css } from 'lit-element';

export class NeoRepartidor extends LitElement {

    static get properties() {
        return {
            id: { type: Number },
            nombre: { type: String },
            apellido: { type: String },
            dni: { type: Number },
            telefono: { type: Number },
            repartidores: { type: Array }
        };
    }

    static get styles() {
        return css`
    
    input{
        margin-bottom: 25px;
        padding: 5px;
    }

    label{
        font-size: 18px;
        color: rgb(252, 196, 12);
        width: 40%;
        margin: 2px;
        }

    button{
    font-size: 1.5em;
    padding: 3px;
    color:  rgb(252, 196, 12);
    background-color: #0A243C;
    border: 2px solid rgb(252, 196, 12);
    text-decoration: none;
    text-align: center;
    text-decoration: underline;
    padding: 5px;
    cursor: pointer;
    margin-bottom: 25px;
    }
    
    button:hover{
        color: #0A243C;
        background-color:rgb(252, 196, 12);
    }

    h3{
        text-align:center;
        font-size: 1.5rem;
    }

    table{
        margin: 0 auto;
        text-align: left;
        margin-bottom: 15px;
    }

    td{
        width: 140px;
        margin-right: 25px;
        text-align: center;
        font-size: 1.5em;
    }

    #span{
        font-size: 1.5rem;
    }

    #lista{
        font-size: 1.2rem;
    }
    `;
    }

    constructor() {
        super();
        this.id = "";
    }

    render() {
        return html`

        <h3>Conocé a nuestros repartidores</h3>
        
        <div class="tabla">
            <table>
                <tr>
                    <td><img src="../img/1.jpg" width="80" height="80"></td>
                    <td><img src="../img/2.png" width="120" height="80"></td>
                    <td><img src="../img/3.jpg" width="80" height="80"></td>
                    <td><img src="../img/4.png" width="80" height="80"></td>
                </tr>
                <tr>
                    <td>ID 1</td>
                    <td>ID 2</td>
                    <td>ID 3</td>
                    <td>ID 4</td>
                </tr>
            </table>
        </div>
        
        
        
        <br>
        <br>
        
        <input type="number" @input="${this.idHandler}" value="${this.id}" placeholder="ingrese id"
            onKeyPress="if(this.value.length==3) return false;" />
        <button @click="${this.buscar}">Buscar</button>
        <br />
        
        <div>
            <label class="etiqueta">Nombre: </label>
            <span id="span">${this?.nombre}</span><br />
        </div>
        
        
        <div>
            <label class="etiqueta">Apellido: </label>
            <span id="span">${this?.apellido}</span><br />
        </div>
        
        <div>
            <label class="etiqueta">DNI: </label>
            <span id="span">${this?.dni}</span><br />
        </div>
        
        <div>
            <label class="etiqueta">Telefono: </label>
            <span id="span">${this?.telefono}</span><br />
        </div>
        
        <br />
        <br />
        
        <button @click="${this.mostrar}">Mostrar lista</button>
        
        <br />
        
        <!-- devuelve lista de repartidores -->
        <div style="border: 1px solid">
            ${this.repartidores?.map(item => html`
        
            <label id="lista"><b>ID: </b>${item.id}</label> <br />
            <label id="lista"><b>nombre: </b>${item.nombre}</label><br>
            <label id="lista"><b>apellido: </b>${item.apellido}</label><br />
            <label id="lista"><b>Dni: </b>${item.dni}</label> <br />
            <label id="lista"><b>Telefono: </b>${item.telefono}</label> <br />
            <hr />
            `)}
        </div>


        `;
    }


    idHandler(e) {
        this.id = e.target.value;
    }

    buscar() {

        if (this.id == "") {

            alert('Favor ingresar un ID')

        }
        else {
            fetch('http://localhost:8080/repartidor/' + this.id)
                .then(data => {
                    if (data.ok) {
                        return data.json();
                    }
                    else {
                        return Promise.reject('El nro de ID no existe')
                    }
                })
                .then(data => {

                    console.log(data);
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.apellido = data.apellido;
                    this.dni = data.dni;
                    this.telefono = data.telefono;
                })
                .catch(error => alert('Lo sentimos. ' + error));
        }


    }



    mostrar() {
        fetch('http://localhost:8080/todosRepartidores/')
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                else {
                    return Promise.reject('No se pudo hacer la conexión')
                }
            })
            .then(data => {
                console.log(data);
                this.repartidores = data;

            })
            .catch(error => alert('Lo sentimos. ' + error));
    }

}
customElements.define('neo-repartidor', NeoRepartidor);