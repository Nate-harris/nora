

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;


float random (in vec2 st) {
    return fract(cos(dot(st.xy,vec2(-0.400,-2.30))) * 43758.5453123);
}

// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
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
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}




float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale+u_time*0.001;
    return smoothstep(0.0,b,tan(pos.x*PI+u_time*0.7));
}


vec3 color = vec3(0.7,0.7,0.7);

void main (void) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
   

    float pct = abs(sin(time/10.));

   

    vec2 pos = st.xy*vec2(5.,1.);

    float pattern = pos.x;

    // Add noise
    pos = rotate2d( noise(pos) ) * pos;

    // Draw lines
    pattern =  lines(pos,0.);

    
    // Invert pattern
    float invertPattern = pow(pattern, -1.);


    gl_FragColor = vec4(vec3(invertPattern)*color,1.);

}
