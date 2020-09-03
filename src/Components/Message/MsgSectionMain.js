import React from 'react';
import styled from 'styled-components';
import MsgSectionChatItemContainer from '../../Containers/Message/MsgSectionChatItemContainer';

const MsgSectionMain = ({ activeMsg, chatHistory, isHost, chat }) => {
  return (
    <MsgSectionMainWrapper>
      <MsgSectionMainChattingWrapper>
        {chatHistory && (
          <MsgSectionMainChattingBox>
            {chatHistory.map(chat => (
              <MsgSectionChatItemContainer
                activeMsg={activeMsg}
                key={chat.id}
                chat={chat}
                isHost={isHost}
              />
            ))}
          </MsgSectionMainChattingBox>
        )}
        {/* {chat && (
          <MsgSectionMainChattingBox>
            {chat.map(({ id, msg }, idx) => (
              <MsgSectionChatItemContainer
                key={idx}
                activeMsg={activeMsg}
                isHost={isHost}
                id={id}
                msg={msg}
                chatHistory={chatHistory && chatHistory} // 나중에 chat으로 대체
              />
            ))}
          </MsgSectionMainChattingBox>
        )} */}
      </MsgSectionMainChattingWrapper>
    </MsgSectionMainWrapper>
  );
};

const MsgSectionMainWrapper = styled.div`
  overflow-y: hidden;
  max-height: calc(100% - 8rem);
  display: flex;
  flex-direction: column;
`;

const MsgSectionMainChattingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  max-height: calc(100vh - 22rem);
  overflow: scroll;
`;

const MsgSectionMainChattingBox = styled.ul`
  /* border: 1px solid red; */
  width: 100%;
  max-width: 57rem;
  min-width: 37.5rem;
  padding: 2.5rem;
  & > div + div {
    padding-top: 2rem;
  }
`;

export default MsgSectionMain;
