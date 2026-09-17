import confetti from "canvas-confetti";




export class Confetti {

    static shootRealistic() {
        // simultoneus bursts with less total eveness
        const origin = { x: 0.5, y: 0.7 };
        confetti({ origin, particleCount: 50, spread: 26,  startVelocity: 55 });
        confetti({ origin, particleCount: 40, spread: 60 });
        confetti({ origin, particleCount: 70, spread: 100, decay: 0.91, scalar: 0.8 });
        confetti({ origin, particleCount: 20, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        confetti({ origin, particleCount: 20, spread: 120, startVelocity: 45 });
    }


    static shootTwice(element: HTMLElement) {
        // used when clicking the star in header
        const rect = element.getBoundingClientRect();

        confetti({ particleCount: 30, spread: 360, startVelocity: 15, origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight
            },
        });
        
        setTimeout(() => {
            confetti({ particleCount: 160, spread: 70, startVelocity: 25, origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                },
                angle: 240, // Down and right.
            });
        }, 150); // Delay in milliseconds.
    }
}