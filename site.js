// =========================================================
// بوصلة — السكربت المشترك لكل الصفحات
// =========================================================

// بيانات المعامل (كلها في الدور الأرضي)
const LABS = {
  '30': { code: 'G-30', where: 'الممر الفرعي الأول — الصف الأيسر، الباب الثاني' },
  '31': { code: 'G-31', where: 'الممر الفرعي الأول — الصف الأيسر، الباب الأول' },
  '43': { code: 'G-43', where: 'الممر الفرعي الأول — الصف الأيمن، الباب الثاني' },
  '44': { code: 'G-44', where: 'الممر الفرعي الأول — الصف الأيمن، الباب الأول' },
  '58': { code: 'G-58', where: 'الممر الفرعي الثاني — الباب الثاني على اليمين' },
  '61': { code: 'G-61', where: 'الممر الفرعي الثاني — الباب الأول على اليمين' },
  '72': { code: 'G-72', where: 'بجانب معمل 61 من الجهة الشرقية' }
};

// يحوّل أي صيغة مكتوبة (31 / G-31 / g31 / معمل 31 / ٣١) إلى رقم المعمل
function normalizeLabQuery(value) {
  const western = value.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const digits = western.match(/\d+/);
  if (!digits) return null;
  const num = String(parseInt(digits[0], 10));
  return LABS[num] ? num : null;
}

document.addEventListener('DOMContentLoaded', () => {
  // زر القائمة في الجوال
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // البحث برقم المعمل من الشريط العلوي
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  if (form && input) {
    const defaultPlaceholder = input.placeholder;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lab = normalizeLabQuery(input.value.trim());
      if (lab) {
window.location.href = `map.html?room=G-${lab}`;      } else {
        input.value = '';
        input.placeholder = 'المعمل غير متوفر، جرّب رقمًا آخر';
        form.classList.add('error');
      }
    });

    input.addEventListener('input', () => {
      form.classList.remove('error');
      input.placeholder = defaultPlaceholder;
    });
  }
});