import { ShoppingCart, Trash } from "@phosphor-icons/react";
import { Product } from "../libs/typeData";
import { formatedUsPrice } from "../libs/usdCurrency";
import { useMemo } from "react";

const Navbar = ({ product }: { product: Product[] }) => {
    const totalPrice = useMemo(() => {
        let total = 0;
        product.map((item) => {
            total = total + item.discountPrice * item.quantity;
        });
        return total;
    }, [product]);

    const formatedTotalPrice = formatedUsPrice(totalPrice);

    const productQuantity = useMemo(() => {
        let total = 0;
        product.map((item) => {
            total = total + item.quantity;
        });
        return total;
    }, [product]);

    return (
        <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
            <div className="container mx-auto px-5 md:px-3 lg:px-0 py-[10px] flex items-center justify-between">
                <h1 className="text-3xl font-semibold font-poppins text-primary">Creative Store</h1>
                <div className="flex items-center gap-5">
                    <a href="/E-Commerce/" className="text-lg font-medium underline-custom cursor-pointer hover:text-primary">
                        Home
                    </a>
                    <a href="#category" className="text-lg font-medium underline-custom cursor-pointer hover:text-primary">
                        Category
                    </a>
                    <a href="#product" className="text-lg font-medium underline-custom cursor-pointer hover:text-primary">
                        Product
                    </a>
                    <div className="group relative">
                        <ShoppingCart size={36} className="cursor-pointer hover:text-primary p-1" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-secondary pointer-events-none">{productQuantity}</span>

                        <div className="opacity-0 scale-y-0 origin-top group-hover:opacity-100 group-hover:scale-y-100 duration-300 absolute min-w-[550px] z-30 top-[100%] -left-5 py-5">
                            <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.5)] bg-secondary/90  p-5 rounded-md flex flex-col gap-5 items-center justify-center relative z-10">
                                <span className="border-[10px] rotate-45 border-t-secondary shadow-[-3px_-3px_3px_0_rgba(0,0,0,0.2)] border-l-secondary border-b-transparent border-r-transparent absolute -top-[10px] left-7 -z-1"></span>
                                {product?.length === 0 && <p className="text-xl font-poppins">No item in cart</p>}

                                {product?.map((item) => {
                                    const discount = (item.price * item.promo) / 100;
                                    const price = formatedUsPrice(item.price - discount);

                                    return (
                                        <div key={item.id} className="flex items-center text-nowrap w-full justify-between border-b-2 border-black pb-2">
                                            <div className="flex gap-5">
                                                <div className="w-[50px] h-[50px] rounded-full bg-primary">
                                                    <img src={item.image[0]} alt="" className="w-full h-full object-cover rounded-full" />
                                                </div>
                                                <div className="flex flex-col justify-between font-poppins">
                                                    <p className="font-semibold truncate text-xl">{item.brand}</p>
                                                    <div className="flex gap-2 items-center text-slate-500">
                                                        <p>{price}</p>
                                                        <p>X</p>
                                                        <p>{item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className=""></div>
                                                <Trash size={32} className="hover:text-primary cursor-pointer" />
                                            </div>
                                        </div>
                                    );
                                })}

                                {product?.length !== 0 && (
                                    <div className="w-full flex items-end justify-between">
                                        <p className="font-semibold">Total : {formatedTotalPrice}</p>
                                        <button className="px-5 py-2 text-xl bg-white drop-shadow-xl text-primary hover:bg-primary hover:text-secondary font-semibold font-poppins duration-300">Checkout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <p className="px-5 py-2 text-xl bg-secondary text-primary font-semibold">Sign In</p>
                    <p className="px-5 py-2 text-xl bg-primary text-secondary font-semibold">Register</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
