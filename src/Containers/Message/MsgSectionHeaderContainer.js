import React, { useCallback } from 'react';
import MsgSectionHeader from '../../Components/Message/MsgSectionHeader';
import { ToastContainer, UndoToastContainer } from '../Global/ToastContainer';

import { useSelector, useDispatch } from 'react-redux';
import {
  hideMsgDetailSection,
  showMsgDetailSection,
  hideMsgListSection, // 반응형 구현 시 필요
  showMsgListSection,
  archiveMsg,
  unarchiveMsg,
  showToast,
  hideToast,
  showUndoToast,
  hideUndoToast,
  undo,
} from '../../Modules/message';

const MsgSectionHeaderContainer = () => {
  // ! redux
  const { msgListSectionState, msgDetailSectionState } = useSelector(
    state => state.message,
  );
  const media = useSelector(state => state.message.media);
  const { activeIndex, filteredMsgs } = useSelector(state => state.message);
  // variable
  // const nextActiveAllMsg = messages.find(
  //   msg => msg.state === 'all' && !msg.isActive,
  // );
  // const nextActiveHideMsg = messages.find(
  //   msg => msg.state === 'hide' && !msg.isActive,
  // );
  // const nextActiveUnreadMsg = messages.find(
  //   msg => msg.state === 'unread' && !msg.isActive,
  // );
  // console.log(nextActiveAllMsg.id);
  // console.log(nextActiveHideMsg.id);
  // console.log(nextActiveUnreadMsg.id);
  const dispatch = useDispatch();

  // ! variable
  // ! activeMsg 구조할당 하면.. 망함... ㅠㅠ
  const activeMsg = filteredMsgs.find(
    (_, index) => filteredMsgs[index] === filteredMsgs[activeIndex],
  );
  const selectIndex = filteredMsgs.findIndex(
    (_, index) => filteredMsgs[index] === filteredMsgs[activeIndex],
  );

  // console.log('activeMsg', activeMsg);
  // console.log('selectIndex:', selectIndex, 'activeIndex:', activeIndex);
  // console.log('activeMsg.id', activeMsg.id);
  // console.log(activeMsg.hostname);
  // console.log(activeMsg.state);

  // ! event
  /**
   * media = 'medium'
   * onClick 이벤트가 발생하면 msgListSectionState를 true로 바꿔준다
   * 버튼이 보이는 현재 상태는 msgListSectionState = false 상태
   */
  const onClickShowList = useCallback(() => {
    console.log('< 버튼 클릭!!');
    return (
      media === 'medium' &&
      !msgListSectionState &&
      dispatch(showMsgListSection())
    );
  }, [dispatch, media, msgListSectionState]);

  /**
   * media = large: onClick 이벤트 발생 시 msgDetailSectionState true -> false
   * media = medium: onClick 이벤트 발생 시 msgDetailSectionState true -> false
   * ! 반응형 구현할 때
   * media: large -> medium일 때 msgDetailSectionState가 true면 그대로 true
   *        msgListSectionState true -> false로 변경
   * media: large -> medium일 때 msgDetailSectionState가 false면 그대로 false
   */
  const onClickDetail = useCallback(() => {
    if (msgDetailSectionState) return dispatch(hideMsgDetailSection());
    if (!msgDetailSectionState) return dispatch(showMsgDetailSection());
    if (media === 'medium' && msgDetailSectionState)
      return dispatch(hideMsgListSection());
  }, [dispatch, media, msgDetailSectionState]);

  const clearToast = () => dispatch(hideToast());
  const clearUndoToast = () => dispatch(hideUndoToast());

  const emitToast = () => {
    clearUndoToast();
    setTimeout(() => {
      dispatch(showToast());
      setTimeout(() => clearTimeout(clearToast()), 6000);
    });
  };

  const emitUndoToast = () => {
    clearToast();
    setTimeout(() => {
      dispatch(showUndoToast());
      setTimeout(() => clearTimeout(clearUndoToast()), 6000);
    });
  };

  const onClickArchive = () => {
    if (activeMsg && activeMsg.state === 'all') {
      // ! 1번 온클릭이벤트 발생하면 archive or un archive
      dispatch(archiveMsg(selectIndex, activeMsg.id, activeMsg.state));
      // ! 2번 Toast 발생
      emitToast();
    }
    if (activeMsg && activeMsg.state === 'hide') {
      // ! 1번 온클릭이벤트 발생하면 archive or un archive
      dispatch(unarchiveMsg(selectIndex, activeMsg.id, activeMsg.state));
      // ! 2번 Toast 발생
      emitToast();
    }
  };

  // ! 3번 실행취소버튼 클릭 이벤트 발생
  // ! Toast.js로 연결
  const onClickUndo = () => {
    // ! 4번 기존 Toast clear
    clearToast();
    // ! 5번 이전 상태의 MsgList로 돌려놓음
    dispatch(undo());
    // ! 6번 UndoToast 발생
    emitUndoToast();
  };

  return (
    <>
      <MsgSectionHeader
        media={media}
        msgListSectionState={msgListSectionState}
        msgDetailSectionState={msgDetailSectionState}
        onClickDetail={onClickDetail}
        onClickShowList={onClickShowList}
        onClickArchive={onClickArchive}
        activeMsg={activeMsg}
        hostname={activeMsg && activeMsg.hostname}
        state={activeMsg && activeMsg.state}
      />
      <ToastContainer
        state={activeMsg && activeMsg.state}
        onClickUndo={onClickUndo}
      />
      <UndoToastContainer />
    </>
  );
};

export default MsgSectionHeaderContainer;
