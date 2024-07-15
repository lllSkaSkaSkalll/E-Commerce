import { useEffect, useState, useMemo } from "react";
import Carousel from "./Components/Carousel";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import Card from "./Components/Card";
import { useDebounce } from "./libs/useDebounce";
import { XLogo } from "@phosphor-icons/react";
import { Product } from "./libs/typeData";
import { useFetchData } from "./libs/useFetchData";

const App = () => {
    const { product: products, banner, category: categories } = useFetchData();
    console.log("🚀 ~ App ~ products:", products);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("all");
    const [cart, setCart] = useState<Product[]>([]);

    const searchTerm = useDebounce(search, 1000);

    const filteredProducts = useMemo(() => {
        if (category === "all" && !searchTerm) {
            return products;
        }

        let filtered;
        if (searchTerm) {
            filtered = products.filter((product) => {
                return product.brand.toLowerCase().includes(searchTerm.toLowerCase());
            });
        } else if (category !== "all") {
            filtered = products.filter((product) => {
                return product.category.toLocaleLowerCase() === category;
            });
        }

        return filtered;
    }, [searchTerm, products, category]);

    useEffect(() => {
        const localStorageCart = localStorage.getItem("cart");
        if (localStorageCart) {
            setCart(JSON.parse(localStorageCart));
        }
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCart = (product: Product) => {
        const discount = (product.price * product.promo) / 100;
        const discountPrice = product.price - discount;

        const existingProduct = cart.findIndex((item) => item.id === product.id);

        let updatedCart;

        if (existingProduct >= 0) {
            updatedCart = cart.map((item, index) => (index === existingProduct ? { ...item, quantity: item.quantity + 1, discountPrice } : item));
        } else {
            updatedCart = [...cart, { ...product, quantity: 1, discountPrice }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <>
            <Navbar product={cart} />

            <div className="pb-10">
                <div className="container mx-auto relative group/banner">
                    <div className="w-full">
                        <Carousel>
                            {banner?.map((item) => {
                                return <img key={item.id} src={`${item.image}`} alt="banner" className="object-cover min-w-full h-full" />;
                            })}
                        </Carousel>
                    </div>
                </div>

                <Category setCategory={setCategory} categories={categories} />

                <div className="container mx-auto mt-10">
                    <p id="product" className="text-center font-poppins text-3xl font-semibold">
                        All Products
                    </p>
                    <div className="w-full mt-5">
                        <div className="m-auto flex items-center justify-center relative w-fit">
                            <input onChange={handleSearch} value={search} type="text" placeholder="Search..." className="max-w-[750px] w-[750px] mx-auto px-5 py-3 text-xl border-[3px] rounded-lg border-black/50 shadow-md shadow-black/25" />
                            <XLogo onClick={() => setSearch("")} size={32} className="absolute right-5 hover:text-primary cursor-pointer" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7 gap-5">
                        {filteredProducts?.map((item) => {
                            return <Card handleCart={handleCart} key={item.id} products={item} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
