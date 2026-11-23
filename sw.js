/* يعمل عند تشغيل التطبيق من رابط (GitHub Pages مثلاً): يحفظ التطبيق في الجوال ليعمل بدون إنترنت.
   يعرض النسخة المحفوظة فوراً، ويحدّثها في الخلفية عند توفر الإنترنت. */
const CACHE = 'najeeb-v2';
const FILES = ['./', 'index.html', 'css/app.css', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'data/curriculum.js', 'data/lessons.js', 'js/store.js', 'js/ui.js', 'js/content.js', 'js/progress.js', 'js/quiz.js', 'js/student.js', 'js/admin.js', 'js/app.js',
  'fonts/tajawal-arabic-400-normal.woff2', 'fonts/tajawal-arabic-500-normal.woff2', 'fonts/tajawal-arabic-700-normal.woff2', 'fonts/tajawal-arabic-800-normal.woff2',
  'fonts/tajawal-latin-400-normal.woff2', 'fonts/tajawal-latin-700-normal.woff2', 'fonts/tajawal-latin-800-normal.woff2'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then((c) => c.match(e.request, { ignoreSearch: true }).then((cached) => {
    const net = fetch(e.request).then((res) => { if (res && res.ok) c.put(e.request, res.clone()); return res; }).catch(() => cached);
    return cached || net;
  })));
});
