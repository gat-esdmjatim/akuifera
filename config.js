/**
 * Akuifera — GitHub Pages wrapper configuration.
 *
 * GANTI nilai APPS_SCRIPT_URL di bawah ini dengan URL "/exec" yang Anda peroleh
 * setelah men-deploy proyek Apps Script sebagai web app.
 *
 * Contoh: 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXX/exec'
 */
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVX2g928p0R2B-XE3sbKqa6wEYOiufNQK1RkEHAJa_OVdzOBqkwHXx0CqBzYCeh9VA9Q/exec';

/**
 * Path dasar dari halaman GitHub Pages.
 * Untuk repo "akuifera" pada akun "gat-esdmjatim", path-nya adalah '/akuifera/'.
 * Sesuaikan jika Anda menggunakan custom domain atau nama repo berbeda.
 */
var BASE_PATH = '/akuifera/';

/**
 * Pemetaan slug URL pretty -> nilai parameter ?page= pada Apps Script.
 * Tambahkan / ubah jika Anda mengganti nama route.
 */
var ROUTES = {
  '':                'public',
  'daftar':          'public',
  'status':          'status',
  'admin':           'admin',
  'petugas':         'staff',
  'feedback':        'feedback',
  'laporan-kinerja': 'laporan-kinerja'
};

/**
 * Route yang menerima argumen tiket di akhir URL,
 * misal /akuifera/status/AKF-20260424-0001
 */
var TICKETED_ROUTES = {
  'status':        true,
  'feedback':      true
};
