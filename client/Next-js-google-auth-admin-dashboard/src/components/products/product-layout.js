"use client";

import { useEffect, useState } from "react";
import Button from "../FormControls/button";
import Modal from "../Modal";
import { productFormControls } from "@/utils/config";
import { useRouter } from "next/navigation";

const intialFormData = {
  name: "",
  id: 0,
  value: 0,
  time: new Date(),
  type: {
    idType: "",
    label: "",
  },
};

export default function ProductLayout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(intialFormData);

  const router = useRouter();

  console.log(formData);

  async function handleAddProduct() {
    const res = await fetch("/api/product/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data && data.success) {
      setFormData(intialFormData);
      setShowModal(false);
      router.refresh();
    } else {
      setFormData(intialFormData);
      setShowModal(false);
    }
  }

  return (
    <div>
      <Button onClick={() => setShowModal(true)} text={"Add New Product"} />
      {children}
      <Modal
        show={showModal}
        setShow={setShowModal}
        formData={formData}
        setFormData={setFormData}
        formControls={productFormControls}
        onAdd={handleAddProduct}
      />
    </div>
  );
}
