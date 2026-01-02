

export class Color {

    /** h=[0, 360] s=[0, 100] v=[0, 100] */
    public static fromHSV(h: number, s: number, v: number): string {
        s /= 100;
        v /= 100;
        const k = (n: number) => (n + h / 60) % 6;
        const f = (n: number) => v - v * s * Math.max(Math.min(k(n), 4 - k(n), 1), 0);
        const r = Math.round(f(5) * 255);
        const g = Math.round(f(3) * 255);
        const b = Math.round(f(1) * 255);
        return this.fromRGB(r, g, b);
    }

    /** r=[0, 255] g=[0, 255] b=[0, 255] */
    public static fromRGB(r: number, g: number, b: number): string {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    }

    public static random(minSat = 30, minVal = 50): string {
        const h = Math.random() * 360;
        const s = minSat + Math.random() * (100 - minSat);
        const v = minVal + Math.random() * (100 - minVal);
        return this.fromHSV(h, s, v);
    }

    public static hex2RGB(hex: string): [number,number,number] {
        const n = parseInt(hex.slice(1), 16)
        return [n >> 16 & 255, n >> 8 & 255, n & 255]
    }

    /** returns h=[0,360), s=[0,100], v=[0,100] */
    public static hex2HSV(hex: string): [number, number, number] {
        const [r0, g0, b0] = this.hex2RGB(hex);
        const r = r0 / 255;
        const g = g0 / 255;
        const b = b0 / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d   = max - min;
        let h = 0;

        if (d !== 0) {
            if (max === r) h = ((g - b) / d) % 6;
            else if (max === g) h = (b - r) / d + 2;
            else h = (r - g) / d + 4;

            h *= 60;
            if (h < 0) h += 360;
        }

        const s = max === 0 ? 0 : d / max;
        const v = max;
        return [ h, s * 100, v * 100 ];
    }

    /** returns L=[0..100], a≈[-128..127], b≈[-128..127] */
    public static hex2LAB(hex: string): [number, number, number]
    {
        const [r8, g8, b8] = this.hex2RGB(hex);
        // sRGB → linear RGB
        const lin = (c: number) => {
            c /= 255;
            return c <= 0.04045
                ? c / 12.92
                : Math.pow((c + 0.055) / 1.055, 2.4);
        };

        const r = lin(r8); const g = lin(g8); const b = lin(b8);
        // linear RGB → XYZ (D65)
        const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        // XYZ → LAB
        const refX = 0.95047; const refY = 1.00000; const refZ = 1.08883;

        const f = (t: number) => t > 0.008856
                ? Math.cbrt(t)
                : (7.787 * t) + 16 / 116;

        const fx = f(x / refX);    const fy = f(y / refY);    const fz = f(z / refZ);
        const L = (116 * fy) - 16; const a = 500 * (fx - fy); const b2 = 200 * (fy - fz);
        return [L, a, b2];
    }

    public static getNearestColorName(hex: string): string {
        const [L1, a1, b1] = this.hex2LAB(hex);
        let best = '';
        let min  = Number.MAX_VALUE;
        for (const [name, val] of Object.entries(known_colors)) {
            const [L2, a2, b2] = this.hex2LAB(val);
            const d = (L1 - L2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2;
            if (d < min) {
                min = d;
                best = name;
            }
        }
        return best;
    }


}


const known_colors: Record<string, string> = {
    aliceBlue: '#f0f8ff', antiqueWhite: '#faebd7', aqua: '#00ffff', aquaMarine: '#7fffd4', azure: '#f0ffff',
    beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedAlmond: '#ffebcd', blue: '#0000ff',
    blueViolet: '#8a2be2', brown: '#a52a2a', burlyWood: '#deb887', cadetBlue: '#5f9ea0', chartReuse: '#7fff00',
    chocolate: '#d2691e', coral: '#ff7f50', cornFlowerBlue: '#6495ed', cornSilk: '#fff8dc', crimson: '#dc143c',
    cyan: '#00ffff', darkBlue: '#00008b', darkCyan: '#008b8b', darkGoldenRod: '#b8860b', darkGray: '#a9a9a9',
    darkGreen: '#006400', darkGrey: '#a9a9a9', darkKhaki: '#bdb76b', darkMagenta: '#8b008b', darkOliveGreen: '#556b2f',
    darkOrange: '#ff8c00', darkOrchid: '#9932cc', darkRed: '#8b0000', darkSalmon: '#e9967a', darkSeaGreen: '#8fbc8f',
    darkSlateBlue: '#483d8b', darkSlateGray: '#2f4f4f', darkSlateGrey: '#2f4f4f', darkTurquoise: '#00ced1', darkViolet: '#9400d3',
    deepPink: '#ff1493', deepSkyBlue: '#00bfff', dimGray: '#696969', dimGrey: '#696969', dodgerBlue: '#1e90ff',
    fireBrick: '#b22222', floralWhite: '#fffaf0', forestGreen: '#228b22', fuchsia: '#ff00ff', gainsBoro: '#dcdcdc',
    ghostWhite: '#f8f8ff', gold: '#ffd700', goldenRod: '#daa520', gray: '#808080', green: '#008000',
    greenYellow: '#adff2f', grey: '#808080', honeyDew: '#f0fff0', hotPink: '#ff69b4', indianRed: '#cd5c5c',
    indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa', lavenderBlush: '#fff0f5',
    lawnGreen: '#7cfc00', lemonChiffon: '#fffacd', lightBlue: '#add8e6', lightCoral: '#f08080', lightCyan: '#e0ffff',
    lightGoldenRodYellow: '#fafad2', lightGray: '#d3d3d3', lightGreen: '#90ee90', lightGrey: '#d3d3d3', lightPink: '#ffb6c1',
    lightSalmon: '#ffa07a', lightSeaGreen: '#20b2aa', lightSkyBlue: '#87cefa', lightSlateGray: '#778899', lightSlateGrey: '#778899',
    lightSteelBlue: '#b0c4de', lightYellow: '#ffffe0', lime: '#00ff00', limeGreen: '#32cd32', linen: '#faf0e6',
    magenta: '#ff00ff', maroon: '#800000', mediumAquaMarine: '#66cdaa', mediumBlue: '#0000cd', mediumOrchid: '#ba55d3',
    mediumPurple: '#9370db', mediumSeaGreen: '#3cb371', mediumSlateBlue: '#7b68ee', mediumSpringGreen: '#00fa9a', mediumTurquoise: '#48d1cc',
    mediumVioletRed: '#c71585', midnightBlue: '#191970', mintCream: '#f5fffa', mistyRose: '#ffe4e1', moccasin: '#ffe4b5',
    navajoWhite: '#ffdead', navy: '#000080', oldLace: '#fdf5e6', olive: '#808000', oliveDrab: '#6b8e23',
    orange: '#ffa500', orangeRed: '#ff4500', orchid: '#da70d6', paleGoldenRod: '#eee8aa', paleGreen: '#98fb98',
    paleTurquoise: '#afeeee', paleVioletRed: '#db7093', papayaWhip: '#ffefd5', peachPuff: '#ffdab9', peru: '#cd853f',
    pink: '#ffc0cb', plum: '#dda0dd', powderBlue: '#b0e0e6', purple: '#800080', rebeccaPurple: '#663399',
    red: '#ff0000', rosyBrown: '#bc8f8f', royalBlue: '#4169e1', saddleBrown: '#8b4513', salmon: '#fa8072',
    sandyBrown: '#f4a460', seaGreen: '#2e8b57', seaShell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0',
    skyBlue: '#87ceeb', slateBlue: '#6a5acd', slateGray: '#708090', slateGrey: '#708090', snow: '#fffafa',
    springGreen: '#00ff7f', steelBlue: '#4682b4', tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8',
    tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff',
    whiteSmoke: '#f5f5f5', yellow: '#ffff00', yellowGreen: '#9acd32'
}