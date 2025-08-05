#!/bin/bash

echo "TR klasöründeki dil seçimi scriptleri güncelleniyor..."

# TR klasöründeki tüm HTML dosyalarında dil seçimi scriptini güncelle
find tr/ -name "*.html" -exec sed -i '' 's/const savedLang = localStorage.getItem('\''selectedLanguage'\'') || '\''en'\'';/const savedLang = localStorage.getItem('\''selectedLanguage'\'') || '\''tr'\'';/g' {} \;

# TR klasöründeki tüm HTML dosyalarında dil değiştirme mantığını güncelle
find tr/ -name "*.html" -exec sed -i '' 's/if (selectedLang === '\''tr'\'') {/if (selectedLang === '\''en'\'') {/g' {} \;

# TR klasöründeki tüm HTML dosyalarında yönlendirme URL'lerini güncelle
find tr/ -name "*.html" -exec sed -i '' 's/window.location.href = '\''tr\/index.html'\'';/window.location.href = '\''..\/index.html'\'';/g' {} \;

# TR klasöründeki tüm HTML dosyalarında else bloğunu güncelle
find tr/ -name "*.html" -exec sed -i '' 's/} else {/} else {/g' {} \;

# TR klasöründeki tüm HTML dosyalarında else bloğundaki yönlendirmeyi güncelle
find tr/ -name "*.html" -exec sed -i '' 's/window.location.href = '\''index.html'\'';/window.location.href = '\''index.html'\'';/g' {} \;

echo "TR klasöründeki dil seçimi scriptleri güncellendi!" 