let vertexShader = `
uniform int u_octaves;
uniform float u_amplitud;
uniform float u_frequency;
uniform float u_height;
uniform float u_zoom;
uniform float u_x;
uniform float u_y;

varying vec3 vPosition;
varying float h;
varying vec2 vUv;

float random (in vec2 _st) {
    return fract(
        sin(
            dot(_st.xy, vec2(12.9898,78.233)))
            *
            43758.5453123
        );
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}



float fbm ( in vec2 _st) {
    float outValue = 0.0;
    float amplitude = u_amplitud;
    vec2 shift = vec2(10.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.5));
    for (int i = 0; i < u_octaves; ++i) {
        outValue += amplitude * noise(_st * u_frequency);
        _st = rot * _st * 2.0 + shift;
        amplitude *= 0.5;
    }
    return outValue;
}

void main() 
{
	vUv = uv;
	h = u_height;
    float y =  u_height*fbm(vec2(position.x+u_x, position.y-u_y)/u_zoom);
    vPosition = vec3(position.x, position.y, y);
	vec4 modelViewPosition = modelViewMatrix * vec4(vPosition, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
	
}`;

let fragmentShader = `
varying vec3 vPosition;
varying float h;
varying vec2 vUv;

uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;

void main() {
    float vAmount = vPosition.z/h;
    vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUv * 10.0 );
	vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUv * 10.0 );
	vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUv * 20.0 );
	vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUv * 20.0 );
	vec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUv * 10.0 );
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0);
}`;
let shaders = {
    _VS: vertexShader,
    _FS: fragmentShader,
}
export default shaders