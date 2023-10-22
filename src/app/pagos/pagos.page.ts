import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';


declare var paypal: any;
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  productos: any = [];
  

  
  private paypalApiUrl = 'https://api-m.sandbox.paypal.com';

  amount: number;

  constructor(
    private router: Router,
    private http: HttpClient
    
  ) { }

  ngOnInit() {
    
      this.getProductos().subscribe(res=>{
      console.log("Res", res)
      this.productos = res;
    }
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }


  createPayPalOrder(amount: number) {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        // Este callback se llama cuando el pago se aprueba con éxito
        return actions.order.capture().then((details) => {
          // Puedes realizar acciones adicionales aquí, como redirigir al usuario o mostrar un mensaje de confirmación
        });
      },
      onError: (err) => {
        // Este callback se llama si hay un error en el proceso de pago
        console.error(err);
      },
    }).render('#paypal-button-container');
  }
  getProductos(){
    return this.http
    .get("assets/productos/lista.json")
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    )
  }



}
