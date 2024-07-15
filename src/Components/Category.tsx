import React from "react";

type category = {
    id: number;
    image: string;
    description: string;
};

const Category = ({ categories, setCategory }: { categories: category[]; setCategory: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <div id="category" className="container mx-auto mt-10">
            <p className="p-[10px] bg-primary text-secondary w-fit font-poppins tracking-wider font-medium">Product Category</p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-5">
                {categories?.map((item) => {
                    return (
                        <div
                            onClick={() => setCategory(item.description.toLocaleLowerCase())}
                            key={item.id}
                            className="w-full cursor-pointer h-[200px] relative group hover:scale-105 duration-300 rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
                        >
                            <img src={item.image} alt="category" className="object-cover w-full h-full" />
                            <div className="absolute left-0 right-0 bottom-0 rounded-b-md bg-secondary duration-300 group-hover:bg-primary flex items-center justify-center">
                                <p className="text-primary group-hover:text-secondary duration-300 font-poppins font-semibold py-2">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
