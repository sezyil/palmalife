#!/bin/bash

echo "TR klasöründeki sayfalar güncelleniyor..."

# Tüm HTML dosyalarında lang="zxx" -> lang="tr"
find tr/ -name "*.html" -exec sed -i '' 's/lang="zxx"/lang="tr"/g' {} \;

# Book Now -> Rezervasyon Yap
find tr/ -name "*.html" -exec sed -i '' 's/Book Now/Rezervasyon Yap/g' {} \;

# Home -> Ana Sayfa
find tr/ -name "*.html" -exec sed -i '' 's/>Home</>Ana Sayfa</g' {} \;

# Rooms & Suites -> Odalar & Suitler
find tr/ -name "*.html" -exec sed -i '' 's/Rooms \& Suites/Odalar \& Suitler/g' {} \;

# Restaurant & Bar -> Restoran & Bar
find tr/ -name "*.html" -exec sed -i '' 's/Restaurant \& Bar/Restoran \& Bar/g' {} \;

# Pool & Beach -> Havuz & Plaj
find tr/ -name "*.html" -exec sed -i '' 's/Pool \& Beach/Havuz \& Plaj/g' {} \;

# Spa & Wellness -> Spa & Wellness (aynı kalabilir)
# find tr/ -name "*.html" -exec sed -i '' 's/Spa \& Wellness/Spa \& Wellness/g' {} \;

# Celebrations -> Kutlamalar
find tr/ -name "*.html" -exec sed -i '' 's/Celebrations/Kutlamalar/g' {} \;

# Contact -> İletişim
find tr/ -name "*.html" -exec sed -i '' 's/>Contact</>İletişim</g' {} \;

# About -> Hakkımızda
find tr/ -name "*.html" -exec sed -i '' 's/>About</>Hakkımızda</g' {} \;

# Working Hours -> Çalışma Saatleri
find tr/ -name "*.html" -exec sed -i '' 's/Working Hours/Çalışma Saatleri/g' {} \;

# 24/7 Open -> 7/24 Açık
find tr/ -name "*.html" -exec sed -i '' 's/24\/7 Open/7\/24 Açık/g' {} \;

# Every day, including holidays -> Her gün, tatiller dahil
find tr/ -name "*.html" -exec sed -i '' 's/Every day, including holidays/Her gün, tatiller dahil/g' {} \;

# Follow Us -> Bizi Takip Edin
find tr/ -name "*.html" -exec sed -i '' 's/Follow Us/Bizi Takip Edin/g' {} \;

# Address -> Adres
find tr/ -name "*.html" -exec sed -i '' 's/>Address</>Adres</g' {} \;

# Check in / Check out -> Giriş / Çıkış
find tr/ -name "*.html" -exec sed -i '' 's/Check in \/ Check out/Giriş \/ Çıkış/g' {} \;

# Adults -> Yetişkin
find tr/ -name "*.html" -exec sed -i '' 's/>Adults</>Yetişkin</g' {} \;

# Childs -> Çocuk
find tr/ -name "*.html" -exec sed -i '' 's/>Childs</>Çocuk</g' {} \;

# Search -> Ara
find tr/ -name "*.html" -exec sed -i '' 's/value="Search"/value="Ara"/g' {} \;

# View Details -> Detayları Gör
find tr/ -name "*.html" -exec sed -i '' 's/View Details/Detayları Gör/g' {} \;

# Explore -> Keşfet
find tr/ -name "*.html" -exec sed -i '' 's/>Explore</>Keşfet</g' {} \;

# Newsletter -> Bülten
find tr/ -name "*.html" -exec sed -i '' 's/>Newsletter</>Bülten</g' {} \;

# Your email -> E-posta adresiniz
find tr/ -name "*.html" -exec sed -i '' 's/placeholder="Your email"/placeholder="E-posta adresiniz"/g' {} \;

# Receive latest offers and promos without spam. You can cancel anytime. -> En son teklifleri ve promosyonları spam olmadan alın. İstediğiniz zaman iptal edebilirsiniz.
find tr/ -name "*.html" -exec sed -i '' 's/Receive latest offers and promos without spam. You can cancel anytime./En son teklifleri ve promosyonları spam olmadan alın. İstediğiniz zaman iptal edebilirsiniz./g' {} \;

echo "TR klasöründeki sayfalar güncellendi!" 