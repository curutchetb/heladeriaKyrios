import { LitElement, html, css } from 'lit-element';

export function cajas() {
    return fetch('http://localhost:8080/informe')
        .then(data => data.json());
};

export class NeoInforme extends LitElement {

    static get properties() {
        return {
            pedidos: { type: Array },
            pedidosHoy: { type: Array },
            ganador: { type: String },
        };
    }

    static get styles() {
        return css`

    label{
        font-size: 1.5rem;
    }

    #span{
        font-size: 1.5rem;
    }

    #lista{
        font-size: 1.2rem;
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
        }
        
        button:hover{
            color: #0A243C;
            background-color:rgb(252, 196, 12);
        }

    `;
    }

    constructor() {
        super();
    }
    render() {
        return html`
        
        <button @click="${this.mostrar}">Informe diario</button>
        <br>
        <br>
        <div style="border: 1px solid">
        
            ${this.pedidosHoy?.map(item => html`
            <label id="lista">${item.tipoHelado}</label><b> <br />
                <hr />
                `)}
        </div>
        
        
        <br>
        <br>
        <button @click="${this.bono}">Bono mensual</button>
        
        <br>
        <br>
        <div>
            <label>Bono mensual es para: </label>
            <span id="span"><b>${this?.ganador}</b></span><br />
        </div>
        
        `;
    }


    mostrar() {

        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        d = [year, month, day].join('-');

        fetch('http://localhost:8080/informe').then(data => data.json())
            .then(data => {
                console.log(data);

                this.date = d;
                console.log(d);
                this.pedidos = data;

                this.pedidosHoy = this.pedidos.filter(item => item.fecha === d);

                console.log(this.pedidosHoy);


            })
    }


    bono() {

        var d = new Date(),
            month = '' + (d.getMonth() + 1);

        fetch('http://localhost:8080/informe').then(data => data.json())
            .then(data => {
                console.log(data);
                this.pedidos = data;

                var r1 = this.pedidos?.filter(item => item.idRepartidor === 1 && month === item.mes).length;
                var r2 = this.pedidos?.filter(item => item.idRepartidor === 2 && month === item.mes).length;
                var r3 = this.pedidos?.filter(item => item.idRepartidor === 3 && month === item.mes).length;
                var r4 = this.pedidos?.filter(item => item.idRepartidor === 4 && month === item.mes).length;

                if (r1 > r2 && r1 > r3 && r1 > r4) {
                    this.ganador = "Repartidor ID 1"
                }
                else if (r2 > r1 && r2 > r3 && r2 > r4) {
                    this.ganador = "Repartidor ID 2";
                }
                else if (r3 > r1 && r3 > r2 && r3 > r4) {
                    this.ganador = "Repartidor ID 3";
                }
                else if (r4 > r1 && r4 > r2 && r4 > r3) {
                    this.ganador = "Repartidor ID 4";
                }

            })
    }




}
customElements.define('neo-informe', NeoInforme);