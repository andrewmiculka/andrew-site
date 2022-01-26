import React, {Component} from "react";
import * as THREE from "three"
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import indexOrbBack from './media/video/indexOrbBack.mp4'
//import * as tx from "threex.domevents"
 
 
let controls, scene;
 
class IndexOrb extends Component{

    componentDidMount() {
    
        scene = new THREE.Scene()
    
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.z = 25
    
        var video = document.getElementById('bgVideo')
        video.play()
        var videoTexture = new THREE.VideoTexture(video)
        scene.background = videoTexture


        var light = new THREE.PointLight(0xffffff);
        light.position.set(20, 0, 20);
        scene.add(light);
        var lightAmb = new THREE.AmbientLight(0x777777);
        scene.add(lightAmb);
        
        let boxGeometry = new THREE.IcosahedronGeometry(12, 1)
        
        boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry)
        
        //get object that stores all points that defines the box faces
        const positionAttribute = boxGeometry.getAttribute("position") //1538 pts
        
        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        //const domEvents = new tx.DomEvents(camera, renderer.domElement)

        var addCubes = (positions) => {
            var geometry = new THREE.BoxGeometry(0.5,3,0.5)
            var material = new THREE.MeshNormalMaterial({wireframe: true})
        
            geometry = BufferGeometryUtils.mergeVertices(geometry)
        
            const vertex = new THREE.Vector3();
            for(let i = 0; i<positions.count; i++){
                vertex.fromBufferAttribute(positions, i)
            
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = vertex.x
                mesh.position.y = vertex.y
                mesh.position.z = vertex.z
            
                scene.add(mesh)
/*
                domEvents.addEventListener(mesh, 'click', (e) =>{
                    console.log('box clicked!')
                }, false)
    */
            }
    
        }
    
        addCubes(positionAttribute)
        
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio( window.devicePixelRatio );
        
        this.mount.appendChild( renderer.domElement );

        controls = new OrbitControls(camera, renderer.domElement)
        controls.autoRotateSpeed = .75
        controls.autoRotate = true;
        controls.maxDistance = 50
        controls.minDistance = 20
    
        var render = () => {
            renderer.render(scene, camera)
        }
    
        var animate = () => {
            requestAnimationFrame(animate)
            controls.update()
            render()
        };
    
        animate();
    
    }

 
    render() {
        return (
            <div>
                <div ref={ref => (this.mount = ref)}/>
                <video id='bgVideo' style={{display:'none'} } className='videoTag' playsInline loop muted>
                    <source src={indexOrbBack} type='video/mp4' />
                </video>
            </div>
        )
    }
 
};
 
 
 
export default IndexOrb;