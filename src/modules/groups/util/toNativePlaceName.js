const map = {
    "Afghanistan": "افغانستان",
    "Albania": "Shqipëria",
    "Algeria": "الجزائر",
    "American Samoa": "Amerika Sāmoa",
    "Andorra": "Andorra",
    "Angola": "Angola",
    "Anguilla": "Anguilla",
    "Antigua and Barbuda": "Antigua and Barbuda",
    "Armenia": "Հայաստան",
    "Aruba": "Aruba",
    "Austria": "Österreich",
    "Azerbaijan": "Azərbaycan",
    "Bahrain": "البحرين",
    "Bangladesh": "বাংলাদেশ",
    "Belarus": "Беларусь",
    "Belgium": "België",
    "Benin": "Bénin",
    "Bhutan": "འབྲུག་ཡུལ",
    "Bolivia": "Bolivia",
    "Bosnia and Herzegovina": "Босна и Херцеговина",
    "Brazil": "Brasil",
    "Brunei": "بروني",
    "Bulgaria": "България",
    "Cambodia": "កម្ពុជា",
    "Cameroon": "Cameroun",
    "Cape Verde": "Cabo Verde",
    "Central African Republic": "Ködörösêse tî Bêafrîka",
    "Chad": "تشاد",
    "China": "中國",
    "Comoros": "Komori",
    "Democratic Republic of Congo": "République démocratique du Congo",
    "Croatia": "Hrvatska",
    "Cyprus": "Κύπρος",
    "Czech Republic": "Česká republika",
    "Denmark": "Danmark",
    "Djibouti": "جيبوتي",
    "Dominican Republic": "República Dominicana",
    "Egypt": "مصر",
    "Equatorial Guinea": "Guinea Ecuatorial",
    "Eritrea": "إرتريا",
    "Estonia": "Eesti",
    "Ethiopia": "ኢትዮጵያ",
    "Faroe Islands": "Føroyar",
    "Fiji": "फ़िजी",
    "Finland": "Suomi",
    "French Guiana": "Guyane",
    "French Polynesia": "Polynésie française",
    "Georgia": "საქართველო",
    "Germany": "Deutschland",
    "Greece": "Ελλάς",
    "Greenland": "Kalaallit Nunaat",
    "Guam": "Guåhån",
    "Guinea": "Guinée",
    "Haiti": "Haïti",
    "Hong Kong": "香港",
    "Hungary": "Magyarország",
    "Iceland": "Ísland",
    "India": "भारत",
    "Iran": "ایران",
    "Iraq": "العراق",
    "Ireland": "Éire",
    "Israel": "ישראל",
    "Italy": "Italia",
    "Japan": "日本",
    "Jersey": "Jersey",
    "Jordan": "الأردن",
    "Kazakhstan": "Қазақстан",
    "Democratic People's Republic of Korea": "조선",
    "Republic of Korea": "한국",
    "Kosovo": "Kosova",
    "Kuwait": "الكويت",
    "Kyrgyzstan": "Кыргызстан",
    "Laos": "ປະເທດລາວ",
    "Latvia": "Latvija",
    "Lebanon": "لبنان",
    "Libya": "ليبيا",
    "Lithuania": "Lietuva",
    "Luxembourg": "Lëtzebuerg",
    "Macedonia": "Македонија",
    "Madagascar": "Madagasikara",
    "Maldives": "Dhivehi Raajje",
    "Mauritania": "موريتانيا",
    "Mauritius": "Maurice",
    "Mexico": "México",
    "Mongolia": "Монгол Улс",
    "Montenegro": "Црна Гора",
    "Morocco": "المغرب",
    "Mozambique": "Moçambique",
    "Myanmar": "မြန်မာ",
    "Namibia": "Namibia",
    "Nauru": "Naoero",
    "Nepal": "नेपाल",
    "Netherlands": "Nederland",
    "New Caledonia": "Nouvelle - Calédonie",
    "New Zealand": "Aotearoa",
    "Niue": "Niuē",
    "Norway": "Norge",
    "Oman": "عُمان",
    "Pakistan": "پاکستان",
    "Palau": "Belau",
    "Palestinian territories": "فلسطين",
    "Panama": "Panamá",
    "Papua New Guinea": "Papua Niugini",
    "Peru": "Perú",
    "Philippines": "Pilipinas",
    "Poland": "Polska",
    "Qatar": "قطر",
    "Reunion": "Réunion",
    "Romania": "România",
    "Russian Federation": "Российская Федерация",
    "Saint Barthelemy": "Saint - Barthélemy",
    "Saint Martin": "Sint Maarten",
    "Saint Pierre and Miquelon": "Saint - Pierre et Miquelon",
    "Sao Tome and Principe": "São Tomé e Príncipe",
    "Saudi Arabia": "المملكة العربية السعودية",
    "Senegal": "Sénégal",
    "Serbia": "Србија",
    "Seychelles": "Sesel",
    "Singapore": "Singapura",
    "Slovakia": "Slovensko",
    "Slovenia": "Slovenija",
    "Somalia": "Soomaaliya",
    "South Africa": "Suid - Afrika",
    "Spain": "España",
    "Sri Lanka": "ශ්‍රී ලංකාව",
    "Sudan": "السودان",
    "Sweden": "Sverige",
    "Switzerland": "Suisse",
    "Syria": "سورية",
    "Taiwan": "中華民國",
    "Tajikistan": "Тоҷикистон",
    "Thailand": "เมืองไทย",
    "Tunisia": "تونس",
    "Turkey": "Türkiye",
    "Turkmenistan": "Türkmenistan",
    "Ukraine": "Україна",
    "United Arab Emirates": "الإمارات العربيّة المتّحدة",
    "Uruguay": "República Oriental del Uruguay",
    "Uzbekistan": "Ўзбекистон",
    "Vanuatu": "Vanuatu",
    "Vatican City": "Città del Vaticano",
    "Vietnam": "Việt Nam",
    "Wales": "Cymru",
    "Wallis and Futuna": "Wallis - et - Futuna",
    "Yemen": "اليمن",
}

export default function toNativePlaceName(englishPlaceName) {
    return map[englishPlaceName] || ''
}