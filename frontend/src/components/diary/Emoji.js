import React, {useEffect, useState} from 'react';
import EmojiPicker, {EmojiStyle} from 'emoji-picker-react';

function Emoji(props){
  const [inputStr, setInputStr]=useState('🙂');
  const [showPicker, setShowPicker]=useState(false);

  useEffect(()=>{
    props.getEmoji(inputStr);
  },[inputStr, props])

  const onEmojiClick=(emojiObject)=>{
    setInputStr(emojiObject.emoji);
    setShowPicker(false);
  }

  
  return(
    <div className="picker-container" style={{zIndex:'100', marginLeft: '150px'}}>
      <div className="emoji-icon" role="img" aria-label="smile" style={{width:'1em', fontSize:'1.8em',marginLeft: '308px' }} onClick={() => setShowPicker((val) => !val)}>{inputStr}</div>
      {showPicker && (
        <div style={{marginTop: '415px', zIndex:'100', position:'relative'}}>
          <div className="emoji-icon" role="img" aria-label="smile" style={{width:'1em', fontSize:'1.8em', marginLeft:'10.65em'}} onClick={() => setShowPicker((val) => !val)}>{inputStr}</div>
          <EmojiPicker emojiStyle={EmojiStyle.APPLE} onEmojiClick={onEmojiClick} />
        </div>)}
    </div>

  )
}

export default Emoji;
