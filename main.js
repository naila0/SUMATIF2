import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgSS-chZUH5T47nhRNeK6jYDnGZK_TQSA",
  authDomain: "insan-cemerlang-d6eb1.firebaseapp.com",
  projectId: "insan-cemerlang-d6eb1",
  storageBucket: "insan-cemerlang-d6eb1.appspot.com",
  messagingSenderId: "162904381844",
  appId: "1:162904381844:web:dd88782fdcc494c9ac1781",
  measurementId: "G-1RSX6TCWZ2"
};

// Initialize Firebase
const aplikasi = initializeApp(firebaseConfig);
const basisdata = getFirestore(aplikasi);

export async function tambahPelanggan(nama, alamat, notlpn) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "PELANGGAN2"), {
      nama: nama,
      alamat: alamat,
      notlpn: notlpn
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data pelanggan' + error)
  }
}


export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "PELANGGAN2");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      notlpn: dokumen.data().notlpn

    })
  })

  return hasilKueri;
}

export async function ubahPelanggan(id, namabaru, alamatbaru, notlpnbaru) {
  await updateDoc(
    doc(basisdata, "PELANGGAN2", id), { nama: namabaru, alamat: alamatbaru, notlpn: notlpnbaru }
  )
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "PELANGGAN2", id))
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "PELANGGAN2", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}