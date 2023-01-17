import {create} from 'zustand';

// set 함수를 통해서만 상태를 변경할 수 있다
export const useStore = create((set)=>({
  currentCanvas: '',  //캔버스를 그림선택기능에서 사용하기 위해
  updateCanvas:'',  //현재 캔버스 위에 있는 내용을 이미지화하기 위해
  choiceImg:[], //캔버스에 이미지 추가
  // choiceDate:'', //날짜 선택
  setCurrentCanvas: (updateCanvas)=>set({currentCanvas:updateCanvas}),
  setUpdateCanvas:(canvas)=>set({updateCanvas:canvas}),
  setChoiceImg:(img)=>{
    set((state)=>({...state,choiceImg:img}));
  },
  // setChoicedDate:(date)=>set({choiceDate:date}),

}));