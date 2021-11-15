export class Product {
    private name: string;
    private quantity: number;
    private price: number;

    constructor(name: string = null, quantity: number = null, price: number = null) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    public getName() {
        return this.name;
    }

    public getQuantity() {
        return this.quantity;
    }

    public getPrice() {
        return this.price;
    }

    public setName(pName: string) {
        this.name = pName;
    }

    public setQuantity(pQuantity: number) {
        this.quantity = pQuantity;
    }

    public setPrice(pPrice: number) {
        this.price = pPrice;
    }
}