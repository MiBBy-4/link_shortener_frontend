import { useState } from 'react';

export default function TagsInput() {
  const [tags, setTags] = useState([]);

  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;
    const { target: { value } } = event;
    if (value.trim() === '') return;
    setTags([...tags, value]);
    event.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  return (
    <div className="tags-input-container">
      { tags.map((tag, index) => (
        <div className="tags-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>&times;</span>
        </div>
      ))}
      <input type="text" onKeyDown={handleKeyDown} placeholder="Type something" className="text-input" />
    </div>
  );
}
