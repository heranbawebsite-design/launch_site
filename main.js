import './style.scss';
import charming from 'charming';
import confetti from 'canvas-confetti';

const d = 40;

document.querySelectorAll('.rocket-button').forEach(elem => {
    elem.querySelectorAll('.default, .success > div').forEach(text => {
        charming(text);
        text.querySelectorAll('span').forEach((span, i) => {
            span.innerHTML = span.textContent == ' ' ? '&nbsp;' : span.textContent;
            span.style.setProperty('--d', i * d + 'ms');
            span.style.setProperty('--ds', text.querySelectorAll('span').length * d - d - i * d + 'ms');
        });
    });

    elem.addEventListener('click', e => {
        e.preventDefault();
        if(elem.classList.contains('animated')) {
            return;
        }
        elem.classList.add('animated');
        elem.classList.toggle('live');
        document.body.classList.add('launching');
        
        // Trigger confetti when rocket launches
        setTimeout(() => {
            var duration = 3000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
            
            // Middle confetti burst
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#009846', '#00b854', '#FFE55E', '#ffffff'] // Heranba Colors
            });

        }, 200); // 600ms corresponds to rocket takeoff animation

        setTimeout(() => {
            elem.classList.remove('animated');
            // Redirect to the main site
            window.location.href = 'https://heranba.com'; // Redirects directly to the main page
        }, 3400); // Redirects shortly after the white-out effect finishes
    });
});
