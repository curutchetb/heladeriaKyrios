import { LitElement, html, css } from 'lit-element';
//importo funcion de otro js con los datos de la bbdd
import { cajas } from './neo-informe'

//variable global usada para fecha
let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;
d = [year, month, day].join('-');

export class NeoOrden extends LitElement {

    static get properties() {
        return {
            id: { type: Number },
            idRepartidor: { type: Number },
            tipoHelado: { type: String },
            adicional: { type: String },
            fecha: { type: String },
            caja: { type: Number },
            mes: { type: Number },
            nombre: { type: String },
            caja1: { type: JSON },
            caja2: { type: Number },
            caja3: { type: Number },
            pedidos: { type: Array },
            pedidosId: { type: Array }
        };
    }

    static get styles() {
        return css`
    
    label{
        font-size: 18px;
        display: inline-block;
        margin: 2px;
        width: 15rem;
        }

    input{
        margin-right: 50px;
        padding: 2px
    }

    select{
        margin-right: 50px;
        padding: 2px
    }

    p{
        font-size: 1.4rem;
    }


    form{
        font-size: 18px;
        align-items: center;
        text-align: left;
        overflow: auto;
        }

    #pedidos{
        width: 100%;
        margin-top: 25px;
        margin-botom: 25px;
        font-size: 25px;
        text-align:center;
    }

    button{
    font-size: 1em;
    padding: 3px;
    color:  rgb(252, 196, 12);
    background-color: #0A243C;
    border: 2px solid rgb(252, 196, 12);
    text-decoration: none;
    text-align: center;
    text-decoration: underline;
    padding: 5px;
    cursor: pointer;
    }
    
    button:hover{
        color: #0A243C;
        background-color:rgb(252, 196, 12);
    }
    #botonesId{
        font-size: 1.5em;
        margin-top: 15px;
        margin-bottom: 25px;
        text-align:center;
   }
   #lista{
    font-size: 1.2rem;
}

#uno{
    width: 50%; 
    float: left;
    margin-top: 25px;
}

#dos{
    width: 50%; 
    float: right;
}

    `;
    }



    constructor() {
        super();
        this.tipoHelado = "";
        this.adicional = "Sin adicional";
        this.caja = "";
        this.idRepartidor = "";




        cajas().then(data =>
            this.caja1 = 5 - (data.filter(item => item.caja === 1 && item.fecha == d).length));

        cajas().then(data =>
            this.caja2 = 10 - (data.filter(item => item.caja === 2 && item.fecha == d).length));

        cajas().then(data =>
            this.caja3 = 15 - (data.filter(item => item.caja === 3 && item.fecha == d).length));

    }
    render() {
        return html`

<div id="uno">
    <form action="#" id="form">
        <label for="nombre">Nombre Cliente: </label>
        <input type="text" value="${this.nombre}" @input="${this.handlerNombre}" placeholder="nombre cliente" /> <br />

        <label for="tipo">Elige tipo de helado:</label>
        <select id="tipo" @change="${this.handlerTipo}" name="tipo">
            <option value=0 selected>Seleccione el tipo de helado...</option>
            <option value="Cono">Cono</option>
            <option value="Vaso 1/4">Vaso 1/4</option>
            <option value="Pote 1k">Pote 1k</option>
        </select>

        <br>
        <label for="adicional">Elige el adicional:</label>
        <select ?disabled="${this.tipoHelado == "Cono"}" id="adicional" @change="${this.handlerAdicional}"
            name="adicional">

            <option value="Sin adicional" selected>Sin adicional</option>
            <option value="Crema de Vainilla">Crema de Vainilla</option>
            <option value="Chocolate Fundido">Chocolate Fundido</option>
            <option ?disabled="${this.tipoHelado == "Vaso 1/4"}" value="Almendras">Almendras</option>
        </select>

        <br />
        <label for="box">Elige la caja:</label>
        <select id="caja" @change="${this.handlerCaja}" name="box">
            <option value=0 selected>Seleccione nº de caja...</option>
            <option ?disabled="${this.caja1 == 0}" value=1>Caja 1</option>
            <option ?disabled="${this.caja2 == 0}" value=2>Caja 2</option>
            <option ?disabled="${this.caja3 == 0}" value=3>Caja 3</option>
        </select>

        <br />
        <label for="rep">Elige el repartidor:</label>
        <select id="repartidor" @change="${this.handlerRepartidor}" name="rep">
            <option value=0 selected>Seleccione repartidor...</option>
            <option value=1>Repartidor 1</option>
            <option value=2>Repartidor 2</option>
            <option value=3>Repartidor 3</option>
            <option value=4>Repartidor 4</option>
        </select>

        <br />
        <br />

        <button @click="${this.enviar}">Enviar pedido</button>
    </form>
</div>

<br />
<br />
<div id="dos">
    <p>
        <b>¡NO TE CUELGUES QUE LOS PEDIDOS SE ACABAN!: </b>
        <br />
        *A la Caja 1 le quedan ${this?.caja1} pedidos
        <br />
        *A la Caja 2 le quedan ${this?.caja2} pedidos
        <br />
        *A la Caja 3 le quedan ${this?.caja3} pedidos
    </p>
</div>

<label id="pedidos">Pedidos para el día de hoy </label>
<div id="botonesId">
    <button @click="${this.handlerRep1}">Repartidor ID 1</button>
    <button @click="${this.handlerRep2}">Repartidor ID 2</button>
    <button @click="${this.handlerRep3}">Repartidor ID 3</button>
    <button @click="${this.handlerRep4}">Repartidor ID 4</button>
</div>

<div style="border: 1px solid">

    ${this.pedidosId?.map(item => html`
    <label id="lista"><b>Nro Pedido: </b>${item.id}</label> <br />
    <label id="lista"><b>Tipo de Helado: </b>${item.tipoHelado}</label><br>
    <label id="lista"><b>Adicional: </b>${item.adicional}</label><br />
    <label id="lista"><b>Caja nº: </b>${item.caja}</label> <br />
    <hr />
    `)}
</div>


        `;
    }

    handlerNombre(e) {
        this.nombre = e.target.value;
    }

    handlerTipo(e) {
        this.tipoHelado = e.target.value;

    }
    handlerAdicional(e) {

        this.adicional = e.target.value;
    }

    handlerCaja(e) {
        this.caja = e.target.value;
    }

    handlerRepartidor(e) {
        this.idRepartidor = e.target.value;
    }


    enviar() {

        if (this.tipoHelado == "" || this.caja == "" || this.idRepartidor == "" || this.nombre == null || this.nombre == " ") {
            alert("Es necesario completar todos los campos");
        }
        else {

            if (this.caja1 == 0 && this.caja2 == 0 && this.caja3 == 0) {
                alert("Lo lamentamos, ya no hay mas pedidos disponibles para el día de hoy.");
            }
            else {

                if (this.tipoHelado == "Cono") {
                    this.adicional = "Sin adicional";
                }

                if (confirm("Desea realizar la compra?")) {
                    var obj = {
                        idRepartidor: this.idRepartidor,
                        tipoHelado: this.tipoHelado,
                        adicional: this.adicional,
                        fecha: d,
                        caja: this.caja,
                        mes: month

                    }
                    fetch('http://localhost:8080/enviarPedido', { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } })
                    alert("¨Agregado al informe para el REPARTIDOR " + this.idRepartidor + ":\n\n" + this.nombre + " ha realizado la compra de " + this.tipoHelado + " - " + this.adicional + " por Caja nº " + this.caja);
                }
                else {
                    alert("La compra no fue realizada");
                }
            }
        }
    }

    handlerRep1() {

        fetch('http://localhost:8080/informe')
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                else {
                    return Promise.reject('No se pudo hacer la conexión')
                }
            })
            .then(data => {
                this.pedidos = data;

                this.pedidosId = this.pedidos?.filter(item => item.idRepartidor === 1 && item.fecha === d);

            })
            .catch(error => alert('Lo sentimos. ' + error));
    }

    handlerRep2() {

        fetch('http://localhost:8080/informe')
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                else {
                    return Promise.reject('No se pudo hacer la conexión')
                }
            })
            .then(data => {
                this.pedidos = data;

                this.pedidosId = this.pedidos?.filter(item => item.idRepartidor === 2 && item.fecha === d);

            })
            .catch(error => alert('Lo sentimos. ' + error));
    }


    handlerRep3() {

        fetch('http://localhost:8080/informe')
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                else {
                    return Promise.reject('No se pudo hacer la conexión')
                }
            })
            .then(data => {
                this.pedidos = data;

                this.pedidosId = this.pedidos?.filter(item => item.idRepartidor === 3 && item.fecha === d);

            })
            .catch(error => alert('Lo sentimos. ' + error));
    }

    handlerRep4() {

        fetch('http://localhost:8080/informe')
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                else {
                    return Promise.reject('No se pudo hacer la conexión')
                }
            })
            .then(data => {
                this.pedidos = data;

                this.pedidosId = this.pedidos?.filter(item => item.idRepartidor === 4 && item.fecha === d);

            })
            .catch(error => alert('Lo sentimos. ' + error));
    }

}
customElements.define('neo-orden', NeoOrden);