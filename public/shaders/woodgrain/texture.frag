precision mediump float;

uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_time;
uniform float u_percent;
uniform float u_alpha;
uniform vec2 u_offset;
uniform float u_scale;
uniform float u_rate;


varying float vZ;

#define PI 3.14159265358979323846

float random (in vec2 st) {
    return fract(cos(dot(st.xy,vec2(-0.400,-2.30))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle), sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = u_scale;
    pos *= scale+sin(u_time)*0.001;
    return smoothstep(0.0,b,tan(pos.x*PI+sin(u_time/3.0)));
}

void main(void) {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;

    vec2 pos = st.xy*vec2(u_offset.x,u_offset.y);

    float pattern = pos.x;
    pos = rotate2d( noise(pos) ) * pos;
    pattern =  lines(pos,0.);
    float invertPattern = pow(pattern, -1.);
    
    vec3 color = vec3(u_color) / 255.0;
  
    gl_FragColor = vec4(vec3(invertPattern)*color,1.);

    if(pattern - u_percent < 0.0) {
        gl_FragColor.a = 0.0;    
    } else {
        gl_FragColor.a = u_alpha;    
    }

}