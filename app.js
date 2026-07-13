"use strict";

const employees = [
  { id: "EMP-001", name: "أحمد بن عبدالله العتيبي", initials: "أع", tone: "blue", role: "مطور برمجيات أول", department: "تقنية المعلومات", manager: "فهد القحطاني", joinDate: "2021/01/10", status: "نشط", salary: 14500, email: "ahmed@masar.sa", phone: "050 123 4821" },
  { id: "EMP-002", name: "سارة بنت محمد الشهري", initials: "سم", tone: "purple", role: "مديرة الموارد البشرية", department: "الموارد البشرية", manager: "بدر الشافعي", joinDate: "2019/03/01", status: "نشط", salary: 22000, email: "sara@masar.sa", phone: "055 820 1134" },
  { id: "EMP-003", name: "خالد بن وليد الدوسري", initials: "خد", tone: "gold", role: "محاسب مالي", department: "المالية والمحاسبة", manager: "نورة السبيعي", joinDate: "2023/06/01", status: "في إجازة", salary: 9500, email: "khaled@masar.sa", phone: "053 991 0255" },
  { id: "EMP-004", name: "نورة محمد السبيعي", initials: "نس", tone: "green", role: "مديرة مالية", department: "المالية والمحاسبة", manager: "بدر الشافعي", joinDate: "2020/11/16", status: "نشط", salary: 19500, email: "noura@masar.sa", phone: "056 471 2290" },
  { id: "EMP-005", name: "عبدالعزيز سعد القحطاني", initials: "عق", tone: "blue", role: "أخصائي مبيعات", department: "المبيعات", manager: "ريم الغامدي", joinDate: "2025/02/08", status: "عن بُعد", salary: 8200, email: "aziz@masar.sa", phone: "050 650 8821" },
  { id: "EMP-006", name: "ريم علي الغامدي", initials: "رغ", tone: "purple", role: "مديرة المبيعات", department: "المبيعات", manager: "بدر الشافعي", joinDate: "2022/08/22", status: "نشط", salary: 17800, email: "reem@masar.sa", phone: "054 311 9022" },
  { id: "EMP-007", name: "محمد عوض الحربي", initials: "مح", tone: "green", role: "مشرف عمليات", department: "العمليات", manager: "سارة الشهري", joinDate: "2024/05/12", status: "نشط", salary: 11200, email: "mohammed@masar.sa", phone: "059 761 3301" },
  { id: "EMP-008", name: "لطيفة صالح المطيري", initials: "لم", tone: "gold", role: "أخصائية تطوير تنظيمي", department: "الموارد البشرية", manager: "سارة الشهري", joinDate: "2026/06/28", status: "نشط", salary: 10300, email: "latifa@masar.sa", phone: "055 414 7732" }
];

const attendance = [
  { employee: employees[0], checkIn: "07:52", checkOut: "—", hours: "06:18", location: "الفرع الرئيسي", state: "حاضر" },
  { employee: employees[1], checkIn: "08:01", checkOut: "—", hours: "06:09", location: "الفرع الرئيسي", state: "حاضر" },
  { employee: employees[3], checkIn: "08:14", checkOut: "—", hours: "05:56", location: "الفرع الرئيسي", state: "متأخر" },
  { employee: employees[4], checkIn: "08:00", checkOut: "—", hours: "06:10", location: "عمل عن بُعد", state: "عن بُعد" },
  { employee: employees[5], checkIn: "07:48", checkOut: "—", hours: "06:22", location: "فرع جدة", state: "حاضر" },
  { employee: employees[6], checkIn: "08:22", checkOut: "—", hours: "05:48", location: "الفرع الرئيسي", state: "متأخر" }
];

const leaveRequests = [
  { id: 1, employee: employees[6], type: "إجازة سنوية", dates: "14 يوليو - 18 يوليو", days: "5 أيام", balance: "الرصيد بعد الطلب: 16 يومًا" },
  { id: 2, employee: employees[4], type: "إجازة اضطرارية", dates: "15 يوليو", days: "يوم واحد", balance: "الرصيد بعد الطلب: 3 أيام" },
  { id: 3, employee: employees[7], type: "إجازة سنوية", dates: "20 يوليو - 24 يوليو", days: "5 أيام", balance: "الرصيد بعد الطلب: 19 يومًا" }
];

let totalEmployees = 248;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const formatCurrency = value => new Intl.NumberFormat("ar-SA").format(Number(value)) + " ر.س";
const escapeHTML = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[char]);
const statusClass = status => status === "نشط" || status === "حاضر" ? "active" : status === "في إجازة" || status === "متأخر" ? "leave" : "remote";

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("");
}

function employeeCell(employee) {
  return `<div class="employee-cell"><span class="employee-avatar ${escapeHTML(employee.tone || "blue")}">${escapeHTML(employee.initials)}</span><span class="employee-copy"><strong>${escapeHTML(employee.name)}</strong><small>${escapeHTML(employee.id)}</small></span></div>`;
}

function renderEmployees(list = employees) {
  const body = $("#employeesBody");
  if (!body) return;
  body.innerHTML = list.length ? list.map(employee => `<tr>
    <td>${employeeCell(employee)}</td>
    <td><div class="employee-copy"><strong>${escapeHTML(employee.role)}</strong><small>${escapeHTML(employee.department)}</small></div></td>
    <td>${escapeHTML(employee.manager)}</td>
    <td>${escapeHTML(employee.joinDate)}</td>
    <td><span class="status ${statusClass(employee.status)}">${escapeHTML(employee.status)}</span></td>
    <td><b>${formatCurrency(employee.salary)}</b></td>
    <td><div class="row-actions"><button data-view-employee="${escapeHTML(employee.id)}" aria-label="عرض ملف ${escapeHTML(employee.name)}"><svg><use href="#i-eye"/></svg></button><button data-more-employee="${escapeHTML(employee.id)}" aria-label="خيارات"><svg><use href="#i-more"/></svg></button></div></td>
  </tr>`).join("") : `<tr><td colspan="7" style="text-align:center;padding:35px;color:var(--muted)">لا توجد نتائج مطابقة.</td></tr>`;
  $("#employeeResultCount").textContent = list.length;
}

function renderRecentEmployees() {
  const body = $("#recentEmployeesBody");
  body.innerHTML = employees.slice(-4).reverse().map(employee => `<tr><td>${employeeCell(employee)}</td><td>${escapeHTML(employee.role)}</td><td>${escapeHTML(employee.department)}</td><td>${escapeHTML(employee.joinDate)}</td><td><span class="status ${statusClass(employee.status)}">${escapeHTML(employee.status)}</span></td></tr>`).join("");
}

function renderAttendance(query = "") {
  const normalized = query.trim().toLowerCase();
  const list = attendance.filter(item => item.employee.name.toLowerCase().includes(normalized) || item.employee.id.toLowerCase().includes(normalized));
  $("#attendanceBody").innerHTML = list.map(item => `<tr><td>${employeeCell(item.employee)}</td><td><b>${item.checkIn}</b></td><td>${item.checkOut}</td><td>${item.hours}</td><td>${item.location}</td><td><span class="status ${statusClass(item.state)}">${item.state}</span></td></tr>`).join("");
}

function renderLeaves() {
  const wrap = $("#leaveRequests");
  wrap.innerHTML = leaveRequests.length ? leaveRequests.map(request => `<div class="request-item" data-request-id="${request.id}">
    <div>${employeeCell(request.employee)}</div>
    <div class="request-days"><strong>${request.type} · ${request.days}</strong><small>${request.balance}</small></div>
    <div class="request-date">${request.dates}</div>
    <div class="request-actions"><button class="approve" data-leave-action="approve" data-id="${request.id}">اعتماد</button><button class="reject" data-leave-action="reject" data-id="${request.id}">رفض</button></div>
  </div>`).join("") : `<div style="padding:35px;text-align:center;color:var(--muted);font-size:11px">رائع! لا توجد طلبات معلقة.</div>`;
  $("#pendingLeaves").textContent = leaveRequests.length;
}

function navigate(page, pushHash = true) {
  const target = $(`#page-${page}`) || $("#page-dashboard");
  $$(".page").forEach(section => section.classList.toggle("active", section === target));
  $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === page));
  $("#crumbTitle").textContent = target.dataset.title || "لوحة التحكم";
  document.title = `${target.dataset.title || "لوحة التحكم"} | مسار الذكي ERP`;
  if (pushHash && location.hash !== `#${page}`) history.replaceState(null, "", `#${page}`);
  closeSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.removeAttribute("inert");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("input, select, button", modal)?.focus(), 50);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("inert", "");
  if (!$(".modal.open")) document.body.style.overflow = "";
}

function toast(message, type = "success") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.innerHTML = `<span>${type === "error" ? "!" : "✓"}</span><b>${escapeHTML(message)}</b>`;
  $("#toastRegion").appendChild(node);
  setTimeout(() => { node.style.opacity = "0"; node.style.transform = "translateY(8px)"; }, 3000);
  setTimeout(() => node.remove(), 3350);
}

function filterEmployees() {
  const query = $("#employeeSearch").value.trim().toLowerCase();
  const department = $("#departmentFilter").value;
  const status = $("#statusFilter").value;
  const filtered = employees.filter(employee => {
    const haystack = `${employee.name} ${employee.id} ${employee.role} ${employee.department}`.toLowerCase();
    return (!query || haystack.includes(query)) && (department === "all" || employee.department === department) && (status === "all" || employee.status === status);
  });
  renderEmployees(filtered);
}

function showEmployeeProfile(id) {
  const employee = employees.find(item => item.id === id);
  if (!employee) return;
  $("#profileContent").innerHTML = `<div class="profile-cover"></div><div class="profile-summary"><span class="profile-big-avatar">${escapeHTML(employee.initials)}</span><div><h2>${escapeHTML(employee.name)}</h2><p>${escapeHTML(employee.role)} · ${escapeHTML(employee.department)} · <span class="status ${statusClass(employee.status)}">${escapeHTML(employee.status)}</span></p></div></div><div class="profile-body"><div class="profile-info-box"><small>الرقم الوظيفي</small><strong>${escapeHTML(employee.id)}</strong></div><div class="profile-info-box"><small>المدير المباشر</small><strong>${escapeHTML(employee.manager)}</strong></div><div class="profile-info-box"><small>تاريخ التعيين</small><strong>${escapeHTML(employee.joinDate)}</strong></div><div class="profile-info-box"><small>الراتب الأساسي</small><strong>${formatCurrency(employee.salary)}</strong></div><div class="profile-info-box"><small>البريد الإلكتروني</small><strong>${escapeHTML(employee.email)}</strong></div><div class="profile-info-box"><small>رقم الجوال</small><strong>${escapeHTML(employee.phone)}</strong></div></div>`;
  openModal("#profileModal");
}

function showAdminProfile() {
  $("#profileContent").innerHTML = `<div class="profile-cover"></div><div class="profile-summary"><span class="profile-big-avatar">بش</span><div><h2>بدر الشافعي</h2><p>مدير النظام · كامل الصلاحيات · <span class="status active">متصل الآن</span></p></div></div><div class="profile-body"><div class="profile-info-box"><small>البريد الإلكتروني</small><strong>admin@masar-erp.com</strong></div><div class="profile-info-box"><small>آخر تسجيل دخول</small><strong>اليوم، 09:42 ص</strong></div><div class="profile-info-box"><small>الدور</small><strong>مدير النظام</strong></div><div class="profile-info-box"><small>التحقق الثنائي</small><strong>مفعّل وآمن</strong></div></div>`;
  openModal("#profileModal");
}

function exportCSV() {
  const header = ["الرقم الوظيفي", "الاسم", "المسمى", "الإدارة", "المدير", "التعيين", "الحالة", "الراتب"];
  const rows = employees.map(e => [e.id, e.name, e.role, e.department, e.manager, e.joinDate, e.status, e.salary]);
  const csv = [header, ...rows].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "masar-employees.csv";
  link.click();
  URL.revokeObjectURL(url);
  toast("تم تصدير ملف الموظفين بنجاح");
}

function toggleTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = dark ? "" : "dark";
  localStorage.setItem("masar-theme", dark ? "light" : "dark");
  $("#themeIcon use").setAttribute("href", dark ? "#i-moon" : "#i-sun");
}

function openSidebar() {
  $("#sidebar").classList.add("open");
  $("#sidebarOverlay").classList.add("open");
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#sidebarOverlay").classList.remove("open");
}

function updateClock() {
  const now = new Date();
  $("#liveClock").textContent = now.toLocaleTimeString("ar-SA", { hour12: true });
  $("#liveDate").textContent = now.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function handleGlobalSearch(value) {
  const q = value.trim().toLowerCase();
  if (!q) return;
  const pageMap = [
    { words: "موظف موظفين فريق", page: "employees" },
    { words: "حضور انصراف دوام بصمة", page: "attendance" },
    { words: "إجازة اجازة غياب", page: "leaves" },
    { words: "راتب رواتب مسير مالي", page: "payroll" },
    { words: "تقرير تقارير تحليل", page: "reports" },
    { words: "أمان صلاحيات مستخدم", page: "security" },
    { words: "إعدادات منشأة سياسة", page: "settings" }
  ];
  const match = pageMap.find(item => item.words.includes(q));
  const employeeMatch = employees.find(e => `${e.name} ${e.id} ${e.role}`.toLowerCase().includes(q));
  if (employeeMatch) { navigate("employees"); $("#employeeSearch").value = value; filterEmployees(); }
  else if (match) navigate(match.page);
  else toast("لم نعثر على نتيجة مباشرة، جرّب كلمة أخرى", "error");
}

function initEvents() {
  $$(".nav-item").forEach(item => item.addEventListener("click", () => navigate(item.dataset.page)));
  $$('[data-page-link]').forEach(button => button.addEventListener("click", () => navigate(button.dataset.pageLink)));
  $$('[data-action="add-employee"]').forEach(button => button.addEventListener("click", () => openModal("#employeeModal")));
  $$('[data-action="export"]').forEach(button => button.addEventListener("click", () => toast("تم تجهيز التقرير التجريبي للتصدير")));
  $("#exportEmployees").addEventListener("click", exportCSV);
  $("#themeBtn").addEventListener("click", toggleTheme);
  $("#menuBtn").addEventListener("click", openSidebar);
  $("#sidebarOverlay").addEventListener("click", closeSidebar);
  $("#profileBtn").addEventListener("click", showAdminProfile);

  $("#notifyBtn").addEventListener("click", event => { event.stopPropagation(); $("#notifications").classList.toggle("open"); });
  $("#notifications").addEventListener("click", event => event.stopPropagation());
  document.addEventListener("click", () => $("#notifications").classList.remove("open"));
  $("#markRead").addEventListener("click", () => { $(".notification-dot").style.display = "none"; toast("تم تحديد التنبيهات كمقروءة"); });

  $("#backupBtn").addEventListener("click", () => {
    const now = new Date();
    $("#backupTime").textContent = `آخر نسخة: ${now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}`;
    toast("اكتملت النسخة الاحتياطية المشفرة");
  });

  $("#employeeSearch").addEventListener("input", filterEmployees);
  $("#departmentFilter").addEventListener("change", filterEmployees);
  $("#statusFilter").addEventListener("change", filterEmployees);
  $("#resetFilters").addEventListener("click", () => { $("#employeeSearch").value = ""; $("#departmentFilter").value = "all"; $("#statusFilter").value = "all"; filterEmployees(); });
  $("#attendanceSearch").addEventListener("input", event => renderAttendance(event.target.value));

  $("#employeesBody").addEventListener("click", event => {
    const view = event.target.closest("[data-view-employee]");
    const more = event.target.closest("[data-more-employee]");
    if (view) showEmployeeProfile(view.dataset.viewEmployee);
    if (more) toast("خيارات التعديل والأرشفة جاهزة للربط بقاعدة البيانات");
  });

  $("#employeeForm").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const employee = {
      id: data.id,
      name: data.name,
      initials: initials(data.name),
      tone: ["blue", "green", "gold", "purple"][employees.length % 4],
      role: data.role,
      department: data.department,
      manager: data.manager || "غير محدد",
      joinDate: data.joinDate.replaceAll("-", "/"),
      status: data.status,
      salary: Number(data.salary),
      email: "—",
      phone: "—"
    };
    employees.unshift(employee);
    totalEmployees += 1;
    $("#totalEmployees").textContent = totalEmployees;
    $("#navEmployees").textContent = totalEmployees;
    renderEmployees();
    renderRecentEmployees();
    event.currentTarget.reset();
    closeModal($("#employeeModal"));
    navigate("employees");
    toast(`تمت إضافة ${employee.name} بنجاح`);
  });

  $$('[data-close-modal]').forEach(el => el.addEventListener("click", () => closeModal($("#employeeModal"))));
  $$('[data-close-profile]').forEach(el => el.addEventListener("click", () => closeModal($("#profileModal"))));
  $$('[data-close-confirm]').forEach(el => el.addEventListener("click", () => closeModal($("#confirmModal"))));

  $("#leaveRequests").addEventListener("click", event => {
    const button = event.target.closest("[data-leave-action]");
    if (!button) return;
    const id = Number(button.dataset.id);
    const index = leaveRequests.findIndex(request => request.id === id);
    if (index < 0) return;
    const [request] = leaveRequests.splice(index, 1);
    renderLeaves();
    toast(button.dataset.leaveAction === "approve" ? `تم اعتماد طلب ${request.employee.name}` : `تم رفض طلب ${request.employee.name}`, button.dataset.leaveAction === "approve" ? "success" : "error");
  });

  $("#newLeaveBtn").addEventListener("click", () => toast("تم فتح نموذج طلب إجازة تجريبي"));
  $("#checkInBtn").addEventListener("click", event => { event.currentTarget.textContent = "تم تسجيل الحضور ✓"; event.currentTarget.disabled = true; toast("تم تسجيل حضورك مع التحقق من الموقع"); });
  $("#runPayrollBtn").addEventListener("click", () => openModal("#confirmModal"));
  $("#confirmPayroll").addEventListener("click", () => { closeModal($("#confirmModal")); $("#runPayrollBtn").textContent = "المسير قيد المراجعة"; $("#runPayrollBtn").disabled = true; toast("تم احتساب مسير يوليو لـ 248 موظفًا"); });

  $$("[data-report]").forEach(button => button.addEventListener("click", () => toast(`تم تجهيز ${button.dataset.report} للعرض`)));
  $("#customReportBtn").addEventListener("click", () => toast("منشئ التقارير المخصصة جاهز للربط"));
  $("#addRoleBtn").addEventListener("click", () => toast("يمكن إضافة الدور بعد ربط نظام المستخدمين"));
  $("#saveSettings").addEventListener("click", () => { $("#settingsForm").requestSubmit(); });
  $("#settingsForm").addEventListener("submit", event => { event.preventDefault(); toast("تم حفظ إعدادات النظام"); });

  $("#globalSearch").addEventListener("keydown", event => { if (event.key === "Enter") { handleGlobalSearch(event.currentTarget.value); event.currentTarget.value = ""; } });
  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#globalSearch").focus(); }
    if (event.key === "Escape") { $$(".modal.open").forEach(closeModal); $("#notifications").classList.remove("open"); closeSidebar(); }
  });
}

function init() {
  const savedTheme = localStorage.getItem("masar-theme");
  if (savedTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
    $("#themeIcon use").setAttribute("href", "#i-sun");
  }
  renderEmployees();
  renderRecentEmployees();
  renderAttendance();
  renderLeaves();
  updateClock();
  setInterval(updateClock, 1000);
  initEvents();
  const requestedPage = location.hash.replace("#", "");
  navigate($("#page-" + requestedPage) ? requestedPage : "dashboard", false);
}

document.addEventListener("DOMContentLoaded", init);
