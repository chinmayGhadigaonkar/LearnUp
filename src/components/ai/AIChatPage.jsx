import React, { useState } from 'react';

const AiAssistancePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, user: 'user' }]);
      // Simulating a response from AI (you can replace this with actual AI integration)
      // setTimeout(() => {
      //   setMessages([...messages, { text: 'Hello! How can I assist you today?', user: 'ai' }]);
      // }, 3000); // Simulating a response delay
      setNewMessage('');
      // setMessages([...messages,{}])
    }
  };

  return (
    <div className="min-h-screen bg-white  ">
      <header className=" py-4  text-black font-bold text-2xl text-center">
        AI Assistance
      </header>

      <main className="mx-auto  py-8  ">
        <div className="w-3/5   mx-auto bg-white p-4 shadow-xl rounded-lg border-2  ">
          <div className="h-80  overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-2 ${
                  message.user === 'user' ? 'text-left' : 'text-left'
                }`}
              >
                <div
                  className={`py-2 px-4 rounded-lg ${
                    message.user === 'user' ? 'bg-red-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              className="flex-grow rounded-l-lg p-2   bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 text-black  leading-8 transition-colors duration-200 ease-in-out "
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="bg-red-500 text-white px-4 rounded-r-lg "
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiAssistancePage;
