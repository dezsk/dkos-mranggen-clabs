# Panduan Upload Gambar di DKost Mranggen

## Pendahuluan

Dokumen ini menjelaskan cara menggunakan fitur upload gambar yang telah diimplementasikan di aplikasi DKost Mranggen. Fitur ini memungkinkan admin untuk mengunggah gambar ke galeri kost.

## Konfigurasi

Sebelum menggunakan fitur upload gambar, pastikan konfigurasi Cloudinary telah diatur dengan benar di file `.env`:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Ganti nilai-nilai tersebut dengan kredensial Cloudinary Anda. Anda dapat mendapatkan kredensial ini dengan mendaftar di [Cloudinary](https://cloudinary.com/).

## Endpoint API

### Upload Gambar Baru

**Endpoint:** `POST /api/admin/gallery`

**Headers:**
- `Authorization`: Bearer token admin

**Body (multipart/form-data):**
- `title` (required): Judul gambar
- `description` (optional): Deskripsi gambar
- `kostId` (required): ID kost terkait
- `media` (required untuk gambar): File gambar yang akan diunggah
- `mediaType` (optional): Tipe media ('image' atau 'video')
- `mediaUrl` (required untuk video): URL video jika mediaType adalah 'video'

**Contoh Response Sukses:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Kamar Tipe A",
  "description": "Kamar dengan fasilitas lengkap",
  "mediaType": "image",
  "mediaUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/v1624291142/dkost-mranggen/abcdef123456.jpg",
  "kost": "60d21b4667d0d8992e610c80",
  "isActive": true,
  "uploadedBy": "60d21b4667d0d8992e610c70",
  "createdAt": "2023-06-21T12:45:42.000Z",
  "updatedAt": "2023-06-21T12:45:42.000Z"
}
```

### Update Gambar

**Endpoint:** `PUT /api/admin/gallery/:id`

**Headers:**
- `Authorization`: Bearer token admin

**Body (multipart/form-data):**
- `title` (optional): Judul gambar baru
- `description` (optional): Deskripsi gambar baru
- `media` (optional): File gambar baru
- `mediaType` (optional): Tipe media baru ('image' atau 'video')
- `mediaUrl` (optional): URL video baru jika mediaType adalah 'video'

**Contoh Response Sukses:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Kamar Tipe A - Updated",
  "description": "Kamar dengan fasilitas lengkap dan baru",
  "mediaType": "image",
  "mediaUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/v1624291142/dkost-mranggen/abcdef123456_updated.jpg",
  "kost": "60d21b4667d0d8992e610c80",
  "isActive": true,
  "uploadedBy": "60d21b4667d0d8992e610c70",
  "createdAt": "2023-06-21T12:45:42.000Z",
  "updatedAt": "2023-06-21T13:15:22.000Z"
}
```

### Hapus Gambar

**Endpoint:** `DELETE /api/admin/gallery/:id`

**Headers:**
- `Authorization`: Bearer token admin

**Contoh Response Sukses:**
```json
{
  "message": "Gallery item deleted successfully"
}
```

## Halaman Test Upload

Untuk memudahkan pengujian fitur upload gambar, kami telah menyediakan halaman test upload yang dapat diakses di:

```
http://localhost:5000/upload-test.html
```

Halaman ini memungkinkan Anda untuk mengunggah gambar dan melihat hasilnya secara langsung.

## Batasan

- Ukuran file maksimum: 5MB
- Format file yang didukung: jpg, jpeg, png, gif
- Dimensi gambar akan diubah ukurannya menjadi maksimum 1000x1000 pixel

## Troubleshooting

### Gambar Tidak Muncul

Jika gambar tidak muncul setelah diunggah, periksa:
1. Kredensial Cloudinary di file `.env`
2. Koneksi internet
3. Log server untuk pesan error

### Error "Media file or URL is required"

Pastikan Anda mengunggah file gambar atau menyediakan URL video, tergantung pada tipe media yang dipilih.

### Error "Kost not found"

Pastikan ID kost yang Anda berikan valid dan ada di database.