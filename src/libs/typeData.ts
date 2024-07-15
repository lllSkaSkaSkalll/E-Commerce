export type Banner = {
    id: number;
    image: string;
};

export type Categories = {
    id: number;
    image: string;
    description: string;
};

export type Product = {
    id: number;
    brand: string;
    description: string;
    price: number;
    promo: number;
    category: string;
    image: string[];
    quantity: number;
    discountPrice: number;
};
