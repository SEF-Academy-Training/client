// Import the image at the top of your file
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MessageBox, ChatList, Input, Avatar } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import logo from '../../assest/images/Logo Text.svg'; // Make sure this path is correct
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserMessages,
	getUserMyMessages,
	getUsersWithMessages,
	sendMessage,
} from '../../Redux/Reducers/ChatSlice';
import { toast } from 'react-toastify';
import { domainBack } from '../../configs/Api';

// handel show file size
export function formatSize(size) {
	if (size < 1024) {
		return size + ' B';
	} else if (size < 1024 * 1024) {
		return (size / 1024).toFixed(2) + ' KB';
	} else {
		return (size / (1024 * 1024)).toFixed(2) + ' MB';
	}
}

const Chat = () => {
	const dispatch = useDispatch();

	const { chat, chats, loading } = useSelector((state) => state.ChatSlice);
	const { user } = useSelector((state) => state.user);
	const Admin = user?.role === 'Admin';
	console.log('chat', chat);
	console.log('chats', chats);
	console.log('user', user);

	const [senderId, setSenderId] = useState(null);
	useEffect(() => {
		if (user && !Admin) {
			dispatch(getUserMyMessages());
		}
	}, [dispatch, user, Admin]);

	useEffect(() => {
		if (user && Admin) {
			dispatch(getUsersWithMessages());
		}
	}, [dispatch, user, Admin]);

	useEffect(() => {
		if (user && Admin && senderId) {
			dispatch(getUserMessages(senderId));
		}
	}, [dispatch, user, Admin, senderId]);


	// useEffect(() => {
	// 	if (chat) {
	// 		setMessages(
	// 			[...chat]?.map((ele) => ({
	// 				...ele,
	// 				position: ele?.send_by?.toLowerCase() === 'admin' ? 'left' : 'right',
	// 			}))
	// 		);
	// 	}
	// }, [chat]);

	const [inputValue, setInputValue] = useState('');

	// Function to handle sending a new message
	const handelSendMessage = async () => {
		if (inputValue.trim() === '') return;
		const newMessage = {
			user: user?.role === 'Admin' ? senderId : user?._id,
			sent_by: user?.role,
			type: 'text',
			text: inputValue,
			date: new Date(),
		};

		// setMessages([...messages, newMessage]);
		try {
			await dispatch(sendMessage(newMessage)).unwrap();
			setInputValue('');
			if (Admin) {
				dispatch(getUserMessages(senderId));
			} else {
				dispatch(getUserMyMessages());
			}
		} catch (error) {
			console.log(error);
			// toast.error(error.message);
		}
	};

	const handleChangeSender = (user) => {
		console.log(user);
		setSenderId(user?.id);
	};

	console.log('senderId', senderId);
	// const sendMessage = () => {
	// 	if (inputValue.trim() === '') return;
	// 	const newMessage = {
	// 		position: 'right',
	// 		type: 'text',
	// 		text: inputValue,
	// 		date: new Date(),
	// 	};
	// 	setInputValue('');

	// 	setMessages([...messages, newMessage]);
	// };

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handelSendMessage();
			console.log(inputValue);
		}
	};

	return (
		<Container className="my-5 py-5 bg-light">
			<div className="container">
				<ChatList
					className="chat-list"
					dataSource={
						user?.role === 'Admin'
							? chats?.map((ele) => ({
									avatar: ele?.profileImg ? domainBack + ele?.profileImg : null,
									alt: ele?.userName || '',
									title: ele?.userName || '',
									// title: 'Hello, What is your services?',
									// subtitle: 'Hello, how can I help you?',
									id: ele?._id,
									date: new Date(),
									unread: 2,
							}))
							: [
									{
										avatar: logo,
										alt: 'User Avatar',
										// title: 'Tax Hub',
										title: 'Hello, What is your services?',
										// subtitle: 'Hello, how can I help you?',
										date: new Date(),
										unread: 0,
									},
							]
					}
					onClick={handleChangeSender}
					id={senderId}
				/>

				{/* Render the messages ----------------------------------- */}
				{chat?.map((message) => {
					console.log('message', message);
					return (
						<MessageBox
							key={message?._id}
							type={message?.type}
							text={message?.text}
							position={
								message?.sent_by?.toLowerCase() === user?.role?.toLowerCase()
									? 'right'
									: 'left'
							}
							data={{
								uri: domainBack + message?.file?.url,
								size: formatSize(message?.file?.size),
								type: 'pdf',
								name: message?.file?.name,
								status: {
									click: false,
									loading: 0,
									download: false,
								},
							}}
						/>
					);
				})}

				{/* Input field for sending a message ----------------------- */}
				<Input
					className="mt-5 "
					placeholder="Type a message..."
					// multiline={true}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
					rightButtons={
						<button disabled={!inputValue || !senderId} onClick={handelSendMessage}>
							Send
						</button>
					}
				/>
			</div>

			<div className="text-end mt-5 ">
				<Link
					to="/addnewserviesuser"
					className="btn btn-danger mx-2 px-5 text-decoration-none"
					style={{ borderRadius: '35px', fontSize: '20px' }}
				>
					Cancel
				</Link>
				<Link
					to="/addnewserviesuser"
					className="btn btn-primary mx-2 px-5 text-decoration-none"
					style={{ borderRadius: '35px', fontSize: '20px' }}
				>
					Save
				</Link>
			</div>
		</Container>
	);
};

export default Chat;
