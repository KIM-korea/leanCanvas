import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getCanvasById, updateTitle, updateCanvas } from '../api/canvas';

import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
const CanvasDetail = () => {

  const { paramsId } = useParams();
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(paramsId);
      setCanvas(data);
    };
    fetchCanvas();
  }, [paramsId]);//여기서 detail페이지에 들어갈 때 서버에 id별로 데이터 요청

  const handleTitleChange = (title) => {
    try {
      updateTitle(paramsId, title);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCanvasChange = async updatedCanvas => {
    try {
      await updateCanvas(paramsId, updatedCanvas);
      setCanvas(updatedCanvas);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />}
    </div>
  );
};

export default CanvasDetail;
