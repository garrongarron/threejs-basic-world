uniform float delta;
uniform float u_octaves;
uniform float u_amplitud;
uniform float u_frequency;
uniform float u_height;

varying vec3 vPosition;
varying float h;
varying vec2 vUv;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
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

//@todo 
//u_octaves doesnt work
#define NUM_OCTAVES 2

float fbm ( in vec2 _st) {
    float outValue = 0.0;
    float amplitude = u_amplitud;
    vec2 shift = vec2(10.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
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
    float y =  u_height*fbm(vec2(position.x, position.y)/u_height);
    vPosition = vec3(position.x, position.y, y);
	vec4 modelViewPosition = modelViewMatrix * vec4(vPosition, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
	
}