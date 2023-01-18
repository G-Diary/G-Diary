import React, {useState} from 'react';
import EmojiPicker from 'emoji-picker-react';

function Emoji(){
  const [inputStr, setInputStr]=useState('🙂');
  const [showPicker, setShowPicker]=useState(false);

  const onEmojiClick=(emojiObject)=>{
    setInputStr(emojiObject.emoji);
    setShowPicker(false);
  }
  return(
    <div className="picker-container" style={{zIndex:'90'}}>
      <span className="emoji-icon" role="img" aria-label="smile" style={{width:'1em', fontSize:'1.8em' }} onClick={() => setShowPicker((val) => !val)}>{inputStr}</span>
      {showPicker && (
        <div style={{paddingTop: '411px', zIndex:'100'}}>
          <span className="emoji-icon" role="img" aria-label="smile" style={{width:'1em', fontSize:'1.8em', marginLeft:'10.3em'}} onClick={() => setShowPicker((val) => !val)}>{inputStr}</span>
          <EmojiPicker pickerStyle={{width:'100%', zIndex:'100'}} onEmojiClick={onEmojiClick} />
        </div>)}
    </div>

  )
}

export default Emoji;

// onClick={(e)=>setInputStr(e.target.value)}