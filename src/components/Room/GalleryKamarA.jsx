import React, { useEffect, useState } from "react";

export default function GalleryKamarA() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("DATA API:", resData);
        const kosts = Array.isArray(resData.data) ? resData.data : [];
        const kamarA = kosts.find((kost) => kost.roomType === "A");
        setImage(kamarA?.images?.[0] || "");
      })
      .catch((error) => {
        console.error("Gagal ambil gambar:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Gallery Kamar A</h2>
      {image ? (
        <div className="w-96 h-96 rounded overflow-hidden border">
          <img src={image} alt="Kamar A" className="w-full h-full object-cover" />
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada gambar untuk kamar A</p>
      )}
    </div>
  );
}