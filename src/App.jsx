import { ChatBot } from './components/ChatBot'
import { ChatProvider } from './context/chatContext'

export const App = () => {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  )
}
