import { ShoppingCart } from "@phosphor-icons/react";
import { Product } from "../libs/typeData";
import { formatedUsPrice } from "../libs/usdCurrency";

const Card = ({ products, handleCart }: { products: Product; handleCart: (product: Product) => void }) => {
    const oriPrice = products?.price;
    const promoPrice = products?.promo;

    const discount = (oriPrice * promoPrice) / 100;

    const discountPrice = formatedUsPrice(oriPrice - discount);
    const price = formatedUsPrice(oriPrice);

    return (
        <div className="font-poppins p-3 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] rounded-lg hover:scale-105 duration-300">
            <img src={products?.image[0]} alt="" className="h-[300px] w-full object-cover rounded-sm" />
            <div className="mt-2">
                <p className="lowercase text-base text-slate-500">{products?.category}</p>
                <p className="font-semibold text-lg mt-1">{products?.brand}</p>
                <p className="line-clamp-2 mt-2">{products?.description}</p>
                <div className="flex items-end justify-between mt-2">
                    <div className="">
                        <div className="flex gap-1 items-end">
                            <p className="italic text-sm text-slate-500 line-through">{price}</p>
                            <p className="text-sm bg-primary text-secondary px-2 py-1 rounded-md">{promoPrice}% off</p>
                        </div>
                        <p className="text-lg font-semibold">{discountPrice}</p>
                    </div>
                    <button onClick={() => handleCart(products)} className="flex items-center gap-2 bg-secondary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-secondary duration-300">
                        Buy
                        <ShoppingCart size={20} className="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
