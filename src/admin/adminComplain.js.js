import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chat from '../component/complain/chat'
import Contact from '../component/complain/contact'

import {io} from 'socket.io-client'
import { UserContext } from '../context/userContext'
import NavbarAdmin from '../component/navbarAdmin'

let socket

export default function AdminComplain() {

    const title = 'Complain'
    document.title = 'DumbMerch | ' + title

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // create messages state
    const [messages, setMessages] = useState([])

    // consume user context
    const [state] = useContext(UserContext)

    useEffect(() =>{
        socket = io('https://cinema-b36.herokuapp.com/', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })

        // define listener for every updated message
        socket.on("new message", () => {
            console.log("contact", contact)
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            
            // manipulate customers to add message property with the newest message
            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length -1].message : "Click here to start message"
            }))
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // emit event load messages
        socket.emit("load messages", data.id)
    }

    const loadMessages = (value) => {
        // define listener on event "messages"
        socket.on("messages", (data) => {
            // get data messages
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message,
                }))
                setMessages(dataMessages)
            }
            loadContacts()
            const chatMessagesElm = document.getElementById("chat-messages");
            chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight;
        })
    }

    const onSendMessage = (e) => {
        // listen only enter key event press
        if(e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            //emit event send message
            socket.emit("send message", data)
            e.target.value = ""
        }
    }

    return (
        <>
            <NavbarAdmin />
            <Container fluid style={{height: '85vh'}}>
                <Row>
                    <Col md={3} style={{height: '85vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{maxHeight: '85vh', color: '#fff'}} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
