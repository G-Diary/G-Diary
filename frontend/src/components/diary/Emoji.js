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
        <div style={{'@media screen and (min-width: 1401px), screen and (min-height: 701px)' :{
          paddingTop: '411px'
        },
        '@media screen and (max-width: 1400px), screen and (max-height: 700px)' :{
          paddingTop: '328.8px'
        }, zIndex:'100'}}>
          <span className="emoji-icon" role="img" aria-label="smile" style={{width:'1em', fontSize:'1.8em', marginLeft:'10.3em'}} onClick={() => setShowPicker((val) => !val)}>{inputStr}</span>
          <EmojiPicker pickerStyle={{width:'100%', zIndex:'100'}} onEmojiClick={onEmojiClick} />
        </div>)}
    </div>

  )
}

export default Emoji;
