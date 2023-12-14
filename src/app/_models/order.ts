export class D {
    id?: string
    name!: string;
    state!: string;
    category!: string;
}

export class Order {
    _id?: string;
    orderId?: number;
    tableId?: number;
    dateCreation?: Date;
    covers?: number;
    totalCost?: number;
    dishes?: D[];
    paymentRequest?: boolean;
    payed?: boolean;
}