import { useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { useEffect } from 'react';
const Note = ({ id, onRemoveNote, content, color: initialColor, onUpdateNote }) => {

  const [localContent, setLocalContent] = useState(content);

  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef(null);

  const [color, setColor] = useState(() => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);

    if (initialColor) {
      return initialColor;
    }
    return colorOptions[randomIndex];
  });

  const handleContentChange = (e) => {
    onUpdateNote(id, localContent, color);
  }

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onUpdateNote(id, content, newColor);
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <div
      className={`p-4 ${color} relative max-h-128 overflow-hidden`}
      onClick={() => setIsEditing(true)}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button
            aria-label="Check Note"
            className="text-gray-700"

            onClick={e => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            onClick={e => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
            aria-label="Close Note"
            className="text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={e => setLocalContent(e.target.value)}
        onBlur={handleContentChange}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
      />
      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              onClick={() => handleColorChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
