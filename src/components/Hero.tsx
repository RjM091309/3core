import React, { useEffect, useRef } from 'react';
import GlassButton from './GlassButton';
import { useSectionNav } from '../hooks/useSectionNav';

const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.y, uResolution.x);
        vec2 m = (uMouse - 0.5) * 0.2;
        
        // Perspective and movement
        float time = uTime * 0.2;
        vec3 color = vec3(0.0);
        
        // Layered Grid Effect
        for(float i = 1.0; i < 4.0; i++) {
            float z = fract(time * 0.5 + i * 0.33);
            float size = mix(20.0, 0.1, z);
            float fade = smoothstep(0.0, 0.2, z) * smoothstep(1.0, 0.8, z);
            
            vec2 gridUv = uv * size + m * size * 2.0;
            vec2 id = floor(gridUv);
            vec2 gv = fract(gridUv) - 0.5;
            
            // Grid lines
            float line = smoothstep(0.48, 0.5, max(abs(gv.x), abs(gv.y)));
            
            // Nodes
            float n = hash(id);
            float pulse = sin(uTime * 2.0 + n * 10.0) * 0.5 + 0.5;
            float node = smoothstep(0.1, 0.05, length(gv)) * n * pulse;
            
            // Connections (simulated)
            float connection = 0.0;
            if(n > 0.8) {
                connection = smoothstep(0.02, 0.0, abs(gv.x)) * smoothstep(0.5, -0.5, gv.y) * fade;
            }
            
            vec3 layerColor = mix(vec3(0.1, 0.2, 0.5), vec3(0.4, 0.6, 1.0), n);
            color += (line * 0.2 + node * 2.0 + connection * 0.5) * layerColor * fade;
        }
        
        // Central Glow
        float center = smoothstep(0.5, 0.0, length(uv));
        color += center * vec3(0.05, 0.1, 0.2);
        
        // Scanlines
        float scanline = sin(gl_FragCoord.y * 0.5) * 0.02;
        color -= scanline;
        
        // Vignette
        float vignette = 1.0 - length(uv) * 0.8;
        color *= vignette;
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

const Hero = () => {
    const goToSection = useSectionNav();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
            const program = gl.createProgram();
            if (!program) return null;
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Program link error:', gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        const uTime = gl.getUniformLocation(program, 'uTime');
        const uResolution = gl.getUniformLocation(program, 'uResolution');
        const uMouse = gl.getUniformLocation(program, 'uMouse');

        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1, 1,
             1, 1,
        ]);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.targetX = e.clientX / canvas.width;
            mouseRef.current.targetY = 1.0 - e.clientY / canvas.height;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            const currentTime = (Date.now() - startTime) * 0.001;
            const mouse = mouseRef.current;
            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);

            gl.uniform1f(uTime, currentTime);
            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform2f(uMouse, mouse.x, mouse.y);

            const positionLocation = gl.getAttribLocation(program, 'position');
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center text-white pointer-events-none w-full px-4 sm:px-6">
                <h1 className="prism-h1">CORE SYSTEM</h1>
                <p className="prism-tagline">Trusted partner for integrated IT solutions</p>
                <div className="buttons flex justify-center gap-6 mt-10 pointer-events-auto">
                    <GlassButton onClick={() => goToSection('#solutions')}>Discover</GlassButton>
                    <GlassButton onClick={() => goToSection('#contact')}>Join Now</GlassButton>
                </div>
            </div>
        </section>
    );
};

export default Hero;
