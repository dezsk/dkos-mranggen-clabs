const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dkost Mranggen API',
      version: '1.0.0',
      description: 'Dokumentasi API untuk aplikasi Dkost Mranggen',
      contact: {
        name: 'Admin Dkost Mranggen',
        email: 'admin@kos.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Kost: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unik kost'
            },
            name: {
              type: 'string',
              description: 'Nama kost'
            },
            address: {
              type: 'string',
              description: 'Alamat kost'
            },
            description: {
              type: 'string',
              description: 'Deskripsi kost'
            },
            facilities: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Fasilitas yang tersedia di kost'
            },
            price: {
              type: 'number',
              description: 'Harga sewa per bulan'
            },
            roomType: {
              type: 'string',
              description: 'Tipe kamar (e.g., single, double)'
            },
            totalRooms: {
              type: 'integer',
              description: 'Total jumlah kamar'
            },
            availableRooms: {
              type: 'integer',
              description: 'Jumlah kamar yang tersedia'
            },
            images: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'URL gambar kost'
            },
            status: {
              type: 'string',
              enum: ['available', 'full', 'maintenance'],
              description: 'Status ketersediaan kost'
            },
            rules: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Peraturan kost'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan data'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal terakhir update data'
            }
          }
        },
        Payment: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unik pembayaran'
            },
            bookingId: {
              type: 'string',
              description: 'ID booking terkait'
            },
            userId: {
              type: 'string',
              description: 'ID pengguna yang melakukan pembayaran'
            },
            amount: {
              type: 'number',
              description: 'Jumlah pembayaran'
            },
            paymentDate: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembayaran dilakukan'
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal jatuh tempo pembayaran'
            },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'verified', 'rejected', 'expired'],
              description: 'Status pembayaran'
            },
            paymentProof: {
              type: 'string',
              description: 'URL bukti pembayaran'
            },
            verificationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal verifikasi pembayaran'
            },
            verifiedBy: {
              type: 'string',
              description: 'ID admin yang memverifikasi pembayaran'
            },
            rejectionReason: {
              type: 'string',
              description: 'Alasan penolakan pembayaran (jika status rejected)'
            },
            notes: {
              type: 'string',
              description: 'Catatan tambahan terkait pembayaran'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan data'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal terakhir update data'
            }
          }
        },
        Announcement: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unik pengumuman'
            },
            title: {
              type: 'string',
              description: 'Judul pengumuman'
            },
            content: {
              type: 'string',
              description: 'Isi pengumuman'
            },
            target: {
              type: 'string',
              enum: ['all', 'users', 'admins'],
              description: 'Target audiens pengumuman'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal mulai pengumuman ditampilkan'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal berakhir pengumuman ditampilkan'
            },
            isActive: {
              type: 'boolean',
              description: 'Status aktif pengumuman'
            },
            createdBy: {
              type: 'string',
              description: 'ID admin yang membuat pengumuman'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan data'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal terakhir update data'
            }
          }
        },
        Gallery: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unik item galeri'
            },
            title: {
              type: 'string',
              description: 'Judul gambar'
            },
            description: {
              type: 'string',
              description: 'Deskripsi gambar'
            },
            imageUrl: {
              type: 'string',
              description: 'URL gambar'
            },
            kostId: {
              type: 'string',
              description: 'ID kost terkait (opsional)'
            },
            type: {
              type: 'string',
              enum: ['kost', 'facility', 'other'],
              description: 'Tipe gambar'
            },
            isActive: {
              type: 'boolean',
              description: 'Status aktif gambar'
            },
            createdBy: {
              type: 'string',
              description: 'ID admin yang mengunggah gambar'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan data'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal terakhir update data'
            }
          }
        },
        Message: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unik pesan'
            },
            sender: {
              type: 'string',
              description: 'ID pengguna yang mengirim pesan'
            },
            content: {
              type: 'string',
              description: 'Isi pesan'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Waktu pesan dikirim'
            },
            isRead: {
              type: 'boolean',
              description: 'Status pesan sudah dibaca atau belum'
            }
          }
        },
        Chat: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unik chat'
            },
            participants: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'ID pengguna yang terlibat dalam chat'
            },
            messages: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Message'
              },
              description: 'Daftar pesan dalam chat'
            },
            lastMessage: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Isi pesan terakhir'
                },
                sender: {
                  type: 'string',
                  description: 'ID pengirim pesan terakhir'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Waktu pesan terakhir dikirim'
                },
                isRead: {
                  type: 'boolean',
                  description: 'Status pesan terakhir sudah dibaca atau belum'
                }
              },
              description: 'Informasi pesan terakhir dalam chat'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan chat'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal terakhir update chat'
            }
          }
        }
      },
    },
  },
  apis: ['./routes/*.js', './routes/*/*.js'], // Path ke file rute API
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};