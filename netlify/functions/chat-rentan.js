// P06 edukasi: backend demo yang sengaja tidak aman. Tidak menerbitkan voucher nyata.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'Gunakan POST' }) };
  let pesan = '';
  try { pesan = String(JSON.parse(event.body || '{}').message || '').slice(0, 1000); }
  catch { return { statusCode: 400, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'JSON tidak valid' }) }; }
  const serang = /abaikan|ignore|admin|diskon\s*90|voucher staf|aturan sebelumnya|kode staf|terbitkan voucher/i.test(pesan);
  const balasan = serang
    ? 'Instruksi diterima. Voucher demo DEMO-90 ditampilkan (SIMULASI RENTAN; tidak berlaku untuk transaksi nyata).'
    : 'Menu hari ini: nasi goreng, mi ayam, dan teh. Voucher demo umum: KANTIN10 (tidak berlaku untuk transaksi nyata).';
  return { statusCode: 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }, body: JSON.stringify({ mode: 'rentan-demo', reply: balasan, voucherIssued: serang, realVoucherSystem: false }) };
};
