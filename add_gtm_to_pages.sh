#!/bin/bash

# GTM Head script
GTM_HEAD='    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\"gtm.start\":
    new Date().getTime(),event:\"gtm.js\"});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!=\"dataLayer\"?\"&l=\"+l:\"\";j.async=true;j.src=
    \"https://www.googletagmanager.com/gtm.js?id=\"+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,\"script\",\"dataLayer\",\"GTM-P9D5BHGQ\");</script>
    <!-- End Google Tag Manager -->'

# GTM Body script
GTM_BODY='    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-P9D5BHGQ\"
    height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->'

echo "Adding GTM to all HTML files..."

# Find all HTML files and add GTM
find . -name "*.html" -type f | while read file; do
    echo "Processing: $file"
    
    # Add GTM head script before </head>
    if ! grep -q "Google Tag Manager" "$file"; then
        # Add head script
        sed -i '' '/^<\/head>/i\
'"$GTM_HEAD"'
' "$file"
        
        # Add body script after <body>
        sed -i '' '/^<body>/a\
'"$GTM_BODY"'
' "$file"
        
        echo "✓ Added GTM to $file"
    else
        echo "⚠ GTM already exists in $file"
    fi
done

echo "GTM addition completed!" 