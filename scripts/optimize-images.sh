#!/bin/bash

# Image Optimization Script for MagicUnicorn.tech
# Requires: sharp-cli (npm install -g sharp-cli)

set -e

echo "🖼️  MagicUnicorn.tech Image Optimization"
echo "========================================"
echo ""

# Check if sharp-cli is installed
if ! command -v sharp &> /dev/null; then
    echo "⚠️  sharp-cli not found. Installing..."
    npm install -g sharp-cli
fi

# Create output directories
mkdir -p public/portfolio-assets/optimized
mkdir -p public/portfolio-assets/webp

echo "📦 Step 1: Compressing JPEG images (85% quality)..."
for img in public/portfolio-assets/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "   Compressing: $filename"
        sharp -i "$img" -o "public/portfolio-assets/optimized/$filename" \
            --quality 85 --progressive --withMetadata
    fi
done

echo ""
echo "🌐 Step 2: Generating WebP versions (85% quality)..."
for img in public/portfolio-assets/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        echo "   Converting: $filename.jpg → $filename.webp"
        sharp -i "$img" -o "public/portfolio-assets/webp/${filename}.webp" \
            --format webp --quality 85
    fi
done

echo ""
echo "📱 Step 3: Generating 2x (retina) WebP versions..."
for img in public/portfolio-assets/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        echo "   Creating 2x: ${filename}@2x.webp"
        sharp -i "$img" -o "public/portfolio-assets/webp/${filename}@2x.webp" \
            --format webp --quality 85 --resize 2000
    fi
done

echo ""
echo "📊 Step 4: Size comparison report..."
echo ""

original_size=0
optimized_size=0

for img in public/portfolio-assets/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        orig_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        opt_file="public/portfolio-assets/optimized/$filename"

        if [ -f "$opt_file" ]; then
            opt_size=$(stat -f%z "$opt_file" 2>/dev/null || stat -c%s "$opt_file")
            reduction=$((100 - (opt_size * 100 / orig_size)))

            echo "   $filename:"
            echo "      Original:  $(numfmt --to=iec-i --suffix=B $orig_size 2>/dev/null || echo $orig_size bytes)"
            echo "      Optimized: $(numfmt --to=iec-i --suffix=B $opt_size 2>/dev/null || echo $opt_size bytes)"
            echo "      Savings:   ${reduction}%"
            echo ""

            original_size=$((original_size + orig_size))
            optimized_size=$((optimized_size + opt_size))
        fi
    fi
done

total_reduction=$((100 - (optimized_size * 100 / original_size)))

echo "📈 Total Results:"
echo "   Original total:  $(numfmt --to=iec-i --suffix=B $original_size 2>/dev/null || echo $original_size bytes)"
echo "   Optimized total: $(numfmt --to=iec-i --suffix=B $optimized_size 2>/dev/null || echo $optimized_size bytes)"
echo "   Total savings:   ${total_reduction}%"
echo ""

echo "✅ Image optimization complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Review optimized images in public/portfolio-assets/optimized/"
echo "   2. Review WebP images in public/portfolio-assets/webp/"
echo "   3. Replace original images with optimized versions"
echo "   4. Update image references to use OptimizedImage component"
echo ""
