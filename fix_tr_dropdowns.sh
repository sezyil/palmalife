#!/bin/bash

echo "TR klasöründeki dil seçimi dropdown'ları güncelleniyor..."

# TR klasöründeki tüm HTML dosyalarında dil seçimi dropdown'ını güncelle
find tr/ -name "*.html" -exec sed -i '' 's/<option value="en" selected="">English<\/option>/<option value="en">English<\/option>/g' {} \;
find tr/ -name "*.html" -exec sed -i '' 's/<option value="tr">Türkçe<\/option>/<option value="tr" selected="">Türkçe<\/option>/g' {} \;

echo "TR klasöründeki dil seçimi dropdown'ları güncellendi!" 