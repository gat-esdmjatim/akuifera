/**
 * Akuifera — GitHub Pages wrapper script.
 * Tugas:
 *   1. Membaca pretty URL ( /akuifera/<slug>/<ticket?> ).
 *   2. Memetakan ke parameter ?page=...&ticket=... pada Apps Script web app.
 *   3. Memuat Apps Script di dalam iframe full-viewport.
 *   4. Mendengarkan pesan akf:navigate dari dalam iframe untuk berpindah halaman
 *      tanpa perlu reload manual.
 */
(function () {
  'use strict';

  function rtrim(s, c) {
    while (s.length && s.charAt(s.length - 1) === c) s = s.substring(0, s.length - 1);
    return s;
  }

  function ltrim(s, c) {
    while (s.length && s.charAt(0) === c) s = s.substring(1);
    return s;
  }

  function parseRoute() {
    var path = window.location.pathname || '/';
    var base = ltrim(rtrim(BASE_PATH || '/', '/'), '/'); // 'akuifera'
    var segs = path.split('/').filter(function (x) { return x.length; });

    if (base) {
      // Hapus segmen base (jika ada) dari awal path
      if (segs.length && segs[0].toLowerCase() === base.toLowerCase()) {
        segs.shift();
      }
    }

    var slug = (segs[0] || '').toLowerCase();
    var ticket = segs[1] || '';

    if (!Object.prototype.hasOwnProperty.call(ROUTES, slug)) {
      // Slug tidak dikenali -> fallback ke halaman pendaftaran publik
      slug = '';
    }

    var page = ROUTES[slug];
    var hasTicket = !!TICKETED_ROUTES[slug] && !!ticket;

    // Kumpulkan query string tambahan dari URL pretty (mis. ?token=...&from=...&to=...)
    // dan teruskan ke iframe Apps Script.
    var extraQs = '';
    var search = window.location.search || '';
    if (search.length > 1) {
      // Buang parameter yang sudah dipakai routing (page, ticket) untuk hindari duplikat
      var pairs = search.substring(1).split('&');
      var keep = [];
      for (var i = 0; i < pairs.length; i++) {
        var p = pairs[i];
        if (!p) continue;
        var eqIdx = p.indexOf('=');
        var k = eqIdx === -1 ? p : p.substring(0, eqIdx);
        if (k === 'page' || k === 'ticket') continue;
        keep.push(p);
      }
      if (keep.length) extraQs = keep.join('&');
    }

    return { slug: slug, page: page, ticket: hasTicket ? ticket : '', extraQs: extraQs };
  }

  function buildIframeSrc(route) {
    var url = APPS_SCRIPT_URL;
    if (!url || url.indexOf('PASTE_URL') === 0) {
      return '';
    }
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    var qs = 'page=' + encodeURIComponent(route.page);
    if (route.ticket) qs += '&ticket=' + encodeURIComponent(route.ticket);
    if (route.extraQs) qs += '&' + route.extraQs;
    return url + sep + qs;
  }

  function showConfigError() {
    var div = document.getElementById('akf-frame-host');
    if (!div) return;
    div.innerHTML =
      '<div class="akf-error">' +
        '<h2>Konfigurasi belum lengkap</h2>' +
        '<p>Berkas <code>config.js</code> belum berisi URL Apps Script.</p>' +
        '<p>Silakan buka <code>config.js</code> dan ganti nilai ' +
        '<code>APPS_SCRIPT_URL</code> dengan URL <code>/exec</code> hasil deploy ' +
        'proyek Akuifera Apps Script.</p>' +
      '</div>';
  }

  function mountIframe(src, title) {
    var host = document.getElementById('akf-frame-host');
    if (!host) return;
    host.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.id = 'akf-frame';
    iframe.title = title || 'Akuifera';
    iframe.src = src;
    iframe.setAttribute('allow', 'geolocation; camera; microphone; clipboard-read; clipboard-write');
    iframe.setAttribute('allowfullscreen', 'true');
    host.appendChild(iframe);
  }

  function setPageTitle(slug) {
    var titles = {
      '':                'Pendaftaran Konsultasi',
      'daftar':          'Pendaftaran Konsultasi',
      'status':          'Cek Status Konsultasi',
      'admin':           'Panel Admin',
      'petugas':         'Panel Petugas',
      'feedback':        'Umpan Balik Konsultasi',
      'laporan-kinerja': 'Laporan Kinerja Layanan Konsultasi'
    };
    var label = titles[slug] || titles[''];
    document.title = label + ' — Akuifera';
    return label;
  }

  function init() {
    var route = parseRoute();
    var label = setPageTitle(route.slug);
    var src = buildIframeSrc(route);
    if (!src) { showConfigError(); return; }
    mountIframe(src, label);
  }

  // Listener navigasi: halaman di dalam iframe akan mem-postMessage ke parent
  // saat user menekan tautan navigasi (mis. tombol "Cek Status").
  window.addEventListener('message', function (ev) {
    if (!ev || !ev.data) return;
    var msg = ev.data;
    if (msg && msg.type === 'akf:navigate' && typeof msg.url === 'string') {
      // Berpindah ke pretty URL; routing kembali ditangani init() saat halaman dimuat.
      window.location.href = msg.url;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
