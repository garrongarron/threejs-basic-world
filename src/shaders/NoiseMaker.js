import 'https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.js';
import perlin from '../../js/perlin.js';

/*
  let params = {
    noiseType: 'perlin',
    scale: 10,
    octaves: 2,
    persistence: 1,
    lacunarity: 1,
    exponentiation: 1,
    seed: 15,
    height:3
  }
*/
const noise = (function () {

    class _PerlinWrapper {
        constructor() {
        }

        noise2D(x, y) {
            return perlin(x, y) * 2.0 - 1.0;
        }
    }

    class _NoiseGenerator {
        constructor(params) {
            this._params = params;
            this._Init();
        }

        _Init() {
            this._noise = {
                simplex: new SimplexNoise(this._params.seed),
                perlin: new _PerlinWrapper()
            };
        }

        Get(x, y) {
            const xs = x / this._params.scale;
            const ys = y / this._params.scale;
            const noiseFunc = this._noise[this._params.noiseType];
            let amplitude = 1;
            let frequency = 1;
            let normalization = 0;
            let total = 0;

            for (let o = 0; o < this._params.octaves; o++) {
                const noiseValue = noiseFunc.noise2D(xs * frequency, ys * frequency) * 0.5 + 0.5;

                total += noiseValue * amplitude;
                normalization += amplitude;
                amplitude *= this._params.persistence;
                frequency *= this._params.lacunarity;

            }
            total /= normalization;

            let out = Math.pow(total, this._params.exponentiation) * this._params.height
            return out;
        }
    }

    return {
        Noise: _NoiseGenerator
    }
})();

export default noise