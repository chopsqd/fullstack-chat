import React from 'react';
import Cookies from 'universal-cookie'
import {ChannelList, useChatContext} from 'stream-chat-react'

import {ChannelSearch, Sidebar, TeamChannelList, TeamChannelPreview} from './'

const CompanyHeader = () => {
    return (
        <div className="channel-list__header">
            <p className="channel-list__header__text">Medical Pager</p>
        </div>
    )
}

const ChannelListContainer = () => {
    return (
        <>
            <Sidebar />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type={"team"}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type={"team"}
                        />
                    )}
                />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type={"messaging"}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type={"messaging"}
                        />
                    )}
                />
            </div>
        </>
    );
};

export default ChannelListContainer;