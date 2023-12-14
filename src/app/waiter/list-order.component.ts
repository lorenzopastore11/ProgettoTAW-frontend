import { Component, OnInit } from "@angular/core";
import { OrderService } from "../_services/order.service";
import { first } from "rxjs/operators";
import { Order } from "../_models/order";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService, TableService } from "../_services";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SocketService } from "../_services/socket.service";




@Component({ templateUrl: 'list-order.component.html' })
export class ListOrderComponent implements OnInit {
    o!: Order;
    orders?: any | undefined; //Order[]
    public tableId!: number;
    public orderId!: number;
    public username: any;
    public tables?: any;
    public seats: any;
    submitted = false;
    submitting = false;
    public form!:  FormGroup
    public form2!: FormGroup
    public form3!: FormGroup
    public form4!: FormGroup

    constructor(private orderService: OrderService, private route: ActivatedRoute, private tableService: TableService,
        private alertService: AlertService, private router: Router, private socketService: SocketService) {}

    ngOnInit() {
        this.alertService.clear();
        this.tableId = this.route.snapshot.params['tableId'];
        this.orderId = this.route.snapshot.params['orderId'];
        
        /**
         * This get retrieves all the information associated to the tableId
         */
        this.tableService.getById(this.tableId).pipe(first())
        .subscribe((tables) => {
            this.tables = tables;
            this.seats = tables.seats;

            /** The field covers is set by user input, so I have to lead it using the FornGroup class */
            this.form = new FormGroup({
                covers: new FormControl('', [Validators.min(1), Validators.max(this.seats), Validators.required]),
            })
        });

        /**
         * This get retrieves all information of the orderId
         */
        this.orderService.get(this.orderId)
        .subscribe(order => {
            this.orders = order;
        });

        if(this.orderId) {
            this.form2 = new FormGroup({
            state: new FormControl(''),
            })
        }
    }

    /**
     * This public function is useful to get all form information
     */
    get f() { return this.form.controls; }

    /**
     * 
     * @param orderId 
     * @param id 
     * @returns the state associated to id ordination modified
     */
    switchstate(orderId: number, id: string) {
        this.orderService.update(orderId, this.form2.value, id).subscribe(orders => {
            
            this.orders.find((x: { orderId: number; }) => x.orderId === orderId).dishes.find((x: { id: string; }) => x.id === id).state = (orders.dishes) ? orders.dishes.find(x => (x.id === id))?.state: undefined;
              
        });
    }

    /**
     * 
     * @requires the ordination is not null or undefined
     * @param orderId 
     * @param id 
     * @returns the deletion of the id ordination
     * 
     */
    delete(orderId: number, id: number) {
        this.orderService.delete(orderId, id)
            .subscribe(() => {
                const index = this.orders[0].dishes.findIndex((dish: { id: number; }) => dish.id === id);
                this.orders[0].dishes.splice(index, 1);
        });      
    }

    /**
     * 
     * @returns true if a certain property is satisfy for all elements of the dishes field
     */
    check() {
        if(this.orders[0].dishes.length===0) return false;
        return this.orders[0].dishes.every((x: { state: string; }) => x.state === "CONSEGNATO");
    }

    /**
     * @returns the ordination modified and possibility for cashier to generate bill
     */
    paymentRequest() {
        this.form3 = new FormGroup({
            paymentRequest : new FormControl('true'),
        })

        this.orderService.update(this.orderId, this.form3.value, "-1").subscribe(order =>
            this.orders[0].paymentRequest = order.paymentRequest);
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }
        this.submitting = true;

        if(this.orderId) {
            this.alertService.error("Ordine già presente");
        }
        console.log("passo qui")
            this.o = new Order()
            this.o.tableId = this.tableId;
            this.o.covers = this.f["covers"].value;
            this.orderService.create(this.o).
            subscribe({
                next: () => {
                    (order: Order) => this.orders = order;
                    this.router.navigateByUrl('/waiters');
                    this.alertService.success('Ordinazione aggiunta', true);
                },
                error: (error: any) => {
                    this.alertService.error(error);
                }
            });
        }
    }
