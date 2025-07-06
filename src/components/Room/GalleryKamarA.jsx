import React from "react";
import Gambar1A from '../../assets/Room/DetailKamar1.svg';
import Gambar2A from '../../assets/Room/DetailKamar2.svg';
import Gambar3A from '../../assets/Room/DetailKamar3.svg';
import Gambar4A from '../../assets/Room/DetailKamar4.svg';
import Gambar5A from '../../assets/Room/DetailKamar5.svg';

const GalleryKamarA = () => {
    const images = [Gambar1A, Gambar2A, Gambar3A, Gambar4A, Gambar5A];
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Gallery Kamar A</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
                {images.map((img, idx) => (
                <img key={idx} src={img} alt={`Kamar ${idx + 1}`} className="rounded-lg object-cover h-48 w-full" />
                ))}
            </div>
        </div>
    );
};

export default GalleryKamarA;