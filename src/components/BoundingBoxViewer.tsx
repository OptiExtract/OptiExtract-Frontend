import React, { useEffect, useRef, useState } from "react";

export interface OCRBox {
  id?: string | number;
  text?: string;
  confidence?: number;
  box: [number, number, number, number];
}

interface Props {
  imageUrl: string;
  boxes?: OCRBox[];
}

const BoundingBoxViewer: React.FC<Props> = ({ imageUrl, boxes = [] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [offsetStart, setOffsetStart] = useState({ x: 0, y: 0 });

  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [selectedBox, setSelectedBox] = useState<OCRBox | null>(null);

  const handleImageLoad = () => {
    if (!imageRef.current) return;

    setImageSize({
      width: imageRef.current.naturalWidth,
      height: imageRef.current.naturalHeight,
    });
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

 
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    setOffsetStart({ ...offset });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;

    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;

    setOffset({ x: offsetStart.x + dx, y: offsetStart.y + dy });
  };

  const stopPanning = () => setIsPanning(false);

  const getScaleFactors = () => {
    if (!containerRef.current) return { sx: 1, sy: 1 };
    const containerWidth = containerRef.current.clientWidth;

    const scale = containerWidth / imageSize.width;
    return { sx: scale, sy: scale };
  };

  const { sx, sy } = getScaleFactors();

  return (
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-2">
          <button onClick={handleZoomOut} className="px-2 py-1 border rounded">
            -
          </button>
          <span>{(zoom * 100).toFixed(0)}%</span>
          <button onClick={handleZoomIn} className="px-2 py-1 border rounded">
            +
          </button>
          <button onClick={handleReset} className="px-3 py-1 border rounded ml-2">
            Reset
          </button>
        </div>

        <div
          ref={containerRef}
          className="relative w-full border rounded-lg overflow-hidden bg-gray-100"
          style={{ height: 500 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopPanning}
          onMouseLeave={stopPanning}
          onClick={() => setSelectedBox(null)}
        >
          <div
            className="origin-top-left"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              onLoad={handleImageLoad}
              draggable={false}
              className="block max-w-full"
            />

            {/* BOXES */}
            {boxes.map((b, index) => {
              const [x1, y1, x2, y2] = b.box;
              const left = x1 * sx;
              const top = y1 * sy;
              const width = (x2 - x1) * sx;
              const height = (y2 - y1) * sy;

              const id = b.id ?? index;
              const active = selectedBox?.id === id;

              return (
                <div
                  key={id}
                  className="absolute border cursor-pointer"
                  style={{
                    left,
                    top,
                    width,
                    height,
                    borderColor: active ? "green" : "blue",
                    backgroundColor: active ? "rgba(0,255,0,0.2)" : "transparent",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBox({ ...b, id });
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      
      <div className="w-64 bg-white border p-3 text-sm rounded-lg">
        <h3 className="font-semibold mb-2">Details</h3>

        {!selectedBox ? (
          <p className="text-gray-400 text-sm">Click a box to inspect.</p>
        ) : (
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Text</p>
              <p>{selectedBox.text || "—"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Confidence</p>
              <p>{((selectedBox.confidence ?? 0) * 100).toFixed(1)}%</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Coordinates</p>
              <p className="break-all">{JSON.stringify(selectedBox.box)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoundingBoxViewer;
