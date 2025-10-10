#!/bin/bash

# Build and Performance Analysis Script
# Builds the project and generates detailed performance reports

set -e

echo "🚀 MagicUnicorn.tech 2026 - Build & Performance Analysis"
echo "========================================================"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
echo "   ✓ Cleaned dist/ directory"
echo ""

# Run production build
echo "📦 Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo ""

# Analyze bundle sizes
echo "📊 Bundle Size Analysis:"
echo "========================"
echo ""

total_js_size=0
total_css_size=0
total_asset_size=0

# JavaScript files
echo "JavaScript Bundles:"
for file in dist/assets/js/*.js; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        size_kb=$((size / 1024))

        # Check if gzipped version exists
        if [ -f "${file}.gz" ]; then
            gz_size=$(stat -f%z "${file}.gz" 2>/dev/null || stat -c%s "${file}.gz")
            gz_size_kb=$((gz_size / 1024))
            echo "   $(basename $file): ${size_kb}KB (${gz_size_kb}KB gzipped)"
        else
            echo "   $(basename $file): ${size_kb}KB"
        fi

        total_js_size=$((total_js_size + size))
    fi
done

echo ""

# CSS files
echo "CSS Bundles:"
for file in dist/assets/css/*.css; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        size_kb=$((size / 1024))

        if [ -f "${file}.gz" ]; then
            gz_size=$(stat -f%z "${file}.gz" 2>/dev/null || stat -c%s "${file}.gz")
            gz_size_kb=$((gz_size / 1024))
            echo "   $(basename $file): ${size_kb}KB (${gz_size_kb}KB gzipped)"
        else
            echo "   $(basename $file): ${size_kb}KB"
        fi

        total_css_size=$((total_css_size + size))
    fi
done

echo ""

# Other assets
echo "Other Assets:"
for file in dist/assets/**/*.*; do
    if [ -f "$file" ] && [[ ! "$file" =~ \.(js|css)$ ]]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        size_kb=$((size / 1024))
        if [ $size_kb -gt 50 ]; then
            echo "   $(basename $file): ${size_kb}KB"
        fi
        total_asset_size=$((total_asset_size + size))
    fi
done

echo ""
echo "📈 Total Bundle Sizes:"
echo "====================="
total_js_kb=$((total_js_size / 1024))
total_css_kb=$((total_css_size / 1024))
total_asset_kb=$((total_asset_size / 1024))
total_all_kb=$((total_js_kb + total_css_kb + total_asset_kb))

echo "   JavaScript:  ${total_js_kb}KB"
echo "   CSS:         ${total_css_kb}KB"
echo "   Assets:      ${total_asset_kb}KB"
echo "   ─────────────────────────"
echo "   TOTAL:       ${total_all_kb}KB"

# Check if within target
target_kb=400
if [ $total_all_kb -lt $target_kb ]; then
    echo "   ✅ UNDER TARGET (${target_kb}KB gzipped)"
else
    echo "   ⚠️  OVER TARGET (${target_kb}KB gzipped)"
fi

echo ""

# Check for bundle analyzer report
if [ -f "dist/stats.html" ]; then
    echo "📊 Bundle analyzer report generated: dist/stats.html"
    echo "   Run 'open dist/stats.html' to view visual analysis"
else
    echo "⚠️  Bundle analyzer report not found"
fi

echo ""

# Check for compression
echo "🗜️  Compression Check:"
echo "====================="
gzip_count=$(find dist -name "*.gz" | wc -l)
brotli_count=$(find dist -name "*.br" | wc -l)
echo "   Gzip files:   $gzip_count"
echo "   Brotli files: $brotli_count"

if [ $gzip_count -gt 0 ] && [ $brotli_count -gt 0 ]; then
    echo "   ✅ Compression enabled"
else
    echo "   ⚠️  Compression may not be working correctly"
fi

echo ""

# Performance recommendations
echo "💡 Performance Recommendations:"
echo "================================"
echo ""

# Check for large chunks
large_chunks=$(find dist/assets -name "*.js" -size +200k)
if [ ! -z "$large_chunks" ]; then
    echo "⚠️  Large JavaScript chunks detected (>200KB):"
    for chunk in $large_chunks; do
        size=$(stat -f%z "$chunk" 2>/dev/null || stat -c%s "$chunk")
        size_kb=$((size / 1024))
        echo "   - $(basename $chunk): ${size_kb}KB"
    done
    echo "   Consider further code splitting or lazy loading"
    echo ""
fi

# Check for unoptimized images
large_images=$(find dist -name "*.jpg" -o -name "*.png" | xargs ls -l 2>/dev/null | awk '$5 > 500000 {print $9}')
if [ ! -z "$large_images" ]; then
    echo "⚠️  Large images detected (>500KB):"
    for img in $large_images; do
        size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        size_kb=$((size / 1024))
        echo "   - $(basename $img): ${size_kb}KB"
    done
    echo "   Run ./scripts/optimize-images.sh to optimize"
    echo ""
fi

# Next steps
echo "📋 Next Steps:"
echo "=============="
echo "1. Review bundle analyzer: open dist/stats.html"
echo "2. Test production build: npm run preview"
echo "3. Run Lighthouse audit"
echo "4. Optimize large images: ./scripts/optimize-images.sh"
echo "5. Deploy and monitor real-world performance"
echo ""

echo "✨ Analysis complete!"
