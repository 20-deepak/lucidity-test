import { crossIcon } from "@/assets";
import { product } from "@/pages";
import { editProduct } from "@/redux/inventorySlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function EditProductModal({
  product,
  toggleEditModal,
}: {
  product: product;
  toggleEditModal: () => void;
}) {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(product);

  const handleEdit = () => {
    dispatch(editProduct({ updatedProduct: productData }));
    toggleEditModal();
  };

  const handleChange = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="h-screen w-screen absolute bg-[#00000085] top-0 left-0 text-[#dcdddc]"
      onClick={toggleEditModal}
    >
      <div
        className="h-[40%] w-[40%] bg-[#292b27] p-6 rounded-xl translate-x-2/3 translate-y-2/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-3xl">Edit product</h1>
          <Image
            onClick={toggleEditModal}
            alt="cancel"
            src={crossIcon}
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-1">{product.name}</div>
        <div className="grid grid-cols-2 mt-4 gap-4">
          <div className="flex flex-col gap-2">
            <label>Category</label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              className="p-2 bg-[#3f413d] rounded-xl text-[#9c9d9c]"
              value={productData.category}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Price</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              className="p-2 bg-[#3f413d] rounded-xl text-[#9c9d9c]"
              value={productData.price.replace(/\$/g, "")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              onChange={handleChange}
              className="p-2 bg-[#3f413d] rounded-xl text-[#9c9d9c]"
              value={productData.quantity}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Value</label>
            <input
              type="text"
              name="value"
              onChange={handleChange}
              className="p-2 bg-[#3f413d] rounded-xl text-[#9c9d9c]"
              value={productData.value.replace(/\$/g, "")}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-10">
          <button className="p-4 text-[#ddfe55]" onClick={toggleEditModal}>
            Cancel
          </button>
          <button
            className="py-2 px-6 rounded-lg bg-[#3f413d] text-[#9c9d9c]"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
