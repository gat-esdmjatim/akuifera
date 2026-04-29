/**
 * Akuifera — GitHub Pages wrapper configuration.
 *
 * GANTI nilai APPS_SCRIPT_URL di bawah ini dengan URL "/exec" yang Anda peroleh
 * setelah men-deploy proyek Apps Script sebagai web app.
 *
 * Contoh: 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXX/exec'
 */
var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxhBj03s3Oi1Osg0e3MpTLvoys8K16DMEUlsJLHIL7qpLQ7iHuRrZ3_hy0fl_GjT_P9OA/exec';

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
  '':              'public',
  'daftar':        'public',
  'status':        'status',
  'admin':         'admin',
  'petugas':       'staff',
  'pimpinan':      'leader',
  'feedback':      'feedback'
};

/**
 * Route yang menerima argumen tiket di akhir URL,
 * misal /akuifera/status/AKF-20260424-0001
 */
var TICKETED_ROUTES = {
  'status':        true,
  'feedback':      true
};
