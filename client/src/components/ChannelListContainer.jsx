import React, {useState} from 'react';
import Cookies from 'universal-cookie'
import {ChannelList, useChatContext} from 'stream-chat-react'

import {ChannelSearch, Sidebar, TeamChannelList, TeamChannelPreview} from './'

const cookies = new Cookies()

const CompanyHeader = () => {
    return (
        <div className="channel-list__header">
            <p className="channel-list__header__text">Medical Pager</p>
        </div>
    )
}

const customChannelTeamFilter = (channels) => channels.filter((channel) => channel.type === 'team')

const customChannelMessagingFilter = (channels) => channels.filter((channel) => channel.type === 'messaging')

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    const {client} = useChatContext()

    const logout = () => {
        cookies.remove('token')
        cookies.remove('userId')
        cookies.remove('username')
        cookies.remove('fullName')
        cookies.remove('avatarURL')
        cookies.remove('hashedPassword')
        cookies.remove('phoneNumber')

        window.location.reload()
    }

    const filters = { members: { $in: [client.userID] } }

    return (
        <>
            <Sidebar logout={logout}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type={"team"}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type={"team"}
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type={"messaging"}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type={"messaging"}
                        />
                    )}
                />
            </div>
        </>
    );
};

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return (
        <>
            <div className={"channel-list__container"}>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>

            <div
                className={"channel-list__container-responsive"}
                style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div
                    className={"channel-list__container-toggle"}
                    onClick={() => setToggleContainer(prevToggleContainer => !prevToggleContainer)}
                />
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContent;