import {create} from 'zustand';

interface StoreState{
  currentCanvas: string;
  updateCanvas:string;
  getGrimList: string[];
  choiceImg:{ id: any; img: string; x: number; y: number; width: any; height: any;  }[];
  choiceDate: Date;
}

interface StoreActions{
  setCurrentCanvas:(updateCanvas:string)=>void;
  setUpdateCanvas:(canvas:string)=>void;
  setGetGrimList:(data:string[])=>void;
  setChoiceImg:(img: { id: any; img: string; x: number; y: number; width: any; height: any; }[])=>void;
  setChoicedDate:(date:Date)=>void;
}

// set 함수를 통해서만 상태를 변경할 수 있다
export const useStore = create<StoreState & StoreActions>((set)=>({
  currentCanvas: '',  //캔버스를 그림선택기능에서 사용하기 위해
  updateCanvas:'',  //현재 캔버스 위에 있는 내용을 이미지화하기 위해
  getGrimList:[], //AI가 추출한 키워드에 해당하는 이미지들 가져오기
  choiceImg:[], //캔버스에 이미지 추가
  choiceDate:new Date(), //날짜 선택
  setCurrentCanvas: (updateCanvas:string)=>set({currentCanvas:updateCanvas}),
  setUpdateCanvas:(canvas:string)=>set({updateCanvas:canvas}),
  setGetGrimList:(data:string[])=>set({getGrimList:data}),
  setChoiceImg:(img: { id: any; img: string; x: number; y: number; width: any; height: any; }[])=>{
    set((state:StoreState&StoreActions)=>({...state,choiceImg:img}));
  },
  setChoicedDate:(date:Date)=>set({choiceDate:date}),
}));