export class Table {
    id?: string;
    tableId?: string;  //Se non presente, tavolo libero; cancellato dopo il pagamento
    orderId?: number;
    seats?: number;
    assignedTo?: string;
}