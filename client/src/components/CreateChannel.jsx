import React, {useState} from 'react';
import {useChatContext} from 'stream-chat-react'

import {UserList, ChannelNameInput} from './'
import {CloseCreateChannel} from '../assets'

const CreateChannel = ({createType, setIsCreating}) => {
    const {client, setActiveChannel} = useChatContext()
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('')

    const createChannel = async (event) => {
        event.preventDefault()

        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            })

            await newChannel.watch()
            setChannelName('')
            setIsCreating(false)
            setSelectedUsers([client.userID])
            setActiveChannel(newChannel)
        } catch(error) {
            alert(error)
        }
    }

    return (
        <div className={"create-channel__container"}>
            <div className={"create-channel__header"}>
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className={"create-channel__button-wrapper"} onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    );
};

export default CreateChannel;