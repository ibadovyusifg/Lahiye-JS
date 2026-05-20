var fenler = [
    {
        kod: "CS301",
        seviyye: "Bakalavr",
        ad: "Şəbəkə Təhlükəsizliyi",
        haqqinda: "Kompüter şəbəkələrinin təhlükəsizlik prinsipləri, protokollar və müdafiə mexanizmləri.",
        kredit: "6 kredit",
        saat: "60 saat",
        semestr: "5-ci semestr"
    },
    {
        kod: "CS302",
        seviyye: "Bakalavr",
        ad: "Kriptoqrafiya və Məlumat Şifrələməsi",
        haqqinda: "Kriptoqrafik alqoritmlər, rəqəmsal imzalar və şifrələmə texnikaları.",
        kredit: "6 kredit",
        saat: "60 saat",
        semestr: "6-cı semestr"
    },
    {
        kod: "CS303",
        seviyye: "Bakalavr",
        ad: "Etik Hacking və Penetrasiya Testi",
        haqqinda: "Sistemlərin təhlükəsizlik zəifliklərinin müəyyən edilməsi və test metodları.",
        kredit: "5 kredit",
        saat: "50 saat",
        semestr: "7-ci semestr"
    },
    {
        kod: "CS304",
        seviyye: "Bakalavr",
        ad: "Veb Təhlükəsizliyi",
        haqqinda: "Veb tətbiqlərinin təhlükəsizliyi, OWASP Top 10 və müdafiə strategiyaları.",
        kredit: "5 kredit",
        saat: "50 saat",
        semestr: "6-cı semestr"
    },
    {
        kod: "CS305",
        seviyye: "Bakalavr",
        ad: "Malware Analizi",
        haqqinda: "Təhlükəli proqram təminatının təhlili və reverse engineering.",
        kredit: "5 kredit",
        saat: "50 saat",
        semestr: "7-ci semestr"
    },
    {
        kod: "CS401",
        seviyye: "Bakalavr",
        ad: "İnformasiya Təhlükəsizliyi İdarəetməsi",
        haqqinda: "ISO 27001, risk idarəetməsi və təhlükəsizlik siyasətləri.",
        kredit: "5 kredit",
        saat: "50 saat",
        semestr: "8-ci semestr"
    },
    {
        kod: "MS501",
        seviyye: "Magistr",
        ad: "Qabaqcıl Kibertəhlükəsizlik",
        haqqinda: "Müasir kiberhücumlar və qabaqcıl müdafiə texnikaları.",
        kredit: "8 kredit",
        saat: "80 saat",
        semestr: "1-ci semestr"
    },
    {
        kod: "MS502",
        seviyye: "Magistr",
        ad: "Cloud və Konteyner Təhlükəsizliyi",
        haqqinda: "Bulud mühitləri və konteyner texnologiyalarının təhlükəsizliyi.",
        kredit: "7 kredit",
        saat: "70 saat",
        semestr: "1-ci semestr"
    },
    {
        kod: "MS503",
        seviyye: "Magistr",
        ad: "IoT və Mobil Təhlükəsizlik",
        haqqinda: "IoT cihazları və mobil tətbiqlərin təhlükəsizlik aspektləri.",
        kredit: "7 kredit",
        saat: "70 saat",
        semestr: "2-ci semestr"
    },
    {
        kod: "MS504",
        seviyye: "Magistr",
        ad: "Rəqəmsal Məhkəmə Ekspertizası",
        haqqinda: "Rəqəmsal sübutların toplanması və təhlili.",
        kredit: "7 kredit",
        saat: "70 saat",
        semestr: "2-ci semestr"
    }
];

var aktivFilter = "Hamısı";

function kreditSozu() {
    var dil = localStorage.getItem("sayt_dili") || "az";
    if (dil == "en") return "credits";
    if (dil == "ru") return "кредитов";
    return "kredit";
}
function saatSozu() {
    var dil = localStorage.getItem("sayt_dili") || "az";
    if (dil == "en") return "hours";
    if (dil == "ru") return "часов";
    return "saat";
}
function semestrSozu(metn) {
    var dil = localStorage.getItem("sayt_dili") || "az";
    if (dil == "az") return metn;
    var reqem = metn.split("-")[0];
    if (dil == "en") return reqem + " semester";
    if (dil == "ru") return reqem + " семестр";
    return metn;
}

function fenleriYukle() {
    var list = document.getElementById("courseList");
    var html = "";
    var gosterilecek = [];
    if (aktivFilter == "Hamısı") {
        gosterilecek = fenler;
    } else {
        for (var i = 0; i < fenler.length; i++) {
            if (fenler[i].seviyye == aktivFilter) {
                gosterilecek.push(fenler[i]);
            }
        }
    }

    if (gosterilecek.length == 0) {
        list.innerHTML = '<div style="text-align:center; padding:60px; color:dimgray; grid-column: 1 / -1;">Bu kateqoriyada fənn tapılmadı</div>';
        return;
    }

    for (var i = 0; i < gosterilecek.length; i++) {
        var f = gosterilecek[i];
        var kodClass = "badge-code";
        if (f.seviyye == "Magistr") {
            kodClass = "badge-code-ms";
        }

        html += '<div class="course-card">';
        html += '<div class="badges">';
        html += '<span class="' + kodClass + '">' + f.kod + '</span>';
        html += '<span class="badge-level">' + f.seviyye + '</span>';
        html += '</div>';
        html += '<h3>' + f.ad + '</h3>';
        html += '<p class="desc">' + f.haqqinda + '</p>';
        html += '<div class="meta">';
        html += '<span>📖 ' + f.kredit.split(" ")[0] + ' ' + kreditSozu() + '</span>';
        html += '<span>🕐 ' + f.saat.split(" ")[0] + ' ' + saatSozu() + '</span>';
        html += '<span>👤 ' + semestrSozu(f.semestr) + '</span>';
        html += '</div>';
        html += '</div>';
    }

    list.innerHTML = html;
}

function filterDeyish(yeniFilter) {
    aktivFilter = yeniFilter;
    var dugmeler = document.querySelectorAll(".filter-btn");
    for (var i = 0; i < dugmeler.length; i++) {
        dugmeler[i].classList.remove("active");
        if (dugmeler[i].innerText == yeniFilter) {
            dugmeler[i].classList.add("active");
        }
    }

    fenleriYukle();
}
var kohne_dilDeyish_fn = window.dilDeyish;
window.dilDeyish = function(yeniDil) {
    if (kohne_dilDeyish_fn) kohne_dilDeyish_fn(yeniDil);
    fenleriYukle();
};

fenleriYukle();
