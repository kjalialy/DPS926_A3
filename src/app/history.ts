import { Product } from './product'

export class History extends Product {
    private dateOfPurchase: string;
    private total: number;

    constructor(name: string, quantity: number, price: number, dop: string, total: number) {
        super(name, quantity, price);

        this.dateOfPurchase = dop;
        this.total = total;
    }
}