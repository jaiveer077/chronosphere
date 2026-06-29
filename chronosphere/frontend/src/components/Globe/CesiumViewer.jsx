import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import { Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// NOTE: You must set your Cesium Ion Token in a .env file or directly here for testing
// window.CESIUM_BASE_URL = '/'; 

const CesiumViewer = ({ onLocationSelect }) => {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);
    const [debugInfo, setDebugInfo] = useState({ error: null, token: !!Cesium.Ion.defaultAccessToken });

    useEffect(() => {
        if (containerRef.current && !viewerRef.current) {
            try {
                // Initialize Cesium Viewer
                // Use OpenStreetMap as fallback if Ion fails (no token needed)
                const viewerOptions = {
                    terrainProvider: undefined,
                    baseLayerPicker: false,
                    geocoder: true,
                    timeline: false,
                    animation: false,
                    fullscreenButton: false,
                    sceneModePicker: false,
                    selectionIndicator: true,
                    infoBox: false,
                };

                // Fallback to OSM if no Ion token is provided
                if (!Cesium.Ion.defaultAccessToken) {
                    viewerOptions.imageryProvider = new Cesium.OpenStreetMapImageryProvider({
                        url: 'https://tile.openstreetmap.org/'
                    });
                }

                const viewer = new Viewer(containerRef.current, viewerOptions);

                viewerRef.current = viewer;

                // Click Handler
                const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handler.setInputAction((movement) => {
                    const cartesian = viewer.camera.pickEllipsoid(movement.position);
                    if (cartesian) {
                        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
                        const latitude = Cesium.Math.toDegrees(cartographic.latitude);

                        // Add a marker
                        viewer.entities.removeAll();
                        viewer.entities.add({
                            position: cartesian,
                            point: { pixelSize: 10, color: Cesium.Color.CYAN }
                        });

                        onLocationSelect({ lat: latitude, lng: longitude });
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                // Force a render
                viewer.scene.requestRender();

            } catch (err) {
                console.error("Cesium Error:", err);
                setDebugInfo(prev => ({ ...prev, error: err.toString() }));
            }

            // Cleanup
            return () => {
                if (viewerRef.current) {
                    viewerRef.current.destroy();
                    viewerRef.current = null;
                }
            };
        }
    }, [onLocationSelect]);

    return (
        <div className="relative w-full h-full">
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full z-0"
                id="cesiumContainer"
            />
            {/* Debug Overlay */}
            <div className="absolute bottom-0 left-0 bg-black/50 text-white p-2 text-xs z-50 pointer-events-none">
                <p>Cesium Status: {viewerRef.current ? "Initialized" : "Pending"}</p>
                <p>Token Present: {debugInfo.token ? "Yes" : "No"}</p>
                {debugInfo.error && <p className="text-red-500">Error: {debugInfo.error}</p>}
            </div>
        </div>
    );
};

export default CesiumViewer;
