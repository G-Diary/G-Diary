import {create} from 'zustand'

export const useStore = create((set)=>({
  choiceImage: '',  //캔버스를 그림선택기능에서 사용하기 위해
  setChoiceImg: (select)=>set({choiceImage:select})
}));