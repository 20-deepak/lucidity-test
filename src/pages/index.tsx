import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInventory,
  deleteProduct,
  disableProduct,
} from "../redux/inventorySlice";
import ProductInfoCard from "@/components/ProductInfoCard";
import { categoryIcon, cartIcon, storeValueIcon } from "@/assets";
import EditProductModal from "@/components/EditProductModal";

export interface product {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
  disabled: boolean;
}

interface props {
  initialData: product[];
}

interface storeState {
  inventory: {
    products: product[];
    totalProducts: number;
    totalStoreValue: number;
    outOfStock: number;
    numCategories: number;
  };
}

const API_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

export default function Home({ initialData }: props) {
  const dispatch = useDispatch();
  const {
    products,
    totalProducts,
    totalStoreValue,
    outOfStock,
    numCategories,
  } = useSelector((state: storeState) => state.inventory);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<product>({
    category: "",
    disabled: false,
    name: "",
    price: "",
    quantity: 0,
    value: "",
  });

  useEffect(() => {
    dispatch(setInventory(initialData));
  }, [initialData, dispatch]);

  const productsInfo = [
    { name: "Total Products", value: totalProducts, icon: cartIcon },
    { name: "Total Store Value", value: totalStoreValue, icon: storeValueIcon },
    { name: "Out of Stock", value: outOfStock, icon: cartIcon },
    { name: "Number of Categories", value: numCategories, icon: categoryIcon },
  ];
  const handleDelete = (name: string) => {
    dispatch(deleteProduct(name));
  };

  const toggleEditModal = (product?: product) => {
    if (product) setSelectedProduct(product);
    setIsModalOpen(!isModalOpen);
  };

  const handleDisable = (name: string) => {
    dispatch(disableProduct(name));
  };
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };
  return (
    <>
      <div className="p-4 bg-black text-white h-screen">
        <div className="flex justify-end gap-2">
          <span>admin</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={!isAdmin}
              onChange={toggleAdmin}
            />
            <div className="relative w-11 h-6 bg-[#5c5d5e] peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-[#e5fd72] dark:border-gray-600 peer-checked:bg-[#7d8945]"></div>
          </label>
          <span>user</span>
        </div>
        <h1 className="pt-4 text-4xl">Inventory stats</h1>
        <div className="py-4 gap-4 grid grid-cols-4">
          {productsInfo.map((item) => {
            return <ProductInfoCard item={item} key={item.name} />;
          })}
        </div>

        <table className="border-[#2c2c2f] w-full border-2 width-100-percent bg-[#212124]">
          <thead>
            <tr className="border-[#2c2c2f] border-b-2">
              <th className="p-2 text-left">
                <span className="text-[#93a34e] bg-[#000] p-1 rounded">
                  Name
                </span>
              </th>
              <th className="p-2 text-left">
                <span className="text-[#93a34e] bg-[#000] p-1 rounded">
                  Category
                </span>
              </th>
              <th className="p-2 text-left">
                <span className="text-[#93a34e] bg-[#000] p-1 rounded">
                  Price
                </span>
              </th>
              <th className="p-2 text-left">
                <span className="text-[#93a34e] bg-[#000] p-1 rounded">
                  Quantity
                </span>
              </th>
              <th className="p-2 text-left">
                <span className="text-[#93a34e] bg-[#000] p-1 rounded">
                  Value
                </span>
              </th>
              <th className="p-2">
                <span className="text-[#93a34e] bg-[#000] p-1 rounded">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              if (product.disabled && !isAdmin) {
                return null;
              }
              return (
                <tr key={product.name} className="border-[#2c2c2f] border-b-2">
                  <td className={`p-2 ${product.disabled && "text-[#656667]"}`}>
                    {product.name}
                  </td>
                  <td className={`p-2 ${product.disabled && "text-[#656667]"}`}>
                    {product.category}
                  </td>
                  <td className={`p-2 ${product.disabled && "text-[#656667]"}`}>
                    {product.price}
                  </td>
                  <td className={`p-2 ${product.disabled && "text-[#656667]"}`}>
                    {product.quantity}
                  </td>
                  <td className={`p-2 ${product.disabled && "text-[#656667]"}`}>
                    {product.value}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20px"
                      height="20px"
                      fill={!isAdmin ? "#7e7e7e" : "#357322"}
                      className="cursor-pointer"
                      onClick={() => isAdmin && toggleEditModal(product)}
                    >
                      <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z" />
                    </svg>
                    {!product.disabled ? (
                      <svg
                        fill={!isAdmin ? "#7e7e7e" : "#c597d4"}
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488.85 488.85"
                        className="cursor-pointer"
                        onClick={() => isAdmin && handleDisable(product.name)}
                      >
                        <g>
                          <path
                            d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2
                      s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025
                      c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3
                      C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7
                      c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"
                          />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        className="cursor-pointer"
                        y="0px"
                        width="20"
                        height="20"
                        fill="#c597d4"
                        viewBox="0 0 50 50"
                        onClick={() => handleDisable(product.name)}
                      >
                        <path d="M 5.90625 4.96875 C 5.863281 4.976563 5.820313 4.988281 5.78125 5 C 5.40625 5.066406 5.105469 5.339844 5 5.703125 C 4.894531 6.070313 5.003906 6.460938 5.28125 6.71875 L 43.28125 44.71875 C 43.679688 45.117188 44.320313 45.117188 44.71875 44.71875 C 45.117188 44.320313 45.117188 43.679688 44.71875 43.28125 L 36.25 34.8125 C 42.824219 31.265625 47.464844 25.988281 47.75 25.65625 C 48.070313 25.28125 48.070313 24.71875 47.75 24.34375 C 47.316406 23.839844 37.007813 12 25 12 C 21.691406 12 18.535156 12.90625 15.65625 14.21875 L 6.71875 5.28125 C 6.511719 5.058594 6.210938 4.945313 5.90625 4.96875 Z M 25 14 C 25.390625 14 25.769531 14.035156 26.15625 14.0625 C 31.675781 14.648438 36 19.328125 36 25 C 36 27.667969 35.054688 30.125 33.46875 32.03125 L 28.4375 27 C 28.785156 26.410156 29 25.734375 29 25 C 29 22.789063 27.210938 21 25 21 C 24.265625 21 23.589844 21.214844 23 21.5625 L 17.96875 16.53125 C 19.875 14.945313 22.332031 14 25 14 Z M 12 16.15625 C 6.347656 19.625 2.511719 24.039063 2.25 24.34375 C 1.929688 24.71875 1.929688 25.28125 2.25 25.65625 C 2.683594 26.160156 12.992188 38 25 38 C 25.402344 38 25.792969 37.972656 26.1875 37.9375 C 28.347656 37.796875 30.457031 37.324219 32.4375 36.59375 L 30.40625 34.5625 C 28.804688 35.472656 26.972656 36 25 36 C 24.609375 36 24.230469 35.964844 23.84375 35.9375 C 18.324219 35.351563 14 30.671875 14 25 C 14 23.027344 14.527344 21.195313 15.4375 19.59375 Z M 21.03125 25.15625 C 21.113281 27.234375 22.761719 28.886719 24.84375 28.96875 Z"></path>
                      </svg>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20px"
                      height="20px"
                      className="cursor-pointer"
                      fill={!isAdmin ? "#7e7e7e" : "#eb3323"}
                      onClick={() => isAdmin && handleDelete(product.name)}
                    >
                      <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          toggleEditModal={toggleEditModal}
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(API_URL);
  const data: product[] = await res.json();

  return {
    props: {
      initialData: data,
    },
  };
}
