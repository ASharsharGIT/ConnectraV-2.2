/**
 * CONNECTRA MOBILE FIX VERIFICATION SCRIPT
 * Run this in the browser console (F12) to test mobile fixes
 * Date: November 17, 2025
 */

(function() {
    console.log('%c🔍 Connectra Mobile Fix Verification Script', 'font-size: 18px; font-weight: bold; color: #6B1F3C;');
    console.log('%c==============================================', 'color: #D4AF37;');
    
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };
    
    // Test 1: Check if critical CSS is loaded
    console.log('\n%c1️⃣ Testing Critical CSS Load...', 'font-weight: bold; color: #2C3E5F;');
    const criticalCSS = document.querySelector('link[href*="critical-mobile-fixes"]');
    if (criticalCSS) {
        results.passed.push('✅ critical-mobile-fixes.css is loaded');
        console.log('✅ Critical CSS file found:', criticalCSS.href);
    } else {
        results.failed.push('❌ critical-mobile-fixes.css NOT loaded');
        console.error('❌ Critical CSS file NOT found! Footer and video may not work on mobile.');
    }
    
    // Test 2: Check cache-busting version
    if (criticalCSS && criticalCSS.href.includes('v=20241117')) {
        results.passed.push('✅ Correct version (v=20241117)');
        console.log('✅ Cache-busting version is correct');
    } else if (criticalCSS) {
        results.warnings.push('⚠️ Version mismatch - may be cached');
        console.warn('⚠️ Version may be outdated. Expected: v=20241117');
    }
    
    // Test 3: Check footer element exists
    console.log('\n%c2️⃣ Testing Footer Elements...', 'font-weight: bold; color: #2C3E5F;');
    const footer = document.querySelector('.footer');
    const footerMain = document.querySelector('.footer-main');
    
    if (footer && footerMain) {
        results.passed.push('✅ Footer elements found');
        console.log('✅ Footer elements exist');
        
        // Test footer computed styles (on mobile width)
        const isMobileWidth = window.innerWidth <= 768;
        if (isMobileWidth) {
            const styles = window.getComputedStyle(footerMain);
            console.log('📱 Mobile viewport detected. Testing footer styles...');
            console.log('   Display:', styles.display);
            console.log('   Grid columns:', styles.gridTemplateColumns);
            
            if (styles.display === 'block' || styles.gridTemplateColumns === '1fr') {
                results.passed.push('✅ Footer uses mobile layout (stacked)');
                console.log('✅ Footer is correctly stacked for mobile');
            } else {
                results.failed.push('❌ Footer still using desktop grid on mobile');
                console.error('❌ Footer grid-template-columns:', styles.gridTemplateColumns);
                console.error('   Expected: "1fr" or display: "block"');
            }
        } else {
            results.warnings.push('⚠️ Desktop viewport - resize to <768px to test');
            console.log('💻 Desktop viewport. Resize to ≤768px to test mobile footer.');
        }
    } else {
        results.failed.push('❌ Footer elements not found');
        console.error('❌ Footer elements not found in DOM');
    }
    
    // Test 4: Check hero video element
    console.log('\n%c3️⃣ Testing Hero Video...', 'font-weight: bold; color: #2C3E5F;');
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        results.passed.push('✅ Hero video element found');
        console.log('✅ Hero video element exists');
        
        const videoStyles = window.getComputedStyle(heroVideo);
        console.log('   Position:', videoStyles.position);
        console.log('   Object-fit:', videoStyles.objectFit);
        console.log('   Width:', videoStyles.width);
        console.log('   Height:', videoStyles.height);
        console.log('   Top:', videoStyles.top);
        console.log('   Left:', videoStyles.left);
        
        // Check critical styles
        const hasCorrectPosition = videoStyles.position === 'absolute' || videoStyles.position === 'fixed';
        const hasCorrectObjectFit = videoStyles.objectFit === 'cover';
        
        if (hasCorrectPosition) {
            results.passed.push('✅ Video positioning correct');
        } else {
            results.failed.push('❌ Video position incorrect');
            console.error('❌ Video position should be "absolute" or "fixed", got:', videoStyles.position);
        }
        
        if (hasCorrectObjectFit) {
            results.passed.push('✅ Video object-fit: cover');
        } else {
            results.failed.push('❌ Video object-fit incorrect');
            console.error('❌ Video object-fit should be "cover", got:', videoStyles.objectFit);
        }
        
        // Check if video covers viewport on mobile
        const isMobileWidth = window.innerWidth <= 768;
        if (isMobileWidth) {
            const videoRect = heroVideo.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            console.log('📱 Mobile viewport check:');
            console.log('   Viewport:', viewportWidth, 'x', viewportHeight);
            console.log('   Video rect:', videoRect.width, 'x', videoRect.height);
            
            if (videoRect.width >= viewportWidth && videoRect.height >= viewportHeight) {
                results.passed.push('✅ Video covers full viewport');
                console.log('✅ Video covers full viewport on mobile');
            } else {
                results.warnings.push('⚠️ Video may not cover full viewport');
                console.warn('⚠️ Video may not fully cover viewport');
            }
        }
    } else {
        results.failed.push('❌ Hero video element not found');
        console.error('❌ Hero video element not found in DOM');
    }
    
    // Test 5: Check for horizontal scroll
    console.log('\n%c4️⃣ Testing Horizontal Scroll...', 'font-weight: bold; color: #2C3E5F;');
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    
    if (bodyWidth <= windowWidth) {
        results.passed.push('✅ No horizontal scroll detected');
        console.log('✅ No horizontal scroll (body width:', bodyWidth, 'viewport:', windowWidth, ')');
    } else {
        results.warnings.push('⚠️ Horizontal scroll detected');
        console.warn('⚠️ Horizontal scroll detected!');
        console.warn('   Body width:', bodyWidth, 'Viewport:', windowWidth);
        console.warn('   Overflow:', bodyWidth - windowWidth, 'px');
    }
    
    // Test 6: Check viewport meta tag
    console.log('\n%c5️⃣ Testing Viewport Meta Tag...', 'font-weight: bold; color: #2C3E5F;');
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (viewportMeta) {
        const content = viewportMeta.getAttribute('content');
        console.log('✅ Viewport meta tag found:', content);
        
        if (content.includes('width=device-width') && content.includes('initial-scale=1')) {
            results.passed.push('✅ Viewport meta tag configured correctly');
        } else {
            results.warnings.push('⚠️ Viewport meta may need adjustment');
            console.warn('⚠️ Viewport meta should include "width=device-width, initial-scale=1"');
        }
    } else {
        results.failed.push('❌ Viewport meta tag missing');
        console.error('❌ Viewport meta tag not found!');
    }
    
    // Test 7: Check mobile breakpoint media queries
    console.log('\n%c6️⃣ Testing Media Query Support...', 'font-weight: bold; color: #2C3E5F;');
    const supports768 = window.matchMedia('(max-width: 768px)').matches;
    const supports480 = window.matchMedia('(max-width: 480px)').matches;
    
    console.log('   Current viewport:', window.innerWidth, 'x', window.innerHeight);
    console.log('   Matches @media (max-width: 768px):', supports768);
    console.log('   Matches @media (max-width: 480px):', supports480);
    
    if (window.innerWidth <= 768 && supports768) {
        results.passed.push('✅ Mobile media queries working');
    } else if (window.innerWidth > 768 && !supports768) {
        results.passed.push('✅ Desktop media queries correct');
    }
    
    // Final Summary
    console.log('\n%c📊 VERIFICATION SUMMARY', 'font-size: 16px; font-weight: bold; color: #6B1F3C;');
    console.log('%c======================', 'color: #D4AF37;');
    
    console.log('\n%c✅ PASSED (' + results.passed.length + '):', 'color: green; font-weight: bold;');
    results.passed.forEach(msg => console.log('  ' + msg));
    
    if (results.warnings.length > 0) {
        console.log('\n%c⚠️ WARNINGS (' + results.warnings.length + '):', 'color: orange; font-weight: bold;');
        results.warnings.forEach(msg => console.log('  ' + msg));
    }
    
    if (results.failed.length > 0) {
        console.log('\n%c❌ FAILED (' + results.failed.length + '):', 'color: red; font-weight: bold;');
        results.failed.forEach(msg => console.log('  ' + msg));
    }
    
    // Overall status
    console.log('\n%c' + '='.repeat(50), 'color: #D4AF37;');
    if (results.failed.length === 0) {
        console.log('%c🎉 ALL TESTS PASSED!', 'font-size: 20px; font-weight: bold; color: green; background: #f0f0f0; padding: 10px;');
        console.log('%cFooter and hero video should work perfectly on mobile!', 'color: green;');
    } else {
        console.log('%c⚠️ SOME TESTS FAILED', 'font-size: 20px; font-weight: bold; color: red; background: #fff0f0; padding: 10px;');
        console.log('%cPlease review failed tests above.', 'color: red;');
    }
    
    // Instructions
    console.log('\n%c📱 MOBILE TESTING INSTRUCTIONS:', 'font-weight: bold; color: #2C3E5F;');
    console.log('1. Open Chrome DevTools (F12)');
    console.log('2. Toggle Device Toolbar (Ctrl+Shift+M)');
    console.log('3. Select "iPhone SE" or "iPhone 12 Pro"');
    console.log('4. Reload page (Ctrl+R)');
    console.log('5. Run this script again to verify mobile styles');
    console.log('6. Scroll to footer - should be 1-column layout');
    console.log('7. Check hero video - should cover full screen');
    
    // Return results object for programmatic use
    return {
        passed: results.passed.length,
        warnings: results.warnings.length,
        failed: results.failed.length,
        success: results.failed.length === 0,
        details: results
    };
})();
