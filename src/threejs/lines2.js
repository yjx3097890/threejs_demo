import {
    BufferGeometry, Float32BufferAttribute,
    LineBasicMaterial, LineSegments,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three';


const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
camera.position.z = 6000;

const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
document.body.appendChild(renderer.domElement);

const geometry = new BufferGeometry();
const material = new LineBasicMaterial({ vertexColors: true });

const indices = [];
const positions = [];
const colors = [];

let next_positions_index = 0;

const iteration_count = 5;
const rangle = 60 * Math.PI / 180.0;

function addVertex(v) {
    if (next_positions_index === 0xffff )  console.error( 'Too many points.' );

    positions.push(v.x, v.y, v.z);
    colors.push(Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1);

    return next_positions_index ++;
}

// 根据起点终点创建中间的点
function snowflakeIteration(p0, p4, depth) {
    depth -= 1;
    if (depth < 0) {
        const i = next_positions_index - 1; // p0 already there
        addVertex( p4 );
        indices.push( i, i + 1 );
        return;
    }
    const v = p4.clone().sub( p0 );
    const v_tier = v.clone().multiplyScalar( 1 / 3 );
    const p1 = p0.clone().add( v_tier );

    const angle = Math.atan2( v.y, v.x ) + rangle;
    const length = v_tier.length();
    const p2 = p1.clone();
    p2.x += Math.cos( angle ) * length;
    p2.y += Math.sin( angle ) * length;

    const p3 = p0.clone().add( v_tier ).add( v_tier );

    snowflakeIteration( p0, p1, depth );
    snowflakeIteration( p1, p2, depth );
    snowflakeIteration( p2, p3, depth );
    snowflakeIteration( p3, p4, depth );
}

function snowflake( points, loop, x_offset ) {

    for ( let iteration = 0; iteration < iteration_count; iteration ++ ) {
        addVertex( points[ 0 ] );
        for ( let p_index = 0, p_count = points.length - 1; p_index < p_count; p_index ++ ) {
            snowflakeIteration( points[ p_index ], points[ p_index + 1 ], iteration );
        }
        if ( loop ) {
            // 闭合
            snowflakeIteration( points[ points.length - 1 ], points[ 0 ], iteration );
        }
        // 创建一行中图像的偏移
        for ( let p_index = 0, p_count = points.length; p_index < p_count; p_index ++ ) {
            points[ p_index ].x += x_offset;
        }
    }
}

let y = 0;
snowflake(
  [
      new Vector3( 0, y, 0 ),
      new Vector3( 500, y, 0 )
  ],
  false, 600
);

y += 600;
snowflake(
  [
      new Vector3( 0, y, 0 ),
      new Vector3( 250, y + 400, 0 ),
      new Vector3( 500, y, 0 )
  ],
  true, 600
);


geometry.setIndex( indices );
geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

const lineSegments = new LineSegments( geometry, material );
lineSegments.position.x -= 1200;
lineSegments.position.y -= 1200;

scene.add(lineSegments);


(function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();
