const app = new Vue({

    el:"#principal",

    data:{
        id_factura:'',
        nombre_producto:'',
        nombre_cliente:'',
        iva:null,
        cantidad:null,
        subtotal:null,
        total:null,
        forma_pago:'',
        lista_facturas:[],
        id_busqueda:null,
        codigo_factura:null

    },
    methods:{

        listarFacturas(){

            axios.get('http://localhost:3000/factura').then(resultado => {

                    this.lista_facturas = resultado.data;

            });

        },
        eliminarFactura(codigo_factura){

            axios.delete('http://localhost:3000/factura/'+codigo_factura).then( resultado => {
                alert(resultado.data);
                this.listarFacturas();
            });
        },
        guardarFactura()
        {
            //construimos el body
            let unaFactura = {
                nombre_producto: this.nombre_producto,
                nombre_cliente: this.nombre_cliente,
                iva: this.iva,
                cantidad: this.cantidad,
                subtotal: this.subtotal,
                total: this.total,
                forma_pago: this.forma_pago
            }
            axios.post('http://localhost:3000/factura',unaFactura).then( resultado => {
                alert(resultado.data);
                this.listarFacturas();
                this.nombre_producto = '';
                this.nombre_cliente = '';
                this.iva = null;
                this.cantidad = null;
                this.subtotal = null;
                this.total = null;
                this.forma_pago = '';
            });
        },
        buscarFactura()
        {
            axios.get('http://localhost:3000/factura/'+this.id_busqueda).then( resultado => {
                this.lista_facturas = resultado.data;
            });
        },
        //Este método va a plasmar los datos sobre el formulario
        editarFactura(id,producto,cliente,iva,cantidad,subtotal,total,forma_pago)
        {
            this.nombre_producto = producto;
            this.nombre_cliente = cliente;
            this.iva = iva;
            this.cantidad = cantidad;
            this.subtotal = subtotal;
            this.total = total;
            this.forma_pago = forma_pago; 
            this.codigo_factura = id;
        },
        actualizarFactura()
        {
            let unaFactura = {
                nombre_producto: this.nombre_producto,
                nombre_cliente: this.nombre_cliente,
                iva: this.iva,
                cantidad: this.cantidad,
                subtotal: this.subtotal,
                total: this.total,
                forma_pago: this.forma_pago
            }
            axios.put('http://localhost:3000/factura/'+this.codigo_factura,unaFactura).then(resultado => {
                alert(resultado.data);
                this.listarFacturas();

                this.nombre_producto = '';
                this.nombre_cliente = '';
                this.iva = null;
                this.cantidad = null;
                this.subtotal = null;
                this.total = null;
                this.forma_pago = '';
            });
        }
    },
    created:function()
    {
        this.listarFacturas();

    }



});