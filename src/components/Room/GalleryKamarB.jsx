import React, { useEffect, useState } from "react";

export default function GalleryKamarB() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://dkos-mranggen-clabs-production.up.railway.app/api/user/kost", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        
        const kosts = Array.isArray(data.data) ? data.data : [];
        const kamarB = kosts.find((kost) => kost.roomType === "B");
        setImage(kamarB?.images[0] || "");
      })
      .catch((error) => {
        console.error("Gagal ambil gambar:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Gallery Kamar B</h2>
      {image ? (
        <div className="w-96 h-96 rounded overflow-hidden border">
          <img src={image} alt="Kamar B" className="w-full h-full object-cover" />
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada gambar untuk kamar B</p>
      )}
    </div>
  );
}
