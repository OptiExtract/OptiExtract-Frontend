import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - imageUrl: string (URL to the rendered image/PDF page snapshot)
 * - boxes: Array<{
 *     id?: string | number;
 *     text?: string;
 *     confidence?: number;
 *     box: [number, number, number, number]; // [x_min, y_min, x_max, y_max]
 *   }>
 */
export default function BoundingBoxViewer({ imageUrl, boxes = [] }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [offsetStart, setOffsetStart] = useState({ x: 0, y: 0 });

  const [hoveredId, setHoveredId] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);

  // When image loads, capture its natural size
  const handleImageLoad = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    setImageSize({
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
    });
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    setOffsetStart({ ...offset });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    setOffset({
      x: offsetStart.x + dx,
      y: offsetStart.y + dy,
    });
  };

  const stopPanning = () => {
    setIsPanning(false);
  };

  // Calculate scale factor to map original coordinates -> displayed image size
  const getScaleFactors = () => {
    const container = containerRef.current;
    if (!container || !imageSize.width || !imageSize.height) {
      return { sx: 1, sy: 1 };
    }

    const containerWidth = container.clientWidth;
    const scale = containerWidth / imageSize.width; // keep aspect ratio

    return { sx: scale, sy: scale };
  };

  const { sx, sy } = getScaleFactors();

  const renderBoxes = () =>
    boxes.map((b, index) => {
      const [xMin, yMin, xMax, yMax] = b.box;
      const left = xMin * sx;
      const top = yMin * sy;
      const width = (xMax - xMin) * sx;
      const height = (yMax - yMin) * sy;

      const id = b.id ?? index;
      const isHovered = hoveredId === id;
      const isSelected = selectedBox && (selectedBox.id ?? selectedBox.index) === id;

      return (
        <div
          key={id}
          className="
            absolute border-2 
            cursor-pointer
            transition
          "
          style={{
            left,
            top,
            width,
            height,
            borderColor: isSelected
              ? "#22c55e" // green for selected
              : isHovered
              ? "#f97316" // orange on hover
              : "#3b82f6", // blue default
            backgroundColor: isHovered || isSelected ? "rgba(59,130,246,0.15)" : "transparent",
          }}
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedBox({ ...b, id, index });
          }}
        />
      );
    });

  // Close selection when clicking empty area
  const handleBackgroundClick = () => {
    setSelectedBox(null);
  };

  return (
    <div className="flex gap-4 w-full">
      {/* Left: Image + boxes */}
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleZoomOut}
            className="px-2 py-1 text-sm border rounded"
          >
            −
          </button>
          <span className="text-xs text-gray-600 w-16 text-center">
            {(zoom * 100).toFixed(0)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="px-2 py-1 text-sm border rounded"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="ml-2 px-2 py-1 text-xs border rounded"
          >
            Reset
          </button>
          <span className="ml-auto text-xs text-gray-500">
            Tip: drag to pan, click box to inspect
          </span>
        </div>

        <div
          ref={containerRef}
          className="relative w-full border rounded-lg overflow-hidden bg-gray-50"
          style={{ height: 500 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopPanning}
          onMouseLeave={stopPanning}
          onClick={handleBackgroundClick}
        >
          <div
            className="origin-top-left"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            {/* Base image */}
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Document"
              onLoad={handleImageLoad}
              className="block max-w-full"
              draggable={false}
            />

            {/* Bounding boxes overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Make boxes clickable by enabling pointer events on them only */}
              <div className="relative w-full h-full pointer-events-none">
                <div className="absolute inset-0 pointer-events-none">
                  {/* Boxes (pointer-events re-enabled individually) */}
                  {boxes.length > 0 && (
                    <div className="absolute top-0 left-0 pointer-events-auto">
                      {renderBoxes()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Details panel */}
      <div className="w-64 border rounded-lg p-3 bg-white text-sm">
        <h3 className="font-semibold mb-2">Selection Details</h3>

        {!selectedBox ? (
          <p className="text-gray-500 text-xs">
            Click on a bounding box to view its text & confidence.
          </p>
        ) : (
          <div className="space-y-2">
            <div>
              <p className="text-[11px] uppercase text-gray-400 mb-1">Text</p>
              <p className="text-sm break-words">
                {selectedBox.text || <span className="italic text-gray-400">No text</span>}
              </p>
            </div>

            {"confidence" in selectedBox && (
              <div>
                <p className="text-[11px] uppercase text-gray-400 mb-1">Confidence</p>
                <p>
                  {(selectedBox.confidence * 100).toFixed(1)}
                  <span className="text-xs text-gray-500 ml-1">%</span>
                </p>
              </div>
            )}

            <div>
              <p className="text-[11px] uppercase text-gray-400 mb-1">Coordinates</p>
              <p className="text-xs text-gray-600">
                [x_min, y_min, x_max, y_max]
                <br />
                {JSON.stringify(selectedBox.box)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
